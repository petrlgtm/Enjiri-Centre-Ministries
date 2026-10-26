/**
 * Uploads the ministry photos in /photos to Sanity and assigns them to the right documents.
 * Run: npx sanity exec scripts/seed-photos.ts
 * Needs SANITY_API_TOKEN (Editor) in .env.local, or `npx sanity login` and add --with-user-token.
 */
import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

if (fs.existsSync(".env.local")) process.loadEnvFile(".env.local");
const client = getCliClient({ apiVersion: "2024-01-01", token: process.env.SANITY_API_TOKEN || undefined });
const DIR = path.join(process.cwd(), "photos");

type Spot = { x: number; y: number };
const assetIds = new Map<string, string>();
const files = fs.readdirSync(DIR);

// Photos are referenced by their unique 8-character prefix (e.g. "IMG_0572", "3af8a9ba").
async function upload(name: string) {
  const prefix = name.slice(0, 8).toLowerCase();
  const file = files.find((f) => f.toLowerCase().startsWith(prefix));
  if (!file) throw new Error(`photo not found: ${name}`);
  const cached = assetIds.get(file);
  if (cached) return cached;
  const asset = await client.assets.upload("image", fs.createReadStream(path.join(DIR, file)), { filename: file });
  assetIds.set(file, asset._id);
  console.log("uploaded", file);
  return asset._id;
}

async function img(file: string, alt: string, spot?: Spot) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: await upload(file) },
    alt,
    ...(spot && {
      hotspot: { _type: "sanity.imageHotspot", x: spot.x, y: spot.y, width: 0.4, height: 0.4 },
      crop: { _type: "sanity.imageCrop", top: 0, bottom: 0, left: 0, right: 0 },
    }),
  };
}

async function galleryImages(items: Array<[string, string, string?]>) {
  return Promise.all(
    items.map(async ([file, alt, caption], i) => {
      const image = await img(file, alt);
      delete (image as { alt?: string }).alt;
      return { _key: `p${i}${file.slice(0, 6).replace(/\W/g, "")}`, _type: "galleryImage", image, alt, ...(caption && { caption }) };
    }),
  );
}

const PREACH = "Evangelist Peter Kalagi preaching";

async function run() {
  const tx = client.transaction();
  const set = (id: string, fields: Record<string, unknown>) => tx.patch(id, (p) => p.set(fields));

  // ── Site settings ───────────────────────────────────────────
  set("siteSettings", {
    email: "enjiricenter@gmail.com",
    defaultHeaderImage: await img("IMG_9613.JPG", "Night crusade stage lit up before a large crowd"),
    sermonsHeaderImage: await img("IMG_0584.JPG", `${PREACH} at the pulpit`, { x: 0.55, y: 0.4 }),
    eventsHeaderImage: await img("IMG_0999.JPG", "Worship team on stage at an open-air gathering"),
    charityHeaderImage: await img("IMG_9266.JPG", "Children gathered at a crusade in matching ministry shirts"),
    blogHeaderImage: await img("IMG_1015.JPG", "Ministry leaders seated at an outdoor service"),
    donateHeaderImage: await img("22bf956c-8f3b-4e92-95c5-ae929b0f63d3.jpg", "Congregation lifting hands in worship"),
    contactHeaderImage: await img("IMG_0828.JPG", "Ministry team arriving to welcome guests", { x: 0.5, y: 0.45 }),
    venueImage: await img("IMG_9615.JPG", "Crusade grounds with stage and crowd at night"),
  });

  // ── Home & About ────────────────────────────────────────────
  set("homePage", {
    visitImage: await img("IMG_0827.JPG", "Guests being welcomed with a handshake", { x: 0.42, y: 0.5 }),
    ctaImage: await img("IMG_9614.JPG", "Aerial view of a night crusade crowd facing the stage"),
  });
  const home = await client.fetch<{ missionValues?: Array<{ _key: string; title?: string }> }>(
    `*[_id == "homePage"][0]{ missionValues[]{ _key, title } }`,
  );
  const valuePhotos: Array<[string, string]> = [
    ["IMG_0576.JPG", `${PREACH}`],
    ["1c7aa63e-ab5c-4ecc-ae74-c6a190bf6a60.jpg", "Joyful worship during an outdoor service"],
    ["IMG_0689.JPG", "Young people praying together"],
    ["IMG_9616.JPG", "Crowd gathered at a night crusade"],
  ];
  for (const [i, v] of (home?.missionValues ?? []).slice(0, valuePhotos.length).entries()) {
    const [file, alt] = valuePhotos[i];
    set("homePage", { [`missionValues[_key=="${v._key}"].image`]: await img(file, alt) });
  }

  set("aboutPage", {
    headerImage: await img("IMG_9617.JPG", "Night crusade stage and gathered crowd"),
    historyImage: await img("3af8a9ba-1b73-438f-9013-4840fdc94b94.jpg", "Congregation standing in worship at an open-air service"),
  });

  // ── Leader (cut-out is kept; this is the regular portrait) ─
  set("leader-pastor-kalagi", {
    image: await img("IMG_0862.JPG", "Evangelist Peter Kalagi speaking at the pulpit", { x: 0.42, y: 0.35 }),
  });

  // ── Ministries, events, blog ────────────────────────────────
  const byTitle = async (type: string, title: string) =>
    client.fetch<string | null>(`*[_type == $type && (title == $title || name == $title)][0]._id`, { type, title });
  const assign = async (type: string, title: string, fields: Record<string, unknown>) => {
    const id = await byTitle(type, title);
    if (id) set(id, fields);
    else console.warn(`skip: no ${type} titled "${title}"`);
  };

  await assign("ministry", "Worship", { image: await img("1c7aa63e-ab5c-4ecc-ae74-c6a190bf6a60.jpg", "Congregation dancing in worship") });
  await assign("ministry", "Teachings", { image: await img("IMG_0576.JPG", `${PREACH} from the pulpit`, { x: 0.45, y: 0.4 }) });
  await assign("ministry", "Outreach", { image: await img("IMG_9618.JPG", "Aerial view of an outreach crusade at night") });
  await assign("ministry", "Community", { image: await img("IMG_0842.JPG", "Members praying together in fellowship") });

  await assign("event", "Prayer Night", { image: await img("IMG_1055.JPG", "Night prayer gathering with hands raised") });
  await assign("event", "Sunday Worship Service", { image: await img("IMG_0583.JPG", "Congregation gathered for Sunday worship") });
  await assign("event", "Youth Conference 2026", { image: await img("IMG_0696.JPG", "Young people gathered for a youth session", { x: 0.45, y: 0.55 }) });
  await assign("event", "Community Outreach", { image: await img("IMG_1006.JPG", "Community members worshipping at an outdoor outreach") });
  await assign("event", "Women's Conference", { image: await img("IMG_9236.JPG", "Women ministering on stage", { x: 0.45, y: 0.5 }) });

  await assign("blogPost", "The Power of Community: How Fellowship Strengthens Faith", {
    coverImage: await img("IMG_0842.JPG", "Members praying together in fellowship"),
  });
  await assign("blogPost", "Reflections on Our 2025 Gospel Crusade in Kampala", {
    coverImage: await img("IMG_9615.JPG", "Gospel crusade crowd in front of the stage at night"),
  });
  await assign("blogPost", "Five Ways to Grow Your Prayer Life", {
    coverImage: await img("IMG_1043.JPG", "A man in quiet prayer during a service", { x: 0.55, y: 0.45 }),
  });

  // ── Charity programmes: card image, hero, about ─────────────
  const programmes: Array<[string, [string, string, Spot?], [string, string], [string, string, Spot?]]> = [
    ["Gospel Crusades",
      ["IMG_9616.JPG", "Night gospel crusade crowd"],
      ["IMG_9614.JPG", "Aerial view of a gospel crusade"],
      ["IMG_9241.JPG", `${PREACH} at a crusade`, { x: 0.5, y: 0.4 }]],
    ["Revival Prayer Summits",
      ["IMG_1038.JPG", "Women praying with hands raised", { x: 0.35, y: 0.45 }],
      ["IMG_1367.JPG", "Night prayer summit gathering"],
      ["IMG_0690.JPG", "Young people in prayer", { x: 0.4, y: 0.45 }]],
    ["Community Outreach",
      ["IMG_9266.JPG", "Children gathered at a community outreach"],
      ["IMG_1006.JPG", "Community outreach worship in an open field"],
      ["IMG_1521.JPG", "An elder worshipping during outreach", { x: 0.5, y: 0.4 }]],
    ["Community Dinners",
      ["3c06e56c-3949-46c4-9b76-8379dabebaf6.jpg", "Children sharing a joyful moment with ministry leaders", { x: 0.45, y: 0.4 }],
      ["57921109-01cd-4490-b43e-397580c92e1c.jpg", "Children gathered in the fellowship hall"],
      ["cfe6e226-5d7a-4f42-9a9b-2dc8a4d6b8f1.jpg", "Praying over children at a community gathering", { x: 0.55, y: 0.5 }]],
    ["Capacity Building & Discipleship",
      ["IMG_9066.JPG", "A discipleship session in progress", { x: 0.55, y: 0.45 }],
      ["IMG_0583.JPG", "Attendees listening at a teaching session"],
      ["IMG_9058.JPG", "Participants at a discipleship class"]],
    ["Women's Summit — My Legacy",
      ["IMG_9236.JPG", "Women ministering on stage", { x: 0.45, y: 0.5 }],
      ["IMG_9238.JPG", "Women praying together on stage"],
      ["IMG_0581.JPG", "A woman taking notes during the summit", { x: 0.45, y: 0.4 }]],
  ];
  for (const [title, card, hero, about] of programmes) {
    await assign("charityProgram", title, {
      image: await img(...card),
      heroImage: await img(hero[0], hero[1]),
      aboutImage: await img(...about),
    });
  }

  // ── Galleries ───────────────────────────────────────────────
  const sunday = await galleryImages([
    ["IMG_0583.JPG", "Congregation gathered for worship"],
    ["IMG_0572.JPG", `${PREACH}`],
    ["IMG_0573.JPG", "Worship team on stage"],
    ["IMG_0578.JPG", "Praise and worship"],
    ["IMG_0576.JPG", `${PREACH} from the pulpit`],
    ["IMG_0575.JPG", "Listening during the message"],
    ["IMG_0581.JPG", "Taking notes during the sermon"],
    ["IMG_0584.JPG", `${PREACH}`],
  ]);
  set("rQ2Tti1cJ5GYiTqb3F6hil", { coverImage: await img("IMG_0583.JPG", "Congregation gathered for worship"), images: sunday });

  const outreach = await galleryImages([
    ["IMG_0998.JPG", "Crowd gathered in front of the outreach stage"],
    ["IMG_0993.JPG", "Worship at the outreach"],
    ["IMG_0999.JPG", "Worship team on the outreach stage"],
    ["IMG_1006.JPG", "Worship in the open field"],
    ["IMG_1007.JPG", "Praise with hands lifted"],
    ["IMG_1015.JPG", "Ministry leaders at the outreach"],
    ["IMG_1038.JPG", "Women in prayer"],
    ["IMG_1043.JPG", "Moments of prayer"],
    ["IMG_1521.JPG", "An elder in worship"],
    ["IMG_0862.JPG", "Evangelist Peter Kalagi speaking"],
    ["IMG_0884.JPG", "Evangelist Peter Kalagi at the pulpit"],
    ["IMG_1432.JPG", "Ministering at sunset"],
  ]);
  set("rQ2Tti1cJ5GYiTqb3F6hja", { coverImage: await img("IMG_0998.JPG", "Crowd gathered in front of the outreach stage"), images: outreach });

  const newGalleries: Array<{ id: string; title: string; slug: string; category: string; description: string; cover: string; items: Array<[string, string]> }> = [
    {
      id: "gallery-night-crusade", title: "Night Crusade", slug: "night-crusade", category: "events",
      description: "An evening of worship, the Word and salvation under the lights.",
      cover: "IMG_9616.JPG",
      items: [
        ["IMG_9616.JPG", "Crusade stage at night"], ["IMG_9613.JPG", "Crowd and stage lights"],
        ["IMG_9614.JPG", "Aerial view of the crusade"], ["IMG_9615.JPG", "Crowd facing the stage"],
        ["IMG_9617.JPG", "Crusade grounds at dusk"], ["IMG_9619.JPG", "The full crusade ground"],
        ["IMG_9241.JPG", PREACH], ["IMG_9246.JPG", PREACH], ["IMG_9254.JPG", PREACH],
        ["IMG_9260.JPG", PREACH], ["IMG_9262.JPG", "Praying from the pulpit"], ["IMG_9267.JPG", PREACH],
        ["IMG_9268.JPG", "Ministry on the crusade stage"], ["IMG_9235.JPG", "Crowd worshipping at night"],
        ["IMG_9248.JPG", "Families at the crusade"], ["IMG_9249.JPG", "Worship in the crowd"],
        ["IMG_9266.JPG", "Children at the crusade"], ["IMG_9236.JPG", "Women ministering on stage"],
        ["IMG_9238.JPG", "Praying together on stage"], ["IMG_9239.JPG", "Ministry on stage"],
        ["IMG_1055.JPG", "Night prayer"], ["IMG_1367.JPG", "Ministry teams praying for the crowd"],
        ["IMG_1392.JPG", "Worship under the tents"], ["IMG_1558.JPG", "Ministering before the flag"],
        ["IMG_1563.JPG", "Ministering before the flag"],
        ["b160a8d2-d179-4a7e-8b8a-7e5a1f2c6d40.jpg", "Worship with eyes closed"],
        ["dcffb14e-b47f-42c4-a1bf-fe643667ac60.jpg", "Leading worship"],
      ],
    },
    {
      id: "gallery-open-air-crusade", title: "Open-Air Crusade", slug: "open-air-crusade", category: "outreach",
      description: "Thousands gathered in the open air to worship and hear the Gospel.",
      cover: "3af8a9ba-1b73-438f-9013-4840fdc94b94.jpg",
      items: [
        ["3af8a9ba-1b73-438f-9013-4840fdc94b94.jpg", "Congregation in worship"],
        ["1de0b0a0-ad9c-479f-a083-66549af7f416.jpg", "Crowd at the open-air crusade"],
        ["22bf956c-8f3b-4e92-95c5-ae929b0f63d3.jpg", "Lifting hands in worship"],
        ["23e20dfa-9db5-4603-bb3d-aabe526e23f0.jpg", "Worship with hands raised"],
        ["1c7aa63e-ab5c-4ecc-ae74-c6a190bf6a60.jpg", "Dancing in praise"],
        ["79673c42-a078-4f9c-9c8a-dbf8cd098d4b.jpg", "Praying among the people"],
        ["e8af40ee-a742-4c43-8f02-3b9b2a8d5e11.jpg", "Worship in the crowd"],
        ["f3c9090a-9ac4-4d6b-9f53-2a8b8b1c6e72.jpg", "Evening worship"],
        ["85187262-d989-4cc9-8df1-9681575ea33f.jpg", "Night gathering"],
        ["288bc30b-d34b-4f46-a518-a61330244a8b.jpg", PREACH],
        ["28504a1a-23fc-4ce3-be68-1dd780ea1f36.jpg", "Dance ministry"],
      ],
    },
    {
      id: "gallery-youth-fellowship", title: "Youth Fellowship", slug: "youth-fellowship", category: "youth",
      description: "Young people praying, learning and growing together in faith.",
      cover: "IMG_0696.JPG",
      items: [
        ["IMG_0696.JPG", "Youth gathered for a session"], ["IMG_0699.JPG", "Leading the youth in prayer"],
        ["IMG_0689.JPG", "Youth praying together"], ["IMG_0690.JPG", "Youth in prayer"],
        ["IMG_0691.JPG", "Praying for one another"], ["IMG_0681.JPG", "Arriving for fellowship"],
        ["IMG_0842.JPG", "Prayer during fellowship"], ["IMG_9066.JPG", "Teaching session"],
        ["IMG_9071.JPG", "Teaching session"], ["IMG_9075.JPG", "Sharing the Word"],
        ["IMG_9086.JPG", "Reading the Scriptures"], ["IMG_9058.JPG", "Listening during the session"],
        ["IMG_0758.JPG", "Ministry leaders"], ["IMG_0827.JPG", "Welcoming guests"],
        ["IMG_0828.JPG", "Ministry team arriving"],
      ],
    },
    {
      id: "gallery-childrens-ministry", title: "Children's Ministry", slug: "childrens-ministry", category: "community",
      description: "Joyful moments with the children of Enjiri Center Ministries.",
      cover: "aa317645-c842-4ed1-a0e4-8ae76fe371b5.jpg",
      items: [
        ["aa317645-c842-4ed1-a0e4-8ae76fe371b5.jpg", "Children smiling with a ministry leader"],
        ["194762d3-09c8-44d1-8c23-b1ed29196b6f.jpg", "A selfie with the children"],
        ["3c06e56c-3949-46c4-9b76-8379dabebaf6.jpg", "Children celebrating together"],
        ["57921109-01cd-4490-b43e-397580c92e1c.jpg", "Children gathered in the hall"],
        ["ac61463b-5aba-4fdf-9eba-6bde0aaca650.jpg", "Praying over the children"],
        ["cfe6e226-5d7a-4f42-9a9b-2dc8a4d6b8f1.jpg", "Blessing the children"],
      ],
    },
  ];
  for (const g of newGalleries) {
    tx.createOrReplace({
      _id: g.id,
      _type: "gallery",
      title: g.title,
      slug: { _type: "slug", current: g.slug },
      description: g.description,
      category: g.category,
      coverImage: await img(g.cover, g.items.find(([f]) => f === g.cover)?.[1] ?? g.title),
      images: await galleryImages(g.items),
    });
  }

  await tx.commit();
  console.log(`done — ${assetIds.size} photos uploaded and assigned`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Uploads the ministry photos in /photos to Sanity, assigns them to the right documents,
 * builds one gallery per event and seeds the events as drafts.
 * Run: npx sanity exec scripts/seed-photos.ts
 * Token: SANITY_API_TOKEN (or sanity_editor) in .env.local / .env, or `npx sanity login` + --with-user-token.
 */
import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

function envToken() {
  for (const file of [".env.local", ".env"]) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*(SANITY_API_TOKEN|sanity_editor)\s*=\s*["']?([^"'\s]+)/);
      if (m) return m[2];
    }
  }
  return process.env.SANITY_API_TOKEN;
}

const client = getCliClient({ apiVersion: "2024-01-01", token: envToken() || undefined });
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
    ...(spot && { hotspot: { _type: "sanity.imageHotspot", x: spot.x, y: spot.y, width: 0.4, height: 0.4 } }),
  };
}

async function galleryImages(items: Array<[string, string]>) {
  return Promise.all(
    items.map(async ([file, alt], i) => {
      const { _type, asset } = await img(file, alt);
      return { _key: `p${i}${file.slice(0, 8).replace(/\W/g, "")}`, _type: "galleryImage", image: { _type, asset }, alt };
    }),
  );
}

const PREACH = "Evangelist Peter Kalagi preaching";

async function run() {
  const tx = client.transaction();
  const set = (id: string, fields: Record<string, unknown>) => tx.patch(id, (p) => p.set(fields));

  // ── Site settings ───────────────────────────────────────────
  set("siteSettings", {
    tagline: "Preaching Christ, Restoring Hope",
    email: "enjiricenter@gmail.com",
    phone: "+256 742 735 862",
    phone2: "+256 781 573 536",
    address: "Maggwa Third-Lane, Jinja, Uganda",
    defaultHeaderImage: await img("IMG_9613.JPG", "Night crusade stage lit up before a large crowd"),
    sermonsHeaderImage: await img("IMG_0584.JPG", `${PREACH} at the pulpit`),
    eventsHeaderImage: await img("IMG_0999.JPG", "Worship team on stage at a soul winning campaign"),
    charityHeaderImage: await img("IMG_9266.JPG", "Children gathered at a crusade in matching shirts"),
    blogHeaderImage: await img("IMG_1015.JPG", "Ministry leaders seated at an outdoor service"),
    donateHeaderImage: await img("22bf956c", "Congregation lifting hands in worship"),
    contactHeaderImage: await img("IMG_0828.JPG", "Ministry team arriving to welcome guests"),
    venueImage: await img("IMG_9615.JPG", "Crusade grounds with stage and crowd at night"),
  });

  // ── Home & About ────────────────────────────────────────────
  set("homePage", {
    visitImage: await img("IMG_0827.JPG", "Guests being welcomed with a handshake"),
    ctaImage: await img("IMG_9614.JPG", "Aerial view of a night crusade crowd facing the stage"),
  });
  const home = await client.fetch<{ missionValues?: Array<{ _key: string }> }>(
    `*[_id == "homePage"][0]{ missionValues[]{ _key } }`,
  );
  const valuePhotos: Array<[string, string]> = [
    ["IMG_0576.JPG", PREACH],
    ["1c7aa63e", "Joyful worship during an outdoor service"],
    ["IMG_0689.JPG", "Young people praying together"],
    ["IMG_9616.JPG", "Crowd gathered at a night crusade"],
  ];
  for (const [i, v] of (home?.missionValues ?? []).slice(0, valuePhotos.length).entries()) {
    set("homePage", { [`missionValues[_key=="${v._key}"].image`]: await img(...valuePhotos[i]) });
  }

  set("aboutPage", {
    headerImage: await img("IMG_9617.JPG", "Night crusade stage and gathered crowd"),
    historyImage: await img("3af8a9ba", "Congregation standing in worship at an open-air service"),
  });

  // ── Leader (cut-out is kept; this is the regular portrait) ─
  set("leader-pastor-kalagi", {
    image: await img("IMG_0862.JPG", "Evangelist Peter Kalagi speaking at the pulpit", { x: 0.42, y: 0.35 }),
  });

  // ── Ministries, blog, charity ───────────────────────────────
  const assign = async (type: string, title: string, fields: Record<string, unknown>) => {
    const id = await client.fetch<string | null>(`*[_type == $type && title == $title][0]._id`, { type, title });
    if (id) set(id, fields);
    else console.warn(`skip: no ${type} titled "${title}"`);
  };

  await assign("ministry", "Worship", { image: await img("1c7aa63e", "Congregation dancing in worship") });
  await assign("ministry", "Teachings", { image: await img("IMG_0576.JPG", `${PREACH} from the pulpit`) });
  await assign("ministry", "Outreach", { image: await img("IMG_9618.JPG", "Aerial view of a crusade at night") });
  await assign("ministry", "Community", { image: await img("IMG_0842.JPG", "Members praying together in fellowship") });

  await assign("blogPost", "The Power of Community: How Fellowship Strengthens Faith", {
    coverImage: await img("IMG_0842.JPG", "Members praying together in fellowship"),
  });
  await assign("blogPost", "Reflections on Our 2025 Gospel Crusade in Kampala", {
    coverImage: await img("IMG_9615.JPG", "Gospel crusade crowd in front of the stage at night"),
  });
  await assign("blogPost", "Five Ways to Grow Your Prayer Life", {
    coverImage: await img("IMG_1043.JPG", "A man in quiet prayer during a service"),
  });

  const programmes: Array<[string, [string, string], [string, string], [string, string]]> = [
    ["Gospel Crusades",
      ["IMG_9616.JPG", "Night gospel crusade crowd"],
      ["IMG_9614.JPG", "Aerial view of a gospel crusade"],
      ["IMG_9241.JPG", `${PREACH} at a crusade`]],
    ["Revival Prayer Summits",
      ["IMG_1038.JPG", "Women praying with hands raised"],
      ["IMG_1367.JPG", "Night prayer gathering"],
      ["IMG_0690.JPG", "Young people in prayer"]],
    ["Community Outreach",
      ["IMG_9266.JPG", "Children gathered at a community outreach"],
      ["IMG_1006.JPG", "Community outreach worship in an open field"],
      ["IMG_1521.JPG", "An elder worshipping during outreach"]],
    ["Community Dinners",
      ["3c06e56c", "Children sharing a joyful moment with ministry leaders"],
      ["57921109", "Children gathered in the fellowship hall"],
      ["cfe6e226", "Praying over children at a community gathering"]],
    ["Capacity Building & Discipleship",
      ["IMG_9066.JPG", "A leadership class in progress"],
      ["IMG_0583.JPG", "Attendees listening at a teaching session"],
      ["IMG_9058.JPG", "Participants at a leadership class"]],
    ["Women's Summit — My Legacy",
      ["IMG_9236.JPG", "Women ministering on stage"],
      ["IMG_9238.JPG", "Women praying together on stage"],
      ["IMG_0581.JPG", "A woman taking notes during the summit"]],
  ];
  for (const [title, card, hero, about] of programmes) {
    await assign("charityProgram", title, {
      image: await img(...card),
      heroImage: await img(...hero),
      aboutImage: await img(...about),
    });
  }

  // ── Remove sample events and galleries (skipped if still referenced) ─
  const oldIds = [
    "e0be86c9-44b2-45c4-ba67-70790d0faac3", // Prayer Night
    "rQ2Tti1cJ5GYiTqb3F6hY4", // Sunday Worship Service
    "rQ2Tti1cJ5GYiTqb3F6hYt", // Youth Conference 2026
    "rQ2Tti1cJ5GYiTqb3F6hZi", // Community Outreach
    "rQ2Tti1cJ5GYiTqb3F6haX", // Women's Conference
    "rQ2Tti1cJ5GYiTqb3F6hil", // Gallery: Sunday Worship Service
    "rQ2Tti1cJ5GYiTqb3F6hja", // Gallery: Community Outreach 2025
  ];
  for (const id of oldIds) {
    const refs = await client.fetch<number>(`count(*[references($id) || references($draft)])`, { id, draft: `drafts.${id}` });
    if (refs > 0) {
      console.warn(`skip delete: ${id} is referenced by ${refs} document(s)`);
      continue;
    }
    tx.delete(id).delete(`drafts.${id}`);
  }

  // ── Events (drafts — the client adds dates/times and publishes in Studio) ─
  const events: Array<{ slug: string; title: string; category: string; description: string; photo: [string, string]; monthly?: boolean }> = [
    {
      slug: "holy-spirit-experience", title: "Holy Spirit Experience", category: "worship",
      description: "A night of worship, prayer and the presence of the Holy Spirit — come expecting healing, renewal and an encounter with God.",
      photo: ["IMG_0578.JPG", "Worship team lifting hands on stage"],
    },
    {
      slug: "redefining-destinies", title: "Redefining Destinies", category: "fellowship", monthly: true,
      description: "Our monthly fellowship, every second Tuesday — the Word, prayer and fellowship to help you discover and walk in God's purpose for your life.",
      photo: ["IMG_0699.JPG", "Leading the fellowship in prayer"],
    },
    {
      slug: "ghetto-crusade", title: "Ghetto Crusade", category: "outreach",
      description: "Taking the Gospel into the heart of our communities — worship, preaching and prayer under the open sky, for everyone.",
      photo: ["IMG_9616.JPG", "Crowd gathered at the crusade stage at night"],
    },
    {
      slug: "soul-winning-campaigns", title: "Soul Winning Campaigns", category: "outreach",
      description: "\"I Am A Soul Winner\" — equipping believers to share their faith and reaching the lost with the message of Christ.",
      photo: ["IMG_0998.JPG", "Crowd gathered in front of the campaign stage"],
    },
    {
      slug: "leadership-classes", title: "Leadership Classes", category: "fellowship",
      description: "Training and discipleship for current and emerging leaders, grounded in the Word and a heart of servant leadership.",
      photo: ["IMG_9066.JPG", "A leadership class in progress"],
    },
  ];
  for (const e of events) {
    tx.createOrReplace({
      _id: `drafts.event-${e.slug}`,
      _type: "event",
      title: e.title,
      slug: { _type: "slug", current: e.slug },
      category: e.category,
      description: e.description,
      image: await img(...e.photo),
      ...(e.monthly && { isRecurring: true, recurrence: "monthly" }),
    });
  }

  // ── Galleries: one per event, plus children's ministry ──────
  const galleries: Array<{ slug: string; title: string; category: string; description: string; items: Array<[string, string]> }> = [
    {
      slug: "holy-spirit-experience", title: "Holy Spirit Experience", category: "worship",
      description: "Worship, prayer and the Word at the Holy Spirit Experience.",
      items: [
        ["IMG_0578.JPG", "Worship team lifting hands on stage"], ["IMG_0573.JPG", "Worship team on stage"],
        ["IMG_0572.JPG", PREACH], ["IMG_0576.JPG", `${PREACH} from the pulpit`], ["IMG_0584.JPG", PREACH],
        ["IMG_0583.JPG", "The congregation gathered"], ["IMG_0575.JPG", "Listening to the message"],
        ["IMG_0581.JPG", "Taking notes during the sermon"], ["IMG_1558.JPG", "Ministering before the flag"],
        ["IMG_1563.JPG", "Ministering before the flag"],
      ],
    },
    {
      slug: "redefining-destinies", title: "Redefining Destinies", category: "community",
      description: "Our monthly fellowship, every second Tuesday — praying, learning and growing together.",
      items: [
        ["IMG_0699.JPG", "Leading the fellowship in prayer"], ["IMG_0696.JPG", "Gathered for fellowship"],
        ["IMG_0689.JPG", "Praying together"], ["IMG_0690.JPG", "Moments of prayer"],
        ["IMG_0691.JPG", "Praying for one another"], ["IMG_0842.JPG", "Prayer during fellowship"],
        ["IMG_0681.JPG", "Arriving for fellowship"], ["IMG_0758.JPG", "Ministry leaders"],
        ["IMG_0827.JPG", "Welcoming guests"], ["IMG_0828.JPG", "The ministry team arriving"],
      ],
    },
    {
      slug: "ghetto-crusade", title: "Ghetto Crusade", category: "outreach",
      description: "Worship, preaching and salvation under the lights in the heart of the community.",
      items: [
        ["IMG_9616.JPG", "The crusade stage at night"], ["IMG_9614.JPG", "Aerial view of the crusade"],
        ["IMG_9613.JPG", "Crowd and stage lights"], ["IMG_9615.JPG", "Crowd facing the stage"],
        ["IMG_9617.JPG", "The crusade ground at dusk"], ["IMG_9618.JPG", "Aerial view of the crowd"],
        ["IMG_9619.JPG", "The full crusade ground"], ["IMG_9241.JPG", PREACH], ["IMG_9246.JPG", PREACH],
        ["IMG_9254.JPG", PREACH], ["IMG_9260.JPG", PREACH], ["IMG_9262.JPG", "Praying from the pulpit"],
        ["IMG_9267.JPG", PREACH], ["IMG_9268.JPG", "Ministry on the crusade stage"],
        ["IMG_9236.JPG", "Women ministering on stage"], ["IMG_9238.JPG", "Praying together on stage"],
        ["IMG_9239.JPG", "Prayer on stage"], ["IMG_9235.JPG", "The crowd in worship"],
        ["IMG_9248.JPG", "Families at the crusade"], ["IMG_9249.JPG", "Worship in the crowd"],
        ["IMG_9266.JPG", "Children at the crusade"], ["IMG_1055.JPG", "Hands raised in prayer"],
        ["IMG_1367.JPG", "Ministry teams praying for the crowd"], ["IMG_1392.JPG", "Worship under the tents"],
        ["b160a8d2", "Worship with eyes closed"], ["dcffb14e", "Leading worship"],
      ],
    },
    {
      slug: "soul-winning-campaigns", title: "Soul Winning Campaigns", category: "outreach",
      description: "\"I Am A Soul Winner\" — reaching the lost with the message of Christ.",
      items: [
        ["IMG_0998.JPG", "Crowd in front of the campaign stage"], ["IMG_0993.JPG", "Worship at the campaign"],
        ["IMG_0999.JPG", "The worship team on stage"], ["IMG_1006.JPG", "Worship in the open field"],
        ["IMG_1007.JPG", "Praise with hands lifted"], ["IMG_1015.JPG", "Ministry leaders seated"],
        ["IMG_1038.JPG", "Women in prayer"], ["IMG_1043.JPG", "Moments of prayer"],
        ["IMG_1521.JPG", "An elder in worship"], ["IMG_0862.JPG", "Evangelist Peter Kalagi speaking"],
        ["IMG_0884.JPG", "Evangelist Peter Kalagi at the pulpit"], ["IMG_1432.JPG", "Ministering at sunset"],
        ["3af8a9ba", "The congregation in worship"], ["1de0b0a0", "Soul winners among the crowd"],
        ["22bf956c", "Lifting hands in worship"], ["23e20dfa", "Worship with hands raised"],
        ["1c7aa63e", "Dancing in praise"], ["79673c42", "Praying among the people"],
        ["e8af40ee", "Worship in the crowd"], ["f3c9090a", "Evening worship"],
        ["85187262", "The evening gathering"], ["288bc30b", PREACH], ["28504a1a", "Dance ministry"],
      ],
    },
    {
      slug: "leadership-classes", title: "Leadership Classes", category: "events",
      description: "Training and discipleship for current and emerging leaders.",
      items: [
        ["IMG_9066.JPG", "Teaching the class"], ["IMG_9071.JPG", "Teaching the class"],
        ["IMG_9075.JPG", "Sharing the Word"], ["IMG_9086.JPG", "Reading the Scriptures"],
        ["IMG_9058.JPG", "Participants listening"],
      ],
    },
    {
      slug: "childrens-ministry", title: "Children's Ministry", category: "community",
      description: "Joyful moments with the children of Enjiri Center Ministries.",
      items: [
        ["aa317645", "Children smiling with a ministry leader"], ["194762d3", "A selfie with the children"],
        ["3c06e56c", "Children celebrating together"], ["57921109", "Children gathered in the hall"],
        ["ac61463b", "Praying over the children"], ["cfe6e226", "Blessing the children"],
      ],
    },
  ];
  for (const g of galleries) {
    tx.createOrReplace({
      _id: `gallery-${g.slug}`,
      _type: "gallery",
      title: g.title,
      slug: { _type: "slug", current: g.slug },
      description: g.description,
      category: g.category,
      coverImage: await img(...g.items[0]),
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

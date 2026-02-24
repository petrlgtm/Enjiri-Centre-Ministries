/**
 * Seed script: Creates ministry + charityProgram documents in Sanity.
 * Run with: node scripts/seed-outreach.mjs
 */
import { createClient } from "next-sanity";
import { readFileSync } from "fs";

// Load .env.local manually (no dotenv dependency)
const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const env = Object.fromEntries(
  envFile
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("=").map((s) => s.trim()))
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: env.SANITY_API_TOKEN,
});

// ── Ministries (4 for homepage grid) ──────────────────────────────────────────
const ministries = [
  {
    _type: "ministry",
    title: "Worship",
    slug: { _type: "slug", current: "worship" },
    description:
      "Experience heartfelt worship that draws you closer to God and transforms your life from the inside out.",
    icon: "music",
    ctaText: "Learn More",
    ctaUrl: "/services",
    order: 1,
  },
  {
    _type: "ministry",
    title: "Teachings",
    slug: { _type: "slug", current: "teachings" },
    description:
      "Grounded in the Word of God, our teachings equip you for daily living and spiritual growth.",
    icon: "book",
    ctaText: "Learn More",
    ctaUrl: "/sermons",
    order: 2,
  },
  {
    _type: "ministry",
    title: "Outreach",
    slug: { _type: "slug", current: "outreach" },
    description:
      "Impacting communities and nations through missions, charity, and the gospel of Jesus Christ.",
    icon: "globe",
    ctaText: "Learn More",
    ctaUrl: "/charity",
    order: 3,
  },
  {
    _type: "ministry",
    title: "Community",
    slug: { _type: "slug", current: "community" },
    description:
      "A family of believers connected by love, supporting one another through every season of life.",
    icon: "userGroup",
    ctaText: "Learn More",
    ctaUrl: "/contact",
    order: 4,
  },
];

// ── Charity / Outreach Programs (6 for /charity page) ────────────────────────
const charityPrograms = [
  {
    _type: "charityProgram",
    title: "Gospel Crusades",
    slug: { _type: "slug", current: "gospel-crusades" },
    description:
      "Large-scale evangelistic events preaching Christ and restoring hope across East Africa and beyond.",
    icon: "globe",
    gridSpan: "sm:col-span-2 sm:row-span-2",
    longDescription: [
      "Gospel Crusades are the heartbeat of Enjiri Center Ministries International's evangelistic mission. Under the leadership of Evangelist Peter Kalagi, these large-scale events draw thousands of people together to hear the life-transforming message of Jesus Christ.",
      "Our crusades are organized across cities and villages in Uganda and East Africa, bringing the gospel to communities that may have never experienced such gatherings. These events feature powerful preaching, worship, and prayer, creating an atmosphere where lives are changed and hope is restored.",
      "Beyond the main events, our crusade teams work alongside local churches to ensure that new believers are discipled and integrated into faith communities. Every crusade is preceded by weeks of prayer and community engagement, ensuring lasting spiritual fruit.",
    ].join("\n\n"),
    highlights: [
      { _key: "h1", title: "City-Wide Evangelism", description: "Organizing crusades that reach entire cities with the gospel, partnering with local churches for maximum impact." },
      { _key: "h2", title: "Prayer & Healing Services", description: "Every crusade features dedicated prayer sessions where the sick are prayed for and lives are transformed by God's power." },
      { _key: "h3", title: "Follow-Up Discipleship", description: "New believers are connected to local churches and discipleship programs to continue their faith journey." },
      { _key: "h4", title: "Worship & Praise", description: "Powerful worship sessions led by anointed teams that create an atmosphere of God's presence and spiritual breakthrough." },
      { _key: "h5", title: "Community Partnership", description: "Working with local church leaders and communities to prepare for crusades and sustain the spiritual harvest." },
    ],
    scripture: {
      text: "And He said unto them, go ye into all the world and preach the gospel to every creature.",
      reference: "Mark 16:15",
    },
    ctaTitle: "Support Gospel Crusades",
    ctaDescription:
      "Your partnership helps us bring the gospel to unreached communities across East Africa. Every contribution funds event logistics, travel, and follow-up discipleship.",
    order: 1,
  },
  {
    _type: "charityProgram",
    title: "Revival Prayer Summits",
    slug: { _type: "slug", current: "revival-prayer-summits" },
    description:
      "Organized prayer gatherings and revival meetings that bring spiritual renewal and hope to communities.",
    icon: "sparkles",
    gridSpan: "",
    longDescription: [
      "Revival Prayer Summits are powerful gatherings where believers come together for extended periods of prayer, worship, and seeking God's face. These summits are designed to ignite spiritual renewal in individuals and entire communities.",
      "Enjiri Center Ministries International believes that lasting transformation begins on our knees. Our prayer summits bring together pastors, church leaders, and congregants from across denominations, creating a unified cry for revival across the nation.",
      "These gatherings often span multiple days, featuring intense intercession, prophetic worship, and teaching on prayer. Many participants testify of personal breakthroughs, restored relationships, and a deeper hunger for God that transforms their churches and communities.",
    ].join("\n\n"),
    highlights: [
      { _key: "h1", title: "Extended Intercession", description: "Multi-day prayer sessions dedicated to interceding for the nation, communities, and personal breakthroughs." },
      { _key: "h2", title: "Cross-Denominational Unity", description: "Bringing together believers from different churches and denominations to pray with one voice." },
      { _key: "h3", title: "Prophetic Worship", description: "Worship-led prayer sessions that create an atmosphere for God to move and speak to His people." },
      { _key: "h4", title: "Leadership Prayer", description: "Specific prayer tracks for pastors and church leaders to be refreshed and empowered for ministry." },
    ],
    scripture: {
      text: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.",
      reference: "2 Chronicles 7:14",
    },
    ctaTitle: "Support Prayer Summits",
    ctaDescription:
      "Help us organize prayer summits that ignite revival across East Africa. Your support covers venue costs, logistics, and outreach to communities.",
    order: 2,
  },
  {
    _type: "charityProgram",
    title: "Community Outreach",
    slug: { _type: "slug", current: "community-outreach" },
    description:
      "Reaching underserved communities with practical support, meeting needs in different locations across Uganda.",
    icon: "heart",
    gridSpan: "",
    longDescription: [
      "Community Outreach is at the heart of how Enjiri Center Ministries International demonstrates the love of Christ through action. We believe that the gospel is not only preached with words but demonstrated through acts of love, compassion, and service.",
      "Our outreach programs target underserved communities across Uganda, providing practical support such as food distribution, clothing donations, medical assistance, and educational supplies. We go to where the need is greatest — from urban slums to remote villages.",
      "Each outreach event is an opportunity to share both physical and spiritual nourishment. As we meet practical needs, we also share the hope of the gospel, pray for the sick, and connect people with local churches for ongoing support.",
    ].join("\n\n"),
    highlights: [
      { _key: "h1", title: "Food Distribution", description: "Providing meals and food packages to families and individuals in need across communities in Uganda." },
      { _key: "h2", title: "Hospital & School Visits", description: "Visiting the sick in hospitals, orphans, and students — sharing practical love and the message of hope." },
      { _key: "h3", title: "Clothing & Supplies", description: "Distributing clothing, educational supplies, and essential items to those who need them most." },
      { _key: "h4", title: "Prayer & Spiritual Care", description: "Every outreach includes prayer for the community, sharing the gospel, and connecting people with local churches." },
      { _key: "h5", title: "Rural Community Access", description: "Reaching remote villages that often lack basic services, bringing both practical help and spiritual hope." },
    ],
    scripture: {
      text: "Now that you have purified yourselves by obeying the truth so that you have sincere love for each other, love one another deeply, from the heart.",
      reference: "1 Peter 1:22",
    },
    ctaTitle: "Support Community Outreach",
    ctaDescription:
      "Your generosity enables us to reach more communities with practical help and the love of Christ. Every gift makes a difference in someone's life.",
    order: 3,
  },
  {
    _type: "charityProgram",
    title: "Community Dinners",
    slug: { _type: "slug", current: "community-dinners" },
    description:
      "Hosting communal meals that bring people together, foster fellowship, and provide nourishment to those in need.",
    icon: "userGroup",
    gridSpan: "",
    longDescription: [
      "Community Dinners are a beautiful expression of hospitality and fellowship that lie at the core of our ministry. Inspired by the early church's practice of breaking bread together, these gatherings bring people from all walks of life to share a meal and experience community.",
      "We organize regular communal meals in various locations across Uganda, creating spaces where the hungry are fed, the lonely find companionship, and the hopeless discover that they are valued and loved. These dinners serve both a physical and spiritual purpose.",
      "Beyond nourishment, our community dinners are opportunities for relationship building, testimony sharing, and prayer. Many people have come to know Christ through the simple act of being invited to share a meal with brothers and sisters in faith.",
    ].join("\n\n"),
    highlights: [
      { _key: "h1", title: "Communal Fellowship", description: "Creating warm, welcoming spaces where people from all backgrounds can share a meal and build relationships." },
      { _key: "h2", title: "Feeding the Hungry", description: "Providing nutritious meals to those who struggle with food insecurity, ensuring no one goes hungry." },
      { _key: "h3", title: "Gospel Sharing", description: "Each dinner includes a brief message of hope, prayer, and an invitation to know Christ personally." },
      { _key: "h4", title: "Volunteer Mobilization", description: "Engaging church members and community volunteers to serve together, building unity through service." },
    ],
    scripture: {
      text: "They broke bread in their homes and ate together with glad and sincere hearts, praising God and enjoying the favor of all the people.",
      reference: "Acts 2:46-47",
    },
    ctaTitle: "Support Community Dinners",
    ctaDescription:
      "Help us continue to feed the hungry and bring people together around the table. Your support provides meals, supplies, and venue costs for our dinners.",
    order: 4,
  },
  {
    _type: "charityProgram",
    title: "Capacity Building & Discipleship",
    slug: { _type: "slug", current: "capacity-building-discipleship" },
    description:
      "Equipping believers through discipleship trainings, leadership development, and Miracle Bible College programs.",
    icon: "academicCap",
    gridSpan: "sm:col-span-2",
    longDescription: [
      "Capacity Building & Discipleship is our commitment to equipping the next generation of believers and leaders for effective ministry. Through structured programs, trainings, and mentorship, we invest in people who will continue to spread the gospel and serve their communities.",
      "Our flagship program, Miracle Bible College, provides accessible theological education to pastors, church leaders, and aspiring ministers. The curriculum covers biblical studies, ministry skills, leadership development, and practical theology — all grounded in a deep love for God's Word.",
      "Beyond formal education, we run regular discipleship trainings, mentorship groups, and leadership workshops. These programs are designed to strengthen believers in their faith, develop their gifts, and send them out as equipped workers for God's harvest.",
    ].join("\n\n"),
    highlights: [
      { _key: "h1", title: "Miracle Bible College", description: "Providing accessible theological education to pastors, church leaders, and aspiring ministers across East Africa." },
      { _key: "h2", title: "Leadership Development", description: "Structured workshops and mentorship programs that develop the next generation of church and community leaders." },
      { _key: "h3", title: "Discipleship Training", description: "Regular training sessions that help believers grow in their faith, understand Scripture, and live out their calling." },
      { _key: "h4", title: "Ministry Skills", description: "Practical training in evangelism, counseling, worship leadership, and community engagement for effective ministry." },
      { _key: "h5", title: "Mentorship Programs", description: "Pairing experienced leaders with emerging ministers for personal guidance, accountability, and growth." },
    ],
    scripture: {
      text: "And the things that thou hast heard of me among many witnesses, the same commit thou to faithful men, who shall be able to teach others also.",
      reference: "2 Timothy 2:2",
    },
    ctaTitle: "Support Discipleship Programs",
    ctaDescription:
      "Invest in the future of ministry by supporting our training and discipleship programs. Your giving helps equip leaders who will reach nations.",
    order: 5,
  },
  {
    _type: "charityProgram",
    title: "Women's Summit — My Legacy",
    slug: { _type: "slug", current: "womens-summit" },
    description:
      "Annual women's summit empowering women of faith through teaching, fellowship, and spiritual growth.",
    icon: "star",
    gridSpan: "",
    longDescription: [
      "The Women's Summit — My Legacy is an annual gathering that celebrates, empowers, and equips women of faith. This signature event brings together women from across Uganda and East Africa for a transformative experience of worship, teaching, and sisterhood.",
      "Under the theme 'My Legacy,' the summit encourages women to discover their God-given purpose, develop their gifts, and leave a lasting impact in their families, churches, and communities. Speakers include anointed women leaders, pastors, and professionals who share from Scripture and personal experience.",
      "The summit features dynamic worship sessions, breakout workshops, panel discussions, and times of prayer and ministry. It is a safe space where women can be transparent, receive healing, and be launched into a new season of purpose and impact.",
    ].join("\n\n"),
    highlights: [
      { _key: "h1", title: "Worship & Ministry", description: "Anointed worship sessions and prayer ministry that bring healing, freedom, and spiritual refreshment." },
      { _key: "h2", title: "Empowerment Teaching", description: "Dynamic messages from women leaders that inspire purpose, boldness, and a deeper walk with God." },
      { _key: "h3", title: "Breakout Workshops", description: "Practical workshops on leadership, entrepreneurship, marriage, parenting, and spiritual growth." },
      { _key: "h4", title: "Sisterhood & Fellowship", description: "Building lasting connections among women of faith who support, encourage, and uplift one another." },
    ],
    scripture: {
      text: "Charm is deceptive, and beauty is fleeting; but a woman who fears the Lord is to be praised.",
      reference: "Proverbs 31:30",
    },
    ctaTitle: "Support the Women's Summit",
    ctaDescription:
      "Help us empower women across East Africa through the My Legacy summit. Your support funds venue, speakers, and scholarships for women who cannot afford to attend.",
    order: 6,
  },
];

async function seed() {
  console.log("Seeding Sanity...\n");

  // ── 1. Delete existing ministries ─────────────────────────────────────────
  const existingMinistries = await client.fetch(
    '*[_type == "ministry"]{ _id }'
  );
  if (existingMinistries.length > 0) {
    console.log(`Deleting ${existingMinistries.length} existing ministry docs...`);
    const tx = client.transaction();
    for (const doc of existingMinistries) {
      tx.delete(doc._id);
    }
    await tx.commit();
    console.log("Deleted.\n");
  }

  // ── 2. Delete existing charity programs ────────────────────────────────────
  const existingPrograms = await client.fetch(
    '*[_type == "charityProgram"]{ _id }'
  );
  if (existingPrograms.length > 0) {
    console.log(
      `Deleting ${existingPrograms.length} existing charityProgram docs...`
    );
    const tx = client.transaction();
    for (const doc of existingPrograms) {
      tx.delete(doc._id);
    }
    await tx.commit();
    console.log("Deleted.\n");
  }

  // ── 3. Create ministries ──────────────────────────────────────────────────
  console.log("Creating 4 ministry documents...");
  const mTx = client.transaction();
  for (const m of ministries) {
    mTx.create(m);
  }
  await mTx.commit();
  console.log("Ministries created.\n");

  // ── 4. Create charity programs ────────────────────────────────────────────
  console.log("Creating 6 charityProgram documents...");
  const cpTx = client.transaction();
  for (const cp of charityPrograms) {
    cpTx.create(cp);
  }
  await cpTx.commit();
  console.log("Charity programs created.\n");

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

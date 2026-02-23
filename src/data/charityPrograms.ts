import { IconType } from "react-icons";
import {
  HiHeart,
  HiGlobe,
  HiUserGroup,
  HiSparkles,
  HiStar,
  HiAcademicCap,
} from "react-icons/hi";

export interface CharityProgram {
  slug: string;
  icon: IconType;
  title: string;
  description: string;
  image: string;
  span: string;
  heroImage: string;
  longDescription: string[];
  aboutImage: string;
  gallery: string[];
  highlights: { title: string; description: string }[];
  scripture: { text: string; reference: string };
  ctaTitle: string;
  ctaDescription: string;
}

export const charityPrograms: CharityProgram[] = [
  {
    slug: "gospel-crusades",
    icon: HiGlobe,
    title: "Gospel Crusades",
    description:
      "Large-scale evangelistic events preaching Christ and restoring hope across East Africa and beyond.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=70",
    span: "sm:col-span-2 sm:row-span-2",
    heroImage:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80",
    longDescription: [
      "Gospel Crusades are the heartbeat of Enjiri Center Ministries International's evangelistic mission. Under the leadership of Evangelist Peter Kalagi, these large-scale events draw thousands of people together to hear the life-transforming message of Jesus Christ.",
      "Our crusades are organized across cities and villages in Uganda and East Africa, bringing the gospel to communities that may have never experienced such gatherings. These events feature powerful preaching, worship, and prayer, creating an atmosphere where lives are changed and hope is restored.",
      "Beyond the main events, our crusade teams work alongside local churches to ensure that new believers are discipled and integrated into faith communities. Every crusade is preceded by weeks of prayer and community engagement, ensuring lasting spiritual fruit.",
    ],
    aboutImage:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=70",
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=70",
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600&q=70",
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=70",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=70",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&q=70",
    ],
    highlights: [
      {
        title: "City-Wide Evangelism",
        description:
          "Organizing crusades that reach entire cities with the gospel, partnering with local churches for maximum impact.",
      },
      {
        title: "Prayer & Healing Services",
        description:
          "Every crusade features dedicated prayer sessions where the sick are prayed for and lives are transformed by God's power.",
      },
      {
        title: "Follow-Up Discipleship",
        description:
          "New believers are connected to local churches and discipleship programs to continue their faith journey.",
      },
      {
        title: "Worship & Praise",
        description:
          "Powerful worship sessions led by anointed teams that create an atmosphere of God's presence and spiritual breakthrough.",
      },
      {
        title: "Community Partnership",
        description:
          "Working with local church leaders and communities to prepare for crusades and sustain the spiritual harvest.",
      },
    ],
    scripture: {
      text: "And He said unto them, go ye into all the world and preach the gospel to every creature.",
      reference: "Mark 16:15",
    },
    ctaTitle: "Support Gospel Crusades",
    ctaDescription:
      "Your partnership helps us bring the gospel to unreached communities across East Africa. Every contribution funds event logistics, travel, and follow-up discipleship.",
  },
  {
    slug: "revival-prayer-summits",
    icon: HiSparkles,
    title: "Revival Prayer Summits",
    description:
      "Organized prayer gatherings and revival meetings that bring spiritual renewal and hope to communities.",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=70",
    span: "",
    heroImage:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80",
    longDescription: [
      "Revival Prayer Summits are powerful gatherings where believers come together for extended periods of prayer, worship, and seeking God's face. These summits are designed to ignite spiritual renewal in individuals and entire communities.",
      "Enjiri Center Ministries International believes that lasting transformation begins on our knees. Our prayer summits bring together pastors, church leaders, and congregants from across denominations, creating a unified cry for revival across the nation.",
      "These gatherings often span multiple days, featuring intense intercession, prophetic worship, and teaching on prayer. Many participants testify of personal breakthroughs, restored relationships, and a deeper hunger for God that transforms their churches and communities.",
    ],
    aboutImage:
      "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=70",
      "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=600&q=70",
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600&q=70",
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=70",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=70",
    ],
    highlights: [
      {
        title: "Extended Intercession",
        description:
          "Multi-day prayer sessions dedicated to interceding for the nation, communities, and personal breakthroughs.",
      },
      {
        title: "Cross-Denominational Unity",
        description:
          "Bringing together believers from different churches and denominations to pray with one voice.",
      },
      {
        title: "Prophetic Worship",
        description:
          "Worship-led prayer sessions that create an atmosphere for God to move and speak to His people.",
      },
      {
        title: "Leadership Prayer",
        description:
          "Specific prayer tracks for pastors and church leaders to be refreshed and empowered for ministry.",
      },
    ],
    scripture: {
      text: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.",
      reference: "2 Chronicles 7:14",
    },
    ctaTitle: "Support Prayer Summits",
    ctaDescription:
      "Help us organize prayer summits that ignite revival across East Africa. Your support covers venue costs, logistics, and outreach to communities.",
  },
  {
    slug: "community-outreach",
    icon: HiHeart,
    title: "Community Outreach",
    description:
      "Reaching underserved communities with practical support, meeting needs in different locations across Uganda.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=70",
    span: "",
    heroImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80",
    longDescription: [
      "Community Outreach is at the heart of how Enjiri Center Ministries International demonstrates the love of Christ through action. We believe that the gospel is not only preached with words but demonstrated through acts of love, compassion, and service.",
      "Our outreach programs target underserved communities across Uganda, providing practical support such as food distribution, clothing donations, medical assistance, and educational supplies. We go to where the need is greatest — from urban slums to remote villages.",
      "Each outreach event is an opportunity to share both physical and spiritual nourishment. As we meet practical needs, we also share the hope of the gospel, pray for the sick, and connect people with local churches for ongoing support.",
    ],
    aboutImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=70",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=70",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=70",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=70",
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&q=70",
    ],
    highlights: [
      {
        title: "Food Distribution",
        description:
          "Providing meals and food packages to families and individuals in need across communities in Uganda.",
      },
      {
        title: "Hospital & School Visits",
        description:
          "Visiting the sick in hospitals, orphans, and students — sharing practical love and the message of hope.",
      },
      {
        title: "Clothing & Supplies",
        description:
          "Distributing clothing, educational supplies, and essential items to those who need them most.",
      },
      {
        title: "Prayer & Spiritual Care",
        description:
          "Every outreach includes prayer for the community, sharing the gospel, and connecting people with local churches.",
      },
      {
        title: "Rural Community Access",
        description:
          "Reaching remote villages that often lack basic services, bringing both practical help and spiritual hope.",
      },
    ],
    scripture: {
      text: "Now that you have purified yourselves by obeying the truth so that you have sincere love for each other, love one another deeply, from the heart.",
      reference: "1 Peter 1:22",
    },
    ctaTitle: "Support Community Outreach",
    ctaDescription:
      "Your generosity enables us to reach more communities with practical help and the love of Christ. Every gift makes a difference in someone's life.",
  },
  {
    slug: "community-dinners",
    icon: HiUserGroup,
    title: "Community Dinners",
    description:
      "Hosting communal meals that bring people together, foster fellowship, and provide nourishment to those in need.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=70",
    span: "",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    longDescription: [
      "Community Dinners are a beautiful expression of hospitality and fellowship that lie at the core of our ministry. Inspired by the early church's practice of breaking bread together, these gatherings bring people from all walks of life to share a meal and experience community.",
      "We organize regular communal meals in various locations across Uganda, creating spaces where the hungry are fed, the lonely find companionship, and the hopeless discover that they are valued and loved. These dinners serve both a physical and spiritual purpose.",
      "Beyond nourishment, our community dinners are opportunities for relationship building, testimony sharing, and prayer. Many people have come to know Christ through the simple act of being invited to share a meal with brothers and sisters in faith.",
    ],
    aboutImage:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=70",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=70",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=70",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=70",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70",
    ],
    highlights: [
      {
        title: "Communal Fellowship",
        description:
          "Creating warm, welcoming spaces where people from all backgrounds can share a meal and build relationships.",
      },
      {
        title: "Feeding the Hungry",
        description:
          "Providing nutritious meals to those who struggle with food insecurity, ensuring no one goes hungry.",
      },
      {
        title: "Gospel Sharing",
        description:
          "Each dinner includes a brief message of hope, prayer, and an invitation to know Christ personally.",
      },
      {
        title: "Volunteer Mobilization",
        description:
          "Engaging church members and community volunteers to serve together, building unity through service.",
      },
    ],
    scripture: {
      text: "They broke bread in their homes and ate together with glad and sincere hearts, praising God and enjoying the favor of all the people.",
      reference: "Acts 2:46-47",
    },
    ctaTitle: "Support Community Dinners",
    ctaDescription:
      "Help us continue to feed the hungry and bring people together around the table. Your support provides meals, supplies, and venue costs for our dinners.",
  },
  {
    slug: "capacity-building-discipleship",
    icon: HiAcademicCap,
    title: "Capacity Building & Discipleship",
    description:
      "Equipping believers through discipleship trainings, leadership development, and Miracle Bible College programs.",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=70",
    span: "sm:col-span-2",
    heroImage:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80",
    longDescription: [
      "Capacity Building & Discipleship is our commitment to equipping the next generation of believers and leaders for effective ministry. Through structured programs, trainings, and mentorship, we invest in people who will continue to spread the gospel and serve their communities.",
      "Our flagship program, Miracle Bible College, provides accessible theological education to pastors, church leaders, and aspiring ministers. The curriculum covers biblical studies, ministry skills, leadership development, and practical theology — all grounded in a deep love for God's Word.",
      "Beyond formal education, we run regular discipleship trainings, mentorship groups, and leadership workshops. These programs are designed to strengthen believers in their faith, develop their gifts, and send them out as equipped workers for God's harvest.",
    ],
    aboutImage:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=70",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=70",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=70",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=70",
    ],
    highlights: [
      {
        title: "Miracle Bible College",
        description:
          "Providing accessible theological education to pastors, church leaders, and aspiring ministers across East Africa.",
      },
      {
        title: "Leadership Development",
        description:
          "Structured workshops and mentorship programs that develop the next generation of church and community leaders.",
      },
      {
        title: "Discipleship Training",
        description:
          "Regular training sessions that help believers grow in their faith, understand Scripture, and live out their calling.",
      },
      {
        title: "Ministry Skills",
        description:
          "Practical training in evangelism, counseling, worship leadership, and community engagement for effective ministry.",
      },
      {
        title: "Mentorship Programs",
        description:
          "Pairing experienced leaders with emerging ministers for personal guidance, accountability, and growth.",
      },
    ],
    scripture: {
      text: "And the things that thou hast heard of me among many witnesses, the same commit thou to faithful men, who shall be able to teach others also.",
      reference: "2 Timothy 2:2",
    },
    ctaTitle: "Support Discipleship Programs",
    ctaDescription:
      "Invest in the future of ministry by supporting our training and discipleship programs. Your giving helps equip leaders who will reach nations.",
  },
  {
    slug: "womens-summit",
    icon: HiStar,
    title: "Women's Summit — My Legacy",
    description:
      "Annual women's summit empowering women of faith through teaching, fellowship, and spiritual growth.",
    image:
      "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600&q=70",
    span: "",
    heroImage:
      "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=1200&q=80",
    longDescription: [
      "The Women's Summit — My Legacy is an annual gathering that celebrates, empowers, and equips women of faith. This signature event brings together women from across Uganda and East Africa for a transformative experience of worship, teaching, and sisterhood.",
      "Under the theme 'My Legacy,' the summit encourages women to discover their God-given purpose, develop their gifts, and leave a lasting impact in their families, churches, and communities. Speakers include anointed women leaders, pastors, and professionals who share from Scripture and personal experience.",
      "The summit features dynamic worship sessions, breakout workshops, panel discussions, and times of prayer and ministry. It is a safe space where women can be transparent, receive healing, and be launched into a new season of purpose and impact.",
    ],
    aboutImage:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600&q=70",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=70",
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&q=70",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=70",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=70",
    ],
    highlights: [
      {
        title: "Worship & Ministry",
        description:
          "Anointed worship sessions and prayer ministry that bring healing, freedom, and spiritual refreshment.",
      },
      {
        title: "Empowerment Teaching",
        description:
          "Dynamic messages from women leaders that inspire purpose, boldness, and a deeper walk with God.",
      },
      {
        title: "Breakout Workshops",
        description:
          "Practical workshops on leadership, entrepreneurship, marriage, parenting, and spiritual growth.",
      },
      {
        title: "Sisterhood & Fellowship",
        description:
          "Building lasting connections among women of faith who support, encourage, and uplift one another.",
      },
    ],
    scripture: {
      text: "Charm is deceptive, and beauty is fleeting; but a woman who fears the Lord is to be praised.",
      reference: "Proverbs 31:30",
    },
    ctaTitle: "Support the Women's Summit",
    ctaDescription:
      "Help us empower women across East Africa through the My Legacy summit. Your support funds venue, speakers, and scholarships for women who cannot afford to attend.",
  },
];

export function getProgramBySlug(slug: string): CharityProgram | undefined {
  return charityPrograms.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return charityPrograms.map((p) => p.slug);
}

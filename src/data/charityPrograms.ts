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
      "https://cdn.sanity.io/images/shcw5txc/production/e4baa1e0a5b3d6d1ac60be1e81b03f9e512aa58e-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
    span: "sm:col-span-2 sm:row-span-2",
    heroImage:
      "https://cdn.sanity.io/images/shcw5txc/production/e4baa1e0a5b3d6d1ac60be1e81b03f9e512aa58e-3508x2480.jpg?w=1200&q=80&fm=webp&fit=crop",
    longDescription: [
      "Gospel Crusades are the heartbeat of Enjiri Center Ministries International's evangelistic mission. Under the leadership of Evangelist Peter Kalagi, these large-scale events draw thousands of people together to hear the life-transforming message of Jesus Christ.",
      "Our crusades are organized across cities and villages in Uganda and East Africa, bringing the gospel to communities that may have never experienced such gatherings. These events feature powerful preaching, worship, and prayer, creating an atmosphere where lives are changed and hope is restored.",
      "Beyond the main events, our crusade teams work alongside local churches to ensure that new believers are discipled and integrated into faith communities. Every crusade is preceded by weeks of prayer and community engagement, ensuring lasting spiritual fruit.",
    ],
    aboutImage:
      "https://cdn.sanity.io/images/shcw5txc/production/a9eb84be8ca4b5fd282eaca02789c439b01a6f55-4000x6000.jpg?w=800&q=80&fm=webp&fit=crop",
    gallery: [
      "https://cdn.sanity.io/images/shcw5txc/production/e4baa1e0a5b3d6d1ac60be1e81b03f9e512aa58e-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/a9eb84be8ca4b5fd282eaca02789c439b01a6f55-4000x6000.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/95925a5125bd0c15009c393c655ea99bc31d9a05-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/168a13614469e2c48babeb394973f9356e741e12-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/83f76adf2c3c11aa1065f1bdc4d328eb69d0bef4-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/997d1dbd81869e428c2097f381f067796dacd937-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
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
      "https://cdn.sanity.io/images/shcw5txc/production/168a13614469e2c48babeb394973f9356e741e12-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
    span: "",
    heroImage:
      "https://cdn.sanity.io/images/shcw5txc/production/168a13614469e2c48babeb394973f9356e741e12-3508x2480.jpg?w=1200&q=80&fm=webp&fit=crop",
    longDescription: [
      "Revival Prayer Summits are powerful gatherings where believers come together for extended periods of prayer, worship, and seeking God's face. These summits are designed to ignite spiritual renewal in individuals and entire communities.",
      "Enjiri Center Ministries International believes that lasting transformation begins on our knees. Our prayer summits bring together pastors, church leaders, and congregants from across denominations, creating a unified cry for revival across the nation.",
      "These gatherings often span multiple days, featuring intense intercession, prophetic worship, and teaching on prayer. Many participants testify of personal breakthroughs, restored relationships, and a deeper hunger for God that transforms their churches and communities.",
    ],
    aboutImage:
      "https://cdn.sanity.io/images/shcw5txc/production/14e519858d8961e071fd34dc3fb0d0c85e20ac84-1890x1417.jpg?w=800&q=80&fm=webp&fit=crop",
    gallery: [
      "https://cdn.sanity.io/images/shcw5txc/production/168a13614469e2c48babeb394973f9356e741e12-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/14e519858d8961e071fd34dc3fb0d0c85e20ac84-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/95925a5125bd0c15009c393c655ea99bc31d9a05-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/a9eb84be8ca4b5fd282eaca02789c439b01a6f55-4000x6000.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/83f76adf2c3c11aa1065f1bdc4d328eb69d0bef4-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
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
      "https://cdn.sanity.io/images/shcw5txc/production/a892dcb0583d50ec1482ed9443ca6741840ac4d8-3318x2480.jpg?w=600&q=80&fm=webp&fit=crop",
    span: "",
    heroImage:
      "https://cdn.sanity.io/images/shcw5txc/production/a892dcb0583d50ec1482ed9443ca6741840ac4d8-3318x2480.jpg?w=1200&q=80&fm=webp&fit=crop",
    longDescription: [
      "Community Outreach is at the heart of how Enjiri Center Ministries International demonstrates the love of Christ through action. We believe that the gospel is not only preached with words but demonstrated through acts of love, compassion, and service.",
      "Our outreach programs target underserved communities across Uganda, providing practical support such as food distribution, clothing donations, medical assistance, and educational supplies. We go to where the need is greatest — from urban slums to remote villages.",
      "Each outreach event is an opportunity to share both physical and spiritual nourishment. As we meet practical needs, we also share the hope of the gospel, pray for the sick, and connect people with local churches for ongoing support.",
    ],
    aboutImage:
      "https://cdn.sanity.io/images/shcw5txc/production/0eb438e79a3d8db672b409d7761b4477df23d549-1890x1417.jpg?w=800&q=80&fm=webp&fit=crop",
    gallery: [
      "https://cdn.sanity.io/images/shcw5txc/production/a892dcb0583d50ec1482ed9443ca6741840ac4d8-3318x2480.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/0eb438e79a3d8db672b409d7761b4477df23d549-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/a5531ae1eb800418ed9aa839bbd726e6b872e982-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/7af02c1fe9ba39271e8ba9c9d97f2ae8871b2732-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/afdab6a2aa4dfa8d3874752b3e86ea3d4e0633b8-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
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
      "https://cdn.sanity.io/images/shcw5txc/production/cfebaa48374a9e505d13c8600ba52f621c2c427a-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
    span: "",
    heroImage:
      "https://cdn.sanity.io/images/shcw5txc/production/cfebaa48374a9e505d13c8600ba52f621c2c427a-3508x2480.jpg?w=1200&q=80&fm=webp&fit=crop",
    longDescription: [
      "Community Dinners are a beautiful expression of hospitality and fellowship that lie at the core of our ministry. Inspired by the early church's practice of breaking bread together, these gatherings bring people from all walks of life to share a meal and experience community.",
      "We organize regular communal meals in various locations across Uganda, creating spaces where the hungry are fed, the lonely find companionship, and the hopeless discover that they are valued and loved. These dinners serve both a physical and spiritual purpose.",
      "Beyond nourishment, our community dinners are opportunities for relationship building, testimony sharing, and prayer. Many people have come to know Christ through the simple act of being invited to share a meal with brothers and sisters in faith.",
    ],
    aboutImage:
      "https://cdn.sanity.io/images/shcw5txc/production/39abf7cc391750f087b0715de6175de9ad2b6b93-1890x1417.jpg?w=800&q=80&fm=webp&fit=crop",
    gallery: [
      "https://cdn.sanity.io/images/shcw5txc/production/cfebaa48374a9e505d13c8600ba52f621c2c427a-3508x2480.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/39abf7cc391750f087b0715de6175de9ad2b6b93-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/b1a5cd3212031b047ac35b287fe4c6ae5b6a6024-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/bd2638db2711d9f2d7bedcc3eae4e00518b88eff-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/cefe4ad8be7bb268c477b23c6951f5ebdbc9a553-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
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
      "https://cdn.sanity.io/images/shcw5txc/production/0b80b0ed2146db8a13b12c7ce14b5bd242bb620f-1920x1277.jpg?w=600&q=80&fm=webp&fit=crop",
    span: "sm:col-span-2",
    heroImage:
      "https://cdn.sanity.io/images/shcw5txc/production/0b80b0ed2146db8a13b12c7ce14b5bd242bb620f-1920x1277.jpg?w=1200&q=80&fm=webp&fit=crop",
    longDescription: [
      "Capacity Building & Discipleship is our commitment to equipping the next generation of believers and leaders for effective ministry. Through structured programs, trainings, and mentorship, we invest in people who will continue to spread the gospel and serve their communities.",
      "Our flagship program, Miracle Bible College, provides accessible theological education to pastors, church leaders, and aspiring ministers. The curriculum covers biblical studies, ministry skills, leadership development, and practical theology — all grounded in a deep love for God's Word.",
      "Beyond formal education, we run regular discipleship trainings, mentorship groups, and leadership workshops. These programs are designed to strengthen believers in their faith, develop their gifts, and send them out as equipped workers for God's harvest.",
    ],
    aboutImage:
      "https://cdn.sanity.io/images/shcw5txc/production/1a6e00769235fb5556e8689588116bcdd2671d43-1890x1417.jpg?w=800&q=80&fm=webp&fit=crop",
    gallery: [
      "https://cdn.sanity.io/images/shcw5txc/production/0b80b0ed2146db8a13b12c7ce14b5bd242bb620f-1920x1277.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/1a6e00769235fb5556e8689588116bcdd2671d43-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/d003cb1ca2fd7a22874b749fd3b61109cb04bc9a-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/da77298bed64270937136e77b50baf19232647bb-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/e1a23a98f0f6e3daa3d1798ec511e204e6b58a8c-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
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
      "https://cdn.sanity.io/images/shcw5txc/production/b072120f4cdc087f191dfb0765d83d15729abed6-1920x1280.jpg?w=600&q=80&fm=webp&fit=crop",
    span: "",
    heroImage:
      "https://cdn.sanity.io/images/shcw5txc/production/b072120f4cdc087f191dfb0765d83d15729abed6-1920x1280.jpg?w=1200&q=80&fm=webp&fit=crop",
    longDescription: [
      "The Women's Summit — My Legacy is an annual gathering that celebrates, empowers, and equips women of faith. This signature event brings together women from across Uganda and East Africa for a transformative experience of worship, teaching, and sisterhood.",
      "Under the theme 'My Legacy,' the summit encourages women to discover their God-given purpose, develop their gifts, and leave a lasting impact in their families, churches, and communities. Speakers include anointed women leaders, pastors, and professionals who share from Scripture and personal experience.",
      "The summit features dynamic worship sessions, breakout workshops, panel discussions, and times of prayer and ministry. It is a safe space where women can be transparent, receive healing, and be launched into a new season of purpose and impact.",
    ],
    aboutImage:
      "https://cdn.sanity.io/images/shcw5txc/production/487cb7f990d9a8d0e10fab5a98e4b1e7b93106cc-1890x1417.jpg?w=800&q=80&fm=webp&fit=crop",
    gallery: [
      "https://cdn.sanity.io/images/shcw5txc/production/b072120f4cdc087f191dfb0765d83d15729abed6-1920x1280.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/487cb7f990d9a8d0e10fab5a98e4b1e7b93106cc-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/e6021d4b8a256e8e3c0437cc3c578437402e19e0-1890x1417.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/0f26c8fbb0343655dad3a9f646705f288a62caff-1730x1148.jpg?w=600&q=80&fm=webp&fit=crop",
      "https://cdn.sanity.io/images/shcw5txc/production/584610b2f592b556d68d99058e951402ec80f023-1730x1148.jpg?w=600&q=80&fm=webp&fit=crop",
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

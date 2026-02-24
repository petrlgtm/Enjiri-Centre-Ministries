import { groq } from "next-sanity";

// Shared image fragment for consistent image querying
const imageFields = `
  asset->{ _id, url, metadata { lqip, dimensions } },
  alt,
  hotspot,
  crop
`;

// Sermons
export const allSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    speaker,
    series,
    description,
    videoUrl,
    audioUrl,
    thumbnail { ${imageFields} },
    tags
  }
`;

export const sermonBySlugQuery = groq`
  *[_type == "sermon" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    speaker,
    series,
    description,
    videoUrl,
    audioUrl,
    thumbnail { ${imageFields} },
    tags,
    body
  }
`;

export const latestSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    date,
    speaker,
    series,
    thumbnail { ${imageFields} }
  }
`;

// Events
export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    description,
    image { ${imageFields} },
    isRecurring,
    featured,
    category,
    rsvpUrl
  }
`;

export const homepageEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    description,
    image { ${imageFields} },
    isRecurring,
    featured,
    category
  }
`;

export const latestEventsQuery = groq`
  *[_type == "event"] | order(date desc) [0...3] {
    _id,
    title,
    date,
    location,
    description,
    image { ${imageFields} }
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    description,
    body,
    image { ${imageFields} },
    isRecurring,
    category,
    rsvpUrl
  }
`;

// Leaders
export const allLeadersQuery = groq`
  *[_type == "leader"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    featured,
    image { ${imageFields} }
  }
`;

export const featuredLeaderQuery = groq`
  *[_type == "leader" && featured == true] | order(order asc) [0] {
    _id,
    name,
    role,
    bio,
    image { ${imageFields} }
  }
`;

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    churchName,
    tagline,
    description,
    logo { ${imageFields} },
    heroImage { ${imageFields} },
    address,
    phone,
    email,
    socialLinks,
    serviceSchedule
  }
`;

// Testimonies
export const allTestimoniesQuery = groq`
  *[_type == "testimony"] | order(order asc) {
    _id,
    quote,
    name,
    role,
    image { ${imageFields} }
  }
`;

// Ministries
export const allMinistriesQuery = groq`
  *[_type == "ministry"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    image { ${imageFields} },
    ctaText,
    ctaUrl
  }
`;

// Charity / Outreach Programs
export const allCharityProgramsQuery = groq`
  *[_type == "charityProgram"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    gridSpan,
    image { ${imageFields} }
  }
`;

export const charityProgramBySlugQuery = groq`
  *[_type == "charityProgram" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    heroImage { ${imageFields} },
    aboutImage { ${imageFields} },
    longDescription,
    gallery[] { ${imageFields} },
    highlights[] { title, description },
    scripture { text, reference },
    ctaTitle,
    ctaDescription
  }
`;

// Events with category (for filtering)
export const upcomingEventsWithCategoryQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    description,
    image { ${imageFields} },
    isRecurring,
    category,
    rsvpUrl
  }
`;

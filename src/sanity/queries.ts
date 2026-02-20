import { groq } from "next-sanity";

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
    thumbnail,
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
    thumbnail,
    tags
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
    thumbnail
  }
`;

// Events
export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    date,
    endDate,
    location,
    description,
    image,
    isRecurring
  }
`;

export const latestEventsQuery = groq`
  *[_type == "event"] | order(date desc) [0...3] {
    _id,
    title,
    date,
    location,
    description,
    image
  }
`;

// Leaders
export const allLeadersQuery = groq`
  *[_type == "leader"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    image
  }
`;

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    churchName,
    tagline,
    description,
    logo,
    heroImage,
    address,
    phone,
    email,
    socialLinks,
    serviceSchedule
  }
`;

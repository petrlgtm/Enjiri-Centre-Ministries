import { groq } from "next-sanity";

// ── Shared fragments ──────────────────────────────────────────────

const imageFields = `
  asset->{ _id, url, metadata { lqip, dimensions } },
  alt,
  hotspot,
  crop
`;

const seoFields = `
  seo {
    seoTitle,
    seoDescription,
    seoImage { ${imageFields} }
  }
`;

// ── Sermons ──────────────────────────────────────────────────────

export const allSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    speaker->{ _id, name, role, image { ${imageFields} } },
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
    speaker->{ _id, name, role, image { ${imageFields} } },
    series,
    description,
    videoUrl,
    audioUrl,
    thumbnail { ${imageFields} },
    tags,
    body,
    ${seoFields}
  }
`;

export const latestSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    date,
    speaker->{ _id, name },
    series,
    thumbnail { ${imageFields} }
  }
`;

// ── Events ──────────────────────────────────────────────────────

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
    rsvpUrl,
    ${seoFields}
  }
`;

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

// ── Leaders ──────────────────────────────────────────────────────

export const allLeadersQuery = groq`
  *[_type == "leader"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    email,
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

// ── Site Settings ────────────────────────────────────────────────

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
    socialLinks {
      facebook,
      youtube,
      instagram,
      twitter,
      tiktok
    },
    serviceSchedule[] {
      day,
      time,
      serviceName
    }
  }
`;

// ── Testimonies ──────────────────────────────────────────────────

export const allTestimoniesQuery = groq`
  *[_type == "testimony"] | order(order asc) {
    _id,
    quote,
    name,
    role,
    featured,
    image { ${imageFields} }
  }
`;

// ── Ministries ──────────────────────────────────────────────────

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

// ── Charity / Outreach Programs ─────────────────────────────────

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
    body,
    longDescription,
    gallery[] { ${imageFields} },
    highlights[] { title, description },
    scripture { text, reference },
    ctaTitle,
    ctaDescription,
    ${seoFields}
  }
`;

// ── Blog Posts ──────────────────────────────────────────────────

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    author->{ _id, name, image { ${imageFields} } },
    coverImage { ${imageFields} },
    categories,
    tags,
    featured
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    author->{ _id, name, role, image { ${imageFields} } },
    coverImage { ${imageFields} },
    body,
    categories,
    tags,
    ${seoFields}
  }
`;

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    author->{ _id, name },
    coverImage { ${imageFields} }
  }
`;

// ── Galleries ──────────────────────────────────────────────────

export const allGalleriesQuery = groq`
  *[_type == "gallery"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    coverImage { ${imageFields} },
    "imageCount": count(images),
    category,
    date
  }
`;

export const galleryBySlugQuery = groq`
  *[_type == "gallery" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    coverImage { ${imageFields} },
    images[] {
      image { ${imageFields} },
      alt,
      caption
    },
    category,
    date,
    ${seoFields}
  }
`;

// ── Announcement Banner ─────────────────────────────────────────

export const announcementBannerQuery = groq`
  *[_type == "announcementBanner"][0] {
    enabled,
    message,
    linkText,
    linkUrl,
    style,
    expiresAt
  }
`;

// ── Home Page ──────────────────────────────────────────────────

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeading,
    heroSubheading,
    heroCta { label, url, style },
    heroSecondaryText,
    heroSecondaryUrl,
    snapshotItems[] { label, value },
    missionText,
    visionText,
    donateBandHeading,
    donateBandText,
    ${seoFields}
  }
`;

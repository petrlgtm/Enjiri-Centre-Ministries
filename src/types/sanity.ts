export interface SanityHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
  hotspot?: SanityHotspot;
  crop?: SanityCrop;
}

export interface SEO {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImage;
}

export interface CTA {
  label: string;
  url: string;
  style?: "primary" | "secondary" | "outline";
}

export interface SiteSettings {
  churchName: string;
  tagline?: string;
  logo?: SanityImage;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  serviceSchedule?: Array<{
    day: string;
    time: string;
    serviceName: string;
  }>;
  defaultHeaderImage?: SanityImage;
  sermonsHeaderImage?: SanityImage;
  eventsHeaderImage?: SanityImage;
  charityHeaderImage?: SanityImage;
  blogHeaderImage?: SanityImage;
  donateHeaderImage?: SanityImage;
  contactHeaderImage?: SanityImage;
  venueImage?: SanityImage;
  footerMapImage?: SanityImage;
  globalSeo?: SEO;
}

export interface HomePageData {
  heroHeading?: string;
  heroSubheading?: string;
  heroImages?: SanityImage[];
  heroCta?: CTA;
  heroSecondaryText?: string;
  heroSecondaryUrl?: string;
  snapshotItems?: Array<{ label: string; value: string }>;
  missionText?: string;
  visionText?: string;
  donateBandHeading?: string;
  donateBandText?: string;
  missionValues?: Array<{
    title: string;
    description: string;
    image: SanityImage;
    link?: string;
  }>;
  visitImage?: SanityImage;
  ctaImage?: SanityImage;
  seo?: SEO;
}

export type PortableTextContent = unknown[];

export interface AboutPageData {
  title?: string;
  description?: string;
  headerImage?: SanityImage;
  historyTitle?: string;
  historyText?: PortableTextContent;
  historyImage?: SanityImage;
  historyStats?: Array<{ label: string; value: number; suffix?: string }>;
  timeline?: Array<{ year: string; title: string; description: string }>;
  vision?: { text: string; scripture?: string };
  mission?: { text: string; scripture?: string };
  commission?: { text: string; scripture?: string };
  statementOfFaith?: { text: string; beliefs: string[] };
  coreValues?: Array<{ title: string; description: string }>;
  seo?: SEO;
}

export interface ServicesPageData {
  title?: string;
  description?: string;
  headerImage?: SanityImage;
  scheduleHeading?: string;
  eventsHeading?: string;
  seo?: SEO;
}

export interface SermonsPageData {
  title?: string;
  description?: string;
  headerImage?: SanityImage;
  featuredLabel?: string;
  seo?: SEO;
}

export interface ContactPageData {
  title?: string;
  description?: string;
  headerImage?: SanityImage;
  formHeading?: string;
  infoHeading?: string;
  mapUrl?: string;
  seo?: SEO;
}

export interface DonatePageData {
  title?: string;
  description?: string;
  headerImage?: SanityImage;
  content?: PortableTextContent;
  waysToGiveHeading?: string;
  seo?: SEO;
}

export interface GalleryPageData {
  title?: string;
  description?: string;
  headerImage?: SanityImage;
  seo?: SEO;
}

export interface BlogPageData {
  title?: string;
  description?: string;
  headerImage?: SanityImage;
  seo?: SEO;
}

export interface CharityPageData {
  title?: string;
  description?: string;
  headerImage?: SanityImage;
  seo?: SEO;
}

export interface Event {
  _id: string;
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  location?: string;
  description?: string;
  image?: SanityImage;
  isRecurring?: boolean;
  featured?: boolean;
  category?: string;
  rsvpUrl?: string;
  tags?: string[];
  seo?: SEO;
}

export interface Sermon {
  _id: string;
  title: string;
  slug: string;
  date: string;
  speaker?: Leader;
  series?: string;
  description?: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnail?: SanityImage;
  tags?: string[];
  body?: PortableTextContent;
  seo?: SEO;
}

export interface Leader {
  _id: string;
  name: string;
  slug?: string;
  role: string;
  bio?: string;
  email?: string;
  featured?: boolean;
  image?: SanityImage;
  seo?: SEO;
}

export interface Testimony {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  featured?: boolean;
  image?: SanityImage;
}

export interface Ministry {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: SanityImage;
  ctaText?: string;
  ctaUrl?: string;
  seo?: SEO;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author?: Leader;
  publishedAt: string;
  excerpt?: string;
  coverImage?: SanityImage;
  body?: PortableTextContent;
  categories?: string[];
  tags?: string[];
  featured?: boolean;
  seo?: SEO;
}

export interface Gallery {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: SanityImage;
  images?: Array<{
    image: SanityImage;
    alt?: string;
    caption?: string;
  }>;
  imageCount?: number;
  category?: string;
  date?: string;
  seo?: SEO;
}

export interface CharityProgram {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  gridSpan?: string;
  image?: SanityImage;
  heroImage?: SanityImage;
  aboutImage?: SanityImage;
  body?: PortableTextContent;
  gallery?: SanityImage[];
  highlights?: Array<{ title: string; description: string }>;
  scripture?: { text: string; reference: string };
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: SEO;
}

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
  hotspot?: any;
  crop?: any;
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
  globalSeo?: SEO;
}

export interface HomePageData {
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: SanityImage;
  heroCta?: CTA;
  heroSecondaryText?: string;
  heroSecondaryUrl?: string;
  snapshotItems?: Array<{ label: string; value: string }>;
  missionText?: string;
  visionText?: string;
  donateBandHeading?: string;
  donateBandText?: string;
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
  body?: any;
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
  body?: any;
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
  body?: any;
  gallery?: SanityImage[];
  highlights?: Array<{ title: string; description: string }>;
  scripture?: { text: string; reference: string };
  ctaTitle?: string;
  ctaDescription?: string;
  seo?: SEO;
}

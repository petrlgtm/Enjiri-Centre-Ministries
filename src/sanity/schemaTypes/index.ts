// Object types
import seo from "./objects/seo";
import portableText from "./objects/portableText";
import cta from "./objects/cta";
import socialLinks from "./objects/socialLinks";
import serviceScheduleItem from "./objects/serviceScheduleItem";
import galleryImage from "./objects/galleryImage";
import highlight from "./objects/highlight";
import scripture from "./objects/scripture";

// Document types
import sermon from "./documents/sermon";
import event from "./documents/event";
import leader from "./documents/leader";
import testimony from "./documents/testimony";
import ministry from "./documents/ministry";
import charityProgram from "./documents/charityProgram";
import blogPost from "./documents/blogPost";
import gallery from "./documents/gallery";

// Singleton types
import siteSettings from "./singletons/siteSettings";
import announcementBanner from "./singletons/announcementBanner";
import homePage from "./singletons/homePage";

export const schemaTypes = [
  // Objects (must be registered before types that reference them)
  seo,
  portableText,
  cta,
  socialLinks,
  serviceScheduleItem,
  galleryImage,
  highlight,
  scripture,

  // Documents
  sermon,
  event,
  leader,
  testimony,
  ministry,
  charityProgram,
  blogPost,
  gallery,

  // Singletons
  siteSettings,
  announcementBanner,
  homePage,
];

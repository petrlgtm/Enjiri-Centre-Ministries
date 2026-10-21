/** Canonical public URL of the site (no trailing slash). Override per environment with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.enjiricenterministries.org").replace(/\/$/, "");

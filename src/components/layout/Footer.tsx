import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import Container from "@/components/ui/Container";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import { urlFor } from "@/sanity/image";
import logoImg from "@/../public/images/logo.jpeg";
import { SanityImage } from "@/types/sanity";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Events" },
  { href: "/charity", label: "Outreach" },
  { href: "/sermons", label: "Sermons" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/donate", label: "Give" },
  { href: "/contact", label: "Contact" },
];

interface FooterProps {
  siteSettings?: {
    logo?: SanityImage;
    tagline?: string;
    footerMapImage?: SanityImage;
    address?: string;
    phone?: string;
    phone2?: string;
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
  } | null;
}

const defaultSocialLinks = [
  { href: "#", icon: FaFacebookF, label: "Facebook" },
  { href: "#", icon: FaYoutube, label: "YouTube" },
  { href: "https://instagram.com/ev_k_peter", icon: FaInstagram, label: "Instagram" },
  { href: "#", icon: FaTiktok, label: "TikTok" },
];

const socialIconMap: Record<string, typeof FaFacebookF> = {
  facebook: FaFacebookF,
  youtube: FaYoutube,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

export default function Footer({ siteSettings }: FooterProps) {
  const socialLinks = siteSettings?.socialLinks
    ? Object.entries(siteSettings.socialLinks)
        .filter(([, url]) => url)
        .map(([key, url]) => ({
          href: url!,
          icon: socialIconMap[key] || FaFacebookF,
          label: key.charAt(0).toUpperCase() + key.slice(1),
        }))
    : defaultSocialLinks;

  const serviceSchedule = siteSettings?.serviceSchedule?.length
    ? siteSettings.serviceSchedule
    : [
        { day: "Sunday", time: "9:00 AM - 12:00 PM", serviceName: "Sunday Worship" },
        { day: "Wednesday", time: "6:00 PM - 8:00 PM", serviceName: "Wednesday Bible Study" },
        { day: "Friday", time: "6:00 PM - 8:00 PM", serviceName: "Friday Prayer" },
      ];

  const footerLogo = siteSettings?.logo ? urlFor(siteSettings.logo).width(100).url() : logoImg;

  return (
    <footer className="relative flow-root bg-white text-cream-heading">
      <NewsletterSignup />

      <Container className="pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden">
                <Image src={footerLogo} alt="Enjiri Center Ministries International" fill className="object-cover" sizes="48px" />
              </span>
              <span>
                <span className="block text-[15px] font-bold tracking-wide">ENJIRI CENTER</span>
                <span className="block text-xs font-medium tracking-[0.25em] text-gold-dark">MINISTRIES INTL</span>
              </span>
            </Link>
            <p className="mt-6 font-display text-xl font-semibold text-cream-heading">
              {siteSettings?.tagline || "Preaching Christ, Restoring Hope"}
            </p>
            <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-cream-body">
              Raising passionate disciples, transforming communities, and advancing God&apos;s Kingdom with excellence and love.
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center bg-cream text-cream-body transition-colors duration-300 hover:bg-ink hover:text-white"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate — large display links */}
          <nav aria-label="Footer" className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-2xl leading-relaxed transition-colors duration-300 hover:text-gold-dark sm:text-[1.7rem]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">Visit</p>
            <address className="mt-5 space-y-1 text-[15px] not-italic leading-relaxed text-cream-body">
              <span className="block">{siteSettings?.address || "Maggwa Third-Lane, Jinja, Uganda"}</span>
              <span className="block">{siteSettings?.phone || "+256 742 735 862"}</span>
              <span className="block">{siteSettings?.phone2 || "+256 781 573 536"}</span>
              <span className="block">{siteSettings?.email || "enjiricenter@gmail.com"}</span>
            </address>
            <ul className="mt-6 space-y-3">
              {serviceSchedule.map((service) => (
                <li key={service.serviceName} className="grid grid-cols-[3rem_1fr] gap-2 text-sm">
                  <span className="font-mono text-xs tracking-[0.15em] text-gold-dark uppercase">{service.day.slice(0, 3)}</span>
                  <span>
                    <span className="block text-cream-heading">{service.serviceName}</span>
                    <span className="block font-mono text-xs text-cream-muted">{service.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 text-xs text-cream-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Enjiri Center Ministries International. All rights reserved.</p>
          <p className="font-mono tracking-wider">Built with faith and excellence</p>
        </div>
      </Container>
    </footer>
  );
}

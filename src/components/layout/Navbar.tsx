"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatEventAnnouncement, getNextServiceOccurrence } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnnouncementBanner, { BannerSlide } from "./AnnouncementBanner";
import logoImg from "@/../public/images/logo.jpeg";
import { Event } from "@/types/sanity";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Events" },
  { href: "/charity", label: "Outreach" },
  { href: "/sermons", label: "Sermons" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaInstagram, href: "https://instagram.com/ev_k_peter", label: "Instagram" },
  { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
];

interface NavbarProps {
  banner?: {
    enabled: boolean;
    message: string;
    linkText?: string;
    linkUrl?: string;
    style?: "info" | "warning" | "celebration";
    expiresAt?: string;
  } | null;
  events?: Event[] | null;
  serviceSchedule?: Array<{
    day: string;
    time: string;
    serviceName: string;
  }> | null;
}

export default function Navbar({ banner, events, serviceSchedule }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  // The home hero is white: use dark ink on the transparent bar until the page scrolls.
  const onLight = pathname === "/" && !scrolled && !isOpen;

  const slides = useMemo(() => {
    const s: (BannerSlide & { sortDate: Date })[] = [];
    
    // 1. Add manual banner if active (highest priority, fixed date)
    if (banner?.enabled && banner.message) {
      const isExpired = banner.expiresAt && new Date(banner.expiresAt) < new Date();
      if (!isExpired) {
        s.push({
          id: "manual",
          message: banner.message,
          linkText: banner.linkText,
          linkUrl: banner.linkUrl || "#",
          style: banner.style || "info",
          sortDate: new Date(0) // Show first
        });
      }
    }

    // 2. Add upcoming events
    if (events && events.length > 0) {
      events.forEach((event) => {
        const timeInfo = formatEventAnnouncement(event.date);
        s.push({
          id: event._id,
          message: `Special Event: ${event.title} — ${timeInfo}`,
          linkText: "View Event",
          linkUrl: `/services/${event.slug}`,
          style: event.featured ? "celebration" : "info",
          sortDate: new Date(event.date)
        });
      });
    }

    // 3. Add regular services
    if (serviceSchedule && serviceSchedule.length > 0) {
      serviceSchedule.forEach((service, idx) => {
        const nextOccurrence = getNextServiceOccurrence(service.day, service.time);
        const timeInfo = formatEventAnnouncement(nextOccurrence.toISOString());
        
        s.push({
          id: `service-${idx}`,
          message: `Weekly Service: ${service.serviceName} — ${timeInfo}`,
          linkText: "Service Details",
          linkUrl: `/services`,
          style: "info",
          sortDate: nextOccurrence
        });
      });
    }

    // Sort all by date and take the top 5
    return s
      .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())
      .slice(0, 5)
      .map(({ sortDate, ...slide }) => slide);
  }, [banner, events, serviceSchedule]);

  const showBanner = slides.length > 0 && bannerVisible;

  // Close mobile nav when route changes
  useEffect(() => {
    queueMicrotask(() => setIsOpen(false));
  }, [pathname]);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY.current;

    setScrolled(currentY > 30);

    // Hide while scrolling down, reveal on any scroll up; ignore tiny jitters.
    if (Math.abs(delta) < 6) return;
    setHidden(delta > 0 && currentY > 160);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        initial={false}
        animate={{ y: hidden && !isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {showBanner && (
          <AnnouncementBanner
            slides={slides}
            onDismiss={() => setBannerVisible(false)}
          />
        )}
        
        {/* Main Navbar — transparent bar, logo left, frosted link panel right with a dark "Give" end-cap */}
        <nav
          className={cn(
            "relative transition-colors duration-700",
            scrolled ? "bg-navy/95 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl" : "bg-transparent"
          )}
        >
          <Container>
            <div className="flex h-20 items-center justify-between gap-6 lg:h-24">
              {/* Logo */}
              <Link href="/" className="group relative flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  <Image src={logoImg} alt="Enjiri Center Ministries International" fill className="object-cover" sizes="44px" />
                </div>
                <div className="hidden sm:block">
                  <span className={cn("block text-[15px] font-bold tracking-wide transition-colors duration-500", onLight ? "text-cream-heading" : "text-white")}>
                    ENJIRI CENTER
                  </span>
                  <span className={cn("block text-[10px] font-medium tracking-[0.25em] transition-colors duration-500", onLight ? "text-gold-dark" : "text-gold/80")}>
                    MINISTRIES INTL
                  </span>
                </div>
              </Link>

              {/* Link panel */}
              <div className="flex items-stretch overflow-hidden rounded-[3px] bg-white/95 shadow-[0_10px_34px_-10px_rgba(10,10,10,0.45)] ring-1 ring-black/10 backdrop-blur-xl backdrop-saturate-150">
                <ul className="hidden items-center lg:flex">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "relative block px-3.5 py-4 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 xl:px-4",
                            isActive ? "text-gold-dark" : "text-cream-heading/80 hover:text-cream-heading"
                          )}
                        >
                          {link.label}
                          {isActive && (
                            <motion.span
                              layoutId="nav-indicator"
                              className="absolute right-3.5 bottom-2.5 left-3.5 h-px bg-gold-dark xl:right-4 xl:left-4"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href="/donate"
                  className="flex items-center bg-navy px-4 py-3.5 font-mono sm:px-5 text-[11px] tracking-[0.12em] text-white uppercase transition-colors duration-300 hover:bg-navy-surface hover:text-gold-light"
                >
                  Give<span className="hidden sm:inline">&nbsp;Online</span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative z-50 flex w-12 items-center justify-center text-cream-heading transition-colors duration-300 hover:bg-black/5 lg:hidden"
                  aria-label="Toggle menu"
                  aria-expanded={isOpen}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isOpen ? (
                      <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <HiX size={20} />
                      </motion.span>
                    ) : (
                      <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <HiMenuAlt3 size={20} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </Container>
        </nav>
        {/* Social Links Bar — only visible on homepage */}
        {pathname === "/" && (
          <div className={cn("relative", isOpen && "hidden")}>
            <div className={cn("border-y transition-colors duration-700", onLight ? "border-black/6 bg-white" : "border-white/8 bg-navy-light/95 backdrop-blur-md")}>
              <Container>
                <div className="flex h-10 items-center justify-between">
                  <span className={cn("hidden min-[360px]:inline font-mono text-[11px] uppercase tracking-[0.2em]", onLight ? "text-cream-muted" : "text-white/45")}>
                    Follow us
                  </span>
                  <div className="flex items-center gap-1 min-[360px]:gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={cn("flex h-8 w-8 items-center justify-center transition-colors duration-200", onLight ? "text-cream-body hover:text-gold-dark" : "text-white/60 hover:text-gold")}
                      >
                        <social.icon size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              </Container>
            </div>
          </div>
        )}
      </motion.div>

      {/* Mobile Full-Screen Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy/[0.98]" />
            <div className="noise-overlay absolute inset-0" />

            {/* Nav Content */}
            <div className="relative flex h-full flex-col items-center justify-center px-8">
              <nav className="flex flex-col items-center gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{
                        delay: 0.1 + 0.06 * i,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group relative block py-2.5 text-center font-display text-2xl font-medium transition-all duration-300",
                          isActive ? "text-gold" : "text-foreground/60 hover:text-foreground"
                        )}
                      >
                        <span className="mr-3 inline-block font-sans text-xs font-medium text-gold/30 transition-colors duration-300 group-hover:text-gold/60">
                          0{i + 1}
                        </span>
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active"
                            className="absolute -right-6 top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-gold"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10"
                >
                  <Button
                    href="/donate"
                    variant="primary"
                    size="lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Give Online
                  </Button>
                </motion.div>
              </nav>

              {/* Service Times */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-12 flex items-center gap-4 text-[12px] tracking-widest text-foreground/40"
              >
                <span>SUN 9AM</span>
                <span className="h-3 w-px bg-white/10" />
                <span>WED 6PM</span>
                <span className="h-3 w-px bg-white/10" />
                <span>FRI 6PM</span>
              </motion.div>

              {/* Bottom decorative cross */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-12 flex items-center gap-3"
              >
                <span className="h-px w-12 bg-gold/20" />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="text-gold/20"
                  aria-hidden="true"
                >
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="5" y1="8" x2="19" y2="8" />
                </svg>
                <span className="h-px w-12 bg-gold/20" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

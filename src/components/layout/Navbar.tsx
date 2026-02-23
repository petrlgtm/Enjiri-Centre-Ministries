"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import logoImg from "@/../public/images/logo.jpeg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Events" },
  { href: "/charity", label: "Outreach" },
  { href: "/sermons", label: "Sermons" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaInstagram, href: "https://instagram.com/ev_k_peter", label: "Instagram" },
  { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  // Close mobile nav when route changes — use microtask to satisfy react-hooks/set-state-in-effect
  useEffect(() => {
    queueMicrotask(() => setIsOpen(false));
  }, [pathname]);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const isScrolled = currentY > 30;

    setScrolled(isScrolled);

    if (currentY > 200 && currentY > lastScrollY.current) {
      setHidden(true);
    } else if (currentY < lastScrollY.current) {
      setHidden(false);
    }

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
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: hidden && !isOpen ? -100 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled
            ? "bg-navy/90 shadow-premium backdrop-blur-2xl backdrop-saturate-[1.8] border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between lg:h-24">
            {/* Logo */}
            <Link href="/" className="group relative flex items-center gap-3">
              <div className="logo-glow relative h-11 w-11 overflow-hidden rounded-xl shadow-lg shadow-gold/20 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={logoImg}
                  alt="Enjiri Center Ministries International"
                  fill
                  className="object-cover"
                  sizes="44px"
                />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>
              <div className="hidden sm:block">
                <span className="block text-[15px] font-bold tracking-wide text-foreground transition-colors duration-500">
                  ENJIRI CENTER
                </span>
                <span className="block text-[10px] font-medium tracking-[0.25em] text-gold/80 transition-colors duration-500">
                  MINISTRIES INTL
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={cn(
                      "relative px-4 py-2 text-[13px] font-medium uppercase tracking-[0.1em] transition-all duration-300",
                      isActive
                        ? "text-gold"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    {/* Hover background pill */}
                    {hoveredLink === link.href && !isActive && (
                      <motion.span
                        layoutId="nav-hover-bg"
                        className="absolute inset-0 rounded-xl bg-white/[0.06]"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-gold-light"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}
              <div className="ml-5 pl-5 border-l border-white/10 transition-colors duration-500">
                <div className="btn-magnetic">
                  <Button href="/donate" variant="primary" size="sm">
                    Give Online
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "relative z-50 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 lg:hidden",
                isOpen
                  ? "bg-white/10 text-foreground"
                  : "text-foreground hover:bg-white/10"
              )}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <HiX size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <HiMenuAlt3 size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </motion.nav>

      {/* Social Links Bar — hidden on home page (Hero covers viewport) */}
      <motion.div
        initial={{ y: -100 }}
        animate={{
          y: hidden && !isOpen ? -100 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-[80px] lg:top-[96px] left-0 right-0 z-[49] transition-all duration-700"
      >
        <div className="bg-cream border-b border-black/[0.06]">
          <Container>
            <div className="flex h-10 items-center justify-between">
              <span className="hidden min-[360px]:inline text-[12px] font-medium tracking-wide text-cream-muted">
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
                    className="flex h-8 w-8 items-center justify-center rounded-full text-cream-body transition-all duration-200 hover:bg-gold-dark/10 hover:text-gold-dark"
                  >
                    <social.icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </motion.div>

      {/* Mobile Full-Screen Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop with mesh gradient */}
            <div className="absolute inset-0 bg-navy/[0.98]" />
            <div className="absolute inset-0 mesh-gradient opacity-50" />
            <div className="noise-overlay absolute inset-0" />

            {/* Floating decorative orbs */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.08, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-gold to-transparent"
              style={{ filter: "blur(80px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.05, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-gold to-transparent"
              style={{ filter: "blur(60px)" }}
            />

            {/* Nav Content */}
            <div className="relative flex h-full flex-col items-center justify-center px-8">
              <nav className="flex flex-col items-center gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                      transition={{
                        delay: 0.08 * i,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group relative block py-3 text-center font-[family-name:var(--font-playfair)] text-4xl font-medium transition-all duration-300",
                          isActive ? "text-gold" : "text-foreground/60 hover:text-foreground"
                        )}
                      >
                        {/* Number prefix */}
                        <span className="mr-3 inline-block font-sans text-xs font-medium text-gold/30 transition-colors duration-300 group-hover:text-gold/60">
                          0{i + 1}
                        </span>
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active"
                            className="absolute -right-6 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
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
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-12 flex items-center gap-4 text-[12px] tracking-[0.1em] text-foreground/40"
              >
                <span>SUN 9AM</span>
                <span className="h-3 w-px bg-white/10" />
                <span>WED 6PM</span>
                <span className="h-3 w-px bg-white/10" />
                <span>FRI 6PM</span>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 flex items-center gap-3"
              >
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.65 + i * 0.05, type: "spring", bounce: 0.5 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground/40 transition-all duration-300 hover:border-gold/30 hover:text-gold hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                  >
                    <social.icon size={14} />
                  </motion.a>
                ))}
              </motion.div>

              {/* Bottom decorative elements */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-12 flex items-center gap-3"
              >
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/30" />
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
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/30" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

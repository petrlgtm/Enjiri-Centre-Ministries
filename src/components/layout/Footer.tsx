"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import Container from "@/components/ui/Container";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import logoImg from "@/../public/images/logo.jpeg";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/charity", label: "Charity" },
  { href: "/sermons", label: "Sermons" },
  { href: "/donate", label: "Give" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "#",
    icon: FaFacebookF,
    label: "Facebook",
    hoverColor: "hover:bg-[#1877F2]/15 hover:text-[#1877F2] hover:border-[#1877F2]/30",
  },
  {
    href: "#",
    icon: FaYoutube,
    label: "YouTube",
    hoverColor: "hover:bg-[#FF0000]/15 hover:text-[#FF0000] hover:border-[#FF0000]/30",
  },
  {
    href: "https://instagram.com/ev_k_peter",
    icon: FaInstagram,
    label: "Instagram",
    hoverColor: "hover:bg-[#E4405F]/15 hover:text-[#E4405F] hover:border-[#E4405F]/30",
  },
  {
    href: "#",
    icon: FaTiktok,
    label: "TikTok",
    hoverColor: "hover:bg-[#00f2ea]/15 hover:text-[#00f2ea] hover:border-[#00f2ea]/30",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(196,125,42,0.12),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(201,168,76,0.10),transparent_50%)]" />
      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Main footer */}
      <div className="relative bg-navy">
        {/* Subtle noise */}
        <div className="noise-overlay absolute inset-0" />
        {/* Subtle blob decoration */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] opacity-[0.02]">
          <div className="morph-blob h-full w-full bg-gradient-to-bl from-gold to-transparent" />
        </div>

        <Container className="relative py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="group inline-flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl shadow-[0_2px_12px_rgba(201,168,76,0.3)] transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={logoImg}
                    alt="Enjiri Center Ministries International"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </div>
                <div>
                  <span className="block text-[15px] font-bold tracking-wide text-foreground">
                    ENJIRI CENTER
                  </span>
                  <span className="block text-[10px] font-medium tracking-[0.25em] text-gold/60">
                    MINISTRIES INTL
                  </span>
                </div>
              </Link>
              <p className="mt-5 max-w-xs text-[0.9rem] leading-[1.75] text-foreground/70">
                Reaching the world with the love of Christ through worship,
                outreach, and service to our communities.
              </p>

              {/* Social Links */}
              <div className="mt-6 flex gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-foreground/60 transition-all duration-300 hover:scale-110 ${social.hoverColor}`}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                Navigate
              </h3>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="underline-draw inline-block text-[0.9rem] text-foreground/70 transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                Contact
              </h3>
              <ul className="mt-5 space-y-4">
                <li className="group flex items-start gap-3">
                  <HiLocationMarker
                    className="mt-0.5 shrink-0 text-gold/40 transition-colors duration-300 group-hover:text-gold/70"
                    size={16}
                  />
                  <span className="text-[0.9rem] leading-relaxed text-foreground/60 transition-colors duration-300 group-hover:text-foreground/70">
                    Kampala, Uganda
                  </span>
                </li>
                <li className="group flex items-center gap-3">
                  <HiPhone className="shrink-0 text-gold/40 transition-colors duration-300 group-hover:text-gold/70" size={16} />
                  <span className="text-[0.9rem] text-foreground/60 transition-colors duration-300 group-hover:text-foreground/70">
                    +256 779 226290
                  </span>
                </li>
                <li className="group flex items-center gap-3">
                  <HiMail className="shrink-0 text-gold/40 transition-colors duration-300 group-hover:text-gold/70" size={16} />
                  <span className="text-[0.9rem] text-foreground/60 transition-colors duration-300 group-hover:text-foreground/70">
                    info@enjiriministries.org
                  </span>
                </li>
              </ul>

              {/* Static Map Image */}
              <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.06] transition-all duration-500 hover:border-gold/10">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=60"
                  alt="Location"
                  width={300}
                  height={150}
                  className="w-full object-cover opacity-30 transition-all duration-500 hover:opacity-50 hover:scale-105"
                />
              </div>
            </div>

            {/* Service Times */}
            <div className="lg:col-span-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                Service Times
              </h3>
              <ul className="mt-5 space-y-4">
                {[
                  { day: "Sunday Worship", time: "9:00 AM - 12:00 PM" },
                  { day: "Wednesday Bible Study", time: "6:00 PM - 8:00 PM" },
                  { day: "Friday Prayer", time: "6:00 PM - 8:00 PM" },
                ].map((service) => (
                  <li
                    key={service.day}
                    className="group border-l-2 border-gold/20 pl-4 transition-all duration-300 hover:border-gold/50"
                  >
                    <span className="block text-[0.85rem] font-medium text-foreground/70 transition-colors duration-300 group-hover:text-foreground/70">
                      {service.day}
                    </span>
                    <span className="mt-0.5 block text-[0.8rem] text-foreground/70 transition-colors duration-300 group-hover:text-gold/50">
                      {service.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.04]">
          <Container>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row"
            >
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <p className="text-[0.8rem] text-foreground/60">
                  &copy; {new Date().getFullYear()} Enjiri Center Ministries
                  International. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="/privacy"
                    className="underline-draw inline-block text-[0.75rem] text-foreground/60 transition-colors hover:text-gold"
                  >
                    Privacy Policy
                  </Link>
                  <span className="text-[0.75rem] text-foreground/10">&middot;</span>
                  <Link
                    href="/terms"
                    className="underline-draw inline-block text-[0.75rem] text-foreground/60 transition-colors hover:text-gold"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-gold/20" />
                <p className="text-[0.75rem] text-foreground/30">
                  Built with faith and excellence
                </p>
                <span className="h-px w-6 bg-gold/20" />
              </div>
            </motion.div>
          </Container>
        </div>
      </div>
    </footer>
  );
}

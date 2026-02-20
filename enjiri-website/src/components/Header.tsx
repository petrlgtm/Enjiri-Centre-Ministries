"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ScrollProgress from "@/components/ScrollProgress";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-dark/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <Image
                src="/logo.jpeg"
                alt="Enjiri Center Logo"
                width={48}
                height={48}
                className="rounded-full ring-2 ring-gold/20 transition-all duration-300 group-hover:ring-gold/50"
              />
              <div className="absolute -inset-1 rounded-full bg-gold/10 opacity-0 blur transition-opacity group-hover:opacity-100" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-xl font-bold tracking-[0.15em] gold-gradient-text">
                ENJIRI
              </span>
              <span className="ml-2 font-heading text-lg font-light tracking-[0.15em] text-white/90">
                CENTER
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-hover relative px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                {/* Expand-from-center underline */}
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gold transition-all duration-300 ${
                    pathname === link.href ? "w-5" : "w-0"
                  }`}
                  style={{ transition: "width 0.3s ease" }}
                />
                {/* Hover underline expands from center */}
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gold/50 transition-all duration-300 group-hover:w-full peer-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/donate"
              className="ml-4 rounded-full bg-gold/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-gold ring-1 ring-gold/20 transition-all duration-300 hover:bg-gold hover:text-maroon-dark hover:shadow-[0_0_20px_rgba(255,199,44,0.3)]"
            >
              Give
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={`h-[2px] w-full rounded-full bg-gold transition-all duration-300 ${
                  isOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full rounded-full bg-gold transition-all duration-300 ${
                  isOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full rounded-full bg-gold transition-all duration-300 ${
                  isOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop glow */}
          <div className="absolute inset-0 bg-dark/95 backdrop-blur-2xl" />
          <div className={`absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/5 blur-[100px] transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`} />

          <nav className="relative flex h-full flex-col items-center justify-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading text-3xl font-light tracking-wider transition-all duration-500 ${
                  isOpen
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-4 scale-95 opacity-0"
                } ${
                  pathname === link.href
                    ? "gold-gradient-text"
                    : "text-white/70 hover:text-white"
                }`}
                style={{ transitionDelay: isOpen ? `${i * 80}ms` : "0ms" }}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className={`mt-4 rounded-full bg-gold px-8 py-3 text-sm font-bold uppercase tracking-wider text-maroon-dark transition-all duration-500 ${
                isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
              }`}
              style={{ transitionDelay: isOpen ? `${navLinks.length * 80}ms` : "0ms" }}
              onClick={closeMenu}
            >
              Donate Now
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

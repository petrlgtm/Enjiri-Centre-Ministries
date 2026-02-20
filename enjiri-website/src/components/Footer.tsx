"use client";

import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

const ministries = [
  "Sunday Worship",
  "Youth Programs",
  "Bible Study",
  "Pastoral Counseling",
  "Community Outreach",
  "Prayer Ministry",
];

export default function Footer() {
  return (
    <footer className="relative bg-maroon-deep border-t border-white/5">
      {/* Animated gradient line at top */}
      <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16">
        <SectionReveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Image
                  src="/logo.jpeg"
                  alt="Enjiri Center"
                  width={44}
                  height={44}
                  className="rounded-full ring-1 ring-gold/20"
                />
                <div>
                  <span className="font-heading text-lg font-bold gold-gradient-text">
                    ENJIRI
                  </span>
                  <span className="ml-1.5 font-heading text-lg font-light text-white/80">
                    CENTER
                  </span>
                </div>
              </div>
              <p className="mb-6 text-sm leading-[1.8] text-white/35">
                Preaching Christ and Restoring Hope through the power of the Holy
                Spirit. Dedicated to spreading the Gospel and transforming lives
                across all nations.
              </p>
              <div className="flex gap-2.5">
                {[
                  { letter: "F", label: "Facebook" },
                  { letter: "Y", label: "YouTube" },
                  { letter: "I", label: "Instagram" },
                  { letter: "T", label: "Twitter" },
                ].map((s) => (
                  <a
                    key={s.letter}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/6 bg-white/3 text-xs font-bold text-white/40 transition-all duration-300 hover:border-gold/25 hover:bg-gold/10 hover:text-gold hover-glow"
                    aria-label={s.label}
                  >
                    {s.letter}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-gold/70">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-gold"
                    >
                      <span className="h-[1px] w-3 bg-white/15 transition-all duration-300 group-hover:w-5 group-hover:bg-gold" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ministries */}
            <div>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-gold/70">
                Our Ministries
              </h4>
              <ul className="space-y-3">
                {ministries.map((m) => (
                  <li key={m}>
                    <span className="group flex items-center gap-2 text-sm text-white/40">
                      <span className="h-[1px] w-3 bg-white/15" />
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Times & Contact */}
            <div>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-gold/70">
                Service Times
              </h4>
              <ul className="mb-6 space-y-3 text-sm text-white/40">
                <li className="flex justify-between">
                  <span>Sunday Worship</span>
                  <span className="text-white/55">9:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Bible Study</span>
                  <span className="text-white/55">Wed 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Youth Service</span>
                  <span className="text-white/55">Fri 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Prayer Meeting</span>
                  <span className="text-white/55">Sat 7:00 AM</span>
                </li>
              </ul>

              <div className="rounded-xl border border-white/5 bg-white/3 p-4">
                <p className="text-xs text-white/30">Contact</p>
                <p className="mt-1 text-sm text-white/50">Kampala, Uganda</p>
                <p className="text-sm text-white/50">info@enjiricenter.org</p>
                <p className="text-sm text-white/50">+256 700 000 000</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Bottom Bar */}
        <SectionReveal delay={200}>
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/5 pt-8 sm:flex-row sm:justify-between">
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} Enjiri Center. All Rights Reserved.
            </p>
            <p className="text-xs text-white/20">
              Preaching Christ in All Nations
            </p>
          </div>
        </SectionReveal>
      </div>
    </footer>
  );
}

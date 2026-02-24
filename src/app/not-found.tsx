"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[120px]" />
      </div>

      <Container className="relative py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-lg"
        >
          {/* Large 404 display */}
          <span className="block font-[family-name:var(--font-playfair)] text-[8rem] font-bold leading-none text-gold/20 md:text-[10rem]">
            404
          </span>

          {/* Cross divider */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold/30" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-gold/40"
              aria-hidden="true"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="5" y1="8" x2="19" y2="8" />
            </svg>
            <span className="h-px w-12 bg-gold/30" />
          </div>

          <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground md:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-foreground/60">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let us guide you back.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/" variant="primary" size="lg">
              Return Home
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>

          {/* Quick links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { href: "/about", label: "About" },
              { href: "/services", label: "Events" },
              { href: "/sermons", label: "Sermons" },
              { href: "/donate", label: "Give" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/40 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

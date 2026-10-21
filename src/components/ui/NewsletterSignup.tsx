"use client";

import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import Container from "@/components/ui/Container";

/** Gold sign-up card that rises out of the footer into the section above it. */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <Container className="relative z-10 -mt-14">
      <div className="grid gap-5 bg-gold px-5 py-7 text-navy shadow-[0_30px_70px_-30px_rgba(10,10,10,0.5)] sm:px-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-70">Stay connected</p>
          <h3 className="mt-2 font-display text-2xl leading-tight font-semibold sm:text-3xl">
            Devotionals, events and sermons in your inbox.
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row lg:col-span-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className="min-w-0 flex-1 bg-white px-5 py-4 text-sm text-cream-heading placeholder:text-cream-muted focus:outline-2 focus:outline-navy"
            required
          />
          <button
            type="submit"
            className="shrink-0 cursor-pointer bg-royal-deep px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-royal"
          >
            {submitted ? (
              <span className="flex items-center gap-2">
                <HiCheck size={16} />
                Subscribed
              </span>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      </div>
    </Container>
  );
}

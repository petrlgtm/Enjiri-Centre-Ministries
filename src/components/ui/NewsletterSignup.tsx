"use client";

import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import Container from "@/components/ui/Container";
import { subscribeToNewsletter } from "@/app/actions";

/** Gold sign-up card that rises out of the footer into the section above it. */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const result = await subscribeToNewsletter({ email, company });
      if (result.ok) {
        setStatus("done");
        setEmail("");
      } else {
        setError(result.error);
        setStatus("error");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <Container className="relative z-10 -mt-14">
      <div className="grid gap-5 bg-gold px-5 py-7 text-navy shadow-[0_30px_70px_-30px_rgba(10,10,10,0.5)] sm:px-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase opacity-70">Stay connected</p>
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
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="hidden"
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "done"}
            className="shrink-0 cursor-pointer bg-ink-deep px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-ink"
          >
            {status === "done" ? (
              <span className="flex items-center gap-2">
                <HiCheck size={16} />
                Subscribed
              </span>
            ) : status === "sending" ? (
              "Subscribing…"
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
        <p aria-live="polite" className="text-sm font-medium lg:col-span-12 lg:-mt-2 lg:text-right empty:hidden">
          {status === "done" ? "Welcome! Check your inbox for a confirmation email." : status === "error" ? error : ""}
        </p>
      </div>
    </Container>
  );
}

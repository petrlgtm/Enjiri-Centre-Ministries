"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiCheck } from "react-icons/hi";
import Container from "@/components/ui/Container";

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
    <div className="relative overflow-hidden border-b border-white/[0.04] bg-navy-light">
      {/* Subtle background accent */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 h-32 w-32 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-24 w-24 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <Container className="relative py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between"
        >
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
                <HiMail className="text-gold" size={20} />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground">
                Stay Connected
              </h3>
            </div>
            <p className="mt-2 max-w-md text-sm text-foreground/60">
              Get weekly devotionals, event updates, and sermon highlights delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-foreground placeholder:text-foreground/25 backdrop-blur-sm transition-all duration-300 focus:border-gold/40 focus:bg-white/[0.06] focus:outline-none"
                required
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="shrink-0 rounded-full bg-gradient-to-r from-gold to-gold-dark px-7 py-3.5 text-sm font-medium text-navy shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,168,76,0.5)] cursor-pointer"
            >
              {submitted ? (
                <span className="flex items-center gap-2">
                  <HiCheck size={16} />
                  Subscribed!
                </span>
              ) : (
                "Subscribe"
              )}
            </motion.button>
          </form>
        </motion.div>
      </Container>
    </div>
  );
}

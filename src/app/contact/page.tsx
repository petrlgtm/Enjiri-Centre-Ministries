"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const contactInfo = [
  { icon: HiLocationMarker, title: "Visit Us", lines: ["Kampala, Uganda"] },
  { icon: HiPhone, title: "Call Us", lines: ["+256 779 226290"] },
  { icon: HiMail, title: "Email Us", lines: ["info@enjiriministries.org"] },
  { icon: HiClock, title: "Service Times", lines: ["Sunday: 9:00 AM - 12:00 PM", "Wednesday: 6:00 PM"] },
];

const socialLinks = [
  { href: "#", icon: FaFacebookF, label: "Facebook" },
  { href: "#", icon: FaYoutube, label: "YouTube" },
  { href: "https://instagram.com/ev_k_peter", icon: FaInstagram, label: "Instagram" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "1e7d627c-d59e-4d36-af7b-b436e42ac810",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full rounded-2xl border border-black/[0.08] bg-white px-4 py-3.5 text-sm text-cream-heading outline-none transition-all duration-300 placeholder:text-cream-muted/60 focus:border-gold-dark focus:bg-white focus:shadow-[0_0_0_3px_rgba(138,109,27,0.1)]";

  return (
    <>
      <PageHeader
        label="Reach Out"
        title="Contact Us"
        description="We'd love to hear from you. Whether you have a question, prayer request, or just want to say hello — reach out!"
      />

      {/* Section 1 — Contact Info + Image (split) */}
      <section className="relative overflow-hidden py-28">
        <Container>
          <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-start lg:gap-16">
            {/* Left — contact info cards in 2x2 grid */}
            <div className="lg:w-5/12">
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group rounded-2xl card-premium border border-white/[0.06] bg-[var(--gray-100)] p-5 transition-all duration-500 hover:ring-1 hover:ring-gold/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold-muted)] text-gold transition-all duration-500 group-hover:scale-110 group-hover:ring-2 group-hover:ring-gold/20">
                      <info.icon size={18} />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-foreground">{info.title}</h3>
                    {info.lines.map((line) => (
                      <p key={line} className="mt-0.5 text-xs leading-relaxed text-[var(--gray-400)]">
                        {line}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — large image panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-7/12"
            >
              <div className="relative h-64 overflow-hidden rounded-3xl lg:h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&q=80&fm=webp&fit=crop"
                  alt="Church location scenery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
                {/* Glassmorphism location card */}
                <div className="absolute inset-x-5 bottom-5 lg:inset-x-6 lg:bottom-6">
                  <div className="glass rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                    <div className="flex items-start gap-3">
                      <HiLocationMarker className="mt-0.5 shrink-0 text-gold" size={20} />
                      <div>
                        <p className="font-medium text-foreground">Our Location</p>
                        <p className="mt-1 text-sm text-foreground/70">
                          Kampala, Uganda
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Section 2 — Form + Social (split, reversed) */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-cream" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-dark/15 to-transparent" />
        <Container className="relative">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
            {/* Left — form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-7/12"
            >
              <SectionHeading
                label="Get in Touch"
                title="Send Us a Message"
                subtitle="Fill out the form and we'll get back to you as soon as possible."
                centered={false}
                onCream
              />

              {/* Form container with gold corner accent */}
              <div className="relative rounded-3xl border border-black/[0.06] bg-white p-8 card-premium">
                {/* Decorative gold corner accent — top-left */}
                <div className="absolute top-0 left-0 h-16 w-16 overflow-hidden rounded-tl-3xl">
                  <div className="absolute -top-px -left-px h-[3px] w-10 rounded-full bg-gradient-to-r from-gold-dark to-transparent" />
                  <div className="absolute -top-px -left-px h-10 w-[3px] rounded-full bg-gradient-to-b from-gold-dark to-transparent" />
                </div>

                {status === "sent" ? (
                  <div className="rounded-2xl border border-gold-dark/20 bg-gold-dark/[0.06] p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-dark/10">
                      <HiMail className="text-gold-dark" size={24} />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-cream-heading">
                      Message Sent!
                    </h3>
                    <p className="mt-2 text-cream-body">
                      Thank you for reaching out. We&apos;ll respond as soon as possible.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-5 text-sm font-medium text-gold-dark underline underline-offset-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-cream-heading">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClasses}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cream-heading">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClasses}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-cream-heading">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={inputClasses}
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-cream-heading">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${inputClasses} resize-none`}
                        placeholder="Your message..."
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-red-500">
                        Something went wrong. Please try again or email us directly at info@enjiriministries.org
                      </p>
                    )}
                    <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right — social + quote */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 lg:w-5/12"
            >
              {/* Follow Us card */}
              <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
                <h3 className="font-bold text-cream-heading">Follow Us</h3>
                <p className="mt-1 text-sm text-cream-muted">
                  Stay connected on social media
                </p>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="icon-breathe flex h-11 w-11 items-center justify-center rounded-xl bg-gold-dark/10 text-cream-body transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-black"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Scripture / encouragement quote card */}
              <div className="rounded-3xl bg-navy p-8 shadow-premium-lg shine">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-gold/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="h-px w-8 bg-gold/40" />
                </div>
                <p className="font-[family-name:var(--font-playfair)] text-lg leading-relaxed text-gold italic">
                  &ldquo;Cast all your anxiety on him because he cares for
                  you.&rdquo;
                </p>
                <p className="mt-3 text-sm text-foreground/50">1 Peter 5:7</p>
                <p className="mt-6 text-sm leading-relaxed text-foreground/70">
                  We are here for you. Do not hesitate to reach out with any
                  prayer requests, questions, or simply to connect with our
                  community.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}

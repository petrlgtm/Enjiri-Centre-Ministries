"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";

const contactInfo = [
  {
    title: "Visit Us",
    detail: "Enjiri Center, Kampala, Uganda",
    sub: "Open for services, counseling, and fellowship",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />,
  },
  {
    title: "Email Us",
    detail: "info@enjiricenter.org",
    sub: "We respond within 24 hours",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
  },
  {
    title: "Call Us",
    detail: "+256 700 000 000",
    sub: "Mon – Sat, 8:00 AM – 6:00 PM",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />,
  },
];

const officeHours = [
  { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "7:00 AM – 2:00 PM" },
  { day: "Sunday", hours: "8:00 AM – 1:00 PM (Services)" },
];

const faqs = [
  { q: "What should I expect on my first visit?", a: "You'll be warmly welcomed by our hospitality team. Service typically lasts 2–3 hours and includes worship, prayer, and preaching. Dress comfortably — all are welcome!" },
  { q: "Do you have children's programs?", a: "Yes! We run Children's Church every Sunday for ages 3–12, with age-appropriate Bible lessons, worship, and activities." },
  { q: "How can I request prayer?", a: "You can submit a prayer request through this contact form, email us, or speak with our pastoral team during office hours or after Sunday services." },
  { q: "Can I volunteer at Enjiri Center?", a: "Absolutely! We have volunteer opportunities in worship, youth ministry, outreach, hospitality, media, and more. Fill out the contact form and select 'Volunteer Interest' as the subject." },
  { q: "Do you offer online services?", a: "Yes, we live-stream our Sunday worship service on YouTube. Subscribe to our channel to join from anywhere in the world." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="Get In Touch"
        description="Whether you have questions, need prayer, want to volunteer, or are looking for a church home — we'd love to hear from you. Your message matters to us."
        image="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=80"
      />

      {/* ── Contact Cards ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="grid gap-6 md:grid-cols-3">
              {contactInfo.map((item) => (
                <TiltCard key={item.title}>
                  <div className="card-premium glass-card flex items-start gap-5 rounded-2xl p-8">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>{item.icon}</svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-heading text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-sm text-white/60">{item.detail}</p>
                      <p className="mt-1 text-xs text-white/30">{item.sub}</p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <SectionReveal className="lg:col-span-3">
              <div className="glass-card overflow-hidden rounded-3xl p-8 sm:p-10">
                <h2 className="mb-2 font-heading text-2xl font-bold text-white">Send Us a Message</h2>
                <p className="mb-8 text-sm text-white/40">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                {submitted ? (
                  <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 animate-fade-in-scale">
                      <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                    <h3 className="mb-3 font-heading text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="max-w-sm text-white/50">Thank you for reaching out. Our team will review your message and respond within 24 hours. God bless you.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-gold hover:text-gold-light">Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">Full Name</label>
                        <input type="text" id="name" required className="w-full rounded-xl border border-white/8 bg-white/3 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-gold/40 focus:bg-white/5" placeholder="John Doe" />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">Email Address</label>
                        <input type="email" id="email" required className="w-full rounded-xl border border-white/8 bg-white/3 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-gold/40 focus:bg-white/5" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">Phone Number</label>
                        <input type="tel" id="phone" className="w-full rounded-xl border border-white/8 bg-white/3 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-gold/40 focus:bg-white/5" placeholder="+256 700 000 000" />
                      </div>
                      <div>
                        <label htmlFor="subject" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">Subject</label>
                        <select id="subject" required className="w-full rounded-xl border border-white/8 bg-white/3 px-5 py-3.5 text-sm text-white outline-none focus:border-gold/40 focus:bg-white/5">
                          <option value="" className="bg-dark-card">Select a topic...</option>
                          <option value="general" className="bg-dark-card">General Inquiry</option>
                          <option value="prayer" className="bg-dark-card">Prayer Request</option>
                          <option value="partnership" className="bg-dark-card">Partnership Opportunity</option>
                          <option value="volunteer" className="bg-dark-card">Volunteer Interest</option>
                          <option value="counseling" className="bg-dark-card">Counseling Request</option>
                          <option value="events" className="bg-dark-card">Event Information</option>
                          <option value="visit" className="bg-dark-card">Planning a Visit</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">Your Message</label>
                      <textarea id="message" rows={5} required className="w-full resize-none rounded-xl border border-white/8 bg-white/3 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-gold/40 focus:bg-white/5" placeholder="Share your thoughts, prayer requests, or questions..." />
                    </div>
                    <button type="submit" className="group relative w-full overflow-hidden rounded-xl bg-gold py-4 text-sm font-bold uppercase tracking-[0.2em] text-maroon-dark transition-all hover:shadow-[0_0_30px_rgba(255,199,44,0.3)]">
                      <span className="relative z-10">Send Message</span>
                      <div className="absolute inset-0 -translate-x-full bg-gold-light transition-transform duration-500 group-hover:translate-x-0" />
                    </button>
                  </form>
                )}
              </div>
            </SectionReveal>

            {/* Sidebar */}
            <SectionReveal delay={150} className="lg:col-span-2">
              <div className="space-y-6">
                {/* Map placeholder */}
                <div className="relative h-64 overflow-hidden rounded-3xl bg-dark-card">
                  <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80" alt="Map view of Kampala" fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center bg-dark/40 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                        <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                      </div>
                      <p className="text-sm font-semibold text-white">Kampala, Uganda</p>
                      <p className="text-xs text-white/50">Enjiri Center</p>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="mb-5 font-heading text-lg font-bold text-gold">Office Hours</h3>
                  <ul className="space-y-3">
                    {officeHours.map((h) => (
                      <li key={h.day} className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{h.day}</span>
                        <span className="font-semibold text-white/80">{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social */}
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="mb-4 font-heading text-lg font-bold text-gold">Follow Us</h3>
                  <p className="mb-4 text-sm text-white/40">Stay connected through our social media channels for daily devotionals, ministry updates, and live service streams.</p>
                  <div className="flex gap-3">
                    {[
                      { letter: "F", label: "Facebook" },
                      { letter: "Y", label: "YouTube" },
                      { letter: "I", label: "Instagram" },
                      { letter: "T", label: "Twitter" },
                    ].map((s) => (
                      <a key={s.letter} href="#" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-xs font-bold text-white/50 transition-all hover:border-gold/30 hover:bg-gold/10 hover:text-gold" aria-label={s.label}>{s.letter}</a>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="relative overflow-hidden bg-dark py-20">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-2xl px-6">
          <SectionReveal>
            <div className="glass-gold rounded-3xl p-10 text-center sm:p-14">
              <h3 className="mb-3 font-heading text-2xl font-bold text-white sm:text-3xl">Stay Updated</h3>
              <p className="mb-8 text-sm text-white/45">Subscribe for weekly devotionals, ministry updates, event announcements, and inspiring testimonies.</p>
              <form className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
                <input type="email" placeholder="Enter your email address" className="flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-gold/40" />
                <button type="submit" className="rounded-xl bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-maroon-dark transition-all hover:bg-gold-light">Subscribe</button>
              </form>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-3xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <h2 className="gold-underline font-heading text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
            </div>
          </SectionReveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <SectionReveal key={faq.q} delay={i * 80}>
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="mb-3 font-heading text-lg font-bold text-white">{faq.q}</h3>
                  <p className="text-sm leading-[1.8] text-white/45">{faq.a}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

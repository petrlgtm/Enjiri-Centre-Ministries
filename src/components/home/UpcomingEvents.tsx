"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiCalendar, HiLocationMarker, HiClock, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const placeholderEvents = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "9:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    description:
      "Join us for a powerful time of worship, praise, and the Word of God.",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&q=70",
    accent: "from-gold to-gold-dark",
    featured: true,
  },
  {
    title: "Youth Conference 2026",
    date: "March 15-17, 2026",
    time: "10:00 AM",
    location: "Church Grounds",
    description:
      "A life-changing conference for young people. Theme: 'Rising Above'.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=70",
    accent: "from-gold-dark to-gold",
    featured: false,
  },
  {
    title: "Community Outreach",
    date: "Last Saturday of the Month",
    time: "8:00 AM",
    location: "Various Locations",
    description:
      "Serving our community with food, clothing, and the love of Christ.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=70",
    accent: "from-red to-red-light",
    featured: false,
  },
];

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    function calc() {
      const now = new Date();
      const nextSunday = new Date(now);
      const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(9, 0, 0, 0);

      if (now.getDay() === 0 && now.getHours() < 12) {
        nextSunday.setDate(now.getDate());
      }

      const diff = nextSunday.getTime() - now.getTime();
      if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      };
    }

    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 rounded-xl bg-navy/70 px-2 py-2.5 text-center backdrop-blur-md border border-white/5">
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="block font-[family-name:var(--font-playfair)] text-xl font-bold text-gold"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
        {label}
      </span>
    </div>
  );
}

export default function UpcomingEvents() {
  const countdown = useCountdown();

  return (
    <section className="section-glow relative py-32">
      <div className="absolute inset-0 bg-navy" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(185,28,28,0.15),transparent_55%),radial-gradient(ellipse_at_30%_80%,rgba(201,168,76,0.13),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gray-200)] to-transparent" />

      <div className="pointer-events-none absolute -left-40 bottom-20 h-[350px] w-[350px] rounded-full opacity-[0.03]"><div className="morph-blob h-full w-full bg-gradient-to-tr from-gold to-transparent" /></div>
      <div className="pointer-events-none absolute -right-32 top-32 h-[300px] w-[300px] rounded-full opacity-[0.03]"><div className="morph-blob h-full w-full bg-gradient-to-bl from-red to-transparent" style={{ animationDelay: "-3s" }} /></div>

      <Container className="relative">
        <SectionHeading
          label="Stay Connected"
          title="Upcoming Events"
          subtitle="Mark your calendar and join us for these upcoming gatherings."
        />

        {/* Featured event: wide horizontal card. Others: side by side below */}
        <div className="space-y-6">
          {/* Featured — horizontal layout */}
          {placeholderEvents.filter(e => e.featured).map((event) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="card-hover card-premium group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--gray-100)]"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative h-64 md:h-auto md:w-[55%] overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover transition-all duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-navy/70 via-navy/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${event.accent} px-4 py-2 text-[11px] font-bold tracking-wide text-white shadow-lg`}>
                      <HiCalendar size={13} />
                      {event.date}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2 max-w-xs">
                      <CountdownUnit value={countdown.days} label="Days" />
                      <CountdownUnit value={countdown.hours} label="Hrs" />
                      <CountdownUnit value={countdown.mins} label="Min" />
                      <CountdownUnit value={countdown.secs} label="Sec" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 md:w-[45%] md:p-10">
                  <span className="mb-3 inline-block w-fit rounded-full bg-[var(--red-muted)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-red-light border border-red/15">
                    Featured Event
                  </span>
                  <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-gold font-[family-name:var(--font-playfair)]">
                    {event.title}
                  </h3>
                  <div className="mt-5 space-y-3">
                    {[
                      { icon: HiClock, text: event.time },
                      { icon: HiLocationMarker, text: event.location },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2.5 text-sm text-[var(--gray-500)]">
                        <item.icon className="shrink-0 text-gold/70" size={15} />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-[0.9rem] leading-relaxed text-[var(--gray-400)]">
                    {event.description}
                  </p>
                </div>
              </div>
              <div className="relative h-0.5 w-full bg-[var(--gray-50)]">
                <div className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 bg-gradient-to-r from-gold-light via-gold to-gold-light transition-all duration-700 group-hover:left-0 group-hover:w-full group-hover:translate-x-0" />
              </div>
            </motion.div>
          ))}

          {/* Non-featured — 2 column grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {placeholderEvents.filter(e => !e.featured).map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="card-hover card-premium group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[var(--gray-100)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-all duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${event.accent} px-4 py-2 text-[11px] font-bold tracking-wide text-white shadow-lg`}>
                      <HiCalendar size={13} />
                      {event.date}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[1.1rem] font-bold text-white transition-colors duration-300 group-hover:text-gold">{event.title}</h3>
                  <div className="mt-3 space-y-2">
                    {[{ icon: HiClock, text: event.time }, { icon: HiLocationMarker, text: event.location }].map((item) => (
                      <div key={item.text} className="flex items-center gap-2.5 text-sm text-[var(--gray-500)]">
                        <item.icon className="shrink-0 text-gold/70" size={15} />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-[var(--gray-500)]">{event.description}</p>
                </div>
                <div className="relative h-0.5 w-full bg-[var(--gray-50)]">
                  <div className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 bg-gradient-to-r from-gold-light via-gold to-gold-light transition-all duration-700 group-hover:left-0 group-hover:w-full group-hover:translate-x-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="btn-magnetic inline-block">
            <Button
              href="/services"
              variant="secondary"
              icon={<HiArrowRight size={16} />}
            >
              View All Events
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

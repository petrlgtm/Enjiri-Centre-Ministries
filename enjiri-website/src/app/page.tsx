import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionReveal from "@/components/SectionReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import TiltCard from "@/components/TiltCard";

/* ── Data ── */

const serviceTimes = [
  { day: "Sunday", name: "Worship Service", time: "9:00 AM – 12:00 PM", icon: "sun" },
  { day: "Wednesday", name: "Bible Study", time: "6:00 PM – 8:00 PM", icon: "book" },
  { day: "Friday", name: "Youth Service", time: "5:00 PM – 7:00 PM", icon: "users" },
  { day: "Saturday", name: "Prayer Meeting", time: "7:00 AM – 9:00 AM", icon: "star" },
];

const ministries = [
  {
    title: "Youth Ministry",
    description: "Raising bold, Christ-centered leaders equipped to impact their generation.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Women's Ministry",
    description: "Empowering women through fellowship, prayer, and the Word of God.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Men's Fellowship",
    description: "Building godly men of integrity, purpose, and servant leadership.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Worship Team",
    description: "Leading the congregation into God's presence through anointed praise and worship.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
  {
    title: "Community Outreach",
    description: "Serving the community with the love of Christ through acts of kindness.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
];

const events = [
  {
    title: "Sunday Worship Experience",
    date: "Every Sunday",
    time: "9:00 AM",
    description: "Join us for a powerful time of worship, praise, and the Word of God.",
  },
  {
    title: "Midweek Bible Study",
    date: "Every Wednesday",
    time: "6:00 PM",
    description: "Dive deeper into Scripture in an intimate and interactive setting.",
  },
  {
    title: "Youth Revival Night",
    date: "Last Friday of the Month",
    time: "5:00 PM",
    description: "A night of worship, fellowship, and spiritual renewal for young people.",
  },
];

const testimonials = [
  {
    quote: "Enjiri Center changed my life. I found hope, purpose, and a family that truly cares. The teachings have grounded me in my faith like never before.",
    name: "Sarah M.",
    role: "Member since 2022",
  },
  {
    quote: "The prayer ministry is powerful. When I was going through my darkest season, the church stood with me. God moved mightily through this community.",
    name: "David K.",
    role: "Member since 2021",
  },
  {
    quote: "My children love the youth programs. They have grown spiritually and developed leadership skills that will serve them for life. Truly grateful.",
    name: "Grace N.",
    role: "Member since 2023",
  },
];

const stats = [
  { target: 500, suffix: "+", label: "Lives Touched" },
  { target: 12, suffix: "", label: "Nations Reached" },
  { target: 50, suffix: "+", label: "Outreach Programs" },
  { target: 1000, suffix: "+", label: "Meals Provided" },
];

export default function Home() {
  return (
    <main>
      {/* ━━ 1. Hero ━━ */}
      <Hero />

      {/* ━━ 2. Service Times ━━ */}
      <section className="relative bg-dark-surface py-20">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionReveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Join Us</p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Service Times</h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {serviceTimes.map((s) => (
                <div key={s.name} className="glass-card rounded-2xl p-6 text-center transition-all hover:border-gold/15">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gold">{s.day}</p>
                  <h3 className="mb-1 font-heading text-lg font-bold text-white">{s.name}</h3>
                  <p className="text-sm text-white/40">{s.time}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={200}>
            <div className="mt-8 text-center">
              <p className="mb-3 text-sm text-white/40">
                <svg className="mr-1.5 inline h-4 w-4 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Main Sanctuary, Kampala, Uganda
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all hover:gap-3">
                Get Directions
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ━━ 3. About / Welcome from Pastor ━━ */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-gold/3 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Pastor Image */}
              <div className="img-zoom overflow-hidden rounded-3xl relative">
                <Image
                  src="https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80"
                  alt="Pastor James Okello"
                  width={700}
                  height={500}
                  className="h-[450px] w-full object-cover"
                />
              </div>
              {/* Welcome Text */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Welcome Home</p>
                <h2 className="mb-6 font-heading text-3xl font-bold leading-snug text-white sm:text-4xl">
                  A Word from <span className="gold-gradient-text">Our Pastor</span>
                </h2>
                <p className="mb-5 leading-[1.9] text-white/50">
                  &ldquo;Welcome to Enjiri Center. Whether you are visiting for the first time or have been part of our family for years, know that you are loved, valued, and called for a divine purpose. We are a community that believes in the power of God&apos;s Word to transform lives, heal the broken-hearted, and restore hope to every soul.&rdquo;
                </p>
                <p className="mb-6 text-sm font-semibold text-gold/60">— Pastor James Okello</p>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-7 py-3 text-sm font-bold uppercase tracking-wider text-gold transition-all hover:border-gold/40 hover:bg-gold/10"
                >
                  Learn More About Us
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ━━ 4. Ministries ━━ */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Get Involved</p>
              <h2 className="gold-underline font-heading text-3xl font-bold text-white sm:text-4xl">Our Ministries</h2>
            </div>
          </SectionReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((m, i) => (
              <SectionReveal key={m.title} delay={i * 100}>
                <TiltCard>
                  <Link href="/services" className="card-premium glass-card group block overflow-hidden rounded-2xl p-7 h-full">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-all group-hover:bg-gold/20">
                      {m.icon}
                    </div>
                    <h3 className="mb-2 font-heading text-xl font-bold text-white">{m.title}</h3>
                    <p className="mb-4 text-sm leading-[1.8] text-white/45">{m.description}</p>
                    <p className="text-xs font-semibold text-gold transition-all group-hover:tracking-wider">Learn More &rarr;</p>
                  </Link>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ 5. Latest Sermon ━━ */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-maroon/15 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">The Word</p>
              <h2 className="gold-underline font-heading text-3xl font-bold text-white sm:text-4xl">Latest Sermon</h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="border-glow card-premium glass-gold overflow-hidden rounded-3xl">
              <div className="grid lg:grid-cols-2">
                <div className="img-zoom relative h-72 lg:h-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80"
                    alt="Open Bible"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-card/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 to-transparent lg:hidden" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link href="/sermons" className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-dark/50 text-white backdrop-blur-md transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_30px_rgba(255,199,44,0.2)]">
                      <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </Link>
                  </div>
                  <div className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-maroon-dark">Latest</div>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <p className="mb-4 text-sm text-white/40">Watch our latest message and be encouraged in your walk with Christ.</p>
                  <h3 className="mb-3 font-heading text-2xl font-bold text-white sm:text-3xl">Watch Our Sermons</h3>
                  <p className="mb-8 leading-[1.8] text-white/45">
                    Every week, we preach the Word of God with power and clarity. Whether you missed a Sunday or want to revisit a message, our full sermon library is available to watch or listen anytime.
                  </p>
                  <Link href="/sermons" className="group inline-flex w-fit items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-maroon-dark transition-all hover:shadow-[0_0_25px_rgba(255,199,44,0.3)]">
                    Watch All Sermons
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ━━ 6. Upcoming Events ━━ */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">What&apos;s Coming</p>
              <h2 className="gold-underline font-heading text-3xl font-bold text-white sm:text-4xl">Upcoming Events</h2>
            </div>
          </SectionReveal>

          <div className="space-y-4">
            {events.map((e, i) => (
              <SectionReveal key={e.title} delay={i * 100}>
                <div className="glass-card group flex flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-all hover:border-gold/15 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gold/10">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">{e.title}</h3>
                      <p className="text-xs text-gold/60">{e.date} &middot; {e.time}</p>
                      <p className="mt-1 text-sm text-white/40">{e.description}</p>
                    </div>
                  </div>
                  <Link href="/events" className="shrink-0 rounded-full border border-gold/20 bg-gold/5 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-gold transition-all hover:border-gold/40 hover:bg-gold/10 sm:self-center">
                    Details
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={300}>
            <div className="mt-10 text-center">
              <Link href="/events" className="group inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all hover:gap-3">
                View All Events
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ━━ 7. Giving ━━ */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark/40 via-dark to-dark" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
              <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              Your Generosity <span className="gold-gradient-text">Changes Lives</span>
            </h2>
            <p className="mb-3 text-base leading-relaxed text-white/50">
              Every gift supports our mission to preach the Gospel, feed the hungry, educate children, and bring hope to those in need. Your seed planted today will produce an eternal harvest.
            </p>
            <p className="mb-10 text-xs text-white/30">
              &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo; — 2 Corinthians 9:7
            </p>
            <Link
              href="/donate"
              className="btn-ripple group relative inline-block overflow-hidden rounded-full bg-gold px-12 py-4 text-sm font-bold uppercase tracking-[0.2em] text-maroon-dark transition-all hover:shadow-[0_0_40px_rgba(255,199,44,0.35)]"
            >
              <span className="relative z-10">Heartfelt Giving</span>
              <div className="absolute inset-0 -translate-x-full bg-gold-light transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
            <p className="mt-5 text-[11px] text-white/25">Secure &middot; Private &middot; Tax Deductible</p>
          </SectionReveal>
        </div>
      </section>

      {/* ━━ 8. Testimonials ━━ */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Stories of Faith</p>
              <h2 className="gold-underline font-heading text-3xl font-bold text-white sm:text-4xl">What Our Members Say</h2>
            </div>
          </SectionReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 120}>
                <TiltCard>
                  <div className="glass-card h-full rounded-2xl p-8">
                    <svg className="mb-5 h-8 w-8 text-gold/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="mb-6 leading-[1.9] text-white/50">{t.quote}</p>
                    <div className="border-t border-white/5 pt-5">
                      <p className="font-heading text-base font-bold text-white">{t.name}</p>
                      <p className="text-xs text-gold/50">{t.role}</p>
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scripture Marquee ── */}
      <div className="relative overflow-hidden bg-dark py-5 border-y border-white/5">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex shrink-0 items-center gap-12 px-6">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="font-accent text-sm italic text-white/15">&ldquo;For God so loved the world that He gave His only begotten Son&rdquo; — John 3:16</span>
                <span className="text-gold/20">&diams;</span>
                <span className="font-accent text-sm italic text-white/15">&ldquo;Go into all the world and preach the gospel to all creation&rdquo; — Mark 16:15</span>
                <span className="text-gold/20">&diams;</span>
                <span className="font-accent text-sm italic text-white/15">&ldquo;I can do all things through Christ who strengthens me&rdquo; — Philippians 4:13</span>
                <span className="text-gold/20">&diams;</span>
              </span>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0 items-center gap-12 px-6" aria-hidden>
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="font-accent text-sm italic text-white/15">&ldquo;For God so loved the world that He gave His only begotten Son&rdquo; — John 3:16</span>
                <span className="text-gold/20">&diams;</span>
                <span className="font-accent text-sm italic text-white/15">&ldquo;Go into all the world and preach the gospel to all creation&rdquo; — Mark 16:15</span>
                <span className="text-gold/20">&diams;</span>
                <span className="font-accent text-sm italic text-white/15">&ldquo;I can do all things through Christ who strengthens me&rdquo; — Philippians 4:13</span>
                <span className="text-gold/20">&diams;</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ━━ Impact Stats ━━ */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1920&q=80" alt="Mountains" fill className="object-cover opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Our Impact</p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Making a Difference</h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={100}>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {stats.map((s) => (
                <TiltCard key={s.label}>
                  <div className="card-premium glass-card rounded-2xl p-7 text-center">
                    <p className="gold-gradient-text font-heading text-4xl font-bold">
                      <AnimatedCounter target={s.target} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white/60">{s.label}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ━━ 9. Final CTA ━━ */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80" alt="Worship" fill className="object-cover opacity-[0.08]" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/90 to-dark-surface" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <p className="mb-4 font-accent text-lg tracking-[0.3em] text-gold/60">JOIN US</p>
            <h2 className="mb-6 font-heading text-4xl font-bold text-white sm:text-5xl">
              Be Part of What God <br /><span className="gold-gradient-text">Is Doing</span>
            </h2>
            <p className="mb-10 text-base leading-relaxed text-white/45">
              Whether you&apos;re looking for a church home, seeking spiritual guidance, or wanting to serve — there&apos;s a place for you at Enjiri Center.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-ripple rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-maroon-dark transition-all hover:shadow-[0_0_30px_rgba(255,199,44,0.3)]">
                Plan Your Visit
              </Link>
              <Link href="/events" className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70 transition-all hover:border-gold/40 hover:text-white">
                Upcoming Events
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}

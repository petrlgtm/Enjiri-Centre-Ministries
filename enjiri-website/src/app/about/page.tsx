import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "About Us — Enjiri Center",
  description: "Learn about Enjiri Center's story, vision, mission, commission, and the people behind our ministry.",
};

const coreValues = [
  {
    title: "Faith",
    description: "We stand firm on the unchanging Word of God, trusting in His promises and living by the conviction that faith in Jesus Christ is the foundation of all we do.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Love",
    description: "We are driven by the love of Christ to serve others. Every ministry, outreach, and interaction is rooted in genuine compassion and selfless love for all people.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.502-4.688-4.502-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.748 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    description: "We conduct every aspect of ministry with transparency, honesty, and accountability. Our commitment to integrity reflects the character of Christ in all things.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Unity",
    description: "We believe in the power of togetherness. Our community thrives on mutual respect, shared purpose, and the bond of fellowship that unites all believers in Christ.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description: "We pursue excellence in every area of ministry — not for perfection, but as an offering to God. We steward our gifts and resources with diligence and dedication.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "Service",
    description: "Following Jesus' example, we serve with humility and compassion. We meet people where they are, addressing physical, emotional, and spiritual needs with the love of Christ.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-4.247m0 0A8.966 8.966 0 013 12c0-1.257.26-2.453.727-3.538" />
      </svg>
    ),
  },
];

const timeline = [
  { year: "2014", title: "The Beginning", description: "Enjiri Center was founded as a small prayer gathering with a handful of believers united by a vision to spread the Gospel." },
  { year: "2016", title: "Growing Community", description: "Our congregation grew to over 100 members. We launched our first youth program and weekly Bible study groups." },
  { year: "2018", title: "First Outreach Mission", description: "We organized our first international outreach, traveling to neighboring nations to minister the Gospel and serve communities in need." },
  { year: "2020", title: "Digital Ministry", description: "Embracing online platforms, we began streaming services and reaching believers across the globe during a challenging season." },
  { year: "2022", title: "Community Center", description: "We established a permanent community center in Kampala, providing a home for worship, counseling, youth programs, and humanitarian outreach." },
  { year: "2024", title: "12 Nations Reached", description: "Our outreach expanded to 12 countries across Africa and beyond, touching over 500 lives through evangelism and humanitarian support." },
];

const team = [
  { name: "Pastor James Okello", role: "Senior Pastor & Founder", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", description: "With over 15 years in ministry, Pastor James carries a burning passion for preaching Christ and equipping believers for Kingdom impact." },
  { name: "Sarah Namugga", role: "Worship Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", description: "Sarah leads our worship ministry with a heart to create an atmosphere where people encounter the presence of God." },
  { name: "David Ssemwogerere", role: "Youth Ministry Leader", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", description: "David is dedicated to raising bold, Spirit-filled young leaders who will transform their communities and nations." },
  { name: "Grace Atim", role: "Outreach Coordinator", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80", description: "Grace coordinates our outreach programs, ensuring that every initiative reflects the love and compassion of Jesus Christ." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About Us"
        subtitle="Our Story"
        description="Enjiri Center is a faith-based ministry dedicated to spreading the Gospel of Jesus Christ across all nations, restoring hope and transforming lives through the power of the Holy Spirit."
        image="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80"
      />

      {/* ── Our Story ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-gold/3 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Our Story</p>
                <h2 className="mb-8 font-heading text-3xl font-bold leading-snug text-white sm:text-4xl">
                  A Ministry Born from <br /><span className="gold-gradient-text">Divine Purpose</span>
                </h2>
                <div className="space-y-5 leading-[1.9] text-white/50">
                  <p>
                    Enjiri Center began in 2014 as a small prayer gathering in Kampala, Uganda. A group of believers, led by Pastor James Okello, came together with a singular vision: to preach Christ and restore hope to every person who would hear the Gospel message.
                  </p>
                  <p>
                    What started as a weekly home fellowship quickly grew into a vibrant ministry touching lives across Uganda and beyond. The name &ldquo;Enjiri&rdquo; — rooted in the local language — means &ldquo;Gospel,&rdquo; reflecting our core calling to proclaim the Good News of Jesus Christ to all nations.
                  </p>
                  <p>
                    Today, Enjiri Center stands as a beacon of hope, reaching 12 nations through evangelism, discipleship, youth empowerment, pastoral counseling, and humanitarian outreach. We believe that every person deserves to hear the message of salvation and experience the transformative love of God.
                  </p>
                  <p>
                    Our journey has been marked by faith, sacrifice, and the unmistakable hand of God. From a living room to a community center, from one city to multiple nations — every step has been ordered by the Lord, and every testimony confirms His faithfulness.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-gold/30" />
                  <p className="font-accent text-sm italic text-white/35">
                    &ldquo;For I am not ashamed of the Gospel, for it is the power of God for salvation to everyone who believes.&rdquo; — Romans 1:16
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="img-zoom overflow-hidden rounded-3xl">
                  <Image src="https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80" alt="Congregation" width={700} height={600} className="h-[550px] w-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 glass-gold animate-float rounded-2xl p-6 shadow-2xl">
                  <p className="font-heading text-3xl font-bold text-gold">10+</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/60">Years of Ministry</p>
                </div>
                <div className="absolute -right-4 top-8 glass rounded-2xl p-5 shadow-2xl">
                  <p className="font-heading text-2xl font-bold text-gold">12</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/60">Nations Reached</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Vision, Mission, Commission ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-20 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">What Drives Us</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Vision, Mission & Commission</h2>
            </div>
          </SectionReveal>

          {/* Vision */}
          <SectionReveal delay={100}>
            <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
              <div className="img-zoom overflow-hidden rounded-3xl">
                <Image src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80" alt="Vision" width={700} height={400} className="h-[350px] w-full object-cover" />
              </div>
              <div>
                <span className="mb-3 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold">Our Vision</span>
                <h3 className="mb-5 font-heading text-3xl font-bold text-white">Preaching Christ & Restoring Hope</h3>
                <p className="mb-4 leading-[1.9] text-white/50">
                  We envision a world where every soul — regardless of race, tribe, language, or social status — encounters the transforming love of Jesus Christ and finds eternal hope. Our vision is to be a catalyst for spiritual awakening across nations, raising a generation of believers who walk in the fullness of God&apos;s purpose.
                </p>
                <p className="mb-4 leading-[1.9] text-white/50">
                  Through the power of the Holy Spirit, we aim to establish Christ-centered communities that reflect the character of God, serve with compassion, and stand as pillars of truth in a world desperate for hope.
                </p>
                <p className="text-sm italic text-red-accent">Colossians 1:27 &bull; 1 Corinthians 2:4</p>
              </div>
            </div>
          </SectionReveal>

          {/* Mission */}
          <SectionReveal delay={200}>
            <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <span className="mb-3 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold">Our Mission</span>
                <h3 className="mb-5 font-heading text-3xl font-bold text-white">The Gospel to All Nations</h3>
                <p className="mb-4 leading-[1.9] text-white/50">
                  Our mission is clear and urgent: to minister the Gospel of our Lord Jesus Christ through repentance and remission of sins to all nations. We carry this mandate with boldness, compassion, and a deep sense of responsibility.
                </p>
                <p className="mb-4 leading-[1.9] text-white/50">
                  We go beyond borders, languages, and cultural barriers to share the Good News. Whether through Sunday worship, community outreach, digital platforms, or international missions — we are committed to making disciples who will, in turn, disciple others.
                </p>
                <p className="text-sm italic text-red-accent">Luke 24:47</p>
              </div>
              <div className="img-zoom order-1 overflow-hidden rounded-3xl lg:order-2">
                <Image src="https://images.unsplash.com/photo-1529070538774-1f4e532a9b4f?w=800&q=80" alt="Mission" width={700} height={400} className="h-[350px] w-full object-cover" />
              </div>
            </div>
          </SectionReveal>

          {/* Commission */}
          <SectionReveal delay={300}>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="img-zoom overflow-hidden rounded-3xl">
                <Image src="https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=800&q=80" alt="Commission" width={700} height={400} className="h-[350px] w-full object-cover" />
              </div>
              <div>
                <span className="mb-3 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold">Our Commission</span>
                <h3 className="mb-5 font-heading text-3xl font-bold text-white">Jesus is Lord and Christ</h3>
                <p className="mb-4 leading-[1.9] text-white/50">
                  We proclaim to all the Nations that God made Jesus both Lord and Christ — who is the only way, the truth, and the Life. He never came to condemn the world but to save and give Eternal Life through His death, burial, and triumphant resurrection.
                </p>
                <p className="mb-4 leading-[1.9] text-white/50">
                  He paid the ultimate sacrifice for all mankind. This is the message we carry, the truth we defend, and the hope we offer to a broken world. We commission every believer to be an ambassador of this Gospel wherever they go.
                </p>
                <p className="text-sm italic text-red-accent">Acts 2:36 &bull; John 14:6</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-20 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">What We Stand For</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Our Core Values</h2>
            </div>
          </SectionReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 100}>
                <TiltCard>
                  <div className="card-premium glass-card rounded-2xl p-8 h-full">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold">{v.icon}</div>
                    <h3 className="mb-3 font-heading text-xl font-bold text-white">{v.title}</h3>
                    <p className="text-sm leading-[1.9] text-white/45">{v.description}</p>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionReveal>
            <div className="mb-20 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Our Journey</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Ministry Timeline</h2>
            </div>
          </SectionReveal>

          <div className="relative">
            {/* Center line — animated gold gradient */}
            <div className="absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-gold/40 via-gold/20 to-transparent sm:left-1/2">
              <div className="absolute inset-0 bg-gradient-to-b from-gold/60 via-gold/30 to-transparent animate-shimmer" style={{ backgroundSize: "100% 200%" }} />
            </div>

            {timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 100}>
                <div className={`relative mb-12 flex items-start gap-8 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Dot with glow */}
                  <div className="absolute left-6 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_16px_rgba(255,199,44,0.4)] sm:left-1/2">
                    <div className="absolute -inset-2 rounded-full bg-gold/10 animate-pulse-glow" />
                  </div>

                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-14 sm:text-right" : "sm:pl-14"}`}>
                    <span className="font-heading text-2xl font-bold text-gold">{item.year}</span>
                    <h3 className="mt-1 mb-2 font-heading text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm leading-[1.8] text-white/45">{item.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-20 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Leadership</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Meet Our Team</h2>
              <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-white/45">
                Our leadership team is united by a shared calling to serve God and His people with excellence, humility, and unwavering faithfulness.
              </p>
            </div>
          </SectionReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <SectionReveal key={member.name} delay={i * 120}>
                <TiltCard>
                  <div className="card-premium glass-card group overflow-hidden rounded-3xl text-center">
                    <div className="img-zoom relative h-72 overflow-hidden">
                      <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                      {/* Hover overlay with description */}
                      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-dark-card via-dark-card/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="glass-premium rounded-t-2xl p-5 text-center">
                          <p className="text-xs leading-[1.8] text-white/60">{member.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-bold text-white">{member.name}</h3>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">{member.role}</p>
                      <p className="text-xs leading-[1.8] text-white/40 group-hover:hidden">{member.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-dark-surface py-20">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <h2 className="mb-6 font-heading text-3xl font-bold text-white sm:text-4xl">
              Want to Be Part of Our <span className="gold-gradient-text">Story?</span>
            </h2>
            <p className="mb-8 text-white/45">Join us in spreading the Gospel and making a lasting impact across nations.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-ripple rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-maroon-dark transition-all hover:shadow-[0_0_30px_rgba(255,199,44,0.3)]">Get Connected</Link>
              <Link href="/donate" className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70 transition-all hover:border-gold/40 hover:text-white">Support Our Mission</Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}

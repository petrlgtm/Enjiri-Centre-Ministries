import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Our Church Services — Enjiri Center",
  description: "Join us for worship, Bible study, youth programs, prayer, counseling, and community outreach at Enjiri Center.",
};

const services = [
  {
    title: "Sunday Worship Service",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    day: "Every Sunday",
    time: "9:00 AM – 12:00 PM",
    location: "Main Sanctuary, Kampala",
    description: "Our Sunday worship is the heartbeat of Enjiri Center. We gather every week to praise God, hear the preaching of His Word, and fellowship as a community of believers united in Christ.",
    highlights: [
      "Anointed worship and praise",
      "Bible-based preaching by Pastor James Okello",
      "Altar call and prayer ministry",
      "Children's church for ages 3–12",
      "Holy Communion on the first Sunday of each month",
    ],
  },
  {
    title: "Midweek Bible Study",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    day: "Every Wednesday",
    time: "6:00 PM – 8:00 PM",
    location: "Fellowship Hall, Kampala",
    description: "Designed for believers who hunger for a deeper understanding of God's Word. Through verse-by-verse study and interactive discussion, we grow together in knowledge and spiritual maturity.",
    highlights: [
      "Systematic study through books of the Bible",
      "Small group discussions",
      "Topical studies on faith, prayer, and purpose",
      "Q&A sessions with pastoral guidance",
      "Prayer and intercession after each session",
    ],
  },
  {
    title: "Youth Programs",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    day: "Every Friday",
    time: "5:00 PM – 7:00 PM",
    location: "Youth Hall, Kampala",
    description: "Our youth ministry exists to raise a generation of bold, Christ-centered leaders who are equipped to make an impact in their families, schools, communities, and nations.",
    highlights: [
      "Interactive Bible teaching for young people",
      "Leadership development and mentorship",
      "Worship nights with contemporary praise",
      "Skills training workshops",
      "Annual youth camp and revival weekends",
    ],
  },
  {
    title: "Prayer Ministry",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    day: "Every Saturday",
    time: "7:00 AM – 9:00 AM",
    location: "Prayer Room, Kampala",
    description: "Prayer is the engine of our ministry. Our weekly prayer gatherings bring believers together to intercede for families, communities, nations, and the advancement of the Gospel.",
    highlights: [
      "Corporate intercession for the church and nations",
      "Personal prayer requests and prayer partners",
      "Healing prayer and anointing services",
      "Monthly all-night prayer vigils",
      "24-hour prayer chain participation",
    ],
  },
  {
    title: "Pastoral Counseling",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    day: "Monday – Saturday",
    time: "By Appointment",
    location: "Counseling Center, Kampala",
    description: "A safe, confidential space where individuals and families can receive Bible-based guidance, emotional support, and spiritual healing through life's challenges.",
    highlights: [
      "One-on-one pastoral counseling",
      "Marriage and family counseling",
      "Pre-marital counseling for engaged couples",
      "Grief and loss support",
      "Crisis intervention and emergency prayer",
    ],
  },
  {
    title: "Community Outreach",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    day: "Last Saturday of Every Month",
    time: "8:00 AM – 2:00 PM",
    location: "Various Locations",
    description: "Following Jesus' command to love our neighbors, we actively serve communities through practical acts of kindness, humanitarian support, and Gospel proclamation.",
    highlights: [
      "Food distribution to vulnerable families",
      "Medical outreach camps",
      "Educational sponsorship for children",
      "Clean water and sanitation projects",
      "Open-air Gospel crusades",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="Our Church Services"
        subtitle="Join Us in Worship"
        description="Every program and service at Enjiri Center is designed to minister to the whole person — spirit, soul, and body — through the power of God's Word and the Holy Spirit."
        image="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?w=1920&q=80"
      />

      {/* ── Services List ── */}
      <section className="relative overflow-hidden bg-dark py-24">
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">What We Offer</p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Our Church Services</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/40">We welcome everyone to be part of our church family. Here are the services and programs we hold throughout the week.</p>
            </div>
          </SectionReveal>

          <div className="space-y-6">
            {services.map((service, i) => (
              <SectionReveal key={service.title} delay={Math.min(i, 4) * 80}>
                <div className="glass-card overflow-hidden rounded-2xl border border-white/5 p-8 transition-all hover:border-gold/10">
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                    {/* Icon + Title */}
                    <div className="lg:w-80 shrink-0">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                        {service.icon}
                      </div>
                      <h3 className="mb-2 font-heading text-2xl font-bold text-white">{service.title}</h3>
                      <div className="space-y-1.5">
                        <p className="flex items-center gap-2 text-sm text-gold/70">
                          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {service.day}
                        </p>
                        <p className="flex items-center gap-2 text-sm text-white/40">
                          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {service.time}
                        </p>
                        <p className="flex items-center gap-2 text-sm text-white/40">
                          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {service.location}
                        </p>
                      </div>
                    </div>

                    {/* Description + Highlights */}
                    <div className="flex-1">
                      <p className="mb-5 leading-[1.8] text-white/50">{service.description}</p>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {service.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm text-white/40">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Weekly Schedule ── */}
      <section className="relative overflow-hidden bg-dark-surface py-24">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-3xl px-6">
          <SectionReveal>
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Plan Your Visit</p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Weekly Schedule</h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="glass-card overflow-hidden rounded-2xl">
              {[
                { day: "Sunday", service: "Worship Service", time: "9:00 AM – 12:00 PM" },
                { day: "Wednesday", service: "Bible Study", time: "6:00 PM – 8:00 PM" },
                { day: "Friday", service: "Youth Service", time: "5:00 PM – 7:00 PM" },
                { day: "Saturday", service: "Prayer Meeting", time: "7:00 AM – 9:00 AM" },
                { day: "Last Saturday", service: "Community Outreach", time: "8:00 AM – 2:00 PM" },
                { day: "Mon – Sat", service: "Counseling (by appt)", time: "Flexible Hours" },
              ].map((item, i) => (
                <div key={item.day} className={`flex items-center justify-between px-8 py-5 ${i !== 5 ? "border-b border-white/5" : ""}`}>
                  <div className="flex items-center gap-5">
                    <span className="w-28 text-sm font-semibold text-gold">{item.day}</span>
                    <span className="text-sm text-white/70">{item.service}</span>
                  </div>
                  <span className="hidden text-sm text-white/40 sm:block">{item.time}</span>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={200}>
            <div className="mt-12 text-center">
              <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-maroon-dark transition-all hover:shadow-[0_0_30px_rgba(255,199,44,0.3)]">
                Plan Your Visit
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}

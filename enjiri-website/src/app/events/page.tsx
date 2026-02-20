import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "Events — Enjiri Center",
  description: "Discover upcoming events, gatherings, and special programs at Enjiri Center.",
};

const upcomingEvents = [
  {
    title: "Youth Revival Weekend",
    date: "March 15–16, 2026",
    time: "10:00 AM onwards",
    location: "Enjiri Center Campus, Kampala",
    description: "A special weekend of Spirit-filled worship, prophetic teaching, and fellowship designed to ignite the faith of the next generation. Featuring guest speakers, worship teams, and breakout sessions tailored for young people aged 13–30.",
    highlights: ["Guest worship team from Nairobi", "Breakout sessions on identity, purpose & calling", "Free meals and refreshments", "Certificate of participation"],
    image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=800&q=80",
    featured: true,
  },
  {
    title: "Easter Celebration Service",
    date: "April 5, 2026",
    time: "8:00 AM – 1:00 PM",
    location: "Main Sanctuary, Kampala",
    description: "Celebrate the resurrection of our Lord Jesus Christ with a special Easter service featuring extended worship, choir presentations, dramatic performances, and a powerful message on the hope we have in the risen Savior.",
    highlights: ["Choir and drama presentations", "Children's Easter program", "Community breakfast fellowship", "Special offering for missions"],
    image: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=800&q=80",
    featured: true,
  },
  {
    title: "Women's Conference: Crowned with Purpose",
    date: "April 18–19, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "Fellowship Hall, Kampala",
    description: "A two-day conference empowering women to discover their God-given purpose, strengthen their faith, and build meaningful connections. Features keynote sessions, workshops, and prayer ministry.",
    highlights: ["Keynote by Pastor Grace Atim", "Workshops on faith, family & leadership", "Prayer and healing ministry", "Networking lunch"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    featured: false,
  },
  {
    title: "Community Health Outreach",
    date: "April 25, 2026",
    time: "8:00 AM – 3:00 PM",
    location: "Mukono District",
    description: "Free medical screenings, health education, and Gospel outreach to underserved communities. Volunteer doctors, nurses, and ministry workers come together to demonstrate Christ's love through practical service.",
    highlights: ["Free health screenings & consultations", "HIV/AIDS testing & counseling", "Children's health & nutrition", "Gospel sharing and prayer"],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    featured: false,
  },
  {
    title: "Missions Sunday",
    date: "May 3, 2026",
    time: "9:00 AM – 12:00 PM",
    location: "Main Sanctuary, Kampala",
    description: "A dedicated Sunday to celebrate our missions work, hear testimonies from the field, and commissioning of new missionaries being sent to unreached communities across East Africa.",
    highlights: ["Missionary testimonies", "Commissioning of new missionaries", "Special missions offering", "International food fellowship"],
    image: "https://images.unsplash.com/photo-1529070538774-1f4e532a9b4f?w=800&q=80",
    featured: false,
  },
];

const recurringSchedule = [
  { day: "Sunday", event: "Worship Service", time: "9:00 AM – 12:00 PM", description: "Main weekly gathering for worship, preaching, and fellowship." },
  { day: "Wednesday", event: "Bible Study", time: "6:00 PM – 8:00 PM", description: "Interactive verse-by-verse study through the Bible." },
  { day: "Friday", event: "Youth Service", time: "5:00 PM – 7:00 PM", description: "Worship, teaching, and activities for young people." },
  { day: "Saturday", event: "Morning Prayer", time: "7:00 AM – 9:00 AM", description: "Corporate prayer and intercession for the church and nations." },
  { day: "Last Saturday", event: "Community Outreach", time: "8:00 AM – 2:00 PM", description: "Food distribution, medical camps, and Gospel sharing." },
];

export default function EventsPage() {
  return (
    <main>
      <PageHero
        title="Events & Gatherings"
        subtitle="Upcoming"
        description="From weekly worship to special conferences and outreach programs, there's always something happening at Enjiri Center. Come and be part of what God is doing."
        image="https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=1920&q=80"
      />

      {/* ── Featured Events ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-gold/3 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Don&apos;t Miss</p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Featured Events</h2>
            </div>
          </SectionReveal>

          {upcomingEvents.filter(e => e.featured).map((event, i) => (
            <SectionReveal key={event.title} delay={i * 150}>
              <div className="mb-12 card-premium glass-gold overflow-hidden rounded-3xl">
                <div className="grid lg:grid-cols-2">
                  <div className="img-zoom relative h-72 lg:h-auto lg:min-h-[420px]">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-card/80 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 to-transparent lg:hidden" />
                    <div className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-maroon-dark">Featured Event</div>
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <h3 className="mb-3 font-heading text-2xl font-bold text-white sm:text-3xl">{event.title}</h3>
                    <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gold/70">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>
                    <p className="mb-2 text-xs text-white/30">{event.location}</p>
                    <p className="mb-6 leading-[1.9] text-white/45">{event.description}</p>
                    <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold/50">Event Highlights</h4>
                    <ul className="mb-8 space-y-2">
                      {event.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-white/40">
                          <svg className="h-3.5 w-3.5 shrink-0 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <a href="#" className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-maroon-dark transition-all hover:shadow-[0_0_25px_rgba(255,199,44,0.3)]">
                      Register Now
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── More Events Grid ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Coming Up</p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">More Events</h2>
            </div>
          </SectionReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {upcomingEvents.filter(e => !e.featured).map((event, i) => (
              <SectionReveal key={event.title} delay={i * 120}>
                <TiltCard>
                <div className="card-premium glass-card group h-full overflow-hidden rounded-3xl">
                  <div className="img-zoom relative h-48 overflow-hidden">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-gold/60">
                      <span>{event.date}</span>
                      <span>&bull;</span>
                      <span>{event.time}</span>
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-white">{event.title}</h3>
                    <p className="mb-1 text-xs text-white/30">{event.location}</p>
                    <p className="mb-5 text-sm leading-[1.8] text-white/40">{event.description}</p>
                    <a href="#" className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-maroon-dark">
                      RSVP
                    </a>
                  </div>
                </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recurring Schedule ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Every Week</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Weekly Schedule</h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="space-y-4">
              {recurringSchedule.map((item) => (
                <div key={item.day} className="glass-card flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-5">
                    <span className="w-28 shrink-0 font-heading text-lg font-bold text-gold">{item.day}</span>
                    <div>
                      <h3 className="font-semibold text-white">{item.event}</h3>
                      <p className="text-xs text-white/35">{item.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-white/50">{item.time}</span>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={200}>
            <div className="mt-14 text-center">
              <Link href="/contact" className="rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-maroon-dark transition-all hover:shadow-[0_0_30px_rgba(255,199,44,0.3)]">
                Plan Your Visit
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}

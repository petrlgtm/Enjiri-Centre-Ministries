import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "Our Services — Enjiri Center",
  description: "Explore our worship services, youth programs, counseling, Bible study, prayer ministry, and community outreach.",
};

const services = [
  {
    title: "Sunday Worship Service",
    subtitle: "Worship & Fellowship",
    time: "Every Sunday, 9:00 AM – 12:00 PM",
    location: "Main Sanctuary, Kampala",
    image: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?w=800&q=80",
    description: "Our Sunday worship is the heartbeat of Enjiri Center. We gather every week to praise God, hear the preaching of His Word, and fellowship as a community of believers united in Christ.",
    details: [
      "Anointed worship and praise led by our worship team",
      "Powerful, Bible-based preaching by Pastor James Okello",
      "Altar call and prayer ministry for healing and breakthrough",
      "Children's church running concurrently for ages 3–12",
      "Holy Communion on the first Sunday of each month",
      "New members' welcome and integration program",
    ],
    whatToExpect: "Expect an atmosphere charged with the presence of the Holy Spirit. Whether you are a first-time visitor or long-time member, you will be warmly welcomed into a community that loves God and loves people.",
  },
  {
    title: "Youth Programs",
    subtitle: "Empowering the Next Generation",
    time: "Every Friday, 5:00 PM – 7:00 PM",
    location: "Youth Hall, Kampala",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    description: "Our youth ministry exists to raise a generation of bold, Christ-centered leaders who are equipped to make an impact in their families, schools, communities, and nations.",
    details: [
      "Interactive Bible teaching tailored for young people",
      "Leadership development and mentorship programs",
      "Worship nights with contemporary praise",
      "Skills training workshops (public speaking, music, creative arts)",
      "Sports and recreation for team building",
      "Annual youth camp and revival weekends",
    ],
    whatToExpect: "A vibrant, energetic environment where young people can ask questions, grow in faith, develop life skills, and build lasting friendships rooted in Christ.",
  },
  {
    title: "Midweek Bible Study",
    subtitle: "Deep Dive into Scripture",
    time: "Every Wednesday, 6:00 PM – 8:00 PM",
    location: "Fellowship Hall, Kampala",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    description: "Our midweek Bible study is designed for believers who hunger for a deeper understanding of God's Word. Through verse-by-verse study and interactive discussion, we grow together in knowledge and spiritual maturity.",
    details: [
      "Systematic study through books of the Bible",
      "Small group discussions for deeper engagement",
      "Topical studies on faith, prayer, relationships, and purpose",
      "Question and answer sessions with pastoral guidance",
      "Prayer and intercession time after each session",
      "Study materials and resources provided",
    ],
    whatToExpect: "An intimate learning environment where you can ask questions, share insights, and gain a richer understanding of Scripture alongside fellow believers.",
  },
  {
    title: "Pastoral Counseling",
    subtitle: "Spiritual Guidance & Healing",
    time: "By Appointment — Mon to Sat",
    location: "Counseling Center, Kampala",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
    description: "Life presents challenges that can feel overwhelming. Our pastoral counseling ministry provides a safe, confidential space where individuals and families can receive Bible-based guidance, emotional support, and spiritual healing.",
    details: [
      "One-on-one pastoral counseling sessions",
      "Marriage and family counseling",
      "Pre-marital counseling for engaged couples",
      "Grief and loss support",
      "Addiction recovery guidance (faith-based approach)",
      "Crisis intervention and emergency prayer support",
    ],
    whatToExpect: "A compassionate, non-judgmental environment where trained pastoral counselors walk with you through difficult seasons, applying God's Word to bring healing, clarity, and restoration.",
  },
  {
    title: "Prayer Ministry",
    subtitle: "Intercession & Spiritual Warfare",
    time: "Every Saturday, 7:00 AM – 9:00 AM",
    location: "Prayer Room, Kampala",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
    description: "Prayer is the engine of our ministry. Our weekly prayer gatherings bring believers together to intercede for families, communities, nations, and the advancement of the Gospel around the world.",
    details: [
      "Corporate intercession for the church and nations",
      "Personal prayer requests and prayer partners",
      "Spiritual warfare and prophetic declarations",
      "Healing prayer and anointing services",
      "Monthly all-night prayer vigils",
      "24-hour prayer chain (sign up to participate)",
    ],
    whatToExpect: "A powerful, Spirit-led atmosphere of prayer where breakthrough happens. Whether you come with a burden or simply to worship, you will encounter God's presence in a tangible way.",
  },
  {
    title: "Community Outreach",
    subtitle: "Serving with the Love of Christ",
    time: "Last Saturday of Every Month",
    location: "Various Locations",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    description: "Following Jesus' command to love our neighbors, we actively serve communities through practical acts of kindness, humanitarian support, and Gospel proclamation. We believe faith without works is dead.",
    details: [
      "Food distribution to vulnerable families",
      "Medical outreach camps (free health screenings)",
      "Educational sponsorship for orphans and needy children",
      "Clean water and sanitation projects",
      "Clothing and supplies donations",
      "Open-air Gospel crusades and community evangelism",
    ],
    whatToExpect: "An opportunity to be the hands and feet of Jesus. Volunteers of all ages are welcome to join our outreach teams and experience the joy of serving others in Christ's name.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="Our Services"
        subtitle="What We Do"
        description="Every program and service at Enjiri Center is designed to minister to the whole person — spirit, soul, and body — through the power of God's Word and the Holy Spirit."
        image="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?w=1920&q=80"
      />

      {/* ── Services Detail ── */}
      <section className="relative overflow-hidden bg-dark py-20">
        <div className="relative mx-auto max-w-7xl px-6">
          {services.map((service, i) => (
            <SectionReveal key={service.title} delay={0}>
              <div className={`mb-24 last:mb-0 grid items-start gap-12 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                {/* Image side */}
                <div className={`relative ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <div className="img-zoom overflow-hidden rounded-3xl">
                    <Image src={service.image} alt={service.title} width={700} height={500} className="h-[400px] w-full object-cover" />
                  </div>
                  {/* Time badge */}
                  <div className="absolute -bottom-4 left-6 glass-gold rounded-2xl px-6 py-4 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs font-bold text-gold">{service.time}</p>
                        <p className="text-[10px] text-white/40">{service.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <span className="mb-3 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                    {service.subtitle}
                  </span>
                  <h2 className="mb-5 font-heading text-3xl font-bold text-white">{service.title}</h2>
                  <p className="mb-6 leading-[1.9] text-white/50">{service.description}</p>

                  <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold/60">What&apos;s Included</h4>
                  <ul className="mb-6 space-y-3">
                    {service.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-white/45">
                        <svg className="mt-1 h-4 w-4 shrink-0 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <TiltCard>
                    <div className="glass-card rounded-2xl p-5">
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold/60">What to Expect</h4>
                      <p className="text-sm leading-[1.8] text-white/40">{service.whatToExpect}</p>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── Schedule Summary ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Plan Your Visit</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Weekly Schedule</h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <TiltCard>
              <div className="glass-card overflow-hidden rounded-3xl">
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
            </TiltCard>
          </SectionReveal>

          <SectionReveal delay={200}>
            <div className="mt-14 text-center">
              <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-maroon-dark transition-all hover:shadow-[0_0_30px_rgba(255,199,44,0.3)]">
                Plan Your Visit
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

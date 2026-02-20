import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import TiltCard from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "Donate — Enjiri Center",
  description: "Support Enjiri Center's mission to spread the Gospel, serve communities, and transform lives across nations.",
};

const impactStats = [
  { number: "500+", label: "Lives Touched", description: "Individuals impacted by ministry programs" },
  { number: "12", label: "Nations Reached", description: "Countries with active Gospel ministry" },
  { number: "50+", label: "Outreach Programs", description: "Community initiatives launched" },
  { number: "1,000+", label: "Meals Provided", description: "Families fed through humanitarian efforts" },
  { number: "200+", label: "Youth Mentored", description: "Young people in leadership programs" },
  { number: "30+", label: "Missionaries Sent", description: "Workers deployed to the mission field" },
];

const givingAreas = [
  {
    title: "General Fund",
    description: "Supports day-to-day ministry operations including Sunday services, pastoral care, facility maintenance, and administrative needs.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
    ),
  },
  {
    title: "Missions & Evangelism",
    description: "Funds international and local mission trips, evangelistic crusades, Bible distribution, and missionary support across nations.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-4.247m0 0A8.966 8.966 0 013 12c0-1.257.26-2.453.727-3.538" /></svg>
    ),
  },
  {
    title: "Community Outreach",
    description: "Provides food, medical care, educational sponsorships, and humanitarian relief to vulnerable communities and families.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.502-4.688-4.502-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.748 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
    ),
  },
  {
    title: "Youth Development",
    description: "Invests in the next generation through mentorship programs, leadership training, educational scholarships, and youth camps.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
    ),
  },
];

const testimonials = [
  { quote: "Enjiri Center changed my life. Through their outreach program, I found hope and a relationship with Jesus Christ that transformed everything. My family is now walking in faith.", name: "Grace M.", role: "Community Member, Kampala" },
  { quote: "The youth program gave my children a foundation of faith and leadership. They are now bold witnesses for Christ in their schools and communities. I'm forever grateful.", name: "Pastor David K.", role: "Partner Church Leader, Jinja" },
  { quote: "When I was going through the darkest season of my life, the pastoral counseling ministry at Enjiri Center helped me find healing and restoration. God used them mightily.", name: "Rebecca N.", role: "Ministry Beneficiary, Mukono" },
];

const faqs = [
  { q: "Is my donation tax-deductible?", a: "Yes. Enjiri Center is a registered non-profit ministry, and all donations are tax-deductible to the extent allowed by law. You will receive a donation receipt for your records." },
  { q: "How is my donation used?", a: "Every dollar is carefully stewarded. We allocate funds across Gospel ministry, community outreach, youth programs, and operational needs. We provide annual financial reports for full transparency." },
  { q: "Can I make a recurring donation?", a: "Absolutely. We offer monthly, quarterly, and annual recurring giving options. Recurring donations help us plan and sustain long-term ministry programs." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, mobile money (for East Africa), credit/debit cards, PayPal, and in-kind donations. Contact us for specific details." },
  { q: "Can I designate my gift to a specific cause?", a: "Yes. You can specify whether your donation goes to the General Fund, Missions, Community Outreach, or Youth Development. Undesignated gifts go where the need is greatest." },
];

export default function DonatePage() {
  return (
    <main>
      <PageHero
        title="Support Our Mission"
        subtitle="Give Generously"
        description="Your generous contribution fuels our mission to spread the Gospel, serve communities in need, and transform lives across nations. Every gift has an eternal impact."
        image="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1920&q=80"
      />

      {/* ── Impact Stats ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">By the Numbers</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Our Impact</h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {impactStats.map((s) => {
                const num = parseInt(s.number.replace(/[^0-9]/g, ""), 10);
                const suffix = s.number.replace(/[0-9,]/g, "");
                return (
                  <TiltCard key={s.label}>
                    <div className="card-premium glass-card rounded-2xl p-7 text-center">
                      <p className="gold-gradient-text font-heading text-4xl font-bold">
                        <AnimatedCounter target={num} suffix={suffix} />
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white/70">{s.label}</p>
                      <p className="mt-1 text-xs text-white/35">{s.description}</p>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Giving Areas ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Where Your Gift Goes</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Areas of Giving</h2>
            </div>
          </SectionReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {givingAreas.map((area, i) => (
              <SectionReveal key={area.title} delay={i * 100}>
                <TiltCard>
                  <div className="card-premium glass-card h-full rounded-2xl p-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gold/10 text-gold">{area.icon}</div>
                    <h3 className="mb-3 font-heading text-lg font-bold text-white">{area.title}</h3>
                    <p className="text-sm leading-[1.8] text-white/45">{area.description}</p>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donate Form ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1920&q=80" alt="Mountains" fill className="object-cover opacity-[0.05]" />
        </div>
        <div className="relative mx-auto max-w-2xl px-6">
          <SectionReveal>
            <div className="glass-gold overflow-hidden rounded-3xl p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.3)] sm:p-14">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 animate-pulse-glow">
                <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.502-4.688-4.502-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.748 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              </div>
              <h3 className="mb-2 font-heading text-3xl font-bold text-white">Give With Purpose</h3>
              <p className="mx-auto mb-2 max-w-md font-accent text-base italic text-white/40">
                &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
              </p>
              <p className="mb-8 text-xs tracking-widest text-red-accent/70">2 CORINTHIANS 9:7</p>

              <div className="mb-8 flex flex-wrap justify-center gap-3">
                {["$10", "$25", "$50", "$100", "$250", "$500"].map((a) => (
                  <button key={a} className="rounded-full border border-gold/20 bg-white/3 px-7 py-3 text-sm font-bold text-gold transition-all hover:border-gold hover:bg-gold hover:text-maroon-dark hover:shadow-[0_0_20px_rgba(255,199,44,0.2)]">{a}</button>
                ))}
              </div>

              <div className="mb-8 mx-auto flex max-w-xs items-center gap-3 rounded-full border border-white/10 bg-white/3 px-5 py-3">
                <span className="text-lg font-bold text-gold">$</span>
                <input type="number" placeholder="Custom Amount" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25" />
              </div>

              <a href="#" className="group relative inline-block overflow-hidden rounded-full bg-gold px-14 py-4 text-sm font-bold uppercase tracking-[0.2em] text-maroon-dark transition-all hover:shadow-[0_0_50px_rgba(255,199,44,0.35)]">
                <span className="relative z-10">Donate Now</span>
                <div className="absolute inset-0 -translate-x-full bg-gold-light transition-transform duration-500 group-hover:translate-x-0" />
              </a>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/30">
                <span className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                  Secure Payment
                </span>
                <span>&bull;</span><span>Tax Deductible</span><span>&bull;</span><span>100% Transparent</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Other Ways to Give ── */}
      <section className="relative overflow-hidden bg-dark-surface py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Other Ways to Give</h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={100}>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { title: "Bank Transfer", desc: "Transfer directly to our ministry account. Contact us at info@enjiricenter.org for banking details and reference instructions." },
                { title: "Mobile Money", desc: "Available for East Africa (MTN, Airtel). Send to our registered ministry number. Contact us for the current number." },
                { title: "In-Kind Donations", desc: "We accept clothing, food supplies, educational materials, medical equipment, and other items for our outreach programs." },
                { title: "Volunteer Your Time", desc: "Your time is a valuable gift. Join our outreach teams, mentor youth, teach Bible study, or serve in various ministry areas." },
              ].map((item, i) => (
                <div key={item.title} className={`glass-card rounded-2xl p-7 ${i === 0 ? '' : ''}`}>
                  <h3 className="mb-3 font-heading text-lg font-bold text-gold">{item.title}</h3>
                  <p className="text-sm leading-[1.8] text-white/45">{item.desc}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative overflow-hidden bg-dark py-28">
        <div className="section-divider absolute left-0 top-0 w-full" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">Impact Stories</p>
              <h2 className="gold-underline font-heading text-4xl font-bold text-white sm:text-5xl">Lives Transformed</h2>
            </div>
          </SectionReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 120}>
                <div className="glass-card h-full rounded-2xl p-8">
                  <svg className="mb-4 h-8 w-8 text-gold/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                  <p className="mb-6 font-accent text-base italic leading-[1.9] text-white/50">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-6 bg-gold/30" />
                    <div>
                      <p className="text-sm font-semibold text-white/80">{t.name}</p>
                      <p className="text-xs text-white/35">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
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

          <SectionReveal delay={400}>
            <div className="mt-14 text-center">
              <p className="mb-4 text-white/40">Have more questions about giving?</p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light">
                Contact Us
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}

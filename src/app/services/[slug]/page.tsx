export const revalidate = 60;

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight, HiShare } from "react-icons/hi";
import Container from "@/components/ui/Container";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import EventCountdown from "@/components/ui/EventCountdown";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import { fetchSanity } from "@/sanity/lib/helpers";
import { eventBySlugQuery, siteSettingsQuery, upcomingEventsQuery } from "@/sanity/queries";
import { heroImage } from "@/sanity/image";
import { formatDate, formatTime, hasPassed, recurrenceLabel } from "@/lib/utils";
import { Event, SiteSettings } from "@/types/sanity";
import FitImage from "@/components/ui/FitImage";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await fetchSanity<Event>(eventBySlugQuery, { slug });
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  if (!event) return { title: "Event Not Found" };

  const title = event.seo?.seoTitle || event.title;
  const description = event.seo?.seoDescription || event.description || "";
  const image = event.seo?.seoImage ? heroImage(event.seo.seoImage) : event.image ? heroImage(event.image) : "";

  return {
    title,
    description,
    openGraph: {
      title: `${title} — ${settings?.churchName || "Enjiri Center"}`,
      description,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await fetchSanity<Event>(eventBySlugQuery, { slug });
  
  if (!event) {
    notFound();
  }

  const upcomingEvents = await fetchSanity<Event[]>(upcomingEventsQuery);
  const otherEvents = (upcomingEvents ?? []).filter((e) => e.slug !== slug).slice(0, 3);

  const when = new Date(event.date);
  const isPast = !event.isRecurring && hasPassed(event.date);
  const day = event.isRecurring ? "∞" : when.toLocaleDateString("en-US", { day: "2-digit", timeZone: "Africa/Kampala" });
  const month = event.isRecurring
    ? (event.recurrence === "monthly" ? "Monthly" : "Weekly")
    : when.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "Africa/Kampala" });
  const formattedDate = event.isRecurring ? recurrenceLabel(event.date, event.recurrence) : formatDate(event.date);
  const formattedTime = formatTime(event.date) + (event.endDate ? ` – ${formatTime(event.endDate)}` : "");
  const location = event.location || "Enjiri Center";
  const headerImg = event.image ? heroImage(event.image) : "";
  const rsvpHref = event.rsvpUrl || "/contact";
  const shareHref = `mailto:?subject=${encodeURIComponent(`Join me at ${event.title}`)}&body=${encodeURIComponent(
    `I thought you might be interested in ${event.title} at Enjiri Center Ministries.`
  )}`;

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden className="hero-editorial-glow absolute inset-0" />
        <Container className="relative pt-40 pb-12 sm:pt-44 lg:pb-14">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-white/60 uppercase transition-colors hover:text-gold-light"
          >
            <HiArrowLeft size={14} /> All events
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="flex gap-6 sm:gap-8 lg:col-span-8">
              <div className="shrink-0 leading-none">
                <span className="block font-display text-6xl font-semibold text-gold sm:text-7xl">{day}</span>
                <span className="mt-2 block font-mono text-xs tracking-[0.2em] text-white/55 uppercase">{month}</span>
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-gold-light uppercase">{event.category || "Special event"}</p>
                <h1 className="mt-3 font-display text-4xl leading-[1.05] font-semibold text-white sm:text-5xl lg:text-6xl">{event.title}</h1>
              </div>
            </div>
            <div className="lg:col-span-4">
              {isPast ? (
                <p className="border-l-2 border-gold/60 pl-5 text-base text-white/70">This gathering has passed — see what&apos;s coming up next.</p>
              ) : (
                <EventCountdown targetDate={event.date} isRecurring={event.isRecurring} recurrence={event.recurrence} />
              )}
            </div>
          </div>
        </Container>
        {headerImg && (
          <div className="header-straddle-cream relative">
            <Container>
              <div className="relative overflow-hidden shadow-[0_30px_80px_-30px_rgba(10,10,10,0.6)]">
                <FitImage src={headerImg} alt={event.title} sizes="(min-width: 1280px) 1216px, 100vw" priority />
              </div>
            </Container>
          </div>
        )}
      </section>

      {/* Details */}
      <section className="bg-cream pt-14 pb-24 text-cream-heading sm:pt-16 sm:pb-28">
        <Container>
          <dl className="grid gap-px bg-cream-heading/10 sm:grid-cols-3">
            {[
              { label: "Date", value: formattedDate },
              { label: "Time", value: formattedTime },
              { label: "Location", value: location },
            ].map((f) => (
              <div key={f.label} className="bg-cream py-4 sm:px-8 sm:first:pl-0">
                <dt className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-gold-dark uppercase">
                  <span aria-hidden className="inline-block h-2 w-2 bg-gold" />
                  {f.label}
                </dt>
                <dd className="mt-3 font-display text-2xl">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <article className="min-w-0 lg:col-span-8">
              {event.description && (
                <p className="mb-8 font-display text-2xl leading-snug sm:text-3xl">{event.description}</p>
              )}
              {event.body ? (
                <PortableTextRenderer value={event.body} tone="onLight" />
              ) : (
                <div className="space-y-5 text-[1.02rem] leading-[1.85] text-cream-body">
                  <p>
                    Join us for {event.title} at Enjiri Center Ministries International. This gathering is designed to
                    bring our community together in faith, worship, and fellowship.
                  </p>
                  <p>
                    Whether you are a long-time member or visiting for the first time, you are warmly welcome to be
                    part of what God is doing.
                  </p>
                </div>
              )}
              {event.tags && event.tags.length > 0 && (
                <ul className="mt-10 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <li key={tag} className="bg-white px-3 py-1.5 font-mono text-xs text-cream-body">
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-32">
                <div className="bg-white p-7">
                  <p className="font-mono text-xs tracking-[0.18em] text-gold-dark uppercase">
                    {isPast ? "Missed this one?" : "Be there"}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold">{isPast ? "Join the next gathering" : "Secure your spot"}</p>
                  <p className="mt-3 text-sm leading-relaxed text-cream-body">
                    {isPast
                      ? "Our church family meets every week — see the schedule and upcoming events."
                      : "Let us know you're coming, or ask us anything about this event."}
                  </p>
                  <div className="mt-6 space-y-2">
                    <Link
                      href={isPast ? "/services" : rsvpHref}
                      className="flex items-center justify-between bg-royal px-5 py-4 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-royal-light"
                    >
                      {isPast ? "See upcoming events" : event.rsvpUrl ? "Register / RSVP" : "Ask about this event"}
                      <HiArrowRight />
                    </Link>
                    <a
                      href={shareHref}
                      className="flex items-center justify-between border border-cream-heading/20 px-5 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-colors hover:border-royal hover:text-royal"
                    >
                      Share with a friend <HiShare />
                    </a>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-cream-body">
                  Questions about transport or how to get involved?{" "}
                  <Link href="/contact" className="font-semibold text-royal underline underline-offset-2">
                    Contact our office
                  </Link>
                  .
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Other upcoming events */}
      {otherEvents.length > 0 && (
        <section className="bg-royal-deep py-14 text-white sm:py-16">
          <Container>
            <SectionMasthead label="Also coming up" index="02" linkLabel="All events" href="/services" tone="dark" />
            <ul className="mt-8">
              {otherEvents.map((e) => {
                const d = new Date(e.date);
                return (
                  <li key={e.slug} className="border-b border-white/10">
                    <Link href={`/services/${e.slug}`} className="group grid grid-cols-[5rem_1fr_auto] items-center gap-6 py-6">
                      <span className="leading-none">
                        <span className="block font-display text-5xl font-semibold text-gold">
                          {d.toLocaleDateString("en-US", { day: "2-digit", timeZone: "Africa/Kampala" })}
                        </span>
                        <span className="mt-1 block font-mono text-xs tracking-[0.2em] text-white/50 uppercase">
                          {d.toLocaleDateString("en-US", { month: "short", timeZone: "Africa/Kampala" })}
                        </span>
                      </span>
                      <span>
                        <span className="block font-display text-2xl transition-colors group-hover:text-gold-light">{e.title}</span>
                        <span className="mt-1 block font-mono text-xs text-white/50">{e.location || "Enjiri Center"}</span>
                      </span>
                      <HiArrowRight className="text-xl text-white/60 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      {/* Sticky RSVP on phones (upcoming events only) */}
      {!isPast && (
        <div className="fixed right-4 bottom-4 left-4 z-40 lg:hidden">
          <Link
            href={rsvpHref}
            className="flex items-center justify-between bg-gold px-5 py-4 text-[12px] font-semibold tracking-[0.2em] text-navy uppercase shadow-2xl"
          >
            {event.rsvpUrl ? "RSVP now" : "Register interest"} <HiArrowRight />
          </Link>
        </div>
      )}
    </>
  );
}

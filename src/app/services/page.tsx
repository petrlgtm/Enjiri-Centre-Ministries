export const revalidate = 60;

import type { Metadata } from "next";
import ServiceSchedule from "@/components/services/ServiceSchedule";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import PageHeader from "@/components/ui/PageHeader";
import EventsGrid from "@/components/services/EventsGrid";
import { fetchSanity } from "@/sanity/lib/helpers";
import { upcomingEventsQuery, recentEventsQuery, siteSettingsQuery, servicesPageQuery } from "@/sanity/queries";
import { cardImage, heroImage as heroImageUrl } from "@/sanity/image";
import { formatDate, formatTime } from "@/lib/utils";
import { Event, SiteSettings, ServicesPageData } from "@/types/sanity";
import FitImage from "@/components/ui/FitImage";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanity<ServicesPageData>(servicesPageQuery);
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const title = pageData?.seo?.seoTitle || pageData?.title || "Services & Events";
  const description = pageData?.seo?.seoDescription || pageData?.description || "View our weekly service schedule and upcoming events at Enjiri Center Ministries International.";
  const image = pageData?.seo?.seoImage ? heroImageUrl(pageData.seo.seoImage) : "";

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

export default async function ServicesPage() {
  const [sanityEvents, recentEvents, settings, pageData] = await Promise.all([
    fetchSanity<Event[]>(upcomingEventsQuery),
    fetchSanity<Event[]>(recentEventsQuery),
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<ServicesPageData>(servicesPageQuery),
  ]);

  const headerImg = pageData?.headerImage
    ? heroImageUrl(pageData.headerImage)
    : settings?.eventsHeaderImage 
      ? heroImageUrl(settings.eventsHeaderImage) 
      : settings?.defaultHeaderImage
        ? heroImageUrl(settings.defaultHeaderImage)
        : undefined;
      
  const venueImg = settings?.venueImage ? heroImageUrl(settings.venueImage) : undefined;

  const eventsData = sanityEvents && sanityEvents.length > 0
    ? sanityEvents.map((e) => ({
        title: e.title,
        slug: e.slug,
        day: e.isRecurring ? "∞" : new Date(e.date).toLocaleDateString("en-US", { day: "2-digit", timeZone: "Africa/Kampala" }),
        month: e.isRecurring ? (e.recurrence === "monthly" ? "Monthly" : "Weekly") : new Date(e.date).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "Africa/Kampala" }),
        time: formatTime(e.date) + (e.endDate ? ` - ${formatTime(e.endDate)}` : ""),
        location: e.location || "TBD",
        description: e.description || "",
        category: e.category || "worship",
        rsvpUrl: e.rsvpUrl,
        image: e.image ? cardImage(e.image) : "",
      })).filter((e) => e.image)
    : null;

  const displayEvents = eventsData || [];

  const recentData = (recentEvents ?? []).map((e) => ({
    title: e.title,
    slug: e.slug,
    date: formatDate(e.date),
    location: e.location,
    image: e.image ? cardImage(e.image, 700) : "",
  }));

  return (
    <>
      <PageHeader
        label="Join Us"
        title={pageData?.title || "Services & Events"}
        description={pageData?.description || "Come worship with us and be part of the exciting events happening at Enjiri Center Ministries."}
        backgroundImage={headerImg}
      />

      <ServiceSchedule heading={pageData?.scheduleHeading} image={venueImg} />

      <section className="bg-royal-deep py-14 sm:py-16">
        <Container>
          <SectionMasthead label="Mark Your Calendar" index="02" tone="dark" />
          <h2 className="mt-10 mb-10 font-display text-5xl leading-[1.02] font-semibold text-white sm:text-6xl">
            {pageData?.eventsHeading || "Upcoming Events"}
          </h2>
          <EventsGrid events={displayEvents} />

          {recentData.length > 0 && (
            <div className="mt-16">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Recent gatherings</p>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {recentData.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/services/${e.slug}`} className="group block">
                      <span className="relative block aspect-4/5 overflow-hidden">
                        <FitImage src={e.image} alt={e.title} sizes="(min-width: 1024px) 25vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" />
                      </span>
                      <span className="mt-4 block font-mono text-xs text-gold-light">{e.date}</span>
                      <span className="mt-1 block font-display text-2xl text-white transition-colors duration-300 group-hover:text-gold-light">
                        {e.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

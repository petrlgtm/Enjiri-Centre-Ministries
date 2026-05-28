export const revalidate = 60;

import type { Metadata } from "next";
import ServiceSchedule from "@/components/services/ServiceSchedule";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHeader from "@/components/ui/PageHeader";
import SectionDivider from "@/components/ui/SectionDivider";
import EventsGrid from "@/components/services/EventsGrid";
import { fetchSanity } from "@/sanity/lib/helpers";
import { upcomingEventsQuery, siteSettingsQuery, servicesPageQuery } from "@/sanity/queries";
import { cardImage, heroImage as heroImageUrl } from "@/sanity/image";
import { formatDate, formatTime } from "@/lib/utils";
import { Event, SiteSettings, ServicesPageData } from "@/types/sanity";

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
  const [sanityEvents, settings, pageData] = await Promise.all([
    fetchSanity<Event[]>(upcomingEventsQuery),
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
        date: e.isRecurring ? "Recurring" : formatDate(e.date),
        time: formatTime(e.date) + (e.endDate ? ` - ${formatTime(e.endDate)}` : ""),
        location: e.location || "TBD",
        description: e.description || "",
        category: e.category || "worship",
        rsvpUrl: e.rsvpUrl,
        image: e.image ? cardImage(e.image) : "",
      })).filter((e) => e.image)
    : null;

  const displayEvents = eventsData || [];

  return (
    <>
      <PageHeader
        label="Join Us"
        title={pageData?.title || "Services & Events"}
        description={pageData?.description || "Come worship with us and be part of the exciting events happening at Enjiri Center Ministries."}
        backgroundImage={headerImg}
      />

      <ServiceSchedule 
        heading={pageData?.scheduleHeading} 
        image={venueImg} 
      />

      <SectionDivider accent />

      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cream" />
        <Container className="relative">
          <SectionHeading
            label="Mark Your Calendar"
            title={pageData?.eventsHeading || "Upcoming Events"}
            subtitle="Join us for these upcoming gatherings and be part of what God is doing."
            onCream
          />
          <EventsGrid events={displayEvents} />
        </Container>
      </section>
    </>
  );
}

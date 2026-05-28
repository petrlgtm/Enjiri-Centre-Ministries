export const revalidate = 60;

import type { Metadata } from "next";
import ServiceSchedule from "@/components/services/ServiceSchedule";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHeader from "@/components/ui/PageHeader";
import SectionDivider from "@/components/ui/SectionDivider";
import EventsGrid from "@/components/services/EventsGrid";
import { fetchSanity } from "@/sanity/lib/helpers";
import { upcomingEventsQuery, siteSettingsQuery } from "@/sanity/queries";
import { cardImage, heroImage as heroImageUrl } from "@/sanity/image";
import { formatDate, formatTime } from "@/lib/utils";
import { Event, SiteSettings } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Services & Events",
  description:
    "View our weekly service schedule and upcoming events at Enjiri Center Ministries International.",
  openGraph: {
    title: "Services & Events — Enjiri Center Ministries International",
    description:
      "View our weekly service schedule and upcoming events.",
  },
};

export default async function ServicesPage() {
  const [sanityEvents, settings] = await Promise.all([
    fetchSanity<Event[]>(upcomingEventsQuery),
    fetchSanity<SiteSettings>(siteSettingsQuery),
  ]);

  const headerImg = settings?.defaultHeaderImage ? heroImageUrl(settings.defaultHeaderImage) : undefined;

  const eventsData = sanityEvents && sanityEvents.length > 0
    ? sanityEvents.map((e) => ({
        title: e.title,
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
        title="Services & Events"
        description="Come worship with us and be part of the exciting events happening at Enjiri Center Ministries."
        backgroundImage={headerImg}
      />

      <ServiceSchedule />

      <SectionDivider accent />

      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cream" />
        <Container className="relative">
          <SectionHeading
            label="Mark Your Calendar"
            title="Upcoming Events"
            subtitle="Join us for these upcoming gatherings and be part of what God is doing."
            onCream
          />
          <EventsGrid events={displayEvents} />
        </Container>
      </section>
    </>
  );
}

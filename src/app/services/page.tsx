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
import { cardImage } from "@/sanity/image";
import { formatDate, formatTime } from "@/lib/utils";

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

interface SanityEvent {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  image?: { asset: { _ref: string } };
  isRecurring?: boolean;
  featured?: boolean;
  category?: string;
  rsvpUrl?: string;
}

const fallbackEvents = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "9:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    description: "Join us for a powerful time of worship, praise, and the Word of God.",
    category: "worship",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&q=80&fm=webp&fit=crop",
  },
  {
    title: "Youth Conference 2026",
    date: "March 15-17, 2026",
    time: "10:00 AM",
    location: "Church Grounds",
    description: "A life-changing conference for young people. Theme: 'Rising Above'.",
    category: "youth",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80&fm=webp&fit=crop",
  },
  {
    title: "Community Outreach",
    date: "Last Saturday of the Month",
    time: "8:00 AM",
    location: "Various Locations",
    description: "Serving our community with food, clothing, and the love of Christ.",
    category: "outreach",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80&fm=webp&fit=crop",
  },
  {
    title: "Easter Celebration",
    date: "April 5, 2026",
    time: "8:00 AM - 1:00 PM",
    location: "Main Sanctuary",
    description: "Celebrate the resurrection of our Lord Jesus Christ with the entire church family.",
    category: "worship",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80&fm=webp&fit=crop",
  },
  {
    title: "Women's Conference",
    date: "May 9-10, 2026",
    time: "9:00 AM",
    location: "Fellowship Hall",
    description: "A two-day conference empowering women in faith, purpose, and destiny.",
    category: "conference",
    image: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600&q=80&fm=webp&fit=crop",
  },
  {
    title: "Marriage Retreat",
    date: "June 20-21, 2026",
    time: "All Day",
    location: "Off-site Venue",
    description: "Strengthen your marriage through fellowship, workshops, and the Word.",
    category: "fellowship",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fm=webp&fit=crop",
  },
];

export default async function ServicesPage() {
  const [sanityEvents, settings] = await Promise.all([
    fetchSanity<SanityEvent[]>(upcomingEventsQuery),
    fetchSanity<{ heroImage?: { asset: { _ref: string } } }>(siteSettingsQuery),
  ]);

  const heroImg = settings?.heroImage ? cardImage(settings.heroImage, 1200) : undefined;

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

  const displayEvents = eventsData && eventsData.length > 0 ? eventsData : fallbackEvents;

  return (
    <>
      <PageHeader
        label="Join Us"
        title="Services & Events"
        description="Come worship with us and be part of the exciting events happening at Enjiri Center Ministries."
        backgroundImage={heroImg}
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

import type { Metadata } from "next";
import ServiceSchedule from "@/components/services/ServiceSchedule";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHeader from "@/components/ui/PageHeader";
import SectionDivider from "@/components/ui/SectionDivider";
import EventsGrid from "@/components/services/EventsGrid";

export const metadata: Metadata = {
  title: "Services & Events",
  description:
    "View our weekly service schedule and upcoming events at Enjiri Center Ministries International.",
};

const upcomingEvents = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "9:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    description: "Join us for a powerful time of worship, praise, and the Word of God.",
    category: "worship",
  },
  {
    title: "Youth Conference 2026",
    date: "March 15-17, 2026",
    time: "10:00 AM",
    location: "Church Grounds",
    description: "A life-changing conference for young people. Theme: 'Rising Above'.",
    category: "youth",
  },
  {
    title: "Community Outreach",
    date: "Last Saturday of the Month",
    time: "8:00 AM",
    location: "Various Locations",
    description: "Serving our community with food, clothing, and the love of Christ.",
    category: "outreach",
  },
  {
    title: "Easter Celebration",
    date: "April 5, 2026",
    time: "8:00 AM - 1:00 PM",
    location: "Main Sanctuary",
    description: "Celebrate the resurrection of our Lord Jesus Christ with the entire church family.",
    category: "worship",
  },
  {
    title: "Women's Conference",
    date: "May 9-10, 2026",
    time: "9:00 AM",
    location: "Fellowship Hall",
    description: "A two-day conference empowering women in faith, purpose, and destiny.",
    category: "conference",
  },
  {
    title: "Marriage Retreat",
    date: "June 20-21, 2026",
    time: "All Day",
    location: "Off-site Venue",
    description: "Strengthen your marriage through fellowship, workshops, and the Word.",
    category: "fellowship",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Join Us"
        title="Services & Events"
        description="Come worship with us and be part of the exciting events happening at Enjiri Center Ministries."
      />

      <ServiceSchedule />

      <SectionDivider variant="gold-fade" fromColor="var(--background)" toColor="var(--cream)" />

      <section className="section-glow relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cream" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_25%,rgba(138,109,27,0.04),transparent_50%),radial-gradient(ellipse_at_75%_75%,rgba(138,109,27,0.04),transparent_50%)]" />
        <div className="dot-grid-animated absolute inset-0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-dark/15 to-transparent" />
        <Container className="relative">
          <SectionHeading
            label="Mark Your Calendar"
            title="Upcoming Events"
            subtitle="Join us for these upcoming gatherings and be part of what God is doing."
            onCream
          />
          <EventsGrid events={upcomingEvents} />
        </Container>
      </section>
    </>
  );
}

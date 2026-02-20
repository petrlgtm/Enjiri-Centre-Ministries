import type { Metadata } from "next";
import ServiceSchedule from "@/components/services/ServiceSchedule";
import EventCard from "@/components/services/EventCard";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHeader from "@/components/ui/PageHeader";
import SectionDivider from "@/components/ui/SectionDivider";

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
  },
  {
    title: "Youth Conference 2026",
    date: "March 15-17, 2026",
    time: "10:00 AM",
    location: "Church Grounds",
    description: "A life-changing conference for young people. Theme: 'Rising Above'.",
  },
  {
    title: "Community Outreach",
    date: "Last Saturday of the Month",
    time: "8:00 AM",
    location: "Various Locations",
    description: "Serving our community with food, clothing, and the love of Christ.",
  },
  {
    title: "Easter Celebration",
    date: "April 5, 2026",
    time: "8:00 AM - 1:00 PM",
    location: "Main Sanctuary",
    description: "Celebrate the resurrection of our Lord Jesus Christ with the entire church family.",
  },
  {
    title: "Women's Conference",
    date: "May 9-10, 2026",
    time: "9:00 AM",
    location: "Fellowship Hall",
    description: "A two-day conference empowering women in faith, purpose, and destiny.",
  },
  {
    title: "Marriage Retreat",
    date: "June 20-21, 2026",
    time: "All Day",
    location: "Off-site Venue",
    description: "Strengthen your marriage through fellowship, workshops, and the Word.",
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

      <SectionDivider variant="gold-fade" fromColor="var(--navy)" toColor="var(--gray-50)" />

      <section className="section-glow relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gray-50)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_25%,rgba(185,28,28,0.12),transparent_50%),radial-gradient(ellipse_at_75%_75%,rgba(201,168,76,0.10),transparent_50%)]" />
        <div className="dot-grid-animated absolute inset-0" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gray-200)] to-transparent" />
        <Container className="relative">
          <SectionHeading
            label="Mark Your Calendar"
            title="Upcoming Events"
            subtitle="Join us for these upcoming gatherings and be part of what God is doing."
          />
          {/* Staggered 2-column masonry: left column shifted down for visual rhythm */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <div key={event.title} className={index % 3 === 1 ? "lg:mt-10" : ""}>
                <EventCard {...event} index={index} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

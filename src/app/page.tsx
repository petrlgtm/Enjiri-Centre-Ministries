import Hero from "@/components/home/Hero";
import SnapshotBand from "@/components/home/SnapshotBand";
import MissionSection from "@/components/home/MissionSection";
import PlanYourVisit from "@/components/home/PlanYourVisit";
import LatestSermons from "@/components/home/LatestSermons";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import MinistriesGrid from "@/components/home/MinistriesGrid";
import LeadershipHighlight from "@/components/home/LeadershipHighlight";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import DonateBand from "@/components/home/DonateBand";
import ContactInfoCard from "@/components/home/ContactInfoCard";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider from="dark" to="cream" />
      <SnapshotBand />
      <SectionDivider from="cream" to="dark" accent />
      <MissionSection />
      <SectionDivider from="dark" to="cream" />
      <PlanYourVisit />
      <SectionDivider from="cream" to="dark" accent />
      <LatestSermons />
      <SectionDivider from="dark" to="dark" accent />
      <UpcomingEvents />
      <SectionDivider from="dark" to="cream" accent />
      <MinistriesGrid />
      <SectionDivider from="cream" to="dark" />
      <LeadershipHighlight />
      <SectionDivider from="dark" to="cream" accent />
      <TestimonialsCarousel />
      <SectionDivider from="cream" to="dark" />
      <DonateBand />
      <SectionDivider from="dark" to="cream" accent />
      <ContactInfoCard />
    </>
  );
}

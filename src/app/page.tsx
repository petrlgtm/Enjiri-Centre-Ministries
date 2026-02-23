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
      <SectionDivider />
      <SnapshotBand />
      <SectionDivider accent />
      <MissionSection />
      <SectionDivider />
      <PlanYourVisit />
      <SectionDivider accent />
      <LatestSermons />
      <SectionDivider accent />
      <UpcomingEvents />
      <SectionDivider accent />
      <MinistriesGrid />
      <SectionDivider />
      <LeadershipHighlight />
      <SectionDivider accent />
      <TestimonialsCarousel />
      <SectionDivider />
      <DonateBand />
      <SectionDivider accent />
      <ContactInfoCard />
    </>
  );
}

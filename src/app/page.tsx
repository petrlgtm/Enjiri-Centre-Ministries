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
      <SectionDivider variant="wave" fromColor="var(--navy)" toColor="var(--cream)" />
      <SnapshotBand />
      <SectionDivider variant="gold-fade" fromColor="var(--cream)" toColor="var(--gray-50)" />
      <MissionSection />
      <SectionDivider variant="curve" fromColor="var(--gray-50)" toColor="var(--cream)" />
      <PlanYourVisit />
      <SectionDivider variant="gold-fade" fromColor="var(--cream)" toColor="var(--gray-50)" />
      <LatestSermons />
      <SectionDivider variant="angle" fromColor="var(--gray-50)" toColor="var(--navy)" />
      <UpcomingEvents />
      <SectionDivider variant="wave" fromColor="var(--navy)" toColor="var(--cream)" />
      <MinistriesGrid />
      <SectionDivider variant="gold-fade" fromColor="var(--cream)" toColor="var(--background)" />
      <LeadershipHighlight />
      <SectionDivider variant="curve" fromColor="var(--background)" toColor="var(--cream)" />
      <TestimonialsCarousel />
      <SectionDivider variant="angle" fromColor="var(--cream)" toColor="var(--navy)" />
      <DonateBand />
      <SectionDivider variant="wave" fromColor="var(--navy)" toColor="var(--cream)" />
      <ContactInfoCard />
    </>
  );
}

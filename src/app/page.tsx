import Hero from "@/components/home/Hero";
import MissionSection from "@/components/home/MissionSection";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import LatestSermons from "@/components/home/LatestSermons";
import CallToAction from "@/components/home/CallToAction";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider variant="wave" fromColor="var(--navy)" toColor="var(--gray-50)" />
      <MissionSection />
      <SectionDivider variant="curve" fromColor="var(--gray-50)" toColor="var(--navy)" />
      <UpcomingEvents />
      <SectionDivider variant="gold-fade" fromColor="var(--navy)" toColor="var(--gray-50)" />
      <LatestSermons />
      <SectionDivider variant="angle" fromColor="var(--gray-50)" toColor="var(--navy)" />
      <CallToAction />
    </>
  );
}

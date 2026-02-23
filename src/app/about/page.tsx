import type { Metadata } from "next";
import ChurchHistory from "@/components/about/ChurchHistory";
import VisionMission from "@/components/about/VisionMission";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import PageHeader from "@/components/ui/PageHeader";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Enjiri Center Ministries International — our history, vision, mission, core values, and leadership team.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="Get to Know Us"
        title="About Our Church"
        description="A community of believers united in faith, love, and the mission to reach the world with the gospel of Christ."
      />
      <ChurchHistory />
      <SectionDivider variant="gold-fade" fromColor="var(--background)" toColor="var(--cream)" />
      <VisionMission />
      <SectionDivider variant="curve" fromColor="var(--cream)" toColor="var(--background)" />
      <LeadershipTeam />
    </>
  );
}

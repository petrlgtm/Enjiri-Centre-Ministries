import type { Metadata } from "next";
import ChurchHistory from "@/components/about/ChurchHistory";
import VisionMission from "@/components/about/VisionMission";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import PageHeader from "@/components/ui/PageHeader";
import SectionDivider from "@/components/ui/SectionDivider";
import { fetchSanity } from "@/lib/sanity-helpers";
import { allLeadersQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Enjiri Center Ministries International — our history, vision, mission, core values, and leadership team.",
};

interface SanityLeader {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image?: { asset: { _ref: string } };
}

export default async function AboutPage() {
  const leaders = await fetchSanity<SanityLeader[]>(allLeadersQuery);

  const leadersData = leaders?.map((l) => ({
    name: l.name,
    role: l.role,
    bio: l.bio || "",
    image: l.image ? urlFor(l.image).width(400).url() : "",
  })).filter((l) => l.image);

  return (
    <>
      <PageHeader
        label="Get to Know Us"
        title="About Our Church"
        description="A community of believers united in faith, love, and the mission to reach the world with the gospel of Christ."
      />
      <ChurchHistory />
      <SectionDivider accent />
      <VisionMission />
      <SectionDivider accent />
      <LeadershipTeam leaders={leadersData} />
    </>
  );
}

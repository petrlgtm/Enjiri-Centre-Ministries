export const revalidate = 60;

import type { Metadata } from "next";
import ChurchHistory from "@/components/about/ChurchHistory";
import VisionMission from "@/components/about/VisionMission";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import PageHeader from "@/components/ui/PageHeader";
import SectionDivider from "@/components/ui/SectionDivider";
import { fetchSanity } from "@/sanity/lib/helpers";
import { allLeadersQuery, siteSettingsQuery } from "@/sanity/queries";
import { portraitImage, heroImage as heroImageUrl } from "@/sanity/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Enjiri Center Ministries International — our history, vision, mission, core values, and leadership team.",
  openGraph: {
    title: "About Us — Enjiri Center Ministries International",
    description:
      "Learn about our history, vision, mission, core values, and leadership team.",
  },
};

interface SanityLeader {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image?: { asset: { _ref: string } };
}

interface SanitySettings {
  heroImage?: { asset: { _ref: string } };
}

export default async function AboutPage() {
  const [leaders, settings] = await Promise.all([
    fetchSanity<SanityLeader[]>(allLeadersQuery),
    fetchSanity<SanitySettings>(siteSettingsQuery),
  ]);

  const storyImage = settings?.heroImage ? heroImageUrl(settings.heroImage) : "";

  const leadersData = leaders?.map((l) => ({
    name: l.name,
    role: l.role,
    bio: l.bio || "",
    image: l.image ? portraitImage(l.image, 500) : "",
  })).filter((l) => l.image);

  return (
    <>
      <PageHeader
        label="Get to Know Us"
        title="About Our Church"
        description="A community of believers united in faith, love, and the mission to reach the world with the gospel of Christ."
        backgroundImage={storyImage || undefined}
      />
      <ChurchHistory image={storyImage} />
      <SectionDivider accent />
      <VisionMission />
      <SectionDivider accent />
      <LeadershipTeam leaders={leadersData} />
    </>
  );
}

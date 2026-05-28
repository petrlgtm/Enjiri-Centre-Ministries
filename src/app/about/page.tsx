export const revalidate = 60;

import type { Metadata } from "next";
import ChurchHistory from "@/components/about/ChurchHistory";
import VisionMission from "@/components/about/VisionMission";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import PageHeader from "@/components/ui/PageHeader";
import SectionDivider from "@/components/ui/SectionDivider";
import { fetchSanity } from "@/sanity/lib/helpers";
import { allLeadersQuery, siteSettingsQuery, aboutPageQuery } from "@/sanity/queries";
import { portraitImage, heroImage as heroImageUrl } from "@/sanity/image";
import { Leader, SiteSettings, AboutPageData } from "@/types/sanity";

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

export default async function AboutPage() {
  const [leaders, settings, aboutData] = await Promise.all([
    fetchSanity<Leader[]>(allLeadersQuery),
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<AboutPageData>(aboutPageQuery),
  ]);

  const headerImage = aboutData?.headerImage 
    ? heroImageUrl(aboutData.headerImage) 
    : settings?.defaultHeaderImage 
      ? heroImageUrl(settings.defaultHeaderImage) 
      : "";

  const storyImage = aboutData?.historyImage 
    ? heroImageUrl(aboutData.historyImage) 
    : headerImage;

  const leadersData = leaders?.map((l) => ({
    name: l.name,
    role: l.role,
    bio: l.bio || "",
    image: l.image ? portraitImage(l.image, 500) : "",
  })).filter((l) => l.image);

  return (
    <>
      <PageHeader
        label={aboutData?.description ? "Get to Know Us" : undefined}
        title={aboutData?.title || "About Our Church"}
        description={aboutData?.description || "A community of believers united in faith, love, and the mission to reach the world with the gospel of Christ."}
        backgroundImage={headerImage || undefined}
      />
      <ChurchHistory 
        image={storyImage} 
        title={aboutData?.historyTitle}
        text={aboutData?.historyText}
        stats={aboutData?.historyStats}
        timeline={aboutData?.timeline}
      />
      <SectionDivider accent />
      <VisionMission 
        vision={aboutData?.vision}
        mission={aboutData?.mission}
        commission={aboutData?.commission}
        statementOfFaith={aboutData?.statementOfFaith}
        coreValues={aboutData?.coreValues}
      />
      <SectionDivider accent />
      <LeadershipTeam leaders={leadersData} />
    </>
  );
}

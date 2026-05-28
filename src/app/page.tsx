export const revalidate = 60;

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
import { fetchSanity } from "@/sanity/lib/helpers";
import {
  homepageEventsQuery,
  allLeadersQuery,
  allTestimoniesQuery,
  allMinistriesQuery,
  siteSettingsQuery,
  homePageQuery,
  latestSermonsQuery,
} from "@/sanity/queries";
import { cardImage, portraitImage, heroImage } from "@/sanity/image";
import { formatDate, formatTime } from "@/lib/utils";
import {
  Event,
  Leader,
  Testimony,
  Ministry,
  SiteSettings,
  HomePageData,
  Sermon,
} from "@/types/sanity";

export default async function HomePage() {
  const [events, leaders, testimonies, ministries, settings, homePage, sermons] = await Promise.all([
    fetchSanity<Event[]>(homepageEventsQuery),
    fetchSanity<Leader[]>(allLeadersQuery),
    fetchSanity<Testimony[]>(allTestimoniesQuery),
    fetchSanity<Ministry[]>(allMinistriesQuery),
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<HomePageData>(homePageQuery),
    fetchSanity<Sermon[]>(latestSermonsQuery),
  ]);

  const heroImagesData = homePage?.heroImages?.map(img => ({
    src: heroImage(img),
    alt: img.alt
  })) || [];
  
  const visitImageUrl = homePage?.visitImage ? heroImage(homePage.visitImage) : "";
  const ctaImageUrl = homePage?.ctaImage ? heroImage(homePage.ctaImage) : "";

  const eventsData = events?.map((e) => ({
    title: e.title,
    date: e.isRecurring ? "Every Sunday" : formatDate(e.date),
    time: formatTime(e.date) + (e.endDate ? ` - ${formatTime(e.endDate)}` : ""),
    location: e.location || "TBD",
    description: e.description || "",
    image: e.image ? cardImage(e.image) : "",
    accent: e.featured ? "from-gold to-gold-dark" : "from-gold-dark to-gold",
    featured: e.featured || false,
  })).filter((e) => e.image);

  const sermonsData = sermons?.map((s) => ({
    title: s.title,
    speaker: s.speaker?.name || "Pastor",
    date: formatDate(s.date),
    series: s.series,
    slug: s.slug,
    image: s.thumbnail ? cardImage(s.thumbnail) : "",
  })).filter((s) => s.image);

  const leaderData = leaders?.[0]
    ? {
        name: leaders[0].name,
        role: leaders[0].role,
        bio: leaders[0].bio || "",
        image: leaders[0].image ? portraitImage(leaders[0].image) : "",
      }
    : undefined;

  const testimoniesData = testimonies?.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role || "",
  }));

  const ministriesData = ministries?.map((m) => ({
    title: m.title,
    description: m.description || "",
    icon: m.icon,
    ctaText: m.ctaText || "Learn More",
    ctaUrl: m.ctaUrl || "/contact",
  }));

  const snapshotData = homePage?.snapshotItems;

  const donateBandData = homePage ? {
    heading: homePage.donateBandHeading,
    text: homePage.donateBandText,
    image: ctaImageUrl,
  } : undefined;

  const heroData = {
    heading: homePage?.heroHeading,
    subheading: homePage?.heroSubheading,
    cta: homePage?.heroCta,
    secondaryText: homePage?.heroSecondaryText,
    secondaryUrl: homePage?.heroSecondaryUrl,
  };

  const missionValuesData = homePage?.missionValues?.map((v) => ({
    title: v.title,
    description: v.description,
    image: v.image ? cardImage(v.image) : "",
    link: v.link,
  }));

  return (
    <>
      <Hero heroImages={heroImagesData} {...heroData} />
      <SectionDivider />
      <SnapshotBand items={snapshotData} />
      <SectionDivider />
      <MissionSection
        missionText={homePage?.missionText}
        visionText={homePage?.visionText}
        values={missionValuesData}
      />
      <SectionDivider accent />
      <PlanYourVisit image={visitImageUrl} />
      <SectionDivider />
      <LatestSermons sermons={sermonsData} />
      <SectionDivider accent />
      <UpcomingEvents events={eventsData} />
      <SectionDivider accent />
      <MinistriesGrid ministries={ministriesData} />
      <SectionDivider />
      <TestimonialsCarousel testimonies={testimoniesData} />
      <SectionDivider accent />
      <DonateBand
        heading={donateBandData?.heading}
        text={donateBandData?.text}
        image={donateBandData?.image}
      />
      <SectionDivider />
      <ContactInfoCard settings={settings} />
      <SectionDivider accent />
      <LeadershipHighlight leader={leaderData} />
    </>
  );
}

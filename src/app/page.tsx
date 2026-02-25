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
} from "@/sanity/queries";
import { cardImage, portraitImage, heroImage } from "@/sanity/image";
import { formatDate, formatTime } from "@/lib/utils";

interface SanityImage {
  asset: { _ref: string };
}

interface SanityEvent {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  image?: SanityImage;
  isRecurring?: boolean;
  featured?: boolean;
  category?: string;
}

interface SanityLeader {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image?: SanityImage;
}

interface SanityTestimony {
  _id: string;
  quote: string;
  name: string;
  role: string;
}

interface SanityMinistry {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  ctaText?: string;
  ctaUrl?: string;
}

interface SanitySettings {
  heroImage?: SanityImage;
}

export default async function HomePage() {
  const [events, leaders, testimonies, ministries, settings] = await Promise.all([
    fetchSanity<SanityEvent[]>(homepageEventsQuery),
    fetchSanity<SanityLeader[]>(allLeadersQuery),
    fetchSanity<SanityTestimony[]>(allTestimoniesQuery),
    fetchSanity<SanityMinistry[]>(allMinistriesQuery),
    fetchSanity<SanitySettings>(siteSettingsQuery),
  ]);

  const heroImageUrl = settings?.heroImage ? heroImage(settings.heroImage) : "";

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
    role: t.role,
  }));

  const ministriesData = ministries?.map((m) => ({
    title: m.title,
    description: m.description,
    icon: m.icon,
    ctaText: m.ctaText || "Learn More",
    ctaUrl: m.ctaUrl || "/contact",
  }));

  return (
    <>
      <Hero heroImage={heroImageUrl} />
      <SectionDivider />
      <LeadershipHighlight leader={leaderData} />
      <SectionDivider accent />
      <SnapshotBand />
      <SectionDivider />
      <MissionSection />
      <SectionDivider accent />
      <PlanYourVisit image={heroImageUrl} />
      <SectionDivider />
      <LatestSermons />
      <SectionDivider accent />
      <UpcomingEvents events={eventsData} />
      <SectionDivider accent />
      <MinistriesGrid ministries={ministriesData} />
      <SectionDivider />
      <TestimonialsCarousel testimonies={testimoniesData} />
      <SectionDivider accent />
      <DonateBand />
      <SectionDivider />
      <ContactInfoCard />
    </>
  );
}

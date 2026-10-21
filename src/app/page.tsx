export const revalidate = 60;

import LeaderHero from "@/components/home/editorial/LeaderHero";
import CallingSection from "@/components/home/editorial/CallingSection";
import WordSection, { WordItem } from "@/components/home/editorial/WordSection";
import GatherDiary from "@/components/home/editorial/GatherDiary";
import MinistryIndex from "@/components/home/editorial/MinistryIndex";
import TestimonyFeature from "@/components/home/editorial/TestimonyFeature";
import PartnerBand from "@/components/home/editorial/PartnerBand";
import ContactStrip from "@/components/home/editorial/ContactStrip";
import { fetchSanity } from "@/sanity/lib/helpers";
import {
  homepageEventsQuery,
  allTestimoniesQuery,
  allMinistriesQuery,
  siteSettingsQuery,
  homePageQuery,
  latestSermonsQuery,
  allLeadersQuery,
  allGalleriesQuery,
} from "@/sanity/queries";
import { cardImage, portraitImage, urlFor } from "@/sanity/image";
import { formatDate, formatTime, cleanVideoTitle, getYouTubeVideoId } from "@/lib/utils";
import youtubeCache from "@/../public/youtube-cache.json";
import {
  Event,
  Testimony,
  Ministry,
  SiteSettings,
  HomePageData,
  Sermon,
  Leader,
  Gallery,
} from "@/types/sanity";

export default async function HomePage() {
  const [events, testimonies, ministries, settings, homePage, sermons, leaders, galleries] = await Promise.all([
    fetchSanity<Event[]>(homepageEventsQuery),
    fetchSanity<Testimony[]>(allTestimoniesQuery),
    fetchSanity<Ministry[]>(allMinistriesQuery),
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<HomePageData>(homePageQuery),
    fetchSanity<Sermon[]>(latestSermonsQuery),
    fetchSanity<Leader[]>(allLeadersQuery),
    fetchSanity<Gallery[]>(allGalleriesQuery),
  ]);

  // Editable in Studio (Home Page → Plan Your Visit Image); falls back to the latest gallery cover.
  const gatherGallery = galleries?.find((g) => g.coverImage);
  const gatherPhoto = homePage?.visitImage
    ? { src: portraitImage(homePage.visitImage, 600), alt: homePage.visitImage.alt || "Enjiri Center Ministries" }
    : gatherGallery?.coverImage
    ? { src: portraitImage(gatherGallery.coverImage, 600), alt: gatherGallery.coverImage.alt || gatherGallery.title }
    : null;

  const leader = leaders?.find((l) => l.featured) ?? leaders?.[0];
  const leaderData = leader && (leader.imageCutout || leader.image)
    ? {
        name: leader.name,
        role: leader.role,
        isCutout: Boolean(leader.imageCutout),
        image: leader.imageCutout
          ? urlFor(leader.imageCutout).auto("format").url()
          : portraitImage(leader.image, 900),
        alt: leader.imageCutout?.alt || leader.image?.alt,
      }
    : null;

  // Sanity sermons first; fall back to the cached YouTube channel feed.
  const sanitySermons: WordItem[] = (sermons ?? [])
    .filter((s) => s.thumbnail)
    .map((s) => ({
      title: s.title,
      speaker: s.speaker?.name,
      date: formatDate(s.date),
      videoId: getYouTubeVideoId(s.videoUrl ?? "") ?? "",
      image: cardImage(s.thumbnail, 1200),
    }));
  const wordItems: WordItem[] = sanitySermons.length > 0
    ? sanitySermons
    : (youtubeCache.collections?.sermons ?? youtubeCache.videos ?? []).slice(0, 5).map((v) => ({
        title: cleanVideoTitle(v.title),
        speaker: v.channelTitle.trim(),
        date: formatDate(v.publishedAt),
        videoId: v.id,
        image: v.thumbnail,
      }));

  const diaryEvents = (events ?? [])
    .filter((e) => !e.isRecurring)
    .map((e) => {
      const d = new Date(e.date);
      return {
        day: d.toLocaleDateString("en-US", { day: "2-digit", timeZone: "Africa/Kampala" }),
        month: d.toLocaleDateString("en-US", { month: "short", timeZone: "Africa/Kampala" }),
        title: e.title,
        time: formatTime(e.date) + (e.endDate ? ` – ${formatTime(e.endDate)}` : ""),
        location: e.location || "TBD",
      };
    });

  const ministriesData = ministries?.map((m) => ({
    title: m.title,
    description: m.description || "",
    ctaUrl: m.ctaUrl || "/contact",
  }));

  const testimoniesData = testimonies?.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role || "",
  }));

  return (
    <>
      <LeaderHero
        heading={homePage?.heroHeading}
        subheading={homePage?.heroSubheading}
        cta={homePage?.heroCta}
        secondaryText={homePage?.heroSecondaryText}
        secondaryUrl={homePage?.heroSecondaryUrl}
        leader={leaderData}
        schedule={settings?.serviceSchedule}
      />
      <CallingSection
        missionText={homePage?.missionText}
        visionText={homePage?.visionText}
        stats={homePage?.snapshotItems}
      />
      <WordSection sermons={wordItems} />
      <GatherDiary
        events={diaryEvents}
        schedule={settings?.serviceSchedule}
        address={settings?.address}
        photo={gatherPhoto}
      />
      <MinistryIndex ministries={ministriesData} />
      <TestimonyFeature testimonies={testimoniesData} />
      <PartnerBand heading={homePage?.donateBandHeading} text={homePage?.donateBandText} />
      <ContactStrip address={settings?.address} phone={settings?.phone} email={settings?.email} />
    </>
  );
}

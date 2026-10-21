"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { HiPlay, HiMusicNote } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import PageHeader from "@/components/ui/PageHeader";
import SermonCard from "@/components/sermons/SermonCard";
import SermonFilter, { type DateRange } from "@/components/sermons/SermonFilter";
import { usePlayer, type PlayerItem } from "@/components/player/PlayerProvider";
import { fetchYouTubeVideos, searchYouTubeVideos, type YouTubeVideo } from "@/lib/youtube";
import { formatDate, getYouTubeVideoId, cleanVideoTitle } from "@/lib/utils";

const featuredFallbackImage =
  "https://cdn.sanity.io/images/shcw5txc/production/168a13614469e2c48babeb394973f9356e741e12-3508x2480.jpg?w=800&q=80&fm=webp&fit=crop";

const CHANNEL_ID = "UCFStM9EkCFD3h8b4xtlHIOQ";

const placeholderSermons = [
  { title: "Walking in God's Purpose", speaker: "Pastor John", date: "February 16, 2026", rawDate: "2026-02-16T10:00:00Z", slug: "walking-in-gods-purpose" },
  { title: "The Power of Prayer", speaker: "Pastor John", date: "February 9, 2026", rawDate: "2026-02-09T10:00:00Z", slug: "the-power-of-prayer" },
  { title: "Grace That Transforms", speaker: "Guest Speaker", date: "February 2, 2026", rawDate: "2026-02-02T10:00:00Z", slug: "grace-that-transforms" },
  { title: "The Heart of Worship", speaker: "Pastor Jane", date: "January 26, 2026", rawDate: "2026-01-26T10:00:00Z", slug: "the-heart-of-worship" },
  { title: "Standing on God's Promises", speaker: "Pastor John", date: "January 19, 2026", rawDate: "2026-01-19T10:00:00Z", slug: "standing-on-gods-promises" },
  { title: "Faith Over Fear", speaker: "Pastor John", date: "January 12, 2026", rawDate: "2026-01-12T10:00:00Z", slug: "faith-over-fear" },
];

interface SermonItem {
  title: string;
  speaker: string;
  date: string;
  rawDate: string;
  series?: string;
  slug: string;
  thumbnail?: string;
  videoUrl?: string;
}

function youtubeToSermon(video: YouTubeVideo): SermonItem {
  return {
    title: cleanVideoTitle(video.title),
    speaker: video.channelTitle.trim(),
    date: formatDate(video.publishedAt),
    rawDate: video.publishedAt,
    slug: video.id,
    thumbnail: video.thumbnail,
    videoUrl: video.videoUrl,
  };
}

function toPlayerItem(s: SermonItem): PlayerItem {
  return {
    id: getYouTubeVideoId(s.videoUrl ?? "") ?? s.slug,
    title: s.title,
    subtitle: s.speaker,
    date: s.date,
    thumbnail: s.thumbnail,
  };
}

function filterByDateRange(sermons: SermonItem[], range: DateRange): SermonItem[] {
  if (range === "all") return sermons;
  const now = new Date();
  const cutoff = new Date();
  if (range === "month") cutoff.setDate(now.getDate() - 30);
  else if (range === "3months") cutoff.setDate(now.getDate() - 90);
  else if (range === "year") cutoff.setFullYear(now.getFullYear() - 1);
  return sermons.filter((s) => new Date(s.rawDate) >= cutoff);
}

interface SermonsContentProps {
  headerImage: string;
  title?: string;
  description?: string;
  featuredLabel?: string;
}

export default function SermonsContent({ 
  headerImage, 
  title = "Sermons, Teachings, Charities & Reach Outs",
  description = "Watch or listen to our sermons and be encouraged by the teaching of God's Word.",
  featuredLabel = "Latest Sermon"
}: SermonsContentProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [youtubeSermons, setYoutubeSermons] = useState<SermonItem[]>([]);
  const [searchResults, setSearchResults] = useState<SermonItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(30);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { current, play } = usePlayer();
  const selectedSlug = current?.id ?? null;

  // Load channel videos (up to 1000 from the cache)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const videos = await fetchYouTubeVideos(CHANNEL_ID, 1000);
        if (!cancelled && videos.length > 0) {
          setYoutubeSermons(videos.map(youtubeToSermon));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Deep-link: ?play=VIDEO_ID opens the theatre once the list has loaded
  const deepLinked = useRef(false);
  useEffect(() => {
    const id = searchParams.get("play");
    if (!id || deepLinked.current || youtubeSermons.length === 0) return;
    const match = youtubeSermons.find((s) => s.slug === id);
    deepLinked.current = true;
    play(match ? toPlayerItem(match) : { id, title: "Sermon" }, youtubeSermons.map(toPlayerItem));
  }, [searchParams, youtubeSermons, play]);

  // Debounced YouTube search
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setSearchResults(null);
      setSearching(false);
      return;
    }

    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      const results = await searchYouTubeVideos(value, CHANNEL_ID, 100);
      setSearchResults(results.length > 0 ? results.map(youtubeToSermon) : []);
      setSearching(false);
    }, 500);
  }, []);

  const baseSermons: SermonItem[] = searchResults ?? (youtubeSermons.length > 0 ? youtubeSermons : placeholderSermons);

  // Featured sermon = most recent; excluded from grid when not searching
  const featuredSermon = !searchResults && baseSermons.length > 0 ? baseSermons[0] : null;
  const gridSermons = featuredSermon ? baseSermons.slice(1) : baseSermons;
  const filteredSermons = useMemo(() => filterByDateRange(gridSermons, dateRange), [gridSermons, dateRange]);
  
  const playSermon = (s: SermonItem) => play(toPlayerItem(s), baseSermons.map(toPlayerItem));

  const displaySermons = useMemo(() => filteredSermons.slice(0, visibleCount), [filteredSermons, visibleCount]);
  const hasMore = filteredSermons.length > visibleCount;

  return (
    <>
      <PageHeader
        label="The Word of God"
        title={title}
        description={description}
        backgroundImage={headerImage}
      />

      <section className="bg-cream pt-14 pb-16 text-cream-heading sm:pt-16 sm:pb-20">
        <Container>
          <SectionMasthead label={featuredLabel} index="01" />

          {/* Featured latest sermon */}
          {loading && !featuredSermon ? (
            <div className="mt-10 mb-16 grid animate-pulse gap-10 lg:grid-cols-12">
              <div className="aspect-video bg-cream-heading/10 lg:col-span-7" />
              <div className="space-y-4 lg:col-span-5">
                <div className="h-4 w-32 bg-cream-heading/10" />
                <div className="h-10 w-3/4 bg-cream-heading/10" />
              </div>
            </div>
          ) : featuredSermon ? (
            <button
              type="button"
              onClick={() => playSermon(featuredSermon)}
              className="group mt-10 mb-16 grid w-full gap-8 text-left lg:grid-cols-12 lg:items-center lg:gap-12"
            >
              <span className="relative block aspect-video overflow-hidden bg-navy lg:col-span-7">
                <Image
                  src={featuredSermon.thumbnail || featuredFallbackImage}
                  alt={featuredSermon.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-0 left-0 inline-flex items-center gap-2 bg-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy">
                  {selectedSlug === featuredSermon.slug ? <HiMusicNote size={16} className="animate-pulse" /> : <HiPlay size={16} />}
                  {selectedSlug === featuredSermon.slug ? "Playing now" : "Watch now"}
                </span>
              </span>
              <span className="lg:col-span-5">
                <span className="block font-mono text-[11px] tracking-[0.18em] text-gold-dark uppercase">{featuredSermon.date}</span>
                <span className="mt-4 block font-display text-3xl leading-[1.12] font-semibold transition-colors duration-300 group-hover:text-gold-dark sm:text-4xl">
                  {featuredSermon.title}
                </span>
                <span className="mt-4 block text-sm text-cream-muted">{featuredSermon.speaker}</span>
              </span>
            </button>
          ) : null}

          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream-heading">The library</p>
          <SermonFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />

          {(loading && youtubeSermons.length === 0) || searching ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-video animate-pulse bg-cream-heading/10" />
              ))}
            </div>
          ) : displaySermons.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
                {displaySermons.map((sermon, index) => (
                  <SermonCard
                    key={sermon.slug}
                    {...sermon}
                    index={index}
                    isActive={selectedSlug === sermon.slug}
                    onClick={() => playSermon(sermon)}
                  />
                ))}
              </div>
              
              {hasMore && (
                <div className="mt-14 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 30)}
                    className="bg-cream-heading px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:bg-gold-dark"
                  >
                    Load more teachings
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-cream-body">
                No sermons found matching your search.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

"use client";

import { useState, useMemo, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiPlay, HiMusicNote } from "react-icons/hi";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SermonCard from "@/components/sermons/SermonCard";
import SermonFilter, { type DateRange } from "@/components/sermons/SermonFilter";
import SermonPlayerPanel from "@/components/sermons/SermonPlayerPanel";
import { fetchYouTubeVideos, searchYouTubeVideos, type YouTubeVideo } from "@/lib/youtube";
import { formatDate, getYouTubeVideoId } from "@/lib/utils";
import { cn } from "@/lib/utils";

const featuredFallbackImage =
  "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80&fm=webp&fit=crop";

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
    title: video.title,
    speaker: video.channelTitle,
    date: formatDate(video.publishedAt),
    rawDate: video.publishedAt,
    slug: video.id,
    thumbnail: video.thumbnail,
    videoUrl: video.videoUrl,
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

function SermonsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [youtubeSermons, setYoutubeSermons] = useState<SermonItem[]>([]);
  const [searchResults, setSearchResults] = useState<SermonItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Load channel videos
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const videos = await fetchYouTubeVideos(CHANNEL_ID, 12);
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

  // Deep-link: ?play=VIDEO_ID
  useEffect(() => {
    const playParam = searchParams.get("play");
    if (playParam) {
      setSelectedSlug(playParam);
    }
  }, [searchParams]);

  // Scroll to player when selected — delay to let the panel animate open,
  // and offset for the fixed navbar height
  useEffect(() => {
    if (selectedSlug && playerRef.current) {
      const timer = setTimeout(() => {
        const el = playerRef.current;
        if (!el) return;
        const navbarHeight = window.innerWidth >= 1024 ? 96 : 80;
        const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
        window.scrollTo({ top, behavior: "smooth" });
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [selectedSlug]);

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
      const results = await searchYouTubeVideos(value, CHANNEL_ID);
      setSearchResults(results.length > 0 ? results.map(youtubeToSermon) : []);
      setSearching(false);
    }, 500);
  }, []);

  const baseSermons: SermonItem[] = searchResults ?? (youtubeSermons.length > 0 ? youtubeSermons : placeholderSermons);

  // Featured sermon = most recent; excluded from grid when not searching
  const featuredSermon = !searchResults && baseSermons.length > 0 ? baseSermons[0] : null;
  const gridSermons = featuredSermon ? baseSermons.slice(1) : baseSermons;
  const filteredSermons = useMemo(() => filterByDateRange(gridSermons, dateRange), [gridSermons, dateRange]);

  const selectedSermon: SermonItem | null = selectedSlug
    ? (youtubeSermons.find((s) => s.slug === selectedSlug) ??
       baseSermons.find((s) => s.slug === selectedSlug) ??
       null)
    : null;

  const videoId = selectedSermon
    ? (getYouTubeVideoId(selectedSermon.videoUrl ?? "") ?? selectedSermon.slug)
    : null;

  return (
    <>
      <PageHeader
        label="The Word of God"
        title="Sermons & Teachings"
        description="Watch or listen to our sermons and be encouraged by the teaching of God's Word."
        backgroundImage="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80&fm=webp&fit=crop"
      />

      <section className="relative overflow-hidden py-28">
        <Container>
          {/* Player panel */}
          <div ref={playerRef}>
            {selectedSermon && videoId && (
              <SermonPlayerPanel
                videoId={videoId}
                title={selectedSermon.title}
                thumbnail={selectedSermon.thumbnail}
                speaker={selectedSermon.speaker}
                date={selectedSermon.date}
                onClose={() => setSelectedSlug(null)}
              />
            )}
          </div>

          {/* Featured latest sermon */}
          {loading && !featuredSermon ? (
            <div className="mb-10 animate-pulse rounded-3xl bg-[var(--gray-100)] border border-white/[0.06]">
              <div className="flex flex-col md:flex-row">
                <div className="aspect-[16/9] w-full md:w-1/2 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none bg-[var(--gray-200)]" />
                <div className="flex-1 p-8 space-y-4">
                  <div className="h-5 w-28 rounded-full bg-[var(--gray-200)]" />
                  <div className="h-8 w-3/4 rounded bg-[var(--gray-200)]" />
                  <div className="h-4 w-1/2 rounded bg-[var(--gray-200)]" />
                  <div className="h-12 w-40 rounded-full bg-[var(--gray-200)]" />
                </div>
              </div>
            </div>
          ) : featuredSermon ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <button
                type="button"
                onClick={() => setSelectedSlug(featuredSermon.slug)}
                className={cn(
                  "card-premium group block w-full overflow-hidden rounded-3xl border bg-[var(--gray-100)] text-left shadow-lg ring-1 transition-all duration-500 hover:shadow-2xl hover:shadow-black/30",
                  selectedSlug === featuredSermon.slug
                    ? "border-gold/40 ring-gold/30 shadow-gold-glow"
                    : "border-white/[0.06] ring-transparent hover:ring-2 hover:ring-gold/30"
                )}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] w-full md:w-1/2 overflow-hidden rounded-t-2xl sm:rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <Image
                      src={featuredSermon.thumbnail || featuredFallbackImage}
                      alt={featuredSermon.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:brightness-90"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-navy/5 md:to-navy/40" />

                    {/* Large play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping" style={{ animationDuration: "2.5s" }} />
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          transition={{ type: "spring", bounce: 0.5 }}
                          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold/90 text-navy shadow-[0_4px_30px_rgba(201,168,76,0.5)] transition-all duration-500 group-hover:shadow-[0_8px_40px_rgba(201,168,76,0.7)]"
                        >
                          <HiPlay size={36} className="ml-1" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Now Playing badge on thumbnail */}
                    {selectedSlug === featuredSermon.slug && (
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold tracking-wide text-navy">
                          <HiMusicNote size={14} className="animate-pulse" />
                          Now Playing
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-center p-7 md:p-10">
                    <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-gold">
                      Latest Sermon
                    </span>
                    <h3 className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-gold md:text-3xl line-clamp-2">
                      {featuredSermon.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-sm text-[var(--gray-500)]">
                      <span className="font-medium">{featuredSermon.speaker}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--gray-300)]" />
                      <span>{featuredSermon.date}</span>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                      <HiPlay size={14} />
                      <span>{selectedSlug === featuredSermon.slug ? "Playing Now" : "Watch Now"}</span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ) : null}

          <SermonFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />

          {(loading && youtubeSermons.length === 0) || searching ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-3xl bg-[var(--gray-100)]" />
              ))}
            </div>
          ) : filteredSermons.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSermons.map((sermon, index) => (
                <SermonCard
                  key={sermon.slug}
                  {...sermon}
                  index={index}
                  isActive={selectedSlug === sermon.slug}
                  onClick={() => setSelectedSlug(sermon.slug)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-[var(--gray-500)]">
                No sermons found matching your search.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export default function SermonsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-40 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      }
    >
      <SermonsContent />
    </Suspense>
  );
}

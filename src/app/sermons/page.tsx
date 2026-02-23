"use client";

import { useState, useMemo, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SermonCard from "@/components/sermons/SermonCard";
import SermonFilter, { type DateRange } from "@/components/sermons/SermonFilter";
import SermonPlayerPanel from "@/components/sermons/SermonPlayerPanel";
import { fetchYouTubeVideos, searchYouTubeVideos, type YouTubeVideo } from "@/lib/youtube";
import { formatDate, getYouTubeVideoId } from "@/lib/utils";

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

  // Scroll to player when selected
  useEffect(() => {
    if (selectedSlug && playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const filteredSermons = useMemo(() => filterByDateRange(baseSermons, dateRange), [baseSermons, dateRange]);

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
      />

      <section className="section-glow relative overflow-hidden py-28">
        <div className="dot-grid-animated absolute inset-0" />
        <div className="pointer-events-none absolute -left-40 top-40 h-[400px] w-[400px] rounded-full opacity-[0.02]">
          <div className="morph-blob h-full w-full bg-gradient-to-tr from-gold to-transparent" />
        </div>

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

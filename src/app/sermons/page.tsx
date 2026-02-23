"use client";

import { useState, useMemo, useEffect } from "react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SermonCard from "@/components/sermons/SermonCard";
import SermonFilter from "@/components/sermons/SermonFilter";
import { fetchYouTubeVideos, type YouTubeVideo } from "@/lib/youtube";
import { formatDate } from "@/lib/utils";

const CHANNEL_ID = "UCFStM9EkCFD3h8b4xtlHIOQ";

const placeholderSermons = [
  { title: "Walking in God's Purpose", speaker: "Pastor John", date: "February 16, 2026", series: "Living by Faith", slug: "walking-in-gods-purpose" },
  { title: "The Power of Prayer", speaker: "Pastor John", date: "February 9, 2026", series: "Living by Faith", slug: "the-power-of-prayer" },
  { title: "Grace That Transforms", speaker: "Guest Speaker", date: "February 2, 2026", series: "Amazing Grace", slug: "grace-that-transforms" },
  { title: "The Heart of Worship", speaker: "Pastor Jane", date: "January 26, 2026", series: "Amazing Grace", slug: "the-heart-of-worship" },
  { title: "Standing on God's Promises", speaker: "Pastor John", date: "January 19, 2026", series: "Unshakeable Faith", slug: "standing-on-gods-promises" },
  { title: "Faith Over Fear", speaker: "Pastor John", date: "January 12, 2026", series: "Unshakeable Faith", slug: "faith-over-fear" },
  { title: "The Blessing of Generosity", speaker: "Elder David", date: "January 5, 2026", series: "Living by Faith", slug: "the-blessing-of-generosity" },
  { title: "New Beginnings in Christ", speaker: "Pastor John", date: "December 29, 2025", series: "New Season", slug: "new-beginnings-in-christ" },
  { title: "The Christmas Story", speaker: "Pastor John", date: "December 25, 2025", series: "New Season", slug: "the-christmas-story" },
];

interface SermonItem {
  title: string;
  speaker: string;
  date: string;
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
    slug: video.id,
    thumbnail: video.thumbnail,
    videoUrl: video.videoUrl,
  };
}

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [youtubeSermons, setYoutubeSermons] = useState<SermonItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  const sermons: SermonItem[] = youtubeSermons.length > 0 ? youtubeSermons : placeholderSermons;

  const seriesList = useMemo(() => {
    return Array.from(new Set(sermons.map((s) => s.series).filter(Boolean) as string[]));
  }, [sermons]);

  const filteredSermons = useMemo(() => {
    return sermons.filter((sermon) => {
      const matchSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSeries = !selectedSeries || sermon.series === selectedSeries;
      return matchSearch && matchSeries;
    });
  }, [sermons, searchQuery, selectedSeries]);

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
          <SermonFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSeries={selectedSeries}
            onSeriesChange={setSelectedSeries}
            seriesList={seriesList}
          />

          {loading && youtubeSermons.length === 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-3xl bg-[var(--gray-100)]" />
              ))}
            </div>
          ) : filteredSermons.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSermons.map((sermon, index) => (
                <SermonCard key={sermon.slug} {...sermon} index={index} />
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

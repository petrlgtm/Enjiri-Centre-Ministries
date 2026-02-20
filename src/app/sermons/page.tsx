"use client";

import { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SermonCard from "@/components/sermons/SermonCard";
import SermonFilter from "@/components/sermons/SermonFilter";

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

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");

  const seriesList = useMemo(() => {
    return Array.from(new Set(placeholderSermons.map((s) => s.series)));
  }, []);

  const filteredSermons = useMemo(() => {
    return placeholderSermons.filter((sermon) => {
      const matchSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSeries = !selectedSeries || sermon.series === selectedSeries;
      return matchSearch && matchSeries;
    });
  }, [searchQuery, selectedSeries]);

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

          {filteredSermons.length > 0 ? (
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

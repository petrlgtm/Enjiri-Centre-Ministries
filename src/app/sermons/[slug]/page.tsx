import type { Metadata } from "next";
import Link from "next/link";
import {
  HiArrowLeft,
  HiCalendar,
  HiUser,
  HiCollection,
  HiDocumentText,
} from "react-icons/hi";
import Container from "@/components/ui/Container";
import SermonPlayer from "@/components/sermons/SermonPlayer";

const placeholderSermons: Record<
  string,
  {
    title: string;
    speaker: string;
    date: string;
    series: string;
    description: string;
    speakerBio?: string;
    notes?: string;
    videoUrl?: string;
    audioUrl?: string;
  }
> = {
  "walking-in-gods-purpose": {
    title: "Walking in God's Purpose",
    speaker: "Pastor John",
    date: "February 16, 2026",
    series: "Living by Faith",
    description:
      "In this powerful sermon, Pastor John explores what it means to walk in the purpose God has designed for each of us. Drawing from Jeremiah 29:11 and Ephesians 2:10, we discover that God has a unique plan for every believer — a plan filled with hope and a future. Learn how to identify your calling, overcome distractions, and step boldly into the destiny God has prepared for you.",
    speakerBio:
      "Pastor John has served in ministry for over 15 years, leading with passion and deep commitment to God's Word. His heart is to see every believer walk in their God-given purpose.",
    notes:
      "Key Scripture: Jeremiah 29:11, Ephesians 2:10. Three pillars of walking in purpose: 1) Hearing God's voice through prayer and His Word. 2) Stepping out in faith despite uncertainty. 3) Trusting God's timing over your own.",
  },
  "the-power-of-prayer": {
    title: "The Power of Prayer",
    speaker: "Pastor John",
    date: "February 9, 2026",
    series: "Living by Faith",
    description:
      "Prayer is the lifeline of every believer. In this teaching, we examine how prayer transforms our relationship with God and unlocks His power in our lives. From the model prayer Jesus taught His disciples to the fervent prayers of the early church, discover the keys to an effective and powerful prayer life.",
    speakerBio:
      "Pastor John has served in ministry for over 15 years, leading with passion and deep commitment to God's Word. His heart is to see every believer walk in their God-given purpose.",
    notes:
      "Key Scripture: Matthew 6:9-13, James 5:16. Prayer types covered: Intercession, Thanksgiving, Petition, and Warfare prayer.",
  },
  "grace-that-transforms": {
    title: "Grace That Transforms",
    speaker: "Guest Speaker",
    date: "February 2, 2026",
    series: "Amazing Grace",
    description:
      "God's grace is not just about forgiveness — it's about transformation. In this message, we explore how the grace of God changes us from the inside out, empowering us to live lives that honor Him. From Paul's testimony to the woman at the well, see how grace meets us where we are and takes us where God wants us to be.",
    notes:
      "Key Scripture: 2 Corinthians 12:9, Ephesians 2:8-9. Grace is unmerited favor — it cannot be earned, only received.",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(placeholderSermons).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sermon = placeholderSermons[slug];
  return {
    title: sermon?.title ?? "Sermon",
    description: sermon?.description?.slice(0, 160),
  };
}

export default async function SermonDetailPage({ params }: Props) {
  const { slug } = await params;
  const sermon = placeholderSermons[slug];

  if (!sermon) {
    return (
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0 mesh-gradient" />
        <Container className="relative text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
            Sermon Not Found
          </h1>
          <p className="mt-4 text-white/40">
            The sermon you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/sermons"
            className="mt-6 inline-flex items-center gap-2 text-gold hover:underline"
          >
            <HiArrowLeft /> Back to Sermons
          </Link>
        </Container>
      </section>
    );
  }

  // Related sermons: prefer same series, then other sermons
  const relatedSermons = Object.entries(placeholderSermons)
    .filter(([key]) => key !== slug)
    .sort(([, a], [, b]) => {
      if (a.series === sermon.series && b.series !== sermon.series) return -1;
      if (b.series === sermon.series && a.series !== sermon.series) return 1;
      return 0;
    })
    .slice(0, 2);

  return (
    <>
      {/* Header — compact navy banner */}
      <section className="relative overflow-hidden pb-12 pt-32 lg:pb-14 lg:pt-36">
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0 mesh-gradient" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <Container className="relative">
          <Link
            href="/sermons"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.05] px-4 py-1.5 text-[13px] font-medium text-gold/80 transition-colors hover:bg-gold/10"
          >
            <HiArrowLeft size={14} /> Back to Sermons
          </Link>
          <span className="block w-fit rounded-full border border-gold/20 bg-gold/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80">
            {sermon.series}
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
            {sermon.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <HiUser className="text-gold/60" size={16} /> {sermon.speaker}
            </span>
            <span className="flex items-center gap-2">
              <HiCalendar className="text-gold/60" size={16} /> {sermon.date}
            </span>
          </div>
        </Container>
      </section>

      {/* Content — Split Layout */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* LEFT — Player + Description + Notes */}
            <div className="lg:w-7/12">
              <SermonPlayer
                videoUrl={sermon.videoUrl}
                audioUrl={sermon.audioUrl}
                title={sermon.title}
              />

              <div className="mt-10">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white">
                  About This Sermon
                </h2>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-px w-8 bg-gold/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </div>
                <p className="mt-5 text-[0.95rem] leading-[1.85] text-[var(--gray-500)]">
                  {sermon.description}
                </p>
              </div>

              {/* Sermon Notes */}
              {sermon.notes && (
                <div className="mt-10 rounded-2xl border border-white/[0.06] bg-[var(--gray-100)] p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gold-muted)] text-gold">
                      <HiDocumentText size={16} />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--gray-400)]">
                      Sermon Notes
                    </h3>
                  </div>
                  <p className="mt-4 text-[0.9rem] leading-[1.85] text-[var(--gray-500)]">
                    {sermon.notes}
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT — Info Card + Speaker Bio + Related */}
            <div className="lg:w-5/12">
              {/* Info Card */}
              <div className="rounded-3xl border border-white/[0.06] bg-[var(--gray-100)] p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--gray-400)]">
                  Sermon Details
                </h3>

                <div className="mt-5 space-y-4">
                  {/* Series */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--gold-muted)] text-gold">
                      <HiCollection size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--gray-400)]">
                        Series
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {sermon.series}
                      </p>
                    </div>
                  </div>

                  {/* Speaker */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--gold-muted)] text-gold">
                      <HiUser size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--gray-400)]">
                        Speaker
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {sermon.speaker}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--gold-muted)] text-gold">
                      <HiCalendar size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--gray-400)]">
                        Date
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {sermon.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Speaker Bio Card */}
              {sermon.speakerBio && (
                <div className="mt-6 rounded-3xl border border-white/[0.06] bg-[var(--gray-100)] p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--gray-400)]">
                    About the Speaker
                  </h3>
                  <div className="mt-4 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--gold-muted)] text-gold">
                      <HiUser size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{sermon.speaker}</p>
                      <p className="mt-2 text-[0.85rem] leading-[1.75] text-[var(--gray-500)]">
                        {sermon.speakerBio}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Sermons */}
              {relatedSermons.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--gray-400)]">
                    Related Sermons
                  </h3>
                  <div className="mt-4 space-y-3">
                    {relatedSermons.map(([relatedSlug, relatedSermon]) => (
                      <Link
                        key={relatedSlug}
                        href={`/sermons/${relatedSlug}`}
                        className="group block rounded-2xl border border-white/[0.06] bg-[var(--gray-100)] p-4 transition-all duration-300 hover:border-gold/20 hover:shadow-sm"
                      >
                        <p className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-gold">
                          {relatedSermon.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-[11px] font-medium tracking-wide text-[var(--gray-400)]">
                          <span>{relatedSermon.series}</span>
                          {relatedSermon.series === sermon.series && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-gold/40" />
                              <span className="text-gold/60">Same Series</span>
                            </>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

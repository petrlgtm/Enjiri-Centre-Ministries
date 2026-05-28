export const revalidate = 60;

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  HiCalendar, 
  HiClock, 
  HiLocationMarker, 
  HiArrowLeft, 
  HiExternalLink, 
  HiShare,
  HiTicket
} from "react-icons/hi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import { fetchSanity } from "@/sanity/lib/helpers";
import { eventBySlugQuery, siteSettingsQuery } from "@/sanity/queries";
import { heroImage } from "@/sanity/image";
import { formatDate, formatTime } from "@/lib/utils";
import { Event, SiteSettings } from "@/types/sanity";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await fetchSanity<Event>(eventBySlugQuery, { slug });
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  if (!event) return { title: "Event Not Found" };

  const title = event.seo?.seoTitle || event.title;
  const description = event.seo?.seoDescription || event.description || "";
  const image = event.seo?.seoImage ? heroImage(event.seo.seoImage) : event.image ? heroImage(event.image) : "";

  return {
    title,
    description,
    openGraph: {
      title: `${title} — ${settings?.churchName || "Enjiri Center"}`,
      description,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await fetchSanity<Event>(eventBySlugQuery, { slug });
  
  if (!event) {
    notFound();
  }

  const formattedDate = event.isRecurring ? "Every Sunday" : formatDate(event.date);
  const formattedTime = formatTime(event.date) + (event.endDate ? ` - ${formatTime(event.endDate)}` : "");
  
  const headerImg = event.image ? heroImage(event.image) : "";

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        {headerImg && (
          <Image
            src={headerImg}
            alt={event.title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/60 to-transparent" />
        
        <Container className="relative flex h-full flex-col justify-end pb-12">
          <Link 
            href="/services" 
            className="mb-8 flex w-fit items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-gold"
          >
            <HiArrowLeft size={16} />
            Back to Events
          </Link>
          
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-gold/20 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-gold backdrop-blur-md border border-gold/20">
              {event.category || "Event"}
            </span>
            <h1 className="font-(family-name:--font-playfair) text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>
          </div>
        </Container>
      </section>

      <section className="relative py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-invert prose-gold max-w-none">
                {event.description && (
                  <p className="text-xl leading-relaxed text-foreground/90 mb-10 font-medium">
                    {event.description}
                  </p>
                )}
                
                {event.body ? (
                  <PortableTextRenderer value={event.body} />
                ) : (
                  <div className="space-y-6 text-foreground/70 leading-relaxed">
                    <p>
                      Join us for {event.title} at Enjiri Center Ministries International. 
                      This gathering is designed to bring our community together in faith, 
                      worship, and fellowship.
                    </p>
                    <p>
                      We believe that every event is an opportunity to encounter the 
                      presence of God and grow deeper in our relationship with Him. 
                      Whether you are a long-time member or visiting for the first time, 
                      you are warmly welcome to be part of what God is doing.
                    </p>
                  </div>
                )}
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <span key={tag} className="rounded-lg bg-(--gray-100) px-3 py-1.5 text-xs font-medium text-(--gray-400) border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar / Info Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-3xl border border-white/6 bg-(--gray-100) p-8 shadow-premium">
                  <h3 className="mb-6 text-lg font-bold text-foreground">Event Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <HiCalendar size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gold/60">Date</p>
                        <p className="mt-0.5 font-medium text-foreground">{formattedDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <HiClock size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gold/60">Time</p>
                        <p className="mt-0.5 font-medium text-foreground">{formattedTime}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <HiLocationMarker size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gold/60">Location</p>
                        <p className="mt-0.5 font-medium text-foreground">{event.location || "Enjiri Center"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 space-y-3">
                    {event.rsvpUrl ? (
                      <Button href={event.rsvpUrl} fullWidth size="lg" className="shadow-gold-glow">
                        Register / RSVP
                        <HiExternalLink className="ml-2" />
                      </Button>
                    ) : (
                      <Button href="/contact" fullWidth size="lg" className="shadow-gold-glow">
                        Inquire About Event
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      fullWidth 
                      size="lg"
                      href={`mailto:?subject=Join me at ${event.title}&body=I thought you might be interested in this event: ${event.title} at Enjiri Center.`}
                    >
                      Share Event
                      <HiShare className="ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Quick Invite Card */}
                <div className="rounded-3xl bg-linear-to-br from-gold/10 to-transparent p-8 border border-gold/10">
                  <HiTicket className="text-gold mb-4" size={32} />
                  <h4 className="text-lg font-bold text-foreground">Invite a Friend</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                    Faith is better when shared. Invite someone to join you for this event!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />
    </main>
  );
}

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
  HiTicket,
  HiInformationCircle
} from "react-icons/hi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import EventCountdown from "@/components/ui/EventCountdown";
import EventCard from "@/components/services/EventCard";
import { fetchSanity } from "@/sanity/lib/helpers";
import { eventBySlugQuery, siteSettingsQuery, upcomingEventsQuery } from "@/sanity/queries";
import { cardImage, heroImage } from "@/sanity/image";
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

  const upcomingEvents = await fetchSanity<Event[]>(upcomingEventsQuery);
  const otherEvents = upcomingEvents
    ?.filter(e => e.slug !== slug)
    .slice(0, 3)
    .map(e => ({
      title: e.title,
      slug: e.slug,
      date: e.isRecurring ? "Every Sunday" : formatDate(e.date),
      time: formatTime(e.date) + (e.endDate ? ` - ${formatTime(e.endDate)}` : ""),
      location: e.location || "Enjiri Center",
      description: e.description || "",
      category: e.category,
      rsvpUrl: e.rsvpUrl,
      image: e.image ? cardImage(e.image) : "",
    }));

  const formattedDate = event.isRecurring ? "Every Sunday" : formatDate(event.date);
  const formattedTime = formatTime(event.date) + (event.endDate ? ` - ${formatTime(event.endDate)}` : "");
  
  const headerImg = event.image ? heroImage(event.image) : "";

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-linear-to-b from-navy/30 via-transparent to-transparent" />
        
        <Container className="relative flex h-full flex-col justify-end pb-16">
          <Link 
            href="/services" 
            className="mb-8 flex w-fit items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-gold"
          >
            <HiArrowLeft size={16} />
            Back to Events
          </Link>
          
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="mb-4 inline-block rounded-full bg-gold/20 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-gold backdrop-blur-md border border-gold/20">
                {event.category || "Special Event"}
              </span>
              <h1 className="font-(family-name:--font-playfair) text-4xl font-bold text-white sm:text-5xl lg:text-7xl leading-[1.1]">
                {event.title}
              </h1>
            </div>
            
            <div className="lg:col-span-4">
              <EventCountdown targetDate={event.date} isRecurring={event.isRecurring} />
            </div>
          </div>
        </Container>
      </section>

      {/* Info Grid */}
      <section className="relative -mt-8 z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl border border-white/6 bg-(--gray-100) p-6 shadow-premium backdrop-blur-sm">
            <div className="flex items-center gap-4 px-4 py-2">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <HiCalendar size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold/60">Date</p>
                <p className="mt-0.5 font-semibold text-foreground">{formattedDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 px-4 py-2 border-y md:border-y-0 md:border-x border-white/5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <HiClock size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold/60">Time</p>
                <p className="mt-0.5 font-semibold text-foreground">{formattedTime}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 px-4 py-2">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <HiLocationMarker size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold/60">Location</p>
                <p className="mt-0.5 font-semibold text-foreground truncate max-w-[200px]">{event.location || "Enjiri Center"}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative py-16 lg:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-2 mb-6 text-gold">
                    <HiInformationCircle size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">About this event</span>
                  </div>
                  
                  <div className="prose prose-invert prose-gold max-w-none">
                    {event.description && (
                      <p className="text-2xl leading-relaxed text-foreground/90 mb-10 font-medium font-(family-name:--font-playfair)">
                        {event.description}
                      </p>
                    )}
                    
                    {event.body ? (
                      <PortableTextRenderer value={event.body} />
                    ) : (
                      <div className="space-y-6 text-foreground/70 leading-relaxed text-lg">
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
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-8 border-t border-white/5">
                    {event.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-(--gray-100) px-4 py-2 text-xs font-semibold text-(--gray-400) border border-white/5 hover:border-gold/30 transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {/* RSVP Card */}
                <div className="overflow-hidden rounded-3xl border border-white/6 bg-(--gray-100) shadow-premium">
                  <div className="bg-linear-to-br from-gold/20 to-transparent p-8">
                    <HiTicket className="text-gold mb-4" size={32} />
                    <h3 className="text-xl font-bold text-foreground">Secure your spot</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                      Let us know you're coming or register to receive updates and resources related to this event.
                    </p>
                  </div>
                  
                  <div className="p-8 space-y-4">
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
                      Share with Friends
                      <HiShare className="ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Quick Help Card */}
                <div className="rounded-3xl border border-white/6 bg-navy p-8">
                  <h4 className="text-lg font-bold text-foreground mb-4">Need Help?</h4>
                  <p className="text-sm leading-relaxed text-foreground/60 mb-6">
                    Have questions about this event, transportation, or how you can get involved?
                  </p>
                  <Link 
                    href="/contact" 
                    className="flex items-center gap-2 text-gold font-bold text-sm hover:underline"
                  >
                    Contact Our Office
                    <HiExternalLink />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Events */}
      {otherEvents && otherEvents.length > 0 && (
        <section className="py-24 bg-(--gray-100)/50 border-t border-white/5">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-gold text-sm font-bold uppercase tracking-widest mb-2 block">Don't Miss Out</span>
                <h2 className="text-3xl md:text-4xl font-bold font-(family-name:--font-playfair)">Other Upcoming Events</h2>
              </div>
              <Button href="/services" variant="outline">View Calendar</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherEvents.map((ev, idx) => (
                <EventCard key={ev.slug} {...ev} index={idx} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Sticky Mobile RSVP */}
      <div className="fixed bottom-6 left-6 right-6 z-50 lg:hidden">
        {event.rsvpUrl ? (
          <Button href={event.rsvpUrl} fullWidth size="lg" className="shadow-2xl">
            RSVP Now
          </Button>
        ) : (
          <Button href="/contact" fullWidth size="lg" className="shadow-2xl">
            Register Interest
          </Button>
        )}
      </div>

      <SectionDivider />
    </main>
  );
}

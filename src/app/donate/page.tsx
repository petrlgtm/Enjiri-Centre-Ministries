import type { Metadata } from "next";
import { HiArrowUpRight } from "react-icons/hi2";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import EditorialLink from "@/components/home/editorial/EditorialLink";
import { fetchSanity } from "@/sanity/lib/helpers";
import { siteSettingsQuery, donatePageQuery } from "@/sanity/queries";
import { heroImage as heroImageUrl } from "@/sanity/image";
import { SiteSettings, DonatePageData } from "@/types/sanity";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanity<DonatePageData>(donatePageQuery);
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const title = pageData?.seo?.seoTitle || pageData?.title || "Give";
  const description = pageData?.seo?.seoDescription || pageData?.description || "Support the work of Enjiri Center Ministries International through your generous giving.";
  const image = pageData?.seo?.seoImage ? heroImageUrl(pageData.seo.seoImage) : "";

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

const givingCategories = [
  { label: "Tithe", href: "#" },
  { label: "Arise & Build", href: "#" },
  { label: "Buy the Land", href: "#" },
  { label: "Donation", href: "#" },
  { label: "Offering", href: "#" },
];

export default async function DonatePage() {
  const [settings, pageData] = await Promise.all([
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<DonatePageData>(donatePageQuery),
  ]);

  const headerImage = pageData?.headerImage
    ? heroImageUrl(pageData.headerImage)
    : settings?.donateHeaderImage 
      ? heroImageUrl(settings.donateHeaderImage) 
      : settings?.defaultHeaderImage
        ? heroImageUrl(settings.defaultHeaderImage)
        : "https://cdn.sanity.io/images/shcw5txc/production/a9eb84be8ca4b5fd282eaca02789c439b01a6f55-4000x6000.jpg?w=1200&q=80&fm=webp&fit=crop";

  return (
    <>
      <PageHeader
        label="Support Our Mission"
        title={pageData?.title || "Give Generously"}
        description={pageData?.description || "Your generosity fuels our mission to reach more people with the love of Christ and serve our communities."}
        backgroundImage={headerImage}
      />

      <section className="bg-cream pt-14 pb-36 text-cream-heading sm:pt-16 sm:pb-44">
        <Container>
          <SectionMasthead label="Ways to Give" index="01" />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl leading-[1.1] font-semibold sm:text-4xl">
                {pageData?.waysToGiveHeading || "What would you like to give towards?"}
              </h2>
              {pageData?.content && (
                <div className="mt-6">
                  <PortableTextRenderer value={pageData.content} tone="onLight" />
                </div>
              )}
              <blockquote className="mt-10 bg-white px-7 py-7">
                <p className="font-display text-xl leading-snug italic sm:text-2xl">
                  &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under
                  compulsion, for God loves a cheerful giver.&rdquo;
                </p>
                <p className="mt-4 font-mono text-xs tracking-[0.18em] text-gold-dark uppercase">2 Corinthians 9:7</p>
              </blockquote>
            </div>

            <ol className="lg:col-span-7">
              {givingCategories.map((category, i) => {
                const external = category.href.startsWith("http");
                return (
                  <Reveal as="li" key={category.label} delay={i * 0.05}>
                    <a
                      href={category.href === "#" ? "/contact" : category.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-cream-heading/12 px-2 py-6 transition-colors duration-500 hover:bg-royal sm:px-5"
                    >
                      <span className="font-display text-3xl font-semibold text-gold-dark transition-colors duration-500 group-hover:text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl font-semibold transition-colors duration-500 group-hover:text-white sm:text-3xl">
                        {category.label}
                      </span>
                      <span className="grid h-11 w-11 place-items-center bg-gold text-navy transition-transform duration-500 group-hover:translate-x-1">
                        <HiArrowUpRight size={18} />
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      {/* Other ways — the card rises into the cream above */}
      <section className="flow-root bg-royal-deep pb-16 text-white sm:pb-20">
        <Container>
          <div className="relative z-10 -mt-24 grid gap-px bg-white/10 shadow-[0_40px_90px_-40px_rgba(11,31,69,0.7)] sm:-mt-28 sm:grid-cols-3">
            {[
              { label: "In person", text: "Give during any of our weekly services — Sunday worship, Wednesday Bible study or Friday prayer." },
              { label: "Talk to us", text: "Call or message the ministry office and we will guide you through giving towards a specific need." },
              { label: "Partner", text: "Become a ministry partner and support crusades, outreach and community programmes month by month." },
            ].map((w, i) => (
              <div key={w.label} className="bg-gold p-7 text-navy sm:p-8">
                <span className="font-display text-3xl font-bold text-navy/35">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-xl font-semibold">{w.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy/80">{w.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <EditorialLink href="/contact">Contact the ministry</EditorialLink>
            <EditorialLink href="/charity" variant="outline-light">See what your giving supports</EditorialLink>
          </div>
        </Container>
      </section>
    </>
  );
}

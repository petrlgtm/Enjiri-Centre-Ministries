import type { Metadata } from "next";
import { HiArrowRight } from "react-icons/hi";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import CutoutFigure from "@/components/ui/CutoutFigure";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import ContactForm from "@/components/contact/ContactForm";
import { fetchSanity } from "@/sanity/lib/helpers";
import { siteSettingsQuery, contactPageQuery } from "@/sanity/queries";
import { heroImage as heroImageUrl, urlFor } from "@/sanity/image";
import { SiteSettings, ContactPageData } from "@/types/sanity";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchSanity<ContactPageData>(contactPageQuery);
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const title = pageData?.seo?.seoTitle || pageData?.title || "Contact Us";
  const description = pageData?.seo?.seoDescription || pageData?.description || "Have questions or want to learn more? We'd love to hear from you.";
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

export default async function ContactPage() {
  const [settings, pageData] = await Promise.all([
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<ContactPageData>(contactPageQuery),
  ]);

  const cutout = pageData?.cutoutImage ? urlFor(pageData.cutoutImage).width(900).auto("format").url() : null;

  const headerImage = pageData?.headerImage
    ? heroImageUrl(pageData.headerImage)
    : settings?.contactHeaderImage 
      ? heroImageUrl(settings.contactHeaderImage) 
      : settings?.defaultHeaderImage
        ? heroImageUrl(settings.defaultHeaderImage)
        : "https://cdn.sanity.io/images/shcw5txc/production/a58fbadb6868c41f76df2874983f82d632551243-3508x2480.jpg?w=1200&q=80&fm=webp&fit=crop";

  const address = settings?.address || "Maggwa Third-Lane, Jinja, Uganda";
  const phones = [settings?.phone || "+256 742 735 862", settings?.phone2 || "+256 781 573 536"];
  const email = settings?.email || "enjiricenter@gmail.com";
  const direct = [
    { label: "Visit", lines: [{ text: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` }], external: true, hint: "Get directions" },
    { label: "Call", lines: phones.map((p) => ({ text: p, href: `tel:${p.replace(/\s/g, "")}` })), external: false, hint: "Tap to call" },
    { label: "Write", lines: [{ text: email, href: `mailto:${email}` }], external: false, hint: "Send an email" },
  ];

  const socialLinks = [
    { href: settings?.socialLinks?.facebook, icon: FaFacebookF, label: "Facebook" },
    { href: settings?.socialLinks?.youtube, icon: FaYoutube, label: "YouTube" },
    { href: settings?.socialLinks?.instagram, icon: FaInstagram, label: "Instagram" },
    { href: settings?.socialLinks?.twitter, icon: FaTwitter, label: "Twitter" },
    { href: settings?.socialLinks?.tiktok, icon: FaTiktok, label: "TikTok" },
  ].filter((link) => link.href);

  return (
    <>
      <PageHeader
        label="Reach Out"
        title={pageData?.title || "Contact Us"}
        description={pageData?.description || "We'd love to hear from you. Whether you have a question, prayer request, or just want to say hello — reach out!"}
        backgroundImage={headerImage}
      />

      {/* Direct lines + weekly times */}
      <section className="bg-cream pt-14 pb-36 text-cream-heading sm:pt-16 sm:pb-44">
        <Container>
          <SectionMasthead label="Direct Lines" index="01" />
          <ul className="mt-10 grid gap-px bg-cream-heading/10 sm:grid-cols-3">
            {direct.map((d, i) => (
              <Reveal as="li" key={d.label} delay={i * 0.06} className="bg-cream py-6 sm:px-8 sm:py-4 sm:first:pl-0">
                <span className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-gold-dark uppercase">
                  <span aria-hidden className="inline-block h-2 w-2 bg-gold" />
                  {d.label}
                </span>
                {d.lines.map((line, j) => (
                  <a
                    key={line.text}
                    href={line.href}
                    target={d.external ? "_blank" : undefined}
                    rel={d.external ? "noopener noreferrer" : undefined}
                    className="group block"
                  >
                    <span className={cn("block font-display text-2xl break-words transition-colors duration-300 group-hover:text-gold-dark sm:text-[1.7rem]", j === 0 ? "mt-4" : "mt-1")}>
                      {line.text}
                    </span>
                    {j === d.lines.length - 1 && (
                      <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-cream-muted uppercase transition-colors group-hover:text-gold-dark">
                        {d.hint}
                        <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    )}
                  </a>
                ))}
              </Reveal>
            ))}
          </ul>

          {settings?.serviceSchedule && settings.serviceSchedule.length > 0 && (
            <div className="mt-16">
              <p className="text-xs font-semibold tracking-[0.22em] text-gold-dark uppercase">When we gather</p>
              <ul className="mt-5 grid gap-6 sm:grid-cols-3">
                {settings.serviceSchedule.map((s) => (
                  <li key={s.serviceName} className="grid grid-cols-[4rem_1fr] items-baseline gap-3">
                    <span className="font-display text-3xl font-semibold text-gold-dark">{s.day.slice(0, 3)}</span>
                    <span>
                      <span className="block font-display text-lg">{s.serviceName}</span>
                      <span className="mt-1 block font-mono text-xs text-cream-muted">{s.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      {/* Message band — the form card rises into the cream above */}
      <section className="flow-root bg-ink-deep pb-16 text-white sm:pb-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="relative z-10 -mt-24 bg-white p-6 text-cream-heading shadow-[0_40px_90px_-40px_rgba(18,15,11,0.7)] sm:-mt-32 sm:p-10 lg:col-span-7">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-gold-dark uppercase">
              <span aria-hidden className="inline-block h-2.5 w-2.5 bg-gold" />
              Get in touch
            </p>
            <h2 className="mt-5 mb-8 font-display text-3xl leading-tight font-semibold sm:text-4xl">
              {pageData?.formHeading || "Send Us a Message"}
            </h2>
            <ContactForm />
          </div>

          <div className="flex flex-col lg:col-span-5 lg:pt-16">
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              &ldquo;Cast all your anxiety on him because he cares for you.&rdquo;
            </p>
            <p className="mt-4 font-mono text-xs tracking-[0.18em] text-gold uppercase">1 Peter 5:7</p>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/70">
              We are here for you. Reach out with prayer requests, questions, or simply to connect with our community —
              someone from the ministry will get back to you.
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-10">
                <p className="font-mono text-xs tracking-[0.18em] text-white/50 uppercase">
                  {pageData?.infoHeading || "Follow us"}
                </p>
                <div className="mt-4 flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center bg-white/10 text-white transition-colors duration-300 hover:bg-gold hover:text-navy"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {cutout && (
              <CutoutFigure
                src={cutout}
                alt={pageData?.cutoutImage?.alt || "Evangelist Peter Kalagi"}
                className="mt-10 -mb-16 h-80 sm:-mb-20 sm:h-96 lg:mt-auto"
              />
            )}
          </div>
        </Container>
      </section>

      {pageData?.mapUrl && (
        <section className="h-[420px] w-full bg-ink-deep">
          <iframe
            src={pageData.mapUrl}
            width="100%"
            height="100%"
            className="border-0 grayscale-[30%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Church location map"
          />
        </section>
      )}
    </>
  );
}

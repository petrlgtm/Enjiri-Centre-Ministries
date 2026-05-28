import Image from "next/image";
import { HiMail, HiPhone, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import { fetchSanity } from "@/sanity/lib/helpers";
import { siteSettingsQuery } from "@/sanity/queries";
import { heroImage as heroImageUrl } from "@/sanity/image";
import { SiteSettings } from "@/types/sanity";

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await fetchSanity<SiteSettings>(siteSettingsQuery);

  const headerImage = settings?.contactHeaderImage 
    ? heroImageUrl(settings.contactHeaderImage) 
    : settings?.defaultHeaderImage
      ? heroImageUrl(settings.defaultHeaderImage)
      : "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1200&q=80&fm=webp&fit=crop";

  const contactInfo = [
    { 
      icon: HiLocationMarker, 
      title: "Visit Us", 
      lines: [settings?.address || "Kampala, Uganda"] 
    },
    { 
      icon: HiPhone, 
      title: "Call Us", 
      lines: [settings?.phone || "+256 779 226290"] 
    },
    { 
      icon: HiMail, 
      title: "Email Us", 
      lines: [settings?.email || "info@enjiriministries.org"] 
    },
    { 
      icon: HiClock, 
      title: "Service Times", 
      lines: settings?.serviceSchedule?.map(s => `${s.day}: ${s.time}`) || ["Sunday: 9:00 AM - 12:00 PM"] 
    },
  ];

  const socialLinks = [
    { href: settings?.socialLinks?.facebook, icon: FaFacebookF, label: "Facebook" },
    { href: settings?.socialLinks?.youtube, icon: FaYoutube, label: "YouTube" },
    { href: settings?.socialLinks?.instagram, icon: FaInstagram, label: "Instagram" },
    { href: settings?.socialLinks?.twitter, icon: FaTwitter, label: "Twitter" },
    { href: settings?.socialLinks?.tiktok, icon: FaTiktok, label: "TikTok" },
  ].filter(link => link.href);

  return (
    <>
      <PageHeader
        label="Reach Out"
        title="Contact Us"
        description="We'd love to hear from you. Whether you have a question, prayer request, or just want to say hello — reach out!"
        backgroundImage={headerImage}
      />

      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <Container>
          <div className="flex flex-col-reverse gap-8 sm:gap-12 lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:w-5/12">
              <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="group rounded-2xl card-premium border border-white/6 bg-(--gray-100) p-5 transition-all duration-500 hover:ring-1 hover:ring-gold/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--gold-muted) text-gold transition-all duration-500 group-hover:scale-110 group-hover:ring-2 group-hover:ring-gold/20">
                      <info.icon size={18} />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-foreground">{info.title}</h3>
                    {info.lines.map((line) => (
                      <p key={line} className="mt-0.5 text-xs leading-relaxed text-(--gray-400)">
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-7/12">
              <div className="relative aspect-16/10 sm:aspect-4/3 overflow-hidden rounded-2xl sm:rounded-3xl lg:aspect-3-4">
                <Image
                  src={headerImage}
                  alt="Church location scenery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/30 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 lg:inset-x-6 lg:bottom-6">
                  <div className="glass rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                    <div className="flex items-start gap-3">
                      <HiLocationMarker className="mt-0.5 shrink-0 text-gold" size={20} />
                      <div>
                        <p className="font-medium text-foreground">Our Location</p>
                        <p className="mt-1 text-sm text-foreground/70">
                          {settings?.address || "Kampala, Uganda"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-cream" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold-dark/15 to-transparent" />
        <Container className="relative">
          <div className="flex flex-col gap-8 sm:gap-12 lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:w-7/12">
              <SectionHeading
                label="Get in Touch"
                title="Send Us a Message"
                subtitle="Fill out the form and we'll get back to you as soon as possible."
                centered={false}
                onCream
              />

              <div className="relative rounded-2xl sm:rounded-3xl border border-black/6 bg-white p-5 sm:p-8 card-premium">
                <div className="absolute top-0 left-0 h-16 w-16 overflow-hidden rounded-tl-3xl">
                  <div className="absolute -top-px -left-px h-0.75 w-10 rounded-full bg-linear-to-r from-gold-dark to-transparent" />
                  <div className="absolute -top-px -left-px h-10 w-0.75 rounded-full bg-linear-to-b from-gold-dark to-transparent" />
                </div>

                <ContactForm />
              </div>
            </div>

            <div className="space-y-6 lg:w-5/12">
              <div className="rounded-2xl border border-black/6 bg-white p-6">
                <h3 className="font-bold text-cream-heading">Follow Us</h3>
                <p className="mt-1 text-sm text-cream-muted">
                  Stay connected on social media
                </p>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="icon-breathe flex h-11 w-11 items-center justify-center rounded-xl bg-gold-dark/10 text-cream-body transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-black"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-navy p-8 shadow-premium-lg shine">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-gold/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="h-px w-8 bg-gold/40" />
                </div>
                <p className="font-(family-name:--font-playfair) text-lg leading-relaxed text-gold italic">
                  &ldquo;Cast all your anxiety on him because he cares for
                  you.&rdquo;
                </p>
                <p className="mt-3 text-sm text-foreground/50">1 Peter 5:7</p>
                <p className="mt-6 text-sm leading-relaxed text-foreground/70">
                  We are here for you. Do not hesitate to reach out with any
                  prayer requests, questions, or simply to connect with our
                  community.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const contactDetails = [
  {
    icon: HiLocationMarker,
    label: "Address",
    value: "Enjiri Center, Main Campus",
  },
  {
    icon: HiPhone,
    label: "Phone",
    value: "+250 000 000 000",
  },
  {
    icon: HiMail,
    label: "Email",
    value: "info@enjiriministries.org",
  },
  {
    icon: HiClock,
    label: "Service Times",
    value: "Sun 9AM | Wed 6PM",
  },
];

export default function ContactInfoCard() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-cream" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(138,109,27,0.05),transparent_55%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-dark/15 to-transparent" />

      <Container className="relative">
        <SectionHeading
          label="Reach Out"
          title="Get in Touch"
          subtitle="We'd love to hear from you. Visit us, call, or send us a message."
          onCream
        />

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/2"
          >
            <div className="space-y-5">
              {contactDetails.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className="icon-breathe flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-dark/10 text-gold-dark transition-all duration-500 hover:bg-gold hover:text-navy">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cream-muted">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-cream-heading">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                href="/contact"
                variant="primary"
                icon={<HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
              >
                Contact Us
              </Button>
              <Button href="/services" variant="outline" className="border-gold-dark/40 text-gold-dark hover:bg-gold-dark/10 hover:border-gold-dark/80">
                Get Directions
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — Map Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/2"
          >
            <div className="relative h-64 overflow-hidden rounded-3xl border border-black/[0.06] shadow-lg lg:h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=70"
                alt="Map location of Enjiri Center"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] px-4 py-2 text-xs font-semibold text-cream-heading">
                  <HiLocationMarker className="mr-1.5 inline text-gold-dark" size={14} />
                  Enjiri Center
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

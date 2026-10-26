import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface ContactStripProps {
  address?: string;
  phone?: string;
  phone2?: string;
  email?: string;
}

/** Contact cards that lift into the dark band above, closing the page. */
export default function ContactStrip({ address, phone, phone2, email }: ContactStripProps) {
  const items = [
    { label: "Visit", lines: address ? [{ text: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` }] : [] },
    { label: "Call", lines: [phone, phone2].filter((p): p is string => Boolean(p)).map((p) => ({ text: p, href: `tel:${p.replace(/\s/g, "")}` })) },
    { label: "Write", lines: email ? [{ text: email, href: `mailto:${email}` }] : [] },
  ].filter((i) => i.lines.length > 0);

  if (items.length === 0) return null;

  return (
    <section className="flow-root bg-cream pb-14 text-cream-heading sm:pb-16">
      <Container className="relative z-10 -mt-20">
        <div className="grid gap-px bg-cream-heading/10 shadow-[0_30px_70px_-30px_rgba(10,10,10,0.45)] sm:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06} className="bg-white px-7 py-8">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
                <span aria-hidden className="inline-block h-2 w-2 bg-gold" />
                {item.label}
              </p>
              {item.lines.map((line, j) => (
                <a
                  key={line.text}
                  href={line.href}
                  className={cn(
                    "block font-display text-2xl break-words transition-colors duration-300 hover:text-gold-dark sm:text-[1.7rem]",
                    j === 0 ? "mt-4" : "mt-1"
                  )}
                >
                  {line.text}
                </a>
              ))}
            </Reveal>
          ))}
        </div>
        <Link
          href="/contact"
          className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream-body transition-colors duration-300 hover:text-gold-dark"
        >
          Get in touch
          <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { HiArrowUpRight } from "react-icons/hi2";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support the work of Enjiri Center Ministries International through your generous giving.",
};

const givingCategories = [
  { label: "Tithe", href: "#" },
  { label: "Arise & Build", href: "#" },
  { label: "Buy the Land", href: "#" },
  { label: "Donation", href: "#" },
  { label: "Offering", href: "#" },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        label="Support Our Mission"
        title="Give Generously"
        description="Your generosity fuels our mission to reach more people with the love of Christ and serve our communities."
      />

      <section className="relative overflow-hidden py-14 sm:py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground min-[375px]:text-2xl sm:text-3xl">
              What would you like to give towards?
            </h2>

            <div className="mt-8 divide-y divide-white/[0.08] sm:mt-10">
              {givingCategories.map((category) => (
                <a
                  key={category.label}
                  href={category.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 transition-colors duration-300 hover:text-gold sm:py-6"
                >
                  <span className="text-base font-medium text-foreground transition-colors duration-300 group-hover:text-gold min-[375px]:text-lg sm:text-xl">
                    {category.label}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-navy group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] sm:h-11 sm:w-11">
                    <HiArrowUpRight size={18} />
                  </span>
                </a>
              ))}
            </div>

            {/* Scripture quote */}
            <div className="mt-10 rounded-2xl border border-white/[0.06] bg-[var(--gray-100)] px-5 py-7 text-center sm:mt-16 sm:p-10">
              <p className="font-[family-name:var(--font-playfair)] text-base italic leading-relaxed text-foreground/70 min-[375px]:text-lg sm:text-xl">
                &ldquo;Each of you should give what you have decided in your
                heart to give, not reluctantly or under compulsion, for God
                loves a cheerful giver.&rdquo;
              </p>
              <div className="mx-auto mt-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-gold/30" />
                <span className="h-1.5 w-1.5 rotate-45 border border-gold/40" />
                <span className="h-px w-8 bg-gold/30" />
              </div>
              <p className="mt-3 text-sm font-semibold tracking-wider text-gold">
                2 CORINTHIANS 9:7
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

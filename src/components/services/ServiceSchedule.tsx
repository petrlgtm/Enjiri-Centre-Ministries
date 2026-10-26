import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";
import FitImage from "@/components/ui/FitImage";

const schedule = [
  {
    day: "Sunday",
    services: [
      { name: "Sunday Worship Service", time: "9:00 AM - 12:00 PM" },
      { name: "Children's Church", time: "9:30 AM - 11:30 AM" },
    ],
  },
  {
    day: "Wednesday",
    services: [{ name: "Bible Study & Prayer", time: "6:00 PM - 8:00 PM" }],
  },
  {
    day: "Friday",
    services: [
      { name: "Intercessory Prayer", time: "6:00 PM - 8:00 PM" },
      { name: "Youth Fellowship", time: "5:00 PM - 7:00 PM" },
    ],
  },
  {
    day: "Saturday",
    services: [
      { name: "Women's Fellowship (1st & 3rd)", time: "10:00 AM - 12:00 PM" },
      { name: "Men's Fellowship (2nd & 4th)", time: "10:00 AM - 12:00 PM" },
    ],
  },
];

interface ServiceScheduleProps {
  image?: string;
  heading?: string;
}

export default function ServiceSchedule({ image, heading }: ServiceScheduleProps) {
  return (
    <section className="bg-cream pt-14 pb-24 text-cream-heading sm:pt-16 sm:pb-28">
      <Container>
        <SectionMasthead label="Every Week" index="01" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-3xl leading-[1.1] font-semibold sm:text-4xl">
              {heading || "Weekly Services"}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream-body">
              Join us throughout the week for worship, prayer, and fellowship. Every gathering is an opportunity to grow
              in faith and community.
            </p>
            {image && (
              <figure className="mt-10">
                <div className="relative max-w-sm overflow-hidden">
                  <FitImage src={image} alt="Congregation gathered in worship" sizes="384px" />
                </div>
                <figcaption className="mt-5 max-w-sm">
                  <span className="block font-display text-xl leading-snug italic">
                    &ldquo;For where two or three gather in my name, there am I with them.&rdquo;
                  </span>
                  <span className="mt-2 block font-mono text-xs tracking-[0.18em] text-gold-dark uppercase">
                    Matthew 18:20
                  </span>
                </figcaption>
              </figure>
            )}
          </Reveal>

          <ol className="lg:col-span-7">
            {schedule.map((item, i) => (
              <Reveal
                as="li"
                key={item.day}
                delay={i * 0.06}
                className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-cream-heading/12 py-6 first:pt-0 sm:grid-cols-[9rem_1fr] sm:py-7"
              >
                <span className="font-display text-3xl leading-none font-semibold text-gold-dark sm:text-5xl">{item.day.slice(0, 3)}</span>
                <ul className="space-y-3">
                  {item.services.map((s) => (
                    <li key={s.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <span className="font-display text-lg sm:text-2xl">{s.name}</span>
                      <span className="font-mono text-xs text-cream-muted">{s.time}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

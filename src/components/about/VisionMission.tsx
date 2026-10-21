import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMasthead from "@/components/home/editorial/SectionMasthead";

const defaultCoreValues = [
  { title: "Faith", description: "Living by faith and trusting in God's promises for our lives." },
  { title: "Love", description: "Demonstrating Christ's unconditional love in all we do." },
  { title: "Integrity", description: "Walking in truth and transparency before God and man." },
  { title: "Excellence", description: "Serving God and people with the highest standard of excellence." },
];

const defaultBeliefs = [
  "We believe in the Triune God. God the Father, God the Son and God the Holy Spirit.",
  "We believe in the death, burial and resurrection of the Lord Jesus Christ.",
  "We believe in the baptism of water and the baptism of the Holy Spirit.",
];

interface Statement {
  text: string;
  scripture?: string;
}

interface VisionMissionProps {
  vision?: Statement;
  mission?: Statement;
  commission?: Statement;
  statementOfFaith?: { text: string; beliefs: string[] };
  coreValues?: Array<{ title: string; description: string }>;
}

export default function VisionMission({ vision, mission, commission, statementOfFaith, coreValues }: VisionMissionProps) {
  const statements = [
    {
      label: "Vision",
      text: vision?.text || "Preaching Christ and Restoring Hope through the power of the Holy Spirit.",
      scripture: vision ? vision.scripture : "Colossians 1:27, 1 Corinthians 2:4",
    },
    {
      label: "Mission",
      text: mission?.text || "Ministering the Gospel of our Lord Jesus Christ through repentance and remission of sins to all nations.",
      scripture: mission ? mission.scripture : "Luke 24:47",
    },
    {
      label: "Commission",
      text:
        commission?.text ||
        "Proclaiming to all the Nations that God made Jesus both Lord and Christ, who is the only way, the truth and the Life.",
      scripture: commission ? commission.scripture : "Acts 2:36, John 14:6",
    },
  ];
  const values = coreValues && coreValues.length > 0 ? coreValues : defaultCoreValues;
  const beliefs = statementOfFaith?.beliefs?.length ? statementOfFaith.beliefs : defaultBeliefs;

  return (
    <section className="bg-cream pt-6 pb-14 text-cream-heading sm:pt-8 sm:pb-16">
      <Container>
        <SectionMasthead label="What We Believe" index="03" />

        <ol className="mt-10">
          {statements.map((s, i) => (
            <Reveal
              as="li"
              key={s.label}
              delay={i * 0.06}
              className="grid gap-4 py-8 md:grid-cols-[4rem_10rem_1fr_12rem] md:items-baseline md:gap-8"
            >
              <span className="font-display text-4xl font-semibold text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream-heading">Our {s.label}</span>
              <p className="font-display text-2xl leading-snug sm:text-[1.5rem]">{s.text}</p>
              {s.scripture && (
                <span className="font-mono text-[11px] tracking-[0.14em] text-gold-dark uppercase md:text-right">{s.scripture}</span>
              )}
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="bg-navy p-8 text-white sm:p-10 lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-light">
              <span aria-hidden className="inline-block h-2.5 w-2.5 bg-gold" />
              Statement of Faith
            </p>
            <p className="mt-6 font-display text-2xl leading-snug">
              {statementOfFaith?.text ||
                "We are a ministry called to evangelize, equip and disciple people locally and internationally with the approach of God's Word through love."}
            </p>
            <ul className="mt-8 space-y-4">
              {beliefs.map((b, i) => (
                <li key={b} className="grid grid-cols-[2.5rem_1fr] gap-3 text-[15px] leading-relaxed text-white/70">
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">Core values</p>
            <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.06}>
                  <span className="block font-display text-3xl font-semibold">{v.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-cream-body">{v.description}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

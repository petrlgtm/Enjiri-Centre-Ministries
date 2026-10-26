import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/image";

interface PortableTextImage {
  _type: "image";
  _key?: string;
  asset: { _ref: string };
  alt?: string;
  caption?: string;
}

interface LinkMark {
  _type: "link";
  href: string;
  blank?: boolean;
}

function buildComponents(onLight: boolean): PortableTextComponents {
  const heading = onLight ? "text-cream-heading" : "text-foreground";
  const text = onLight ? "text-cream-body" : "text-(--gray-400)";
  const muted = onLight ? "text-cream-muted" : "text-(--gray-500)";
  const link = onLight ? "text-gold-dark hover:text-ink" : "text-gold hover:text-gold-light";

  return {
  block: {
    h2: ({ children }) => (
      <h2 className={`mt-10 mb-4 font-display text-2xl font-semibold sm:text-3xl ${heading}`}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={`mt-8 mb-3 font-display text-xl font-semibold sm:text-2xl ${heading}`}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className={`mt-6 mb-2 text-lg font-semibold ${heading}`}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className={`mb-5 text-[1.02rem] leading-[1.85] ${text}`}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className={`my-8 border-l-2 border-gold pl-6 font-display text-xl leading-snug italic ${muted}`}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className={`font-semibold ${heading}`}>{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const mark = value as LinkMark;
      const rel = mark.blank ? "noopener noreferrer" : undefined;
      const target = mark.blank ? "_blank" : undefined;
      return (
        <a
          href={mark.href}
          rel={rel}
          target={target}
          className={`underline underline-offset-2 transition-colors duration-200 ${link}`}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      if (!value?.asset) return null;
      const imgUrl = urlFor(value).width(1200).quality(80).auto("format").url();
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={imgUrl}
              alt={value.alt || ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className={`mt-2 text-center text-sm ${muted}`}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PortableTextRenderer({ value, tone = "onDark" }: { value: any; tone?: "onDark" | "onLight" }) {
  if (!value) return null;
  return (
    <div className="portable-text">
      <PortableText value={value} components={buildComponents(tone === "onLight")} />
    </div>
  );
}

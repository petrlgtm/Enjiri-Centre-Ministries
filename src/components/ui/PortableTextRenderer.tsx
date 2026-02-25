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

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-[0.95rem] leading-[1.85] text-[var(--gray-400)]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-gold/40 pl-5 italic text-[var(--gray-500)]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
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
          className="text-gold underline underline-offset-2 transition-colors duration-200 hover:text-gold-light"
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
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={imgUrl}
              alt={value.alt || ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-[var(--gray-400)]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="portable-text">
      <PortableText value={value} components={components} />
    </div>
  );
}

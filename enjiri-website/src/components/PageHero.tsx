"use client";

import ParallaxBackground from "@/components/ParallaxBackground";

interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export default function PageHero({ title, subtitle, description, image }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
      {/* Background with Parallax */}
      <div className="absolute inset-0">
        <ParallaxBackground src={image} alt={title} speed={0.15} priority />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-maroon-deep/85 to-dark" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute left-1/4 top-1/3 h-40 w-40 rounded-full bg-red-accent/5 blur-[80px] animate-float" style={{ animationDuration: "8s" }} />
      <div className="absolute right-1/4 bottom-1/4 h-32 w-32 rounded-full bg-gold/3 blur-[60px] animate-float" style={{ animationDuration: "10s", animationDelay: "1s" }} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="animate-fade-in-up mb-4 text-xs font-bold uppercase tracking-[0.4em] text-gold/70">
          {subtitle}
        </p>

        {/* Decorative gold line */}
        <div className="animate-fade-in-up animate-delay-100 mx-auto mb-6 h-[1px] w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <h1 className="text-reveal animate-delay-200 mb-6 font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl" style={{ animationDelay: "0.3s" }}>
          {title}
        </h1>
        <p className="animate-fade-in-up animate-delay-400 mx-auto max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import ParallaxBackground from "@/components/ParallaxBackground";

const particles = [
  { top: "15%", left: "10%", size: 4, duration: "7s", delay: "0s" },
  { top: "25%", left: "85%", size: 3, duration: "9s", delay: "1s" },
  { top: "60%", left: "15%", size: 5, duration: "8s", delay: "0.5s" },
  { top: "70%", left: "80%", size: 3, duration: "6s", delay: "2s" },
  { top: "40%", left: "90%", size: 4, duration: "10s", delay: "1.5s" },
  { top: "80%", left: "50%", size: 3, duration: "7s", delay: "0.8s" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <ParallaxBackground
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80"
          alt="Worship background"
          speed={0.2}
          priority
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-maroon-deep/80 to-dark/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-dark/60" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-red-accent/5 blur-[100px]" />

      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gold/30 animate-float"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 text-center">
        {/* Logo */}
        <div className="animate-fade-in-scale mb-2 flex justify-center">
          <div className="relative">
            <Image
              src="/Enjiri-Centre-Ministries/logo.jpeg"
              alt="Enjiri Center"
              width={100}
              height={100}
              className="rounded-full shadow-[0_0_60px_rgba(255,199,44,0.15)]"
              priority
            />
            <div className="absolute -inset-3 animate-pulse-glow rounded-full border border-gold/10" />
          </div>
        </div>

        {/* Tagline */}
        <p className="animate-fade-in-up animate-delay-200 mb-2 font-accent text-base tracking-[0.4em] text-gold/80 sm:text-lg">
          PREACHING CHRIST IN ALL NATIONS
        </p>

        {/* Shimmer line */}
        <div className="animate-fade-in-up animate-delay-300 mx-auto mb-2 h-[1px] w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent animate-shimmer" />

        {/* Main headline with text-reveal */}
        <h1 className="text-reveal animate-delay-300 mb-0 font-heading text-5xl font-bold leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl" style={{ animationDelay: "0.4s" }}>
          Preaching Christ
        </h1>
        <h1 className="text-reveal mb-8 font-heading text-5xl font-bold leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl" style={{ animationDelay: "0.6s" }}>
          <span className="gold-gradient-text">&amp; Restoring Hope</span>
        </h1>

        {/* Description */}
        <p className="animate-fade-in-up animate-delay-600 mx-auto mb-12 max-w-2xl font-body text-base leading-relaxed text-white/50 sm:text-lg">
          Through the power of the Holy Spirit, we minister the Gospel of our
          Lord Jesus Christ through repentance and remission of sins — bringing
          light to every nation, transforming lives, and restoring hope to the
          brokenhearted.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up animate-delay-700 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <a
            href="/contact"
            className="btn-ripple group relative overflow-hidden rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-maroon-dark transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,199,44,0.35)]"
          >
            <span className="relative z-10">Plan Your Visit</span>
            <div className="absolute inset-0 -translate-x-full bg-gold-light transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="/sermons"
            className="group rounded-full border border-white/15 px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 transition-all duration-500 hover:border-gold/40 hover:bg-white/5 hover:text-white"
          >
            Watch Online
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>

        {/* Scripture */}
        <div className="animate-fade-in-up animate-delay-800 mt-16">
          <p className="font-accent text-base italic text-white/30 sm:text-lg">
            &ldquo;Christ in you, the hope of glory.&rdquo;
          </p>
          <p className="mt-1 text-xs tracking-widest text-gold/40">
            COLOSSIANS 1:27
          </p>
        </div>
      </div>

      {/* Scroll indicator with pulsing glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/20">
            Scroll
          </span>
          <div className="relative h-12 w-[1px] overflow-hidden bg-white/10">
            <div className="h-4 w-full animate-scroll-down bg-gold/60" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-gold/5 blur-md animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
}

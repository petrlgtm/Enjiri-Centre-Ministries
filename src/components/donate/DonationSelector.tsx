"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const presetAmounts = [25, 50, 100, 250];

export default function DonationSelector() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "recurring">("one-time");

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
    setCustomAmount(numeric);
    setSelectedAmount(null);
  };

  return (
    <div className="mt-6 max-w-md space-y-5">
      {/* Frequency Toggle */}
      <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-[var(--gray-50)] p-1">
        {(["one-time", "recurring"] as const).map((freq) => (
          <button
            key={freq}
            onClick={() => setFrequency(freq)}
            className={cn(
              "flex-1 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
              frequency === freq
                ? "bg-gold text-navy shadow-[0_2px_12px_rgba(201,168,76,0.3)]"
                : "text-[var(--gray-400)] hover:text-foreground"
            )}
          >
            {freq === "one-time" ? "One-Time" : "Monthly"}
          </button>
        ))}
      </div>

      {/* Preset Amount Pills */}
      <div className="flex flex-wrap gap-2">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handlePresetClick(amount)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
              selectedAmount === amount
                ? "bg-gold text-navy shadow-[0_4px_16px_rgba(201,168,76,0.3)]"
                : "border border-gold/30 bg-gold/[0.08] text-gold hover:bg-gold/20 hover:border-gold/50"
            )}
          >
            ${amount}
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--gray-400)]">
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => handleCustomChange(e.target.value)}
          className="w-full rounded-xl border border-white/[0.06] bg-[var(--gray-50)] py-3 pl-8 pr-4 text-sm font-medium text-foreground placeholder:text-[var(--gray-400)] transition-all duration-300 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>

      {/* Visual display */}
      <div className="rounded-xl border border-gold/10 bg-gold/[0.04] px-5 py-3 text-center">
        <p className="text-xs font-medium text-[var(--gray-400)]">
          {frequency === "one-time" ? "One-time gift" : "Monthly gift"} of
        </p>
        <p className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold text-gold">
          ${selectedAmount ?? (customAmount || "0")}
        </p>
      </div>
    </div>
  );
}

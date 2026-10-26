"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nextOccurrence } from "@/lib/utils";

interface EventCountdownProps {
  targetDate: string;
  isRecurring?: boolean;
  recurrence?: string;
}

export default function EventCountdown({ targetDate, isRecurring, recurrence }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOver: boolean;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      let target = new Date(targetDate).getTime();
      const now = new Date().getTime();

      if (isRecurring) target = nextOccurrence(targetDate, recurrence).getTime();

      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false,
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate, isRecurring, recurrence]);

  if (!timeLeft || timeLeft.isOver) return null;

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-white/10 p-3 backdrop-blur-md border border-white/10 sm:p-4">
      <div className="relative h-8 overflow-hidden sm:h-10">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="block font-display text-2xl font-bold text-gold sm:text-3xl"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-white/70">
        {label}
      </span>
    </div>
  );
}

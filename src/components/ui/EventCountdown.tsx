"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EventCountdownProps {
  targetDate: string;
  isRecurring?: boolean;
}

export default function EventCountdown({ targetDate, isRecurring }: EventCountdownProps) {
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

      if (isRecurring) {
        // For recurring events like "Every Sunday", we calculate the next occurrence
        // This is a simplified version - in a real app, you'd want more complex logic
        const date = new Date(targetDate);
        const dayOfWeek = date.getDay();
        const nowObj = new Date();
        const nextDate = new Date();
        nextDate.setDate(nowObj.getDate() + (dayOfWeek + 7 - nowObj.getDay()) % 7);
        nextDate.setHours(date.getHours(), date.getMinutes(), 0, 0);
        
        if (nextDate.getTime() < now) {
          nextDate.setDate(nextDate.getDate() + 7);
        }
        target = nextDate.getTime();
      }

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
  }, [targetDate, isRecurring]);

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
    <div className="flex flex-col items-center rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/10 sm:p-4">
      <div className="relative h-8 overflow-hidden sm:h-10">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="block font-(family-name:--font-playfair) text-2xl font-bold text-gold sm:text-3xl"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatEventAnnouncement(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();
  
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) return `Today at ${time}`;
  if (isTomorrow) return `Tomorrow at ${time}`;
  
  const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 7) {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return `This ${dayName} at ${time}`;
  }
  
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

export function getNextServiceOccurrence(dayName: string, timeStr: string): Date {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const targetDay = days.indexOf(dayName);
  if (targetDay === -1) return new Date();

  const now = new Date();
  const result = new Date(now);
  
  // Parse time (expecting "9:00 AM" or "18:00")
  const [time, modifier] = timeStr.split(" ");
  const [parsedHours, minutes] = time.split(":").map(Number);
  let hours = parsedHours;
  
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  
  result.setHours(hours, minutes || 0, 0, 0);

  const currentDay = now.getDay();
  let daysUntil = (targetDay - currentDay + 7) % 7;
  
  // If it's today but the time has passed, move to next week
  if (daysUntil === 0 && result < now) {
    daysUntil = 7;
  }
  
  result.setDate(now.getDate() + daysUntil);
  return result;
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function getYouTubeVideoId(urlOrId: string): string | null {
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return urlOrId;
  const match = urlOrId.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function generateICS({
  title,
  date,
  endDate,
  location,
  description,
}: {
  title: string;
  date: string;
  endDate?: string;
  location?: string;
  description?: string;
}): string {
  const formatICSDate = (d: string) =>
    new Date(d)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

  const dtStart = formatICSDate(date);
  const dtEnd = endDate
    ? formatICSDate(endDate)
    : formatICSDate(
        new Date(new Date(date).getTime() + 2 * 60 * 60 * 1000).toISOString()
      );

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Enjiri Center Ministries//EN",
    "BEGIN:VEVENT",
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    location ? `LOCATION:${location}` : "",
    description ? `DESCRIPTION:${description.replace(/\n/g, "\\n")}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines)}`;
}

/** YouTube titles arrive as "TITLE - SPEAKER | CHANNEL" in capitals; keep the title part, title-cased. */
export function cleanVideoTitle(raw: string): string {
  const title = raw.split("|")[0].trim();
  if (title !== title.toUpperCase()) return title;
  return title
    .toLowerCase()
    .replace(/(^|[\s(-])(\p{L})/gu, (_, pre: string, ch: string) => pre + ch.toUpperCase());
}

const ORDINALS = ["first", "second", "third", "fourth", "last"];

/** "Every Sunday" or "Every second Tuesday of the month", from a recurring event's start date. */
export function recurrenceLabel(dateString: string, recurrence?: string): string {
  const d = new Date(dateString);
  const weekday = d.toLocaleDateString("en-US", { weekday: "long", timeZone: "Africa/Kampala" });
  if (recurrence !== "monthly") return `Every ${weekday}`;
  const dayOfMonth = Number(d.toLocaleDateString("en-US", { day: "numeric", timeZone: "Africa/Kampala" }));
  return `Every ${ORDINALS[Math.ceil(dayOfMonth / 7) - 1]} ${weekday} of the month`;
}

/** Next upcoming date of a recurring event (weekly, or monthly on the same nth weekday). */
export function nextOccurrence(dateString: string, recurrence?: string): Date {
  const start = new Date(dateString);
  const now = new Date();
  if (recurrence === "monthly") {
    const nth = Math.ceil(start.getDate() / 7);
    for (let m = 0; m < 14; m++) {
      const first = new Date(now.getFullYear(), now.getMonth() + m, 1);
      const day = 1 + ((start.getDay() - first.getDay() + 7) % 7) + (nth - 1) * 7;
      const next = new Date(first.getFullYear(), first.getMonth(), day, start.getHours(), start.getMinutes());
      if (next.getMonth() === first.getMonth() && next >= now && next >= start) return next;
    }
    return start;
  }
  const next = new Date(now);
  next.setDate(now.getDate() + ((start.getDay() + 7 - now.getDay()) % 7));
  next.setHours(start.getHours(), start.getMinutes(), 0, 0);
  if (next < now) next.setDate(next.getDate() + 7);
  return next < start ? start : next;
}

/** True once the given date/time is in the past. */
export function hasPassed(dateString: string): boolean {
  return new Date(dateString).getTime() < Date.now();
}

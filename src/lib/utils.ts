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
  let [hours, minutes] = time.split(":").map(Number);
  
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

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

export function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
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

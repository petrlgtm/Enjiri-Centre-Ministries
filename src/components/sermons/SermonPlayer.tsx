"use client";

import { getYouTubeEmbedUrl } from "@/lib/utils";

interface SermonPlayerProps {
  videoUrl?: string;
  audioUrl?: string;
  title: string;
}

export default function SermonPlayer({
  videoUrl,
  audioUrl,
  title,
}: SermonPlayerProps) {
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

  return (
    <div>
      {embedUrl ? (
        <div className="aspect-video overflow-hidden rounded-2xl bg-black">
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : videoUrl ? (
        <div className="aspect-video overflow-hidden rounded-2xl bg-black">
          <video controls className="h-full w-full" title={title}>
            <source src={videoUrl} />
          </video>
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-2xl bg-navy">
          <p className="text-gray-400">Video coming soon</p>
        </div>
      )}

      {audioUrl && (
        <div className="mt-4 rounded-xl bg-[var(--gray-50)] p-4">
          <p className="mb-2 text-sm font-medium text-white">Audio Version</p>
          <audio controls className="w-full">
            <source src={audioUrl} />
          </audio>
        </div>
      )}
    </div>
  );
}

const API_KEY = process.env.YOUTUBE_API_KEY ?? "";
const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE ?? "@EnjiriCenter";

export interface Sermon {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  duration: string;
  url: string;
}

/** Convert ISO 8601 duration (PT1H23M45S) → human-readable "1 hr 23 min" */
export function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  if (hours > 0) return `${hours} hr ${minutes} min`;
  return `${minutes} min`;
}

/** Resolve channel ID from handle, then fetch latest uploads */
export async function getSermons(maxResults = 12): Promise<Sermon[]> {
  if (!API_KEY) {
    console.warn("[youtube] YOUTUBE_API_KEY not set — returning empty sermons");
    return [];
  }

  try {
    // 1. Resolve channel ID from handle
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      console.warn("[youtube] Could not resolve uploads playlist for", CHANNEL_HANDLE);
      return [];
    }

    // 2. Get playlist items (latest videos)
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${API_KEY}`
    );
    const playlistData = await playlistRes.json();
    const items = playlistData.items;

    if (!items?.length) {
      console.warn("[youtube] No videos found in uploads playlist");
      return [];
    }

    // 3. Get video details (duration, etc.)
    const videoIds = items.map((item: any) => item.snippet.resourceId.videoId).join(",");
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${API_KEY}`
    );
    const videosData = await videosRes.json();

    const durationMap = new Map<string, string>();
    for (const video of videosData.items ?? []) {
      durationMap.set(video.id, parseDuration(video.contentDetails.duration));
    }

    // 4. Map to Sermon objects
    return items.map((item: any) => {
      const snippet = item.snippet;
      const videoId = snippet.resourceId.videoId;
      return {
        id: videoId,
        title: snippet.title,
        description: snippet.description,
        thumbnail:
          snippet.thumbnails?.maxres?.url ??
          snippet.thumbnails?.high?.url ??
          snippet.thumbnails?.medium?.url ??
          "",
        date: snippet.publishedAt,
        duration: durationMap.get(videoId) ?? "",
        url: `https://www.youtube.com/watch?v=${videoId}`,
      };
    });
  } catch (error) {
    console.warn("[youtube] Failed to fetch sermons:", error);
    return [];
  }
}

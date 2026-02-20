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
  embedUrl: string;
  viewCount: string;
  channelTitle: string;
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

/** Format view count: 1234 → "1.2K", 1234567 → "1.2M" */
export function formatViews(count: string): string {
  const n = parseInt(count);
  if (isNaN(n)) return "0 views";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}

/** Fetch ALL videos from the channel by paginating through the uploads playlist */
export async function getSermons(): Promise<Sermon[]> {
  if (!API_KEY) {
    console.warn("[youtube] YOUTUBE_API_KEY not set — returning empty sermons");
    return [];
  }

  try {
    // 1. Resolve channel ID from handle
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();
    const channel = channelData.items?.[0];
    const uploadsPlaylistId =
      channel?.contentDetails?.relatedPlaylists?.uploads;
    const channelTitle = channel?.snippet?.title ?? "Enjiri Center";

    if (!uploadsPlaylistId) {
      console.warn("[youtube] Could not resolve uploads playlist for", CHANNEL_HANDLE);
      return [];
    }

    // 2. Paginate through ALL playlist items (50 per page max)
    const allItems: any[] = [];
    let nextPageToken: string | undefined;

    do {
      const pageParam = nextPageToken ? `&pageToken=${nextPageToken}` : "";
      const playlistRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50${pageParam}&key=${API_KEY}`
      );
      const playlistData = await playlistRes.json();

      if (playlistData.items?.length) {
        allItems.push(...playlistData.items);
      }

      nextPageToken = playlistData.nextPageToken;
    } while (nextPageToken);

    if (!allItems.length) {
      console.warn("[youtube] No videos found in uploads playlist");
      return [];
    }

    // 3. Get video details in batches of 50 (API limit)
    const detailsMap = new Map<string, { duration: string; viewCount: string }>();

    for (let i = 0; i < allItems.length; i += 50) {
      const batch = allItems.slice(i, i + 50);
      const videoIds = batch
        .map((item: any) => item.snippet.resourceId.videoId)
        .join(",");

      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
      );
      const videosData = await videosRes.json();

      for (const video of videosData.items ?? []) {
        detailsMap.set(video.id, {
          duration: parseDuration(video.contentDetails.duration),
          viewCount: video.statistics?.viewCount ?? "0",
        });
      }
    }

    // 4. Map to Sermon objects, sorted newest first
    return allItems
      .map((item: any) => {
        const snippet = item.snippet;
        const videoId = snippet.resourceId.videoId;
        const details = detailsMap.get(videoId);
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
          duration: details?.duration ?? "",
          viewCount: details?.viewCount ?? "0",
          url: `https://www.youtube.com/watch?v=${videoId}`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          channelTitle,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.warn("[youtube] Failed to fetch sermons:", error);
    return [];
  }
}

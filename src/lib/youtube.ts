const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  videoUrl: string;
}

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
    thumbnails: {
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
}

interface YouTubeSearchResponse {
  items?: YouTubeSearchItem[];
  error?: { message: string };
}

export async function fetchYouTubeVideos(
  channelId: string,
  maxResults = 9
): Promise<YouTubeVideo[]> {
  if (!API_KEY) return [];

  try {
    const params = new URLSearchParams({
      part: "snippet",
      channelId,
      maxResults: String(maxResults),
      order: "date",
      type: "video",
      key: API_KEY,
    });

    const res = await fetch(`${BASE_URL}/search?${params}`);
    if (!res.ok) return [];

    const data: YouTubeSearchResponse = await res.json();
    if (data.error || !data.items) return [];

    return data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        item.snippet.thumbnails.default?.url ??
        "",
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch {
    return [];
  }
}

export async function searchYouTubeVideos(
  query: string,
  channelId?: string,
  maxResults = 9
): Promise<YouTubeVideo[]> {
  if (!API_KEY) return [];

  try {
    const params = new URLSearchParams({
      part: "snippet",
      q: query,
      maxResults: String(maxResults),
      order: "relevance",
      type: "video",
      key: API_KEY,
    });

    if (channelId) params.set("channelId", channelId);

    const res = await fetch(`${BASE_URL}/search?${params}`);
    if (!res.ok) return [];

    const data: YouTubeSearchResponse = await res.json();
    if (data.error || !data.items) return [];

    return data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        item.snippet.thumbnails.default?.url ??
        "",
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch {
    return [];
  }
}

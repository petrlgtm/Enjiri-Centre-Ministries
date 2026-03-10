const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const CACHE_KEY = "enjiri_yt_videos";
const SEARCH_CACHE_KEY = "enjiri_yt_search";
const CACHE_TTL = 1000 * 60 * 60 * 4; // 4 hours

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

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function getCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    // Return data even if expired — stale data is better than nothing
    return entry.data;
  } catch {
    return null;
  }
}

function isCacheFresh(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const entry: CacheEntry<unknown> = JSON.parse(raw);
    return Date.now() - entry.timestamp < CACHE_TTL;
  } catch {
    return false;
  }
}

function setCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

function mapItemToVideo(item: YouTubeSearchItem): YouTubeVideo {
  return {
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
  };
}

export async function fetchYouTubeVideos(
  channelId: string,
  maxResults = 9
): Promise<YouTubeVideo[]> {
  const cacheKey = `${CACHE_KEY}_${channelId}`;

  // Return fresh cache without hitting API
  if (isCacheFresh(cacheKey)) {
    const cached = getCache<YouTubeVideo[]>(cacheKey);
    if (cached && cached.length > 0) return cached;
  }

  if (!API_KEY) {
    // No API key — return stale cache if available
    return getCache<YouTubeVideo[]>(cacheKey) || [];
  }

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

    if (!res.ok) {
      // API quota exceeded or other error — return cached data
      return getCache<YouTubeVideo[]>(cacheKey) || [];
    }

    const data: YouTubeSearchResponse = await res.json();
    if (data.error || !data.items) {
      return getCache<YouTubeVideo[]>(cacheKey) || [];
    }

    const videos = data.items.map(mapItemToVideo);

    // Cache successful results
    setCache(cacheKey, videos);

    return videos;
  } catch {
    // Network error — return cached data
    return getCache<YouTubeVideo[]>(cacheKey) || [];
  }
}

export async function searchYouTubeVideos(
  query: string,
  channelId?: string,
  maxResults = 9
): Promise<YouTubeVideo[]> {
  const cacheKey = `${SEARCH_CACHE_KEY}_${query}_${channelId || ""}`;

  // Return fresh cache without hitting API
  if (isCacheFresh(cacheKey)) {
    const cached = getCache<YouTubeVideo[]>(cacheKey);
    if (cached && cached.length > 0) return cached;
  }

  if (!API_KEY) {
    return getCache<YouTubeVideo[]>(cacheKey) || [];
  }

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

    if (!res.ok) {
      return getCache<YouTubeVideo[]>(cacheKey) || [];
    }

    const data: YouTubeSearchResponse = await res.json();
    if (data.error || !data.items) {
      return getCache<YouTubeVideo[]>(cacheKey) || [];
    }

    const videos = data.items.map(mapItemToVideo);

    // Cache successful results
    setCache(cacheKey, videos);

    return videos;
  } catch {
    return getCache<YouTubeVideo[]>(cacheKey) || [];
  }
}

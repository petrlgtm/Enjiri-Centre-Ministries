export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  videoUrl: string;
}

interface YouTubeCache {
  lastUpdated: string;
  videos: YouTubeVideo[];
  collections?: Record<string, YouTubeVideo[]>;
}

/**
 * Fetches YouTube videos from the static cache file.
 * Supports fetching from specific collections (e.g., 'sermons', 'songs').
 */
export async function fetchYouTubeVideos(
  collectionId: string = "sermons",
  maxResults = 9
): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch("/youtube-cache.json");
    if (!res.ok) {
      throw new Error("Failed to fetch youtube cache");
    }

    const data: YouTubeCache = await res.json();
    
    // Try to get from collections first, fallback to the main 'videos' array
    const videos = data.collections?.[collectionId] || data.videos || [];
    
    return videos.slice(0, maxResults);
  } catch (error) {
    console.error(`Error loading YouTube videos for collection ${collectionId}:`, error);
    return [];
  }
}

/**
 * Searches YouTube videos within the cached data.
 */
export async function searchYouTubeVideos(
  query: string,
  collectionId: string = "sermons",
  maxResults = 9
): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch("/youtube-cache.json");
    if (!res.ok) {
      throw new Error("Failed to fetch youtube cache");
    }

    const data: YouTubeCache = await res.json();
    const normalizedQuery = query.toLowerCase();

    const videos = data.collections?.[collectionId] || data.videos || [];

    const filtered = videos.filter(
      (v) =>
        v.title.toLowerCase().includes(normalizedQuery) ||
        v.description.toLowerCase().includes(normalizedQuery)
    );

    return filtered.slice(0, maxResults);
  } catch (error) {
    console.error(`Error searching YouTube videos in collection ${collectionId}:`, error);
    return [];
  }
}

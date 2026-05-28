const fs = require('fs');
const path = require('path');

const API_KEY = process.env.YOUTUBE_API_KEY;

// Configuration for different content types
const COLLECTIONS = [
  {
    id: 'sermons',
    channelId: 'UCFStM9EkCFD3h8b4xtlHIOQ',
    maxResults: 50
  },
  // Add more collections here as needed
  // {
  //   id: 'songs',
  //   playlistId: 'PLAYLIST_ID',
  //   maxResults: 50
  // }
];

const CACHE_FILE = path.join(__dirname, '../public/youtube-cache.json');

async function fetchYouTubeVideos(config) {
  const BASE_URL = 'https://www.googleapis.com/youtube/v3';
  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: String(config.maxResults || 50),
    order: 'date',
    type: 'video',
    key: API_KEY,
  });

  if (config.channelId) {
    params.set('channelId', config.channelId);
  } else if (config.playlistId) {
    // For playlists, we use a different endpoint
    return fetchPlaylistItems(config.playlistId, config.maxResults);
  }

  try {
    const res = await fetch(`${BASE_URL}/search?${params}`);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(`YouTube API error: ${error.error?.message || res.statusText}`);
    }

    const data = await res.json();
    return data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        item.snippet.thumbnails.default?.url ??
        '',
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error(`Error fetching YouTube videos for ${config.id}:`, error);
    return [];
  }
}

async function fetchPlaylistItems(playlistId, maxResults = 50) {
  const BASE_URL = 'https://www.googleapis.com/youtube/v3';
  const params = new URLSearchParams({
    part: 'snippet',
    playlistId: playlistId,
    maxResults: String(maxResults),
    key: API_KEY,
  });

  try {
    const res = await fetch(`${BASE_URL}/playlistItems?${params}`);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(`YouTube API error: ${error.error?.message || res.statusText}`);
    }

    const data = await res.json();
    return data.items.map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        item.snippet.thumbnails.default?.url ??
        '',
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    }));
  } catch (error) {
    console.error(`Error fetching playlist items for ${playlistId}:`, error);
    return [];
  }
}

async function main() {
  if (!API_KEY) {
    console.error('YOUTUBE_API_KEY is not set');
    process.exit(1);
  }

  const cacheData = {
    lastUpdated: new Date().toISOString(),
    collections: {},
  };

  for (const collection of COLLECTIONS) {
    console.log(`Fetching videos for collection: ${collection.id}...`);
    const videos = await fetchYouTubeVideos(collection);
    cacheData.collections[collection.id] = videos;
    console.log(`Added ${videos.length} videos to ${collection.id}`);
  }

  // Also keep a flat 'videos' array for backward compatibility with simple implementations
  cacheData.videos = cacheData.collections['sermons'] || [];

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
  console.log(`Successfully updated cache at ${CACHE_FILE}`);
}

main();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.YOUTUBE_API_KEY;

// Configuration for different content types
const COLLECTIONS = [
  {
    id: 'sermons',
    channelId: 'UCFStM9EkCFD3h8b4xtlHIOQ',
    fetchAll: true
  }
];

const CACHE_FILE = path.join(__dirname, '../public/youtube-cache.json');

async function fetchYouTubeVideos(config) {
  const BASE_URL = 'https://www.googleapis.com/youtube/v3';
  let allItems = [];
  let nextPageToken = '';
  
  const maxResults = config.fetchAll ? 50 : (config.maxResults || 50);

  do {
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: String(maxResults),
      order: 'date',
      type: 'video',
      key: API_KEY,
    });

    if (config.channelId) {
      params.set('channelId', config.channelId);
    }
    
    if (nextPageToken) {
      params.set('pageToken', nextPageToken);
    }

    try {
      console.log(`Fetching page... ${nextPageToken || 'first'}`);
      const res = await fetch(`${BASE_URL}/search?${params}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(`YouTube API error: ${error.error?.message || res.statusText}`);
      }

      const data = await res.json();
      const mappedItems = data.items.map((item) => ({
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

      allItems = [...allItems, ...mappedItems];
      nextPageToken = config.fetchAll ? data.nextPageToken : null;

      // Safety break to prevent infinite loops if something goes wrong
      if (allItems.length > 1000) {
        console.warn('Reached 1000 videos safety limit');
        break;
      }
    } catch (error) {
      console.error(`Error fetching YouTube videos for ${config.id}:`, error);
      break;
    }
  } while (nextPageToken);

  return allItems;
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

  // Also keep a flat 'videos' array for backward compatibility
  cacheData.videos = cacheData.collections['sermons'] || [];

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
  console.log(`Successfully updated cache at ${CACHE_FILE}`);
}

main();

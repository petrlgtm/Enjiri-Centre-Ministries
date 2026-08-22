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

// Load existing cache
let existingCache = { collections: {}, videos: [] };
if (fs.existsSync(CACHE_FILE)) {
  try {
    existingCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    console.error('Error reading existing cache, starting fresh');
  }
}

async function fetchYouTubeVideos(config) {
  const BASE_URL = 'https://www.googleapis.com/youtube/v3';
  let newItems = [];
  let nextPageToken = '';
  
  // Get existing IDs for this collection to know when to stop
  const existingCollection = existingCache.collections?.[config.id] || [];
  const existingIds = new Set(existingCollection.map(v => v.id));

  console.log(`Currently have ${existingIds.size} videos in ${config.id} cache.`);

  do {
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: '50',
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
      let stopFetching = false;
      
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

      for (const item of mappedItems) {
        if (existingIds.has(item.id)) {
          console.log(`Found video ${item.id} already in cache. Stopping.`);
          stopFetching = true;
          break;
        }
        newItems.push(item);
      }

      if (stopFetching) break;
      
      nextPageToken = config.fetchAll ? data.nextPageToken : null;
      
      if (newItems.length > 500) {
        console.warn('Fetched 500 new videos, stopping for safety.');
        break;
      }
    } catch (error) {
      console.error(`Error fetching YouTube videos for ${config.id}:`, error);
      break;
    }
  } while (nextPageToken);

  // Combine new items with existing ones, then drop anything no longer public
  // (covers newly-fetched videos and previously-cached ones that were made
  // private/unlisted since the last run).
  const combined = [...newItems, ...existingCollection];
  return filterPublicVideos(combined);
}

/**
 * Looks up privacyStatus for a batch of video IDs and keeps only public ones.
 * videos.list accepts up to 50 IDs per call.
 */
async function filterPublicVideos(items) {
  const BASE_URL = 'https://www.googleapis.com/youtube/v3';
  const publicIds = new Set();

  for (let i = 0; i < items.length; i += 50) {
    const batch = items.slice(i, i + 50);
    const params = new URLSearchParams({
      part: 'status',
      id: batch.map((v) => v.id).join(','),
      key: API_KEY,
    });

    try {
      const res = await fetch(`${BASE_URL}/videos?${params}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(`YouTube API error: ${error.error?.message || res.statusText}`);
      }
      const data = await res.json();
      for (const item of data.items) {
        if (item.status?.privacyStatus === 'public') {
          publicIds.add(item.id);
        }
      }
    } catch (error) {
      console.error('Error checking video privacy status:', error);
      // On failure, keep the batch as-is rather than silently dropping videos.
      batch.forEach((v) => publicIds.add(v.id));
    }
  }

  const dropped = items.filter((v) => !publicIds.has(v.id));
  if (dropped.length) {
    console.log(`Excluding ${dropped.length} non-public video(s): ${dropped.map((v) => v.id).join(', ')}`);
  }

  return items.filter((v) => publicIds.has(v.id));
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
    console.log(`Updating collection: ${collection.id}...`);
    const updatedVideos = await fetchYouTubeVideos(collection);
    cacheData.collections[collection.id] = updatedVideos;
    console.log(`Total videos in ${collection.id}: ${updatedVideos.length}`);
  }

  // Also keep a flat 'videos' array for backward compatibility
  cacheData.videos = cacheData.collections['sermons'] || [];

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
  console.log(`Successfully updated cache at ${CACHE_FILE}`);
}

main();

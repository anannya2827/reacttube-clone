const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'youtube-v31.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const headers = {
  'x-rapidapi-host': API_HOST,
  'x-rapidapi-key': API_KEY,
};

async function fetchYouTube(path, params = {}) {
  const url = new URL(`https://${API_HOST}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), { headers });

  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`);
  }

  return response.json();
}

export async function searchVideos(query, maxResults = 25) {
  return fetchYouTube('/search', {
    q: query,
    part: 'snippet',
    type: 'video',
    maxResults,
  });
}

export async function getSuggestedVideos(videoId, maxResults = 25) {
  return fetchYouTube('/search', {
    relatedToVideoId: videoId,
    part: 'id,snippet',
    type: 'video',
    maxResults,
  });
}

export function normalizeVideos(data) {
  if (!data?.items) return [];

  return data.items
    .filter((item) => item.id?.videoId || item.id)
    .map((item) => {
      const videoId = item.id?.videoId || item.id;
      const snippet = item.snippet;

      return {
        id: videoId,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        channelId: snippet.channelId,
        publishedAt: snippet.publishedAt,
        thumbnail:
          snippet.thumbnails?.high?.url ||
          snippet.thumbnails?.medium?.url ||
          snippet.thumbnails?.default?.url,
      };
    });
}

export const CATEGORY_QUERIES = {
  All: null,
  New: 'latest videos',
  Music: 'music',
  Gaming: 'gaming',
  Live: 'live stream',
  Education: 'education',
  Coding: 'programming tutorial',
  Fitness: 'fitness workout',
  Cooking: 'cooking recipes',
  Crafts: 'diy crafts',
  Movies: 'movie trailers',
  News: 'news today',
  Comedy: 'comedy',
  Travel: 'travel vlog',
};

export const DEFAULT_VIDEO_ID = '7ghhRHRP6t4';

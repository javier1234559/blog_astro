export type YoutubeTrack = {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  url: string;
  musicUrl: string;
};

export type YoutubePlaylist = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  url: string;
  musicUrl: string;
};

type YoutubeThumbnail = {
  url?: string;
};

type YoutubeThumbnails = {
  maxres?: YoutubeThumbnail;
  standard?: YoutubeThumbnail;
  high?: YoutubeThumbnail;
  medium?: YoutubeThumbnail;
  default?: YoutubeThumbnail;
};

function getEnv(name: string) {
  return import.meta.env[name] as string | undefined;
}

function pickThumbnail(thumbnails?: YoutubeThumbnails) {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    ""
  );
}

function isConfigured() {
  return Boolean(getEnv("YOUTUBE_API_KEY"));
}

async function youtubeGet<T>(
  path: string,
  params: Record<string, string | number | undefined>
): Promise<T | null> {
  const apiKey = getEnv("YOUTUBE_API_KEY");
  if (!apiKey) return null;

  const search = new URLSearchParams({ key: apiKey });
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/${path}?${search.toString()}`
  );

  if (!response.ok) {
    console.error(
      `YouTube API ${path} failed:`,
      response.status,
      await response.text()
    );
    return null;
  }

  return (await response.json()) as T;
}

export async function getFavoriteTracks(limit = 5): Promise<YoutubeTrack[]> {
  const playlistId = getEnv("YOUTUBE_FAVORITES_PLAYLIST_ID");
  if (!isConfigured() || !playlistId) return [];

  const data = await youtubeGet<{
    items?: Array<{
      snippet?: {
        title?: string;
        videoOwnerChannelTitle?: string;
        channelTitle?: string;
        resourceId?: { videoId?: string };
        thumbnails?: YoutubeThumbnails;
      };
    }>;
  }>("playlistItems", {
    part: "snippet",
    playlistId,
    maxResults: limit,
  });

  if (!data?.items?.length) return [];

  return data.items
    .map((item) => {
      const videoId = item.snippet?.resourceId?.videoId;
      if (!videoId) return null;

      return {
        id: videoId,
        title: item.snippet?.title || "Untitled",
        artist:
          item.snippet?.videoOwnerChannelTitle ||
          item.snippet?.channelTitle ||
          "Unknown artist",
        thumbnail: pickThumbnail(item.snippet?.thumbnails),
        url: `https://www.youtube.com/watch?v=${videoId}`,
        musicUrl: `https://music.youtube.com/watch?v=${videoId}`,
      } satisfies YoutubeTrack;
    })
    .filter((track): track is YoutubeTrack => track !== null)
    .slice(0, limit);
}

export async function getPlaylists(limit = 12): Promise<YoutubePlaylist[]> {
  const channelId = getEnv("YOUTUBE_CHANNEL_ID");
  const playlistIds = getEnv("YOUTUBE_PLAYLIST_IDS");

  if (!isConfigured()) return [];

  if (playlistIds) {
    const ids = playlistIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
      .slice(0, limit);

    if (!ids.length) return [];

    const data = await youtubeGet<{
      items?: Array<{
        id?: string;
        snippet?: {
          title?: string;
          description?: string;
          thumbnails?: YoutubeThumbnails;
        };
        contentDetails?: { itemCount?: number };
      }>;
    }>("playlists", {
      part: "snippet,contentDetails",
      id: ids.join(","),
      maxResults: limit,
    });

    return mapPlaylists(data?.items || []);
  }

  if (!channelId) return [];

  const data = await youtubeGet<{
    items?: Array<{
      id?: string;
      snippet?: {
        title?: string;
        description?: string;
        thumbnails?: YoutubeThumbnails;
      };
      contentDetails?: { itemCount?: number };
    }>;
  }>("playlists", {
    part: "snippet,contentDetails",
    channelId,
    maxResults: limit,
  });

  return mapPlaylists(data?.items || []);
}

function mapPlaylists(
  items: Array<{
    id?: string;
    snippet?: {
      title?: string;
      description?: string;
      thumbnails?: YoutubeThumbnails;
    };
    contentDetails?: { itemCount?: number };
  }>
): YoutubePlaylist[] {
  return items
    .map((item) => {
      if (!item.id) return null;

      return {
        id: item.id,
        title: item.snippet?.title || "Untitled playlist",
        description: item.snippet?.description || "",
        thumbnail: pickThumbnail(item.snippet?.thumbnails),
        itemCount: item.contentDetails?.itemCount || 0,
        url: `https://www.youtube.com/playlist?list=${item.id}`,
        musicUrl: `https://music.youtube.com/playlist?list=${item.id}`,
      } satisfies YoutubePlaylist;
    })
    .filter((playlist): playlist is YoutubePlaylist => playlist !== null);
}

export function isYoutubeConfigured() {
  return Boolean(
    getEnv("YOUTUBE_API_KEY") &&
      (getEnv("YOUTUBE_FAVORITES_PLAYLIST_ID") ||
        getEnv("YOUTUBE_CHANNEL_ID") ||
        getEnv("YOUTUBE_PLAYLIST_IDS"))
  );
}

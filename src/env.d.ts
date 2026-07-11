/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN?: string;
  readonly GITHUB_REPO?: string;
  readonly YOUTUBE_API_KEY?: string;
  readonly YOUTUBE_CHANNEL_ID?: string;
  readonly YOUTUBE_FAVORITES_PLAYLIST_ID?: string;
  readonly YOUTUBE_PLAYLIST_IDS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

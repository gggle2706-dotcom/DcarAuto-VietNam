// Trợ giúp phân tích và nhúng video từ YouTube, TikTok, Facebook

export interface VideoInfo {
  platform: 'youtube' | 'tiktok' | 'facebook' | 'unknown';
  embedUrl: string | null;
  videoId: string | null;
  originalUrl: string;
  platformName: string;
  badgeBg: string;
}

export function parseVideoUrl(url?: string | null): VideoInfo | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // 1. YouTube
  const ytRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const ytMatch = trimmed.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      platform: 'youtube',
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`,
      originalUrl: trimmed,
      platformName: 'YouTube',
      badgeBg: 'bg-red-600 text-white',
    };
  }

  // 2. TikTok
  const ttRegex = /tiktok\.com\/(?:@[\w.-]+\/video\/|v\/|embed\/v2\/)(\d+)/;
  const ttMatch = trimmed.match(ttRegex);
  if (ttMatch && ttMatch[1]) {
    const videoId = ttMatch[1];
    return {
      platform: 'tiktok',
      videoId,
      embedUrl: `https://www.tiktok.com/embed/v2/${videoId}`,
      originalUrl: trimmed,
      platformName: 'TikTok',
      badgeBg: 'bg-slate-900 text-white',
    };
  } else if (trimmed.includes('tiktok.com') || trimmed.includes('vt.tiktok.com')) {
    return {
      platform: 'tiktok',
      videoId: null,
      embedUrl: null,
      originalUrl: trimmed,
      platformName: 'TikTok',
      badgeBg: 'bg-slate-900 text-white',
    };
  }

  // 3. Facebook Video / Reel
  if (trimmed.includes('facebook.com') || trimmed.includes('fb.watch')) {
    const encoded = encodeURIComponent(trimmed);
    return {
      platform: 'facebook',
      videoId: null,
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=auto`,
      originalUrl: trimmed,
      platformName: 'Facebook Video',
      badgeBg: 'bg-blue-600 text-white',
    };
  }

  return {
    platform: 'unknown',
    videoId: null,
    embedUrl: null,
    originalUrl: trimmed,
    platformName: 'Video',
    badgeBg: 'bg-slate-700 text-white',
  };
}

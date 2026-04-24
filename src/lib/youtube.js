/**
 * Extracts YouTube video id from youtu.be or youtube.com watch URLs.
 */
export function getYoutubeId(url) {
  if (!url) return null
  try {
    const u = new URL(url, 'https://www.youtube.com')
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1).split('/')[0] || null
    }
    if (u.hostname.includes('youtube.com') && u.pathname === '/watch') {
      return u.searchParams.get('v')
    }
    if (u.hostname.includes('youtube.com') && u.pathname.startsWith('/embed/')) {
      return u.pathname.split('/embed/')[1]?.split('?')[0] || null
    }
  } catch {
    return null
  }
  return null
}

export function getYoutubeEmbedUrl(url) {
  const id = getYoutubeId(url)
  if (!id) return null
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
}

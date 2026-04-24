/** Soft pill backgrounds for category labels (kids-friendly, readable on white). */
export const categoryPillClass = {
  日常好習慣: 'bg-mint-200/70 text-ink-800 border-mint-500/20',
  學學唱唱: 'bg-sky-200/80 text-ink-800 border-sky-400/30',
  經典兒歌: 'bg-lilac-200/70 text-ink-800 border-lilac-500/25',
}

export function getCategoryPillClass(category) {
  return (
    categoryPillClass[category] ?? 'bg-ink-800/5 text-ink-800/80 border-ink-800/10'
  )
}

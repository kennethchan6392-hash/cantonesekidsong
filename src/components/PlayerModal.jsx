import { useEffect, useId } from 'react'
import { getYoutubeEmbedUrl } from '../lib/youtube'
import { getCategoryPillClass } from '../lib/categoryStyles'
import { usePlayer } from '../hooks/usePlayer'

export default function PlayerModal() {
  const {
    isOpen,
    currentSong,
    currentIndex,
    playlist,
    next,
    previous,
    close,
  } = usePlayer()
  const titleId = useId()
  const canNavigate = playlist.length > 1
  const catPill = currentSong ? getCategoryPillClass(currentSong.category) : ''

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, close])

  if (!isOpen || !currentSong) return null

  const embed = getYoutubeEmbedUrl(currentSong.youtubeUrl)
  if (!embed) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink-800/55 backdrop-blur-md animate-ui-backdrop-in"
        onClick={close}
        aria-label="關閉播放器"
      />
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border-2 border-white/70 bg-gradient-to-b from-cream-50 to-white shadow-float animate-ui-fade-in ring-1 ring-ink-800/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-ink-800/8 bg-white/80 px-4 py-3.5 sm:px-5">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-extrabold text-coral-400">你而家睇緊</p>
            <h2 id={titleId} className="mt-0.5 font-display text-lg font-extrabold text-ink-800 sm:text-xl">
              {currentSong.title}
            </h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-bold text-ink-800/55 sm:text-sm">
              {currentSong.category && (
                <span
                  className={['rounded-full border px-2.5 py-0.5 text-ink-800', catPill].join(' ')}
                >
                  {currentSong.category}
                </span>
              )}
              <span className="whitespace-nowrap">第 {currentIndex + 1} 首 · 共 {playlist.length} 首</span>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-ink-800/8 bg-white text-2xl font-light leading-none text-ink-800/70 transition hover:bg-ink-800/5 hover:text-ink-800"
            aria-label="關閉"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        <div className="aspect-video w-full bg-ink-800">
          <iframe
            key={currentSong.id}
            title={`「${currentSong.title}」影片`}
            src={embed}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        {canNavigate && (
          <div className="flex items-stretch justify-between gap-2 border-t border-ink-800/8 bg-cream-50/90 px-3 py-3 sm:gap-3 sm:px-4">
            <button
              type="button"
              onClick={previous}
              className="group flex min-h-12 min-w-0 flex-1 items-center justify-center gap-1 rounded-2xl border-2 border-ink-800/8 bg-mint-200/70 py-2.5 text-sm font-extrabold text-ink-800 transition hover:brightness-105 active:scale-[0.99] sm:max-w-[11rem] sm:flex-none"
            >
              <span className="text-lg" aria-hidden>
                ◀
              </span>
              上一首
            </button>
            <button
              type="button"
              onClick={next}
              className="group flex min-h-12 min-w-0 flex-1 items-center justify-center gap-1 rounded-2xl border-2 border-ink-800/8 bg-sky-200/90 py-2.5 text-sm font-extrabold text-ink-800 transition hover:brightness-105 active:scale-[0.99] sm:ml-auto sm:max-w-[11rem] sm:flex-none"
            >
              下一首
              <span className="text-lg" aria-hidden>
                ▶
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

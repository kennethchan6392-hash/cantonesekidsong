import { getCategoryPillClass } from '../lib/categoryStyles'

export default function SongCard({ song, onPlay, index, total }) {
  const catClass = getCategoryPillClass(song.category)

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-white/60 bg-white/80 shadow-card ring-1 ring-ink-800/[0.04] backdrop-blur-sm transition [transition:transform_0.25s,box-shadow_0.25s] hover:-translate-y-1 hover:shadow-float focus-within:ring-2 focus-within:ring-sky-400/80"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <span
          className="absolute left-3 top-3 z-10 flex h-8 min-w-8 items-center justify-center rounded-full border border-white/50 bg-ink-800/80 px-2 text-xs font-extrabold text-cream-50 shadow-sm backdrop-blur-sm"
          aria-hidden
        >
          {index}
        </span>
        <button
          type="button"
          onClick={() => onPlay?.(song)}
          className="relative h-full w-full p-0 text-left"
          aria-label={`播「${song.title}」的影片，第 ${index} 首，共 ${total} 首`}
        >
          <img
            src={song.thumbnail}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            width={480}
            height={270}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-800/60 via-ink-800/5 to-transparent" />
          <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-800 shadow-bubble transition group-hover:scale-105 group-active:scale-95">
            <span className="sr-only">播映</span>
            <span className="pl-0.5 text-lg" aria-hidden>
              ▶
            </span>
          </span>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 pt-3">
        <h3 className="font-display text-lg font-extrabold leading-snug text-ink-800 md:text-xl">
          {song.title}
        </h3>
        <span
          className={['w-fit max-w-full rounded-full border px-2.5 py-0.5 text-xs font-extrabold', catClass].join(
            ' ',
          )}
        >
          {song.category}
        </span>
        <button
          type="button"
          onClick={() => onPlay?.(song)}
          className="mt-1 flex min-h-11 w-full max-w-full items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-coral-400 to-amber-300/90 py-2.5 text-sm font-extrabold text-ink-800 shadow-bubble transition hover:brightness-105 active:translate-y-0.5 sm:w-fit sm:px-5"
        >
          <span aria-hidden>▶</span>
          睇兒歌
        </button>
      </div>
    </article>
  )
}

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../hooks/usePlayer'
import CategoryChip from '../components/CategoryChip'
import SongCard from '../components/SongCard'
import SectionTitle from '../components/SectionTitle'

export default function Home() {
  const { allSongs, openAtIndex } = usePlayer()

  const categories = useMemo(() => {
    const s = new Set()
    for (const g of allSongs) s.add(g.category)
    return ['全部', ...[...s].sort((a, b) => a.localeCompare(b, 'zh-HK'))]
  }, [allSongs])

  const featured = useMemo(() => {
    const picks = [0, 4, 8]
    return picks.map((i) => allSongs[i]).filter(Boolean)
  }, [allSongs])

  const handlePlay = (song) => {
    const i = featured.findIndex((s) => s.id === song.id)
    if (i >= 0) openAtIndex(featured, i)
  }

  return (
    <div className="space-y-10 sm:space-y-14">
      <section
        className="relative overflow-hidden rounded-[1.75rem] border-2 border-white/70 bg-gradient-to-br from-coral-300/95 via-rose-100/90 to-sky-200/95 p-6 shadow-card ring-1 ring-ink-800/[0.04] sm:rounded-[2rem] sm:p-9 md:p-10"
        aria-labelledby="home-hero"
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-300/35 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 left-6 h-40 w-40 rounded-full bg-lilac-400/20 blur-3xl"
          aria-hidden
        />
        <div className="relative z-[1] max-w-2xl">
          <p className="text-sm font-extrabold text-ink-800/70 sm:text-base">歡迎嚟到</p>
          <h1
            id="home-hero"
            className="mt-1 font-display text-3xl font-extrabold leading-[1.2] tracking-tight text-ink-800 sm:text-4xl md:text-[2.4rem]"
          >
            哈囉，同學仔！
            <br />
            <span className="whitespace-nowrap sm:whitespace-normal">一齊聽粵語兒歌啦～</span>
          </h1>
          <p className="mt-3 text-base font-semibold leading-relaxed text-ink-800/80 sm:text-lg">
            撳歌卡、睇 YouTube 短片，學廣東話一樣咁簡單、咁開心！
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/songs"
              className="inline-flex min-h-12 min-w-[7.5rem] items-center justify-center rounded-2xl bg-ink-800 px-6 py-2.5 text-base font-extrabold text-cream-50 shadow-bubble transition hover:bg-ink-800/90 active:translate-y-0.5"
            >
              去兒歌列表
            </Link>
            <a
              href="#home-featured"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-ink-800/15 bg-white/90 px-5 py-2.5 text-base font-extrabold text-ink-800 shadow-sm transition hover:bg-white"
            >
              睇精選
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="home-categories">
        <SectionTitle
          id="home-categories"
          kicker="揀一揀"
          title="想聽邊一類？"
          description="分類去列表頁，就會幫你篩咗出嚟～"
        />
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {categories.map((c) => (
            <CategoryChip
              key={c}
              label={c}
              to={c === '全部' ? '/songs' : `/songs?category=${encodeURIComponent(c)}`}
            />
          ))}
        </div>
      </section>

      <section
        className="rounded-[1.75rem] border-2 border-white/50 bg-white/50 p-5 shadow-card ring-1 ring-ink-800/[0.04] sm:rounded-[2rem] sm:p-7"
        aria-labelledby="home-featured"
      >
        <div className="mb-5">
          <SectionTitle
            id="home-featured"
            kicker="今日最旺"
            title="精選兒歌"
            description="三首人氣歌，一撳就播～"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {featured.map((song, i) => (
            <SongCard
              key={song.id}
              song={song}
              onPlay={handlePlay}
              index={i + 1}
              total={featured.length}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

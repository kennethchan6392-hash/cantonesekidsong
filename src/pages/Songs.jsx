import { useMemo, useId } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePlayer } from '../hooks/usePlayer'
import SearchBar from '../components/SearchBar'
import CategoryChip from '../components/CategoryChip'
import SongCard from '../components/SongCard'
import SectionTitle from '../components/SectionTitle'

const ALL = '全部'

function normalize(s) {
  return s.trim().toLowerCase()
}

export default function Songs() {
  const searchId = useId()
  const [params, setParams] = useSearchParams()
  const { allSongs, openAtIndex } = usePlayer()

  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ALL

  const categoryList = useMemo(() => {
    const s = new Set()
    for (const g of allSongs) s.add(g.category)
    return [ALL, ...[...s].sort((a, b) => a.localeCompare(b, 'zh-HK'))]
  }, [allSongs])

  const filtered = useMemo(() => {
    let list = allSongs
    if (category && category !== ALL) {
      list = list.filter((g) => g.category === category)
    }
    if (q) {
      const n = normalize(q)
      list = list.filter((g) => normalize(g.title).includes(n))
    }
    return list
  }, [allSongs, category, q])

  const setQuery = (value) => {
    const p = new URLSearchParams(params)
    if (value) p.set('q', value)
    else p.delete('q')
    setParams(p, { replace: true })
  }

  const setCategory = (next) => {
    const p = new URLSearchParams(params)
    if (next && next !== ALL) p.set('category', next)
    else p.delete('category')
    setParams(p, { replace: true })
  }

  const clearAllFilters = () => {
    setParams({}, { replace: true })
  }

  const handlePlay = (song) => {
    const i = filtered.findIndex((s) => s.id === song.id)
    if (i >= 0) openAtIndex(filtered, i)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionTitle
        title="兒歌列表"
        description="用搜尋同分類搵歌，撳相就播片～"
      />

      <div className="rounded-3xl border-2 border-white/60 bg-white/70 p-4 shadow-card ring-1 ring-ink-800/[0.04] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SearchBar id={searchId} value={q} onChange={setQuery} />
          <p className="shrink-0 text-center text-sm font-extrabold text-ink-800/50 sm:text-left">
            顯示{' '}
            <span className="tabular-nums text-ink-800">{filtered.length}</span> 首
          </p>
        </div>
      </div>

      <div className="space-y-2" role="group" aria-label="兒歌分類">
        <p className="px-0.5 text-sm font-extrabold text-ink-800/50">分類</p>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {categoryList.map((c) => (
            <CategoryChip
              key={c}
              label={c}
              active={
                c === ALL
                  ? !params.get('category')
                  : params.get('category') === c
              }
              onClick={() => setCategory(c)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-ink-800/15 bg-white/60 p-8 text-center shadow-inner">
          <p className="text-3xl" aria-hidden>
            🧐
          </p>
          <p className="max-w-sm text-base font-semibold leading-relaxed text-ink-800/80">
            搵唔到呢隻歌，試下改關鍵字或者揀其他分類～
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="min-h-11 rounded-2xl border-2 border-ink-800/10 bg-cream-50 px-5 text-sm font-extrabold text-ink-800 transition hover:bg-white"
          >
            睇返全部
          </button>
        </div>
      ) : (
        <ul
          className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3"
          role="list"
        >
          {filtered.map((song, i) => (
            <li key={song.id}>
              <SongCard
                song={song}
                onPlay={handlePlay}
                index={i + 1}
                total={filtered.length}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

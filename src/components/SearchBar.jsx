export default function SearchBar({ id, value, onChange, placeholder = '搜尋歌名…' }) {
  const hasValue = value.length > 0

  return (
    <div className="w-full max-w-md">
      <label htmlFor={id} className="sr-only">
        搜尋兒歌
      </label>
      <div className="group relative">
        <span
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg leading-none"
          aria-hidden
        >
          🔍
        </span>
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-3xl border-2 border-ink-800/8 bg-white/95 py-3.5 pl-12 pr-12 text-base font-semibold text-ink-800 shadow-inner transition placeholder:text-ink-800/40 focus:border-sky-400 focus:bg-white focus:shadow-card"
        />
        {hasValue && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-1/2 flex h-9 min-w-9 -translate-y-1/2 items-center justify-center rounded-2xl text-lg font-bold text-ink-800/50 transition hover:bg-ink-800/5 hover:text-ink-800"
            aria-label="清除搜尋"
          >
            <span aria-hidden>×</span>
          </button>
        )}
      </div>
    </div>
  )
}

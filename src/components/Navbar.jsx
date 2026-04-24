import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  [
    'rounded-full px-4 py-2.5 text-base font-bold transition duration-200',
    isActive
      ? 'bg-white text-ink-800 shadow-bubble ring-2 ring-sky-400/30'
      : 'text-ink-800/75 hover:bg-white/70 active:scale-[0.99]',
  ].join(' ')

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-ink-800/[0.06] bg-cream-50/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-cream-50/75"
      role="banner"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <NavLink
          to="/"
          className="group flex min-h-[48px] min-w-[48px] items-center gap-3 rounded-2xl pr-1 focus-visible:ring-2 focus-visible:ring-sky-400/80"
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-coral-400 via-coral-300 to-lilac-500 text-lg shadow-bubble transition group-hover:scale-105"
            aria-hidden
          >
            🎵
          </span>
          <div className="text-left">
            <div className="font-display text-lg font-extrabold text-ink-800 md:text-xl">粵語兒歌</div>
            <div className="text-xs font-semibold text-ink-800/55">一齊聽一齊唱</div>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1.5" aria-label="主要選單">
          <NavLink to="/" className={linkClass} end>
            主頁
          </NavLink>
          <NavLink to="/songs" className={linkClass}>
            兒歌列表
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

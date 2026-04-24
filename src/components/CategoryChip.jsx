import { Link } from 'react-router-dom'

export default function CategoryChip({ label, active = false, to, onClick, ...rest }) {
  const className = [
    'inline-flex min-h-11 min-w-11 select-none items-center justify-center rounded-full border-2 px-4 py-2 text-sm font-bold transition will-change-transform md:text-base',
    'active:scale-[0.98]',
    active
      ? 'border-ink-800 bg-ink-800 text-cream-50 shadow-bubble ring-2 ring-ink-800/20'
      : 'border-ink-800/8 bg-white/90 text-ink-800 shadow-sm hover:-translate-y-0.5 hover:border-sky-400/50 hover:shadow-md',
  ].join(' ')

  if (to) {
    return (
      <Link
        to={to}
        className={className}
        aria-current={active ? 'page' : undefined}
        {...rest}
      >
        {label}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-pressed={active}
      {...rest}
    >
      {label}
    </button>
  )
}

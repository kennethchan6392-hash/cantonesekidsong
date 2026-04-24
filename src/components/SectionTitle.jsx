export default function SectionTitle({ id, kicker, title, description }) {
  return (
    <div className="space-y-1">
      {kicker ? (
        <p className="text-sm font-extrabold text-coral-400 md:text-base">{kicker}</p>
      ) : null}
      <h2
        id={id}
        className="font-display text-2xl font-extrabold tracking-tight text-ink-800 md:text-3xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base font-medium leading-relaxed text-ink-800/70">
          {description}
        </p>
      ) : null}
    </div>
  )
}

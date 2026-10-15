const STYLES: Record<string, string> = {
  'Assuré': 'bg-emerald-50 text-emerald-700',
  'Décennale': 'bg-blue-50 text-blue-700',
  'SIRET vérifié': 'bg-emerald-50 text-emerald-700',
}

export default function TrustBadges({ badges }: { badges: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <span
          key={b}
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STYLES[b] ?? 'bg-slate-100 text-slate-600'}`}
        >
          {b}
        </span>
      ))}
    </div>
  )
}

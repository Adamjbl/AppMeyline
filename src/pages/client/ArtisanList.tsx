import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import ArtisanCard from '../../components/ArtisanCard'
import { artisansByTrade, tradeById } from '../../lib/mockData'

const SORTS = [
  { id: 'recommended', label: 'Recommandés' },
  { id: 'nearest', label: 'Plus proches' },
  { id: 'rated', label: 'Mieux notés' },
] as const

export default function ArtisanList() {
  const { tradeId = '' } = useParams()
  const trade = tradeById(tradeId)
  const [sort, setSort] = useState<(typeof SORTS)[number]['id']>('recommended')

  const artisans = useMemo(() => {
    const list = [...artisansByTrade(tradeId)]
    if (sort === 'nearest') list.sort((a, b) => a.distanceKm - b.distanceKm)
    if (sort === 'rated') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [tradeId, sort])

  return (
    <div className="pb-6">
      <ScreenHeader
        title={trade?.name ?? 'Artisans'}
        subtitle={`${artisans.length} artisans vérifiés · Annemasse et alentours`}
        back
      />

      <div className="-mt-3 space-y-4 px-5">
        <div className="flex flex-wrap gap-2">
          {SORTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSort(s.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                sort === s.id
                  ? 'border-2 border-accent-500 text-accent-600'
                  : 'border border-slate-200 bg-white text-slate-600'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-xs text-emerald-800">
          <ShieldCheck size={16} className="mt-0.5 flex-none" />
          Assurances, identité et SIRET contrôlés par BuildFlow. Classés selon vos besoins et leurs
          disponibilités.
        </div>

        <div className="space-y-3">
          {artisans.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-400">
              Aucun artisan vérifié dans cette catégorie pour l’instant.
            </p>
          )}
          {artisans.map((a) => (
            <ArtisanCard key={a.id} artisan={a} />
          ))}
        </div>
      </div>
    </div>
  )
}

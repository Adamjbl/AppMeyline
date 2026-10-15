import { Link } from 'react-router-dom'
import { ChevronRight, Star, MapPin, ArrowUpRight } from 'lucide-react'
import type { Artisan } from '../lib/types'
import TrustBadges from './TrustBadges'

export default function ArtisanCard({ artisan }: { artisan: Artisan }) {
  return (
    <Link
      to={`/app/artisans/${artisan.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-4 press-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-avatar-bg text-sm font-bold text-navy-900">
            {artisan.name
              .split(' ')
              .map((p) => p[0])
              .join('')}
          </div>
          <div>
            <p className="font-bold text-navy-950">{artisan.name}</p>
            <p className="text-sm text-slate-500">{artisan.company}</p>
            <p className="mt-0.5 flex items-center gap-1 text-sm">
              <Star size={14} className="fill-accent-500 text-accent-500" />
              <span className="font-semibold text-navy-950">{artisan.rating.toFixed(1)}</span>
              <span className="text-slate-400">· {artisan.reviewCount} avis</span>
            </p>
          </div>
        </div>
        <ChevronRight size={18} className="flex-none text-slate-300" />
      </div>
      <p className="mt-3 flex items-center gap-1 text-xs text-slate-500">
        <MapPin size={13} className="text-link-600" />
        {artisan.distanceKm} km · Disponible dès le {artisan.availableFrom}
      </p>
      <div className="mt-2">
        <TrustBadges badges={artisan.badges} />
      </div>
      <p className="mt-3 flex items-center gap-1 text-sm font-semibold text-link-600">
        Voir le profil <ArrowUpRight size={14} />
      </p>
    </Link>
  )
}

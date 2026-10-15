import { Star } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { useStore } from '../../lib/store'

const DOC_STATUS = [
  { label: 'Entreprise (SIRET)', sublabel: 'active · vérifiée le 2 oct.', status: 'Valide' as const },
  { label: 'Attestation URSSAF', sublabel: 'à renouveler dans 45 j', status: 'Bientôt' as const },
  { label: 'Assurance décennale', sublabel: 'valide jusqu’en mars 2027', status: 'Valide' as const },
  { label: 'Responsabilité civile pro', sublabel: 'valide jusqu’en janv. 2027', status: 'Valide' as const },
]

const STATUS_STYLE = {
  Valide: 'bg-emerald-50 text-emerald-700',
  Bientôt: 'bg-amber-50 text-amber-700',
}

export default function ArtisanDossier() {
  const { state } = useStore()
  const reg = state.artisanRegistration
  const quotes = state.artisanQuotes

  return (
    <div className="h-full overflow-y-auto pb-8">
      <ScreenHeader title="Mon dossier" subtitle={`${reg?.companyName ?? ''} · vérifié BuildFlow`} back />

      <div className="-mt-3 space-y-4 px-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-accent-600">Documents privés</p>
            <span className="rounded-full border border-accent-300 px-2 py-0.5 text-[11px] font-semibold text-accent-600">
              Jamais vus par les clients
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {DOC_STATUS.map((d) => (
              <div key={d.label} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-semibold text-navy-950">{d.label}</p>
                  <p className="text-xs text-slate-400">{d.sublabel}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[d.status]}`}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-link-600">Visible sur votre profil</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <Star size={15} className="mt-0.5 flex-none fill-accent-500 text-accent-500" />
              Note 4,8 · 32 avis vérifiés
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <Star size={15} className="mt-0.5 flex-none fill-accent-500 text-accent-500" />
              Vos références : 32 avis Google · 1 attestation de client
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <Star size={15} className="mt-0.5 flex-none fill-accent-500 text-accent-500" />
              Vos réalisations : 3 chantiers · 18 photos
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-2 font-bold text-navy-950">Chantiers</p>
          {quotes.length === 0 ? (
            <p className="text-sm text-slate-400">Vos devis envoyés apparaîtront ici.</p>
          ) : (
            <div className="space-y-2">
              {quotes.map((q) => {
                const request = state.artisanRequests.find((r) => r.id === q.requestId)
                return (
                  <div key={q.requestId} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Devis {request?.projectName ?? q.requestId}</span>
                    <span className="font-semibold text-emerald-700">
                      {request?.status === 'quoted' ? 'envoyé' : 'accepté'}
                    </span>
                  </div>
                )
              })}
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Acompte 30 %</span>
                <span className="font-semibold text-navy-950">gardé par BuildFlow</span>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400">
          BuildFlow revérifie vos documents tous les 6 mois et vous prévient avant qu’ils expirent.
        </p>
      </div>
    </div>
  )
}

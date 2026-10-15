import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../../lib/store'
import { TRADES } from '../../lib/mockData'

export default function ArtisanWelcome() {
  const { state } = useStore()
  const reg = state.artisanRegistration

  return (
    <div className="safe-top safe-bottom flex h-full flex-col items-center justify-center overflow-y-auto px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 size={32} />
      </div>
      <h1 className="text-xl font-extrabold text-navy-950">Inscription envoyée !</h1>
      <p className="mt-2 text-sm text-slate-500">
        Merci {reg?.companyName || ''}. Notre équipe vérifie votre SIRET et vos assurances, vous recevrez une
        confirmation sous 48h.
      </p>
      {reg && (
        <div className="mt-5 w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">
          <p className="text-sm font-bold text-navy-950">{reg.companyName}</p>
          <p className="text-xs text-slate-500">
            {reg.trades.map((t) => TRADES.find((tr) => tr.id === t)?.name).join(', ')}
          </p>
          <p className="mt-1 text-xs text-slate-400">{reg.zone || reg.city}</p>
        </div>
      )}
      <Link
        to="/"
        className="mt-6 w-full rounded-full bg-navy-900 py-3 text-center font-bold text-white"
      >
        Retour à l’accueil
      </Link>
    </div>
  )
}

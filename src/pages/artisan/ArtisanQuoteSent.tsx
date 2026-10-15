import { Link, useParams } from 'react-router-dom'
import { Send, ArrowRight } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { useStore } from '../../lib/store'

export default function ArtisanQuoteSent() {
  const { requestId = '' } = useParams()
  const { state } = useStore()
  const request = state.artisanRequests.find((r) => r.id === requestId)
  const quote = state.artisanQuotes.find((q) => q.requestId === requestId)

  if (!request || !quote) return <div className="p-6 text-center text-slate-500">Devis introuvable.</div>

  return (
    <div className="h-full overflow-y-auto pb-8">
      <ScreenHeader title="Devis envoyé" subtitle={`${request.clientName} · ${request.projectName}`} back />

      <div className="-mt-3 space-y-4 px-5">
        <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-3.5 text-sm font-semibold text-emerald-700">
          <Send size={16} className="mt-0.5 flex-none" />
          Votre devis de {quote.totalTTC.toLocaleString('fr-FR')} € TTC est chez {request.clientName}.
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-2 font-bold text-navy-950">Et maintenant ?</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <ArrowRight size={14} className="mt-1 flex-none text-link-600" />
              {request.clientName} compare au maximum {request.totalContacted} devis vérifiés.
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <ArrowRight size={14} className="mt-1 flex-none text-link-600" />
              Vous êtes prévenu dès qu’elle répond.
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <ArrowRight size={14} className="mt-1 flex-none text-link-600" />
              Sa question éventuelle arrive dans vos messages.
            </li>
          </ul>
        </div>

        <Link
          to="/artisan/dashboard"
          className="flex items-center justify-center gap-2 rounded-full border-2 border-navy-900 py-3 font-bold text-navy-900 press"
        >
          Retour à l’accueil <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}

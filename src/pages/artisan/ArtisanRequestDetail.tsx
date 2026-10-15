import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, FileText, Image, Layers, ArrowRight } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { useStore } from '../../lib/store'
import { tradeById } from '../../lib/mockData'

const DOC_ICONS = [Image, FileText, FileText]

export default function ArtisanRequestDetail() {
  const { requestId = '' } = useParams()
  const navigate = useNavigate()
  const { state, declineArtisanRequest } = useStore()
  const request = state.artisanRequests.find((r) => r.id === requestId)
  const trade = request ? tradeById(request.tradeId) : undefined

  if (!request) return <div className="p-6 text-center text-slate-500">Demande introuvable.</div>

  function decline() {
    declineArtisanRequest(requestId)
    navigate('/artisan/dashboard')
  }

  return (
    <div className="h-full overflow-y-auto pb-8">
      <ScreenHeader
        title={`Demande de ${request.clientName}`}
        subtitle={`${request.projectName} · ${request.city} · ${request.distanceKm} km`}
        back
      />

      <div className="-mt-3 space-y-4 px-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-link-600">Ce qu’on attend de vous</p>
          <p className="mt-1 font-bold text-navy-950">
            {trade?.name} · étape {request.stepIndex} sur {request.stepsTotal}
          </p>
          <p className="mt-2 text-sm italic text-slate-600">« {request.message} »</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-2 font-bold text-navy-950">Le chantier</p>
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Début souhaité</dt>
              <dd className="font-semibold text-navy-950">{request.desiredStart}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Durée estimée</dt>
              <dd className="font-semibold text-navy-950">{request.duration}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Bâtiment</dt>
              <dd className="font-semibold text-navy-950">{request.building}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Surface des murs</dt>
              <dd className="font-semibold text-navy-950">{request.surface}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Accès</dt>
              <dd className="font-semibold text-navy-950">{request.access}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-2 font-bold text-navy-950">Documents du projet</p>
          <ul className="space-y-2">
            {request.documents.map((doc, i) => {
              const Icon = DOC_ICONS[i] ?? Layers
              return (
                <li key={doc} className="flex items-center gap-2 text-sm text-slate-600">
                  <Icon size={15} className="flex-none text-link-600" />
                  {doc}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-start gap-2 rounded-2xl bg-sky-50 p-3 text-xs text-sky-800">
          <Calendar size={15} className="mt-0.5 flex-none" />
          {request.nextStepNote}
        </div>

        <p className="text-center text-xs text-slate-400">
          Vous êtes {request.contactedCount} des {request.totalContacted} artisans contactés pour ce lot.
          Le prix reste le vôtre.
        </p>

        <button
          onClick={() => navigate(`/artisan/demandes/${request.id}/devis`)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white press"
        >
          Faire mon devis <ArrowRight size={16} />
        </button>
        <button
          onClick={decline}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-navy-900 py-3 font-bold text-navy-900 press"
        >
          Refuser, sans pénalité <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, FolderCheck, ChevronRight, MapPin } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { useStore } from '../../lib/store'

export default function ArtisanDashboard() {
  const { state } = useStore()
  const reg = state.artisanRegistration
  const firstName = reg?.contactName || 'Luc'
  const pending = state.artisanRequests.filter((r) => r.status === 'new')

  return (
    <div className="h-full overflow-y-auto pb-8">
      <ScreenHeader title={`Bonjour ${firstName}`} subtitle={`${reg?.companyName ?? ''} · ${reg?.city ?? ''}`} back />

      <div className="-mt-3 space-y-4 px-5">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <p className="text-xl font-extrabold text-navy-950">4,8</p>
            <p className="text-[11px] text-slate-400">Note</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <p className="text-xl font-extrabold text-navy-950">32</p>
            <p className="text-[11px] text-slate-400">Avis</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <p className="text-xl font-extrabold text-navy-950">{pending.length}</p>
            <p className="text-[11px] text-slate-400">Demande{pending.length > 1 ? 's' : ''}</p>
          </div>
        </div>

        {pending.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">
            Pas de nouvelle demande pour l’instant. BuildFlow vous préviendra dès qu’un projet correspond
            à vos métiers et vos disponibilités.
          </div>
        ) : (
          pending.map((req) => (
            <div key={req.id} className="rounded-2xl border-2 border-accent-500 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-accent-600">
                Nouvelle demande · {req.createdAgo}
              </p>
              <p className="mt-1 font-bold text-navy-950">
                {req.clientName} · {req.projectName}
              </p>
              <p className="mt-1 text-sm text-slate-500">{req.message}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={13} className="text-link-600" /> {req.city} · {req.distanceKm} km
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar size={13} className="text-link-600" />
                Début souhaité {req.desiredStart} · {req.duration}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-link-600">
                  Plans + 6 photos
                </span>
                <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-semibold text-accent-600">
                  {req.contactedCount} des {req.totalContacted} artisans contactés
                </span>
              </div>
              <Link
                to={`/artisan/demandes/${req.id}`}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white"
              >
                Voir la demande <ArrowRight size={16} />
              </Link>
            </div>
          ))
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="font-bold text-navy-950">Mes disponibilités</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
            <Calendar size={15} className="text-link-600" /> Libre du lun. 12 oct. au ven. 13 nov.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            BuildFlow ne vous propose que des chantiers compatibles avec vos dates.
          </p>
        </div>

        <Link
          to="/artisan/dossier"
          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-sky-50 text-link-600">
              <FolderCheck size={18} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-navy-950">Mon dossier BuildFlow</p>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  À jour
                </span>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">Documents privés, références, devis et acomptes.</p>
            </div>
          </div>
          <ChevronRight size={18} className="flex-none text-slate-300" />
        </Link>
      </div>
    </div>
  )
}

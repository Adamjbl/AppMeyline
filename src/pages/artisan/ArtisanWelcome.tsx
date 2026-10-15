import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ArrowRight, ShieldAlert, Check } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { useStore } from '../../lib/store'

export default function ArtisanWelcome() {
  const navigate = useNavigate()
  const { state } = useStore()
  const reg = state.artisanRegistration
  const firstName = reg?.contactName || 'Luc'

  return (
    <div className="h-full overflow-y-auto pb-8">
      <ScreenHeader title={`Bienvenue, ${firstName} !`} subtitle={`${reg?.companyName ?? ''} · Artisan vérifié BuildFlow`} back />

      <div className="-mt-3 space-y-4 px-5">
        <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-3.5 text-sm font-semibold text-emerald-700">
          <CheckCircle2 size={18} className="mt-0.5 flex-none" />
          Votre dossier est validé. Votre profil est en ligne.
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-link-600">Visible par les clients</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <Check size={16} className="mt-0.5 flex-none text-navy-800" />
              Votre note et vos avis vérifiés
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <Check size={16} className="mt-0.5 flex-none text-navy-800" />
              Vos références (résumé) et vos photos de chantiers
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <Check size={16} className="mt-0.5 flex-none text-navy-800" />
              Vos garanties : « décennale vérifiée », sans le document
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent-600">
            <ShieldAlert size={14} /> Privé · équipe BuildFlow seulement
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <ShieldAlert size={15} className="mt-0.5 flex-none text-accent-500" />
              Kbis, URSSAF, attestations d’assurance
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <ShieldAlert size={15} className="mt-0.5 flex-none text-accent-500" />
              Coordonnées de vos anciens clients
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-link-600">Ce que ça change pour vous</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <Check size={16} className="mt-0.5 flex-none text-navy-800" />
              Seulement des projets décrits : plans, photos, dates
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <Check size={16} className="mt-0.5 flex-none text-navy-800" />
              Votre note se construit sur le terrain, chantier après chantier
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-600">
              <Check size={16} className="mt-0.5 flex-none text-navy-800" />
              Vous pouvez refuser une demande, sans pénalité
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/artisan/dashboard')}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white press"
        >
          Voir mes demandes <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

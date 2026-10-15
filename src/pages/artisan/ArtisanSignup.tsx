import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Check,
  Plus,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Upload,
  Pencil,
} from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { DOSSIER_DOCS, TRADES } from '../../lib/mockData'
import { useStore } from '../../lib/store'
import type { TradeId } from '../../lib/types'

export default function ArtisanSignup() {
  const navigate = useNavigate()
  const { state, registerArtisan, toggleDossierDoc } = useStore()
  const [step, setStep] = useState(1)
  const [trades, setTrades] = useState<TradeId[]>([])
  const [contactName, setContactName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [siret, setSiret] = useState('')
  const [city, setCity] = useState('')
  const [zone, setZone] = useState('')

  function toggleTrade(id: TradeId) {
    setTrades((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  function submitDossier() {
    registerArtisan({ trades, contactName, companyName, siret, city, zone })
    setStep(3)
  }

  const requiredDocs = DOSSIER_DOCS.filter((d) => d.group === 'required')
  const referenceDocs = DOSSIER_DOCS.filter((d) => d.group === 'reference')
  const optionalDocs = DOSSIER_DOCS.filter((d) => d.group === 'optional')
  const requiredUploaded = requiredDocs.every((d) => state.artisanDossier[d.id] === 'uploaded')

  return (
    <div className="h-full overflow-y-auto pb-8">
      <ScreenHeader
        title={step === 3 ? 'Nous vérifions' : 'Rejoindre BuildFlow'}
        subtitle={step === 3 ? 'Inscription · Étape 3 sur 3' : `Inscription · Étape ${step} sur 3`}
        back
      />

      <div className="-mt-3 px-5">
        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-navy-900 transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="mb-1 flex items-start gap-2 rounded-2xl bg-sky-50 p-3 text-xs text-sky-800">
              <Sparkles size={14} className="mt-0.5 flex-none" />
              Des chantiers décrits, dans votre zone, au bon moment. Aucun artisan ne paie pour être mis
              en avant.
            </div>

            <div>
              <p className="mb-2 font-bold text-navy-950">Votre métier</p>
              <div className="flex flex-wrap gap-2">
                {TRADES.filter((t) => !t.urgent).map((t) => {
                  const active = trades.includes(t.id)
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTrade(t.id)}
                      className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                        active
                          ? 'border-2 border-accent-500 text-accent-600'
                          : 'border border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {active ? <Check size={14} /> : <Plus size={14} />}
                      {t.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <p className="font-bold text-navy-950">Votre entreprise</p>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Votre prénom"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-navy-700"
            />
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Nom de l’entreprise"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-navy-700"
            />
            <input
              value={siret}
              onChange={(e) => setSiret(e.target.value)}
              placeholder="Numéro SIRET"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-navy-700"
            />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ville"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-navy-700"
            />
            <input
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="Zone d’intervention"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-navy-700"
            />

            <button
              disabled={trades.length === 0 || !companyName || !contactName}
              onClick={() => setStep(2)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white disabled:opacity-40"
            >
              Continuer <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-start gap-2 rounded-2xl bg-navy-950 p-3.5 text-xs text-white">
              <ShieldCheck size={16} className="mt-0.5 flex-none text-emerald-400" />
              <div>
                <p className="font-bold">Documents privés</p>
                <p className="mt-0.5 text-white/70">
                  Seule l’équipe de vérification BuildFlow les voit. Jamais les clients.
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-700">
                Obligatoires · mêmes critères pour tous
              </p>
              <div className="space-y-2">
                {requiredDocs.map((doc) => {
                  const uploaded = state.artisanDossier[doc.id] === 'uploaded'
                  return (
                    <button
                      key={doc.id}
                      onClick={() => toggleDossierDoc(doc.id)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-sm ${
                        uploaded ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <span className={uploaded ? 'font-semibold text-emerald-800' : 'text-slate-400'}>
                        {uploaded ? doc.label : `${doc.label}${doc.sublabel ? ` · ${doc.sublabel}` : ''}`}
                      </span>
                      {uploaded ? (
                        <CheckCircle2 size={18} className="flex-none text-emerald-600" />
                      ) : (
                        <Pencil size={14} className="flex-none text-slate-400" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
              <p className="text-xs font-bold uppercase tracking-wide text-navy-700">Vos références</p>
              <p className="mt-1 text-sm font-bold text-navy-950">
                Montrez votre travail, sans donner les coordonnées de vos clients
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Pas d’« ancien client à contacter » : vos clients restent confidentiels.
              </p>
              <div className="mt-3 space-y-2">
                {referenceDocs
                  .filter((d) => d.id !== 'photos')
                  .map((doc) => {
                    const uploaded = state.artisanDossier[doc.id] === 'uploaded'
                    return (
                      <button
                        key={doc.id}
                        onClick={() => toggleDossierDoc(doc.id)}
                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-sm ${
                          uploaded ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <span className={uploaded ? 'font-semibold text-emerald-800' : 'text-slate-400'}>
                          {doc.label}
                        </span>
                        {uploaded ? (
                          <CheckCircle2 size={18} className="flex-none text-emerald-600" />
                        ) : (
                          <Pencil size={14} className="flex-none text-slate-400" />
                        )}
                      </button>
                    )
                  })}
              </div>

              <p className="mb-2 mt-4 text-sm font-bold text-navy-950">Photos de 3 chantiers récents</p>
              <button
                onClick={() => toggleDossierDoc('photos')}
                className={`flex w-full flex-col items-center gap-1 rounded-xl border-2 border-dashed p-5 text-center ${
                  state.artisanDossier.photos === 'uploaded'
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-sky-200 bg-sky-50'
                }`}
              >
                {state.artisanDossier.photos === 'uploaded' ? (
                  <>
                    <CheckCircle2 size={20} className="text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-800">Photos ajoutées</span>
                  </>
                ) : (
                  <>
                    <Upload size={20} className="text-link-600" />
                    <span className="text-sm font-bold text-navy-950">Ajouter des photos ou un PDF</span>
                    <span className="text-xs text-slate-400">Touchez pour choisir · JPG, PNG, PDF · 4 Mo max</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Facultatif</p>
              {optionalDocs.map((doc) => {
                const uploaded = state.artisanDossier[doc.id] === 'uploaded'
                return (
                  <button
                    key={doc.id}
                    onClick={() => toggleDossierDoc(doc.id)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-sm ${
                      uploaded ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <span className={uploaded ? 'font-semibold text-emerald-800' : 'text-slate-400'}>
                      {doc.label}
                    </span>
                    {uploaded ? (
                      <CheckCircle2 size={18} className="flex-none text-emerald-600" />
                    ) : (
                      <Pencil size={14} className="flex-none text-slate-400" />
                    )}
                  </button>
                )
              })}
            </div>

            <button
              disabled={!requiredUploaded}
              onClick={submitDossier}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white disabled:opacity-40"
            >
              Envoyer mon dossier <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-navy-700">
                Votre dossier · reçu le {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
              </p>
              <p className="mt-1 mb-3 font-bold text-navy-950">En général sous 3 jours ouvrés</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
                  Entreprise active (SIRET) · annuaire officiel
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
                  Attestation URSSAF valide · moins de 6 mois
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
                  Assurance décennale valide · jusqu’en mars 2027
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
                  Responsabilité civile pro valide
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Lecture de vos références</span>
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                    En cours
                  </span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Validation finale</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
                    À venir
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex items-start gap-2 rounded-2xl bg-sky-50 p-3 text-xs text-sky-800">
              <ShieldCheck size={15} className="mt-0.5 flex-none" />
              Les mêmes critères pour tous. Aucun artisan ne peut payer pour être mieux classé.
            </div>

            <button
              onClick={() => navigate('/artisan/bienvenue')}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white"
            >
              Voir la réponse (démo) <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

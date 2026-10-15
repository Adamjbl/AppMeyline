import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Check, Plus, ArrowRight, CheckCircle2 } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { TRADES } from '../../lib/mockData'
import { useStore } from '../../lib/store'
import type { TradeId } from '../../lib/types'

export default function ArtisanSignup() {
  const navigate = useNavigate()
  const { registerArtisan } = useStore()
  const [step, setStep] = useState(1)
  const [trades, setTrades] = useState<TradeId[]>([])
  const [companyName, setCompanyName] = useState('')
  const [siret, setSiret] = useState('')
  const [city, setCity] = useState('')
  const [zone, setZone] = useState('')

  function toggleTrade(id: TradeId) {
    setTrades((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  function finish() {
    registerArtisan({ trades, companyName, siret, city, zone })
    navigate('/artisan/bienvenue')
  }

  return (
    <div className="h-full overflow-y-auto pb-8">
      <ScreenHeader title="Rejoindre BuildFlow" subtitle={`Inscription · Étape ${step} sur 3`} back />

      <div className="-mt-3 px-5">
        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-navy-900 transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="mb-4 flex items-start gap-2 rounded-2xl bg-sky-50 p-3 text-xs text-sky-800">
          <Sparkles size={14} className="mt-0.5 flex-none" />
          Des chantiers décrits, dans votre zone, au bon moment. Aucun artisan ne paie pour être mis en avant.
        </div>

        {step === 1 && (
          <div className="space-y-4">
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
              disabled={trades.length === 0 || !companyName}
              onClick={() => setStep(2)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white disabled:opacity-40"
            >
              Continuer <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="mb-2 font-bold text-navy-950">Vérification de votre entreprise</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="flex-none text-emerald-600" /> SIRET contrôlé automatiquement
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="flex-none text-emerald-600" /> Pièce d’identité du gérant
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="flex-none text-emerald-600" /> Attestation d’assurance décennale
                </li>
              </ul>
              <p className="mt-2 text-xs text-slate-400">
                Ces documents seront demandés après validation de votre inscription.
              </p>
            </div>
            <button
              onClick={() => setStep(3)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white"
            >
              Continuer <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="mb-2 font-bold text-navy-950">Récapitulatif</p>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Métiers</dt>
                  <dd className="font-semibold text-navy-950">
                    {trades.map((t) => TRADES.find((tr) => tr.id === t)?.name).join(', ') || '—'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Entreprise</dt>
                  <dd className="font-semibold text-navy-950">{companyName || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">SIRET</dt>
                  <dd className="font-semibold text-navy-950">{siret || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Zone</dt>
                  <dd className="font-semibold text-navy-950">{zone || city || '—'}</dd>
                </div>
              </dl>
            </div>
            <button
              onClick={finish}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white"
            >
              Envoyer mon inscription <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

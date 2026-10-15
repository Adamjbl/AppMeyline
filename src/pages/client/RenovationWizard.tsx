import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { useStore } from '../../lib/store'
import type { ProjectType } from '../../lib/types'

const TYPES: { id: ProjectType; label: string }[] = [
  { id: 'complete', label: 'Rénovation complète' },
  { id: 'partial', label: 'Rénovation partielle' },
  { id: 'extension', label: 'Extension' },
]

export default function RenovationWizard() {
  const navigate = useNavigate()
  const { createProject } = useStore()
  const [step, setStep] = useState(1)
  const [type, setType] = useState<ProjectType>('complete')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [budget, setBudget] = useState('')

  function finish() {
    createProject({ type, name, city })
    navigate('/app/timeline')
  }

  return (
    <div className="pb-8">
      <ScreenHeader title="Votre projet" subtitle={`Étape ${step} sur 3`} back />

      <div className="-mt-3 px-5">
        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-navy-900 transition-[width] duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="mb-2 font-semibold text-navy-950">Quel est votre projet ?</p>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`press-sm rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                      type === t.id
                        ? 'border-2 border-accent-500 text-accent-600'
                        : 'border border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-semibold text-navy-950">Nom de votre projet</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex. : Ferme des Vergers"
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-navy-700"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-semibold text-navy-950">Ville du chantier</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex. : Annemasse"
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-navy-700"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white press"
            >
              Continuer <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <p className="mb-1 font-semibold text-navy-950">Quel budget envisagez-vous ?</p>
              <p className="mb-2 text-sm text-slate-500">
                Une estimation suffit, vous pourrez l’ajuster à chaque devis accepté.
              </p>
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value.replace(/[^\d]/g, ''))}
                inputMode="numeric"
                placeholder="Ex. : 45000"
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-navy-700"
              />
            </div>
            <button
              onClick={() => setStep(3)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white press"
            >
              Continuer <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="mb-2 font-semibold text-navy-950">Récapitulatif</p>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Type</dt>
                  <dd className="font-medium text-navy-950">{TYPES.find((t) => t.id === type)?.label}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Nom</dt>
                  <dd className="font-medium text-navy-950">{name || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Ville</dt>
                  <dd className="font-medium text-navy-950">{city || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Budget estimé</dt>
                  <dd className="font-medium text-navy-950">{budget ? `${budget} €` : '—'}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-2xl bg-sky-50 p-3 text-xs text-sky-800">
              BuildFlow va ordonner 7 étapes, du gros œuvre à la peinture, et vous proposer des artisans
              vérifiés pour chacune.
            </div>
            <button
              onClick={finish}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white press"
            >
              Créer le suivi de ma rénovation <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

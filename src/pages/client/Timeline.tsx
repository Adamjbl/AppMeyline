import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListChecks, ArrowRight, Star } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import EmptyState from '../../components/EmptyState'
import { useStore } from '../../lib/store'
import { artisanById, artisansByTrade } from '../../lib/mockData'
import { TRADE_ICONS } from '../../lib/icons'
import type { RenovationStep, StepStatus } from '../../lib/types'

const STATUS_LABEL: Record<StepStatus, string> = {
  todo: 'À planifier',
  in_progress: 'En cours',
  done: 'Terminé',
}

const STATUS_STYLE: Record<StepStatus, string> = {
  todo: 'bg-slate-100 text-slate-500',
  in_progress: 'bg-amber-50 text-amber-700',
  done: 'bg-emerald-50 text-emerald-700',
}

function StepRow({ step, projectId }: { step: RenovationStep; projectId: string }) {
  const { assignArtisanToStep } = useStore()
  const [open, setOpen] = useState(false)
  const Icon = TRADE_ICONS[step.tradeId]
  const candidates = artisansByTrade(step.tradeId)
  const assigned = step.artisanId ? artisanById(step.artisanId) : undefined

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-sky-50 text-link-600">
            <Icon size={17} />
          </span>
          <div>
            <p className="font-bold text-navy-950">{step.name}</p>
            {assigned ? (
              <p className="text-xs text-slate-500">
                {assigned.name} · dès le {step.scheduledDate ?? assigned.availableFrom}
              </p>
            ) : (
              <p className="text-xs text-slate-400">Pas encore d’artisan affecté</p>
            )}
          </div>
        </div>
        <span className={`flex-none rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[step.status]}`}>
          {STATUS_LABEL[step.status]}
        </span>
      </div>

      {!assigned && (
        <>
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-3 w-full rounded-full border-2 border-navy-900 py-2 text-sm font-bold text-navy-900 press"
          >
            {open ? 'Masquer les artisans' : 'Affecter un artisan'}
          </button>
          {open && (
            <div className="mt-2 space-y-2">
              {candidates.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    assignArtisanToStep(projectId, step.id, c.id, c.availableFrom)
                    setOpen(false)
                  }}
                  className="press-sm flex w-full items-center justify-between rounded-xl bg-slate-50 p-2.5 text-left text-sm"
                >
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-navy-950">{c.name}</span>
                    <span className="flex items-center gap-0.5 text-slate-400">
                      · <Star size={12} className="fill-accent-500 text-accent-500" /> {c.rating.toFixed(1)}
                    </span>
                  </span>
                  <span className="text-xs text-slate-400">dès {c.availableFrom}</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function Timeline() {
  const { state } = useStore()
  const navigate = useNavigate()
  const project = state.projects[0]

  if (!project) {
    return (
      <div className="pb-6">
        <ScreenHeader title="Votre timeline" subtitle="Aucun chantier suivi pour l’instant" />
        <div className="-mt-3 px-5">
          <EmptyState
            icon={ListChecks}
            title="Suivez chaque étape, dans le bon ordre"
            description="Décrivez votre rénovation : BuildFlow ordonne les 7 étapes, des murs à la peinture, et vous dit qui réserver et quand."
            action={
              <button
                onClick={() => navigate('/app/renovation/new')}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white press"
              >
                Créer le suivi de ma rénovation <ArrowRight size={16} />
              </button>
            }
          />
        </div>
      </div>
    )
  }

  const done = project.steps.filter((s) => s.status === 'done').length

  return (
    <div className="pb-6">
      <ScreenHeader
        title={project.name}
        subtitle={`${project.city || 'Chantier'} · ${done}/${project.steps.length} étapes terminées`}
      />
      <div className="-mt-3 space-y-3 px-5">
        {project.steps.map((step) => (
          <StepRow key={step.id} step={step} projectId={project.id} />
        ))}
      </div>
    </div>
  )
}

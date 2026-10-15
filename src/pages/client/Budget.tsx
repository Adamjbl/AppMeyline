import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wallet, ArrowRight } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import EmptyState from '../../components/EmptyState'
import { useStore } from '../../lib/store'
import { artisanById } from '../../lib/mockData'

function QuoteRow({ quoteId }: { quoteId: string }) {
  const { state, acceptQuote, declineQuote } = useStore()
  const quote = state.quotes.find((q) => q.id === quoteId)!
  const artisan = artisanById(quote.artisanId)
  const [amount, setAmount] = useState('')

  if (!artisan) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-navy-950">{artisan.name}</p>
          <p className="text-xs text-slate-400">{artisan.company}</p>
        </div>
        {quote.status === 'pending' && (
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
            En attente
          </span>
        )}
        {quote.status === 'accepted' && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
            Accepté · {quote.amount?.toLocaleString('fr-FR')} €
          </span>
        )}
        {quote.status === 'declined' && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
            Refusé
          </span>
        )}
      </div>

      {quote.status === 'pending' && (
        <div className="mt-3 flex gap-2">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="Montant du devis €"
            inputMode="numeric"
            className="flex-1 rounded-xl border border-slate-200 p-2 text-sm outline-none focus:border-navy-700"
          />
          <button
            disabled={!amount}
            onClick={() => acceptQuote(quote.id, Number(amount))}
            className="rounded-full bg-accent-500 px-3.5 py-2 text-sm font-bold text-white disabled:opacity-40 press"
          >
            Accepter
          </button>
          <button
            onClick={() => declineQuote(quote.id)}
            className="press-sm rounded-full border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-500"
          >
            Refuser
          </button>
        </div>
      )}
    </div>
  )
}

export default function Budget() {
  const { state } = useStore()
  const navigate = useNavigate()
  const project = state.projects[0]
  const accepted = state.quotes.filter((q) => q.status === 'accepted')
  const spent = accepted.reduce((sum, q) => sum + (q.amount ?? 0), 0)
  const total = project?.budgetTotal ?? null
  const remaining = total !== null ? total - spent : null

  if (state.quotes.length === 0 && !project) {
    return (
      <div className="pb-6">
        <ScreenHeader title="Votre budget" subtitle="Suivez chaque euro de votre chantier" />
        <div className="-mt-3 px-5">
          <EmptyState
            icon={Wallet}
            title="Fixez votre budget, on suit le reste"
            description="Chaque devis accepté met à jour ce qu’il vous reste. Vous êtes prévenu avant de dépasser."
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

  return (
    <div className="pb-6">
      <ScreenHeader title="Votre budget" subtitle="Suivez chaque euro de votre chantier" />
      <div className="-mt-3 space-y-4 px-5">
        <div className="rounded-2xl bg-navy-950 p-4 text-white">
          <div className="flex justify-between text-sm text-white/70">
            <span>Budget prévu</span>
            <span>{total !== null ? `${total.toLocaleString('fr-FR')} €` : 'Non défini'}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-sm text-white/70">Dépensé (devis acceptés)</span>
            <span className="font-semibold">{spent.toLocaleString('fr-FR')} €</span>
          </div>
          {remaining !== null && (
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="text-xs text-white/60">Reste</p>
              <p className={`text-2xl font-extrabold ${remaining < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {remaining.toLocaleString('fr-FR')} €
              </p>
            </div>
          )}
        </div>

        <section>
          <h2 className="mb-2 font-bold text-navy-950">Devis</h2>
          <div className="space-y-3">
            {state.quotes.length === 0 && (
              <p className="rounded-2xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-400">
                Vos devis apparaîtront ici dès qu’un artisan vous en aura envoyé un.
              </p>
            )}
            {state.quotes.map((q) => (
              <QuoteRow key={q.id} quoteId={q.id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

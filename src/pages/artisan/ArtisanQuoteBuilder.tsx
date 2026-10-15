import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { useStore } from '../../lib/store'
import { DEMO_QUOTE_LINE_ITEMS, tradeById } from '../../lib/mockData'
import type { QuoteLineItem } from '../../lib/types'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function ArtisanQuoteBuilder() {
  const { requestId = '' } = useParams()
  const navigate = useNavigate()
  const { state, sendArtisanQuote } = useStore()
  const request = state.artisanRequests.find((r) => r.id === requestId)
  const trade = request ? tradeById(request.tradeId) : undefined

  const [items, setItems] = useState<QuoteLineItem[]>(() =>
    DEMO_QUOTE_LINE_ITEMS.map((l) => ({ id: uid(), label: l.label, amount: l.amount }))
  )
  const [durationWeeks] = useState(3)
  const [depositPercent] = useState(30)

  const totalHT = useMemo(() => items.reduce((s, i) => s + (i.amount || 0), 0), [items])
  const tva = Math.round(totalHT * 0.1)
  const totalTTC = totalHT + tva
  const deposit = Math.round((totalTTC * depositPercent) / 100)

  if (!request) return <div className="p-6 text-center text-slate-500">Demande introuvable.</div>

  function updateItem(id: string, patch: Partial<QuoteLineItem>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function addItem() {
    setItems((prev) => [...prev, { id: uid(), label: '', amount: 0 }])
  }

  function send() {
    sendArtisanQuote(requestId, {
      lineItems: items,
      startDate: request!.desiredStart,
      durationWeeks,
      depositPercent,
    })
    navigate(`/artisan/demandes/${requestId}/envoye`)
  }

  return (
    <div className="h-full overflow-y-auto pb-8">
      <ScreenHeader
        title="Mon devis"
        subtitle={`${request.clientName} · ${request.projectName} · ${trade?.name ?? ''}`}
        back
      />

      <div className="-mt-3 space-y-4 px-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-link-600">
            Pré-rempli à partir de la demande · modifiable
          </p>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <input
                  value={item.label}
                  onChange={(e) => updateItem(item.id, { label: e.target.value })}
                  placeholder="Description"
                  className="flex-1 rounded-lg border border-slate-200 px-2.5 py-2 text-sm outline-none focus:border-navy-700"
                />
                <input
                  value={item.amount || ''}
                  onChange={(e) => updateItem(item.id, { amount: Number(e.target.value.replace(/[^\d]/g, '')) })}
                  inputMode="numeric"
                  placeholder="€"
                  className="w-20 rounded-lg border border-slate-200 px-2.5 py-2 text-right text-sm font-semibold outline-none focus:border-navy-700"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="press-sm flex-none text-slate-300 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addItem}
            className="press-sm mt-2 flex items-center gap-1.5 text-sm font-semibold text-link-600"
          >
            <Plus size={14} /> Ajouter une ligne
          </button>

          <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Total HT</span>
              <span>{totalHT.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>TVA 10 % (rénovation)</span>
              <span>{tva.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="flex justify-between text-base font-bold text-navy-950">
              <span>Total TTC</span>
              <span>{totalTTC.toLocaleString('fr-FR')} €</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-2 font-bold text-navy-950">Conditions</p>
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Début</dt>
              <dd className="font-semibold text-navy-950">{request.desiredStart}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Durée</dt>
              <dd className="font-semibold text-navy-950">{durationWeeks} semaines</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Acompte {depositPercent} %</dt>
              <dd className="font-semibold text-navy-950">{deposit.toLocaleString('fr-FR')} €</dd>
            </div>
          </dl>
          <p className="mt-2 text-xs text-slate-400">
            L’acompte est gardé par BuildFlow et vous est versé au début du chantier.
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-xs text-emerald-800">
          <CheckCircle2 size={15} className="mt-0.5 flex-none" />
          Mentions obligatoires ajoutées : SIRET, TVA, assurance décennale, validité 30 jours.
        </div>

        <p className="text-center text-xs text-slate-400">
          Le prix reste le vôtre : BuildFlow ne le fixe pas. {request.clientName} compare au maximum{' '}
          {request.totalContacted} devis.
        </p>

        <button
          onClick={send}
          disabled={items.length === 0 || totalHT === 0}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white disabled:opacity-40 press"
        >
          Envoyer le devis à {request.clientName} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

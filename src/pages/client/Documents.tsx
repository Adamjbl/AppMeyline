import { useState } from 'react'
import { ChevronRight, Plus } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { useStore } from '../../lib/store'
import { artisanById } from '../../lib/mockData'
import type { DocumentType } from '../../lib/types'

const SECTIONS: { type: DocumentType; title: string; empty: string }[] = [
  { type: 'devis', title: 'Devis', empty: 'Vos devis acceptés apparaîtront ici.' },
  { type: 'assurance', title: 'Assurances & garanties', empty: 'Les assurances vérifiées de vos artisans apparaîtront ici.' },
  { type: 'facture', title: 'Factures', empty: 'Les confirmations de paiement apparaîtront ici.' },
  { type: 'photo', title: 'Photos du chantier', empty: 'Vos photos de projet et de chantier apparaîtront ici.' },
]

export default function Documents() {
  const { state, addDocument } = useStore()
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')

  function submit() {
    if (!name.trim()) return
    addDocument({ type: 'photo', name: name.trim() })
    setName('')
    setAdding(false)
  }

  return (
    <div className="pb-6">
      <ScreenHeader title="Vos documents" subtitle="Tout votre chantier, bien rangé" />
      <div className="-mt-3 space-y-5 px-5">
        {SECTIONS.map((section) => {
          const docs = state.documents.filter((d) => d.type === section.type)
          return (
            <section key={section.type}>
              <h2 className="mb-2 font-bold text-navy-950">{section.title}</h2>
              {docs.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5 text-sm text-slate-400 shadow-sm">
                  {section.empty}
                </div>
              ) : (
                <div className="space-y-2">
                  {docs.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm"
                    >
                      <div>
                        <p className="text-sm font-semibold text-navy-950">{d.name}</p>
                        <p className="text-xs text-slate-400">
                          {d.artisanId && artisanById(d.artisanId) ? `${artisanById(d.artisanId)!.name} · ` : ''}
                          {new Date(d.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <ChevronRight size={18} className="flex-none text-slate-300" />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )
        })}

        {adding ? (
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du document (ex. photo façade)"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-navy-700"
            />
            <div className="flex gap-2">
              <button onClick={submit} className="flex-1 rounded-full bg-accent-500 py-2.5 font-bold text-white">
                Ajouter
              </button>
              <button
                onClick={() => setAdding(false)}
                className="rounded-full border border-slate-200 px-3.5 py-2.5 text-sm text-slate-500"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-navy-900 py-3 font-bold text-navy-900"
          >
            <Plus size={16} /> Ajouter un document
          </button>
        )}
      </div>
    </div>
  )
}

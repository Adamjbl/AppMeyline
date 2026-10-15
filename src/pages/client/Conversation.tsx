import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Send } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { useStore } from '../../lib/store'
import { artisanById } from '../../lib/mockData'

export default function Conversation() {
  const { artisanId = '' } = useParams()
  const artisan = artisanById(artisanId)
  const { state, sendMessage } = useStore()
  const [text, setText] = useState('')
  const thread = state.threads.find((t) => t.artisanId === artisanId)

  if (!artisan) return <div className="p-6 text-center text-slate-500">Conversation introuvable.</div>

  function submit() {
    if (!text.trim()) return
    sendMessage(artisanId, text.trim())
    setText('')
    setTimeout(() => {
      sendMessage(artisanId, 'Bien reçu, je vous réponds rapidement !', 'artisan')
    }, 700)
  }

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={artisan.name} subtitle={artisan.company} back />
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {(thread?.messages ?? []).map((m) => (
          <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm ${
                m.from === 'user' ? 'bg-navy-900 text-white' : 'border border-slate-200 bg-white text-navy-950'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="safe-bottom flex gap-2 border-t border-slate-200 bg-white p-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Écrire un message…"
          className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-navy-700"
        />
        <button
          onClick={submit}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent-500 text-white press"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}

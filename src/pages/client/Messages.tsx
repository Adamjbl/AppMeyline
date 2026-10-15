import { Link } from 'react-router-dom'
import { MessageCircle, ChevronRight } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import EmptyState from '../../components/EmptyState'
import { useStore } from '../../lib/store'
import { artisanById } from '../../lib/mockData'

export default function Messages() {
  const { state } = useStore()

  return (
    <div className="pb-6">
      <ScreenHeader title="Messages" subtitle="Toutes vos conversations avec vos artisans" />
      <div className="-mt-3 space-y-2 px-5">
        {state.threads.length === 0 && (
          <EmptyState
            icon={MessageCircle}
            title="Pas encore de conversation"
            description="Demandez un devis à un artisan pour démarrer une discussion."
          />
        )}
        {state.threads
          .slice()
          .reverse()
          .map((thread) => {
            const artisan = artisanById(thread.artisanId)
            const last = thread.messages[thread.messages.length - 1]
            if (!artisan) return null
            return (
              <Link
                key={thread.id}
                to={`/app/messages/${thread.artisanId}`}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-avatar-bg text-sm font-bold text-navy-900">
                  {artisan.name.split(' ').map((p) => p[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-navy-950">{artisan.name}</p>
                  <p className="truncate text-sm text-slate-500">{last?.text ?? '…'}</p>
                </div>
                <ChevronRight size={18} className="flex-none text-slate-300" />
              </Link>
            )
          })}
      </div>
    </div>
  )
}

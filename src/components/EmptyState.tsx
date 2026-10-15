import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export default function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-link-600">
        <Icon size={22} />
      </div>
      <p className="mb-1 font-bold text-navy-950">{title}</p>
      <p className="mb-4 text-sm text-slate-500">{description}</p>
      {action}
    </div>
  )
}

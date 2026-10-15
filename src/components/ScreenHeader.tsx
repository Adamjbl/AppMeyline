import { useNavigate } from 'react-router-dom'
import { ChevronLeft, HelpCircle, Bell } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  title: string
  subtitle?: string
  back?: boolean
  floating?: ReactNode
}

export default function ScreenHeader({ title, subtitle, back, floating }: Props) {
  const navigate = useNavigate()
  return (
    <header className="safe-top relative rounded-b-[2rem] bg-gradient-to-br from-navy-700 to-navy-950 px-5 pb-6 pt-4 text-white">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {back && (
            <button
              onClick={() => navigate(-1)}
              className="press-sm mb-2 -ml-1 flex items-center gap-0.5 text-sm text-white/80"
            >
              <ChevronLeft size={16} /> Retour
            </button>
          )}
          <h1 className="text-xl font-bold leading-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-white/70">{subtitle}</p>}
        </div>
        <div className="flex flex-none items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
            <HelpCircle size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
            <Bell size={18} />
          </button>
        </div>
      </div>
      {floating && <div className="absolute inset-x-5 -bottom-6">{floating}</div>}
    </header>
  )
}

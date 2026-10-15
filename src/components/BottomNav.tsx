import { NavLink } from 'react-router-dom'
import { Home, ListChecks, Wallet, MessageCircle, FileText } from 'lucide-react'

const ITEMS = [
  { to: '/app', label: 'Accueil', Icon: Home, end: true },
  { to: '/app/timeline', label: 'Timeline', Icon: ListChecks },
  { to: '/app/budget', label: 'Budget', Icon: Wallet },
  { to: '/app/messages', label: 'Messages', Icon: MessageCircle },
  { to: '/app/documents', label: 'Documents', Icon: FileText },
]

export default function BottomNav() {
  return (
    <nav className="safe-bottom sticky bottom-0 z-20 flex border-t border-slate-200 bg-white/95 px-1 py-2 backdrop-blur">
      {ITEMS.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-navy-900' : 'text-slate-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  isActive ? 'bg-navy-900 text-white' : 'text-slate-400'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.25 : 2} />
              </span>
              <span className={isActive ? 'font-semibold' : ''}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

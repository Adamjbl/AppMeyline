import { Search } from 'lucide-react'
import type { ReactNode } from 'react'

export default function SearchBar({
  placeholder = 'Rechercher un artisan, un métier…',
  as: Comp = 'div',
  ...props
}: {
  placeholder?: string
  as?: 'div' | 'button'
  onClick?: () => void
  children?: ReactNode
}) {
  return (
    <Comp
      {...props}
      className="flex w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-400 shadow-sm"
    >
      <Search size={18} className="flex-none text-link-600" />
      {placeholder}
    </Comp>
  )
}

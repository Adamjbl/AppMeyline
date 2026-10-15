import { Link } from 'react-router-dom'
import { Search, Home as HomeIcon, ChevronRight } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import SearchBar from '../../components/SearchBar'
import ArtisanCard from '../../components/ArtisanCard'
import { useStore } from '../../lib/store'
import { ARTISANS } from '../../lib/mockData'

const HOW_IT_WORKS = [
  'Choisissez votre artisan vérifié',
  'Recevez et comparez vos devis',
  'Suivez votre chantier étape par étape',
]

export default function Home() {
  const { state } = useStore()
  const hasProject = state.projects.length > 0

  return (
    <div className="pb-6">
      <ScreenHeader
        title={`Bonjour ${state.userName}`}
        subtitle="Que voulez-vous faire aujourd’hui ?"
        floating={
          <Link to="/app/find">
            <SearchBar as="div" />
          </Link>
        }
      />

      <div className="mt-10 space-y-4 px-5">
        <Link
          to="/app/find"
          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-sky-50 text-link-600">
              <Search size={20} />
            </span>
            <div>
              <p className="font-bold text-navy-950">Trouver un artisan</p>
              <p className="mt-0.5 text-sm text-slate-500">
                Un petit projet, une réparation ou un dépannage ? Trouvez un artisan vérifié près de chez vous.
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="flex-none text-slate-300" />
        </Link>

        <Link
          to={hasProject ? '/app/timeline' : '/app/renovation/new'}
          className="flex items-center justify-between rounded-2xl border-2 border-accent-500 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-navy-900 text-white">
              <HomeIcon size={20} />
            </span>
            <div>
              <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-accent-600">
                Gros travaux
              </span>
              <p className="mt-1 font-bold text-navy-950">Suivre ma rénovation</p>
              <p className="mt-0.5 text-sm text-slate-500">
                Décrivez votre projet : BuildFlow ordonne les artisans, crée votre planning et suit votre budget.
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="flex-none text-slate-300" />
        </Link>

        <section>
          <h2 className="mb-2 font-bold text-navy-950">Comment ça marche</h2>
          <ol className="space-y-2">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step} className="flex items-center gap-2.5 text-sm text-slate-600">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-navy-900 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="mb-2 font-bold text-navy-950">Artisans recommandés près de chez vous</h2>
          <div className="space-y-3">
            {ARTISANS.slice(0, 2).map((a) => (
              <ArtisanCard key={a.id} artisan={a} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

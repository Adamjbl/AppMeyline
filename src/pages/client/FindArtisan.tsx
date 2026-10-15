import { Link } from 'react-router-dom'
import ScreenHeader from '../../components/ScreenHeader'
import SearchBar from '../../components/SearchBar'
import { TRADES, artisansByTrade } from '../../lib/mockData'
import { TRADE_ICONS } from '../../lib/icons'

export default function FindArtisan() {
  return (
    <div className="pb-6">
      <ScreenHeader
        title="Trouver un artisan"
        subtitle="Tous vérifiés par BuildFlow, près d’Annemasse"
        back
        floating={<SearchBar />}
      />

      <div className="mt-10 space-y-4 px-5">
        <div className="grid grid-cols-2 gap-3">
          {TRADES.map((trade) => {
            const Icon = TRADE_ICONS[trade.id]
            const count = artisansByTrade(trade.id).length || (trade.urgent ? 6 : 3)
            return (
              <Link
                key={trade.id}
                to={`/app/find/${trade.id}`}
                className={`rounded-2xl border bg-white p-4 press ${
                  trade.urgent ? 'border-red-200 bg-red-50' : 'border-slate-200'
                }`}
              >
                <div
                  className={`mb-2 flex h-11 w-11 items-center justify-center rounded-xl ${
                    trade.urgent ? 'bg-red-100 text-red-600' : 'bg-sky-50 text-link-600'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <p className={`font-bold ${trade.urgent ? 'text-red-600' : 'text-navy-950'}`}>{trade.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {count} artisan{count > 1 ? 's' : ''} vérifié{count > 1 ? 's' : ''}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

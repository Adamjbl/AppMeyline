import { Link } from 'react-router-dom'
import { Home, ShieldCheck, Calendar, FileText, ArrowRight } from 'lucide-react'
import HeroIllustration from '../components/HeroIllustration'

export default function Landing() {
  return (
    <div className="safe-top safe-bottom flex h-full flex-col overflow-y-auto px-5 pb-6 pt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white">
            <Home size={18} />
          </div>
          <span className="text-lg font-extrabold text-navy-950">
            Build<span className="text-navy-700">Flow</span>
          </span>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
          V1 · Démo
        </span>
      </div>

      <div className="relative mt-5 shrink-0 overflow-hidden rounded-3xl">
        <div className="aspect-[4/3] w-full">
          <HeroIllustration />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <ShieldCheck size={16} />
          </span>
          <div>
            <p className="text-sm font-bold text-navy-950">Votre projet, entre de bonnes mains.</p>
            <p className="text-xs text-slate-500">Des artisans vérifiés, en toute confiance.</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-wide text-navy-700">
        Trouvez votre artisan en 2 clics
      </p>
      <h1 className="mt-1 text-3xl font-extrabold leading-tight text-navy-950">
        Vos travaux,
        <br />
        <span className="text-navy-700">l’esprit tranquille.</span>
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        Des artisans vérifiés près de chez vous, et un chantier qui avance au bon rythme.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          { Icon: ShieldCheck, label: 'Artisans vérifiés' },
          { Icon: Calendar, label: 'Planning synchronisé' },
          { Icon: FileText, label: 'Documents centralisés' },
        ].map(({ Icon, label }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-link-600">
              <Icon size={18} />
            </div>
            <p className="text-[11px] font-semibold leading-tight text-navy-950">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          to="/app"
          className="flex items-center justify-center gap-2 rounded-full bg-accent-500 py-3.5 font-bold text-white shadow-md shadow-orange-200 transition active:scale-[0.98]"
        >
          Je cherche un artisan <ArrowRight size={18} />
        </Link>
        <Link
          to="/artisan/rejoindre"
          className="flex items-center justify-center rounded-full border-2 border-navy-900 py-3.5 font-bold text-navy-900 transition active:scale-[0.98]"
        >
          Je suis artisan
        </Link>
      </div>

      <p className="mt-4 flex items-start gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck size={13} className="mt-0.5 flex-none text-emerald-600" />
        Aucun artisan ne paie pour être recommandé. Chaque recommandation est expliquée.
      </p>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Star, MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import TrustBadges from '../../components/TrustBadges'
import { artisanById } from '../../lib/mockData'
import { useStore } from '../../lib/store'

export default function ArtisanProfile() {
  const { artisanId = '' } = useParams()
  const artisan = artisanById(artisanId)
  const navigate = useNavigate()
  const { requestQuote } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  if (!artisan) {
    return <div className="p-6 text-center text-slate-500">Artisan introuvable.</div>
  }

  function submitQuote() {
    requestQuote(artisan!.id, note)
    setSent(true)
    setTimeout(() => navigate('/app/messages'), 900)
  }

  return (
    <div className="pb-8">
      <ScreenHeader title="Votre artisan" back />

      <div className="-mt-3 space-y-4 px-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 rounded-2xl border-2 border-accent-500 px-3 py-1.5">
              <Star size={16} className="fill-accent-500 text-accent-500" />
              <span className="text-sm font-bold text-navy-950">{artisan.rating.toFixed(1)} / 5</span>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-avatar-bg text-base font-bold text-navy-900">
              {artisan.name.split(' ').map((p) => p[0]).join('')}
            </div>
          </div>
          <p className="mt-1 text-xs text-slate-400">{artisan.reviewCount} avis vérifiés</p>
          <h2 className="mt-2 text-lg font-extrabold text-navy-950">{artisan.name}</h2>
          <p className="text-sm text-slate-500">{artisan.company}</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
            <MapPin size={15} className="text-link-600" /> {artisan.distanceKm} km d’Annemasse
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
            <Calendar size={15} className="text-link-600" /> Disponible dès le {artisan.availableFrom}
          </p>
          <div className="mt-2">
            <TrustBadges badges={artisan.badges} />
          </div>
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="press-sm flex w-full items-center justify-between rounded-2xl border-2 border-accent-500 bg-orange-50 p-4 text-left"
          >
            <div>
              <p className="font-bold text-navy-950">Demander un devis</p>
              <p className="text-xs text-slate-500">Gratuit, détaillé et sans engagement.</p>
            </div>
            <ArrowRight size={18} className="text-accent-500" />
          </button>
        ) : (
          <div className="space-y-3 rounded-2xl border-2 border-accent-500 bg-orange-50 p-4">
            {sent ? (
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <CheckCircle2 size={16} /> Demande envoyée à {artisan.name} !
              </p>
            ) : (
              <>
                <p className="font-bold text-navy-950">Décrivez votre besoin</p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ex. : Réfection d’un mur en pierre, environ 15m²…"
                  className="h-24 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-navy-700"
                />
                <button
                  onClick={submitQuote}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white press"
                >
                  Envoyer la demande <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-2 font-bold text-navy-950">Un professionnel vérifié</p>
          <ul className="space-y-2">
            {artisan.checks.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <section>
          <h3 className="mb-2 font-bold text-navy-950">Ses réalisations</h3>
          <div className="grid grid-cols-3 gap-2">
            {artisan.portfolio.map((p) => (
              <div
                key={p.label}
                className="aspect-square rounded-xl bg-gradient-to-br from-navy-700 to-navy-950 p-2 text-[11px] font-semibold text-white"
              >
                <span className="flex h-full items-end">{p.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 font-bold text-navy-950">Avis vérifiés</h3>
          <div className="space-y-2">
            {artisan.reviews.map((r) => (
              <div key={r.author} className="rounded-2xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-navy-950">{r.author}</p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-accent-600">
                    <Star size={12} className="fill-accent-500 text-accent-500" /> {r.rating}
                    {r.verified && <span className="text-emerald-600">· vérifié</span>}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{r.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 py-3 font-bold text-white press"
          >
            Demander un devis <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

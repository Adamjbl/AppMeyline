export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d4fa8" />
          <stop offset="1" stopColor="#0b1536" />
        </linearGradient>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fdba74" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fdba74" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky)" />
      <circle cx="320" cy="60" r="80" fill="url(#sun)" />
      <circle cx="320" cy="60" r="22" fill="#fed7aa" opacity="0.9" />

      <path d="M0 120L60 95L130 130L200 80L270 125L340 90L400 115V300H0V120Z" fill="#15306e" opacity="0.85" />
      <path d="M0 160L90 130L160 165L240 120L320 155L400 135V300H0V160Z" fill="#11204a" />

      <g>
        <rect x="90" y="150" width="220" height="150" fill="#eef2f9" />
        <polygon points="70,150 200,55 330,150" fill="#f97316" />
        <rect x="70" y="150" width="260" height="12" fill="#ea670c" />

        <rect x="118" y="182" width="46" height="46" rx="3" fill="#1d4fa8" />
        <rect x="118" y="182" width="46" height="46" rx="3" fill="none" stroke="#f8fafc" strokeWidth="4" />
        <rect x="236" y="182" width="46" height="46" rx="3" fill="#1d4fa8" />
        <rect x="236" y="182" width="46" height="46" rx="3" fill="none" stroke="#f8fafc" strokeWidth="4" />

        <rect x="178" y="214" width="44" height="60" fill="#0b1536" />

        <rect x="192" y="75" width="16" height="36" fill="#f8fafc" />
      </g>
    </svg>
  )
}

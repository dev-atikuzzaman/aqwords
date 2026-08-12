'use client'

const TABS = [
  { key: 'home', label: 'হোম', icon: '🏠' },
  { key: 'favorites', label: 'ফেভারিট', icon: '⭐' },
  { key: 'spotlight', label: 'আজকের নির্বাচন', icon: '✨' },
  { key: 'progress', label: 'অগ্রগতি', icon: '📊' },
]

export default function BottomNav({ view, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 glass border-t border-white/5">
      <div className="max-w-3xl mx-auto grid grid-cols-4">
        {TABS.map((t) => {
          const active = view === t.key
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={`flex flex-col items-center gap-0.5 py-2.5 font-ui text-[10px] transition ${
                active ? 'text-gold-300' : 'text-parchment-400'
              }`}
            >
              <span className={`text-lg leading-none ${active ? 'scale-110' : ''} transition-transform`}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

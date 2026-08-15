'use client'
import { CATEGORY_MAP } from '../data/constants.js'

export default function EntryCard({ entry, isFav, onOpen, onToggleFavorite }) {
  const cat = CATEGORY_MAP[entry.category]
  const isWord = entry.type === 'word'

  return (
    <button
      onClick={() => onOpen(entry)}
      className="relative text-left rounded-xl bg-ink-800/70 ring-1 ring-white/5 p-3.5 hover:ring-gold-500/30 active:scale-[0.98] transition animate-rise"
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite(entry.id)
        }}
        className={`absolute top-2.5 right-2.5 text-sm ${isFav ? 'text-gold-400' : 'text-parchment-400/50'}`}
        aria-label="ফেভারিট"
      >
        {isFav ? '★' : '☆'}
      </button>

      {isWord ? (
        <>
          <p className="font-arabic text-xl text-gold-300 leading-tight" dir="rtl">
            {entry.ar}
          </p>
          <p className="font-display text-sm font-semibold text-parchment-100 mt-1">{entry.bn}</p>
          <p className="font-ui text-[10px] text-parchment-400 mt-0.5">{entry.translit}</p>
        </>
      ) : (
        <>
          <p className="font-ui text-[10px] text-gold-400 tracking-wide">সূরা {entry.surah} · {entry.ref}</p>
          <p className="font-display text-sm font-semibold text-parchment-100 mt-1 leading-snug">{entry.title}</p>
          {entry.arabic && (
            <p className="font-arabic text-sm text-parchment-300 mt-1.5 line-clamp-2" dir="rtl">
              {entry.arabic}
            </p>
          )}
        </>
      )}

      {cat && (
        <span className={`inline-block mt-2 font-ui text-[9px] px-2 py-0.5 rounded-full ring-1 ${cat.ring} ${cat.text} bg-ink-900/60`}>
          {cat.icon} {cat.label}
        </span>
      )}
    </button>
  )
}

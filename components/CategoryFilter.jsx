'use client'
import { CATEGORIES } from '../data/constants.js'

export default function CategoryFilter({ selected, onSelect, counts }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
      <button
        onClick={() => onSelect('all')}
        className={`shrink-0 font-ui text-xs px-3.5 py-2 rounded-full ring-1 transition ${
          selected === 'all'
            ? 'bg-gold-500/20 text-gold-300 ring-gold-500/40'
            : 'bg-ink-800 text-parchment-300 ring-white/5'
        }`}
      >
        সব বিষয়
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.key}
          onClick={() => onSelect(c.key)}
          className={`shrink-0 font-ui text-xs px-3.5 py-2 rounded-full ring-1 transition flex items-center gap-1.5 ${
            selected === c.key ? `${c.text} ring-2 ${c.ring} bg-ink-800` : 'bg-ink-800 text-parchment-300 ring-white/5'
          }`}
        >
          <span>{c.icon}</span>
          {c.label}
          {counts && counts[c.key] ? <span className="text-parchment-400">({counts[c.key]})</span> : null}
        </button>
      ))}
    </div>
  )
}

'use client'
import { useMemo } from 'react'
import { WORD_LIST, AYAH_LIST } from '../data/index.js'

function dayIndex(len) {
  const start = new Date(new Date().getFullYear(), 0, 0)
  const diff = Date.now() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  return dayOfYear % len
}

export default function SpotlightView({ onOpen }) {
  const word = useMemo(() => WORD_LIST[dayIndex(WORD_LIST.length)], [])
  const ayah = useMemo(() => AYAH_LIST[dayIndex(AYAH_LIST.length)], [])

  return (
    <main className="max-w-3xl mx-auto px-4 pt-4 pb-24 space-y-4">
      <h2 className="font-display text-base font-bold text-parchment-100 mb-1">আজকের নির্বাচন</h2>
      <p className="font-ui text-xs text-parchment-400 -mt-3 mb-2">প্রতিদিন একটি নতুন শব্দ ও আয়াত হাইলাইট হয়</p>

      <button
        onClick={() => onOpen(word)}
        className="w-full text-left rounded-2xl p-5 bg-gradient-to-br from-gold-500/15 via-ink-800 to-ink-800 ring-1 ring-gold-500/30 shadow-card"
      >
        <p className="font-ui text-[10px] uppercase tracking-[0.15em] text-gold-400 mb-2">আজকের শব্দ</p>
        <p className="font-arabic text-3xl text-gold-300" dir="rtl">{word.ar}</p>
        <p className="font-display text-lg font-bold text-parchment-100 mt-1">{word.bn}</p>
        <p className="font-body text-xs text-parchment-300 mt-2 line-clamp-2">{word.def}</p>
      </button>

      <button
        onClick={() => onOpen(ayah)}
        className="w-full text-left rounded-2xl p-5 bg-gradient-to-br from-emerald-500/15 via-ink-800 to-ink-800 ring-1 ring-emerald-500/30 shadow-card"
      >
        <p className="font-ui text-[10px] uppercase tracking-[0.15em] text-emerald-400 mb-2">আজকের আয়াত</p>
        <p className="font-ui text-xs text-emerald-300">সূরা {ayah.surah} · {ayah.ref}</p>
        <p className="font-display text-base font-bold text-parchment-100 mt-1">{ayah.title}</p>
        <p className="font-body text-xs text-parchment-300 mt-2 line-clamp-3">{ayah.meaning}</p>
      </button>
    </main>
  )
}

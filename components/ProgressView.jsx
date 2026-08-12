'use client'
import { WORD_LIST, AYAH_LIST, TOTAL_WORDS, TOTAL_AYAHS } from '../data/index.js'
import { toBengaliNumber } from '../data/constants.js'

export default function ProgressView({ favIds, learnedIds, onReset }) {
  const all = [...WORD_LIST, ...AYAH_LIST]
  const totalLearned = all.filter((e) => learnedIds.has(e.id)).length
  const totalFav = favIds.size
  const wordsLearned = WORD_LIST.filter((w) => learnedIds.has(w.id)).length
  const ayahsLearned = AYAH_LIST.filter((a) => learnedIds.has(a.id)).length

  const total = TOTAL_WORDS + TOTAL_AYAHS
  const pct = total ? Math.round((totalLearned / total) * 100) : 0

  return (
    <main className="max-w-3xl mx-auto px-4 pt-4 pb-24 space-y-4">
      <h2 className="font-display text-base font-bold text-parchment-100">আপনার অগ্রগতি</h2>

      <div className="rounded-2xl bg-ink-800/60 ring-1 ring-white/5 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-ui text-xs text-parchment-300">সামগ্রিক শেখা</span>
          <span className="font-ui text-xs text-gold-300">{toBengaliNumber(pct)}%</span>
        </div>
        <div className="h-2 rounded-full bg-ink-900 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-500 to-gold-300" style={{ width: `${pct}%` }} />
        </div>
        <p className="font-ui text-[11px] text-parchment-400 mt-2">
          {toBengaliNumber(totalLearned)} / {toBengaliNumber(total)} টি শেখা হয়েছে
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-ink-800/60 ring-1 ring-white/5 p-4">
          <p className="font-ui text-[10px] text-parchment-400">শব্দ শেখা হয়েছে</p>
          <p className="font-display text-xl font-bold text-parchment-100 mt-1">
            {toBengaliNumber(wordsLearned)}<span className="text-sm text-parchment-400">/{toBengaliNumber(TOTAL_WORDS)}</span>
          </p>
        </div>
        <div className="rounded-xl bg-ink-800/60 ring-1 ring-white/5 p-4">
          <p className="font-ui text-[10px] text-parchment-400">আয়াত শেখা হয়েছে</p>
          <p className="font-display text-xl font-bold text-parchment-100 mt-1">
            {toBengaliNumber(ayahsLearned)}<span className="text-sm text-parchment-400">/{toBengaliNumber(TOTAL_AYAHS)}</span>
          </p>
        </div>
        <div className="rounded-xl bg-ink-800/60 ring-1 ring-white/5 p-4 col-span-2">
          <p className="font-ui text-[10px] text-parchment-400">ফেভারিট সংখ্যা</p>
          <p className="font-display text-xl font-bold text-gold-300 mt-1">{toBengaliNumber(totalFav)}</p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full font-ui text-xs py-2.5 rounded-xl bg-ink-800 text-parchment-400 ring-1 ring-white/5 hover:bg-ink-700 transition"
      >
        সব অগ্রগতি রিসেট করুন
      </button>
    </main>
  )
}

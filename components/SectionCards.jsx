'use client'
import { TOTAL_WORDS, TOTAL_AYAHS } from '../data/index.js'
import { toBengaliNumber } from '../data/constants.js'

export default function SectionCards({ section, onSelect }) {
  const cards = [
    {
      key: 'words',
      title: 'আল-কুরআনের শব্দসমূহ',
      sub: `${toBengaliNumber(TOTAL_WORDS)}টি গুরুত্বপূর্ণ পরিভাষা`,
      icon: '🕌',
      gradient: 'from-gold-500/25 via-ink-800 to-ink-800',
      ring: 'ring-gold-500/30',
      desc: 'আরবি শব্দ, ব্যাখ্যা, উপমা, বিজ্ঞানের সাথে তুলনা ও হাদিস রেফারেন্সসহ',
    },
    {
      key: 'ayahs',
      title: 'গুরুত্বপূর্ণ আয়াতসমূহ',
      sub: `৮০/২০ নীতি অনুসারে বাছাইকৃত ${toBengaliNumber(TOTAL_AYAHS)}টি আয়াত`,
      icon: '📜',
      gradient: 'from-emerald-500/20 via-ink-800 to-ink-800',
      ring: 'ring-emerald-500/30',
      desc: 'প্রেক্ষাপট, তাৎপর্য, উপমা ও সম্পর্কিত হাদিসসহ বিস্তারিত ব্যাখ্যা',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3.5">
      {cards.map((c) => (
        <button
          key={c.key}
          onClick={() => onSelect(c.key)}
          className={`text-left rounded-2xl p-5 bg-gradient-to-br ${c.gradient} ring-1 ${c.ring} shadow-card hover:brightness-110 active:scale-[0.99] transition ${
            section === c.key ? 'ring-2' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-3xl leading-none">{c.icon}</span>
              <h2 className="font-display text-lg font-bold text-parchment-100 mt-2">{c.title}</h2>
              <p className="font-ui text-xs text-gold-300 mt-0.5">{c.sub}</p>
              <p className="font-body text-xs text-parchment-300 mt-2 leading-relaxed">{c.desc}</p>
            </div>
            <span className="text-parchment-400 text-lg">›</span>
          </div>
        </button>
      ))}
    </div>
  )
}

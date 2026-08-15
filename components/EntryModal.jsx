'use client'
import { useEffect, useState } from 'react'
import { CATEGORY_MAP, LEVELS } from '../data/constants.js'

function Section({ icon, title, children }) {
  if (!children) return null
  return (
    <div className="py-3 border-b border-white/5 last:border-0">
      <h4 className="font-ui text-[11px] uppercase tracking-[0.12em] text-gold-400 flex items-center gap-1.5 mb-1.5">
        <span>{icon}</span> {title}
      </h4>
      <p className="font-body text-sm text-parchment-200 leading-relaxed">{children}</p>
    </div>
  )
}

export default function EntryModal({ entry, isFav, isLearned, onClose, onToggleFavorite, onToggleLearned, fetchNote, saveNote }) {
  const [note, setNote] = useState('')
  const [noteLoaded, setNoteLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    fetchNote(entry.id).then((n) => {
      if (mounted) {
        setNote(n)
        setNoteLoaded(true)
      }
    })
    return () => {
      mounted = false
    }
  }, [entry.id, fetchNote])

  const cat = CATEGORY_MAP[entry.category]
  const level = LEVELS[entry.level]
  const isWord = entry.type === 'word'

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="w-full sm:max-w-lg max-h-[88vh] overflow-y-auto scrollbar-thin bg-ink-900 rounded-t-2xl sm:rounded-2xl ring-1 ring-white/10 shadow-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-ink-900/95 backdrop-blur px-5 pt-4 pb-3 border-b border-white/5 flex items-start justify-between">
          <div className="pr-3">
            {isWord ? (
              <>
                <p className="font-arabic text-3xl text-gold-300" dir="rtl">{entry.ar}</p>
                <h3 className="font-display text-lg font-bold text-parchment-100 mt-1">{entry.bn}</h3>
                <p className="font-ui text-xs text-parchment-400">
                  {entry.translit} {entry.root && entry.root !== '—' ? `· মূল: ${entry.root}` : ''}
                </p>
              </>
            ) : (
              <>
                <p className="font-ui text-xs text-gold-400 tracking-wide">সূরা {entry.surah} ({entry.surahEn}) · আয়াত {entry.ref}</p>
                <h3 className="font-display text-lg font-bold text-parchment-100 mt-1 leading-snug">{entry.title}</h3>
              </>
            )}
            {!isWord && entry.arabic && (
              <p className="font-arabic text-2xl text-gold-300 leading-[2.1] mt-3 text-right" dir="rtl" lang="ar">
                {entry.arabic}
              </p>
            )}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {cat && (
                <span className={`font-ui text-[9px] px-2 py-0.5 rounded-full ring-1 ${cat.ring} ${cat.text} bg-ink-800`}>
                  {cat.icon} {cat.label}
                </span>
              )}
              {level && (
                <span className={`font-ui text-[9px] px-2 py-0.5 rounded-full ring-1 ${level.color}`}>{level.label}</span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-parchment-400 text-xl leading-none shrink-0" aria-label="বন্ধ করুন">
            ✕
          </button>
        </div>

        <div className="px-5">
          {isWord ? (
            <>
              <Section icon="📘" title="ব্যাখ্যা">{entry.def}</Section>
              <Section icon="💡" title="উপমা / এনালজি">{entry.analogy}</Section>
              <Section icon="🧭" title="বাস্তব উদাহরণ">{entry.example}</Section>
              <Section icon="🔬" title="বিজ্ঞানের সাথে তুলনা">{entry.science}</Section>
              <Section icon="🕰️" title="প্রেক্ষাপট">{entry.context}</Section>
              <Section icon="⭐" title="তাৎপর্য">{entry.significance}</Section>
              <Section icon="📗" title="সম্পর্কিত হাদিস">
                {entry.hadith}
                {entry.hadithRef ? <span className="block mt-1 text-xs text-parchment-400">— {entry.hadithRef}</span> : null}
              </Section>
              {entry.refs && entry.refs.length > 0 && (
                <Section icon="🔖" title="কুরআনে উল্লেখ">
                  <span className="flex flex-wrap gap-1.5">
                    {entry.refs.map((r) => (
                      <span key={r} className="text-xs bg-ink-800 px-2 py-0.5 rounded-full ring-1 ring-white/5">{r}</span>
                    ))}
                  </span>
                </Section>
              )}
            </>
          ) : (
            <>
              <Section icon="📖" title="ভাবার্থ">{entry.meaning}</Section>
              <Section icon="📘" title="ব্যাখ্যা">{entry.explanation}</Section>
              <Section icon="💡" title="উপমা / এনালজি">{entry.analogy}</Section>
              <Section icon="🔬" title="বিজ্ঞানের সাথে তুলনা">{entry.science}</Section>
              <Section icon="🕰️" title="প্রেক্ষাপট (শানে নুযূল)">{entry.context}</Section>
              <Section icon="⭐" title="তাৎপর্য">{entry.significance}</Section>
              <Section icon="📗" title="সম্পর্কিত হাদিস">
                {entry.hadith}
                {entry.hadithRef ? <span className="block mt-1 text-xs text-parchment-400">— {entry.hadithRef}</span> : null}
              </Section>
            </>
          )}

          <div className="py-3">
            <h4 className="font-ui text-[11px] uppercase tracking-[0.12em] text-gold-400 flex items-center gap-1.5 mb-1.5">
              <span>📝</span> ব্যক্তিগত নোট
            </h4>
            <textarea
              value={note}
              disabled={!noteLoaded}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => saveNote(entry.id, note)}
              placeholder="নিজের চিন্তা বা উপলব্ধি লিখে রাখুন..."
              rows={3}
              className="w-full font-body text-sm bg-ink-800/70 text-parchment-200 placeholder-parchment-400/60 rounded-lg p-3 ring-1 ring-white/5 focus:ring-gold-500/40 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-ink-900/95 backdrop-blur px-5 py-3 border-t border-white/5 flex gap-2">
          <button
            onClick={() => onToggleFavorite(entry.id)}
            className={`flex-1 font-ui text-xs py-2.5 rounded-xl ring-1 transition ${
              isFav ? 'bg-gold-500/15 text-gold-300 ring-gold-500/30' : 'bg-ink-800 text-parchment-300 ring-white/5'
            }`}
          >
            {isFav ? '★ ফেভারিটে যুক্ত' : '☆ ফেভারিটে যুক্ত করুন'}
          </button>
          <button
            onClick={() => onToggleLearned(entry.id)}
            className={`flex-1 font-ui text-xs py-2.5 rounded-xl ring-1 transition ${
              isLearned ? 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30' : 'bg-ink-800 text-parchment-300 ring-white/5'
            }`}
          >
            {isLearned ? '✓ শেখা হয়েছে' : 'শেখা হয়েছে চিহ্নিত করুন'}
          </button>
        </div>
      </div>
    </div>
  )
}

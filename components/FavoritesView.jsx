'use client'
import { WORD_LIST, AYAH_LIST } from '../data/index.js'
import EntryCard from './EntryCard.jsx'

export default function FavoritesView({ favIds, onOpen, onToggleFavorite }) {
  const all = [...WORD_LIST, ...AYAH_LIST]
  const favorites = all.filter((e) => favIds.has(e.id))

  return (
    <main className="max-w-3xl mx-auto px-4 pt-4 pb-24">
      <h2 className="font-display text-base font-bold text-parchment-100 mb-3">আপনার ফেভারিট</h2>
      {favorites.length === 0 ? (
        <div className="rounded-2xl bg-ink-800/60 ring-1 ring-white/5 p-8 text-center">
          <p className="text-3xl mb-2">⭐</p>
          <p className="font-body text-sm text-parchment-300">এখনো কোনো ফেভারিট যুক্ত করা হয়নি।</p>
          <p className="font-ui text-xs text-parchment-400 mt-1">যেকোনো শব্দ বা আয়াতের ☆ আইকনে চাপুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {favorites.map((e) => (
            <EntryCard key={e.id} entry={e} isFav={true} onOpen={onOpen} onToggleFavorite={onToggleFavorite} />
          ))}
        </div>
      )}
    </main>
  )
}

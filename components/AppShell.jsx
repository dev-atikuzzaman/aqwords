'use client'
import { useEffect, useMemo, useState } from 'react'
import { WORD_LIST, AYAH_LIST } from '../data/index.js'
import { useEntryData } from '../hooks/useEntryData.js'
import { clearAll } from '../lib/db.js'

import Header from './Header.jsx'
import BottomNav from './BottomNav.jsx'
import SectionCards from './SectionCards.jsx'
import CategoryFilter from './CategoryFilter.jsx'
import EntryCard from './EntryCard.jsx'
import EntryModal from './EntryModal.jsx'
import FavoritesView from './FavoritesView.jsx'
import SpotlightView from './SpotlightView.jsx'
import ProgressView from './ProgressView.jsx'

const PAGE_SIZE = 20

export default function AppShell() {
  const [view, setView] = useState('home')
  const [section, setSection] = useState(null) // null | 'words' | 'ayahs'
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [selectedEntry, setSelectedEntry] = useState(null)

  const { favIds, learnedIds, onToggleFavorite, onToggleLearned, fetchNote, saveNote } = useEntryData()

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [search, category, section])

  const activeList = section === 'ayahs' ? AYAH_LIST : section === 'words' ? WORD_LIST : []

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return activeList.filter((e) => {
      if (category !== 'all' && e.category !== category) return false
      if (q) {
        const hay =
          e.type === 'word'
            ? `${e.ar} ${e.translit} ${e.bn} ${e.def} ${e.tags?.join(' ')}`.toLowerCase()
            : `${e.surah} ${e.surahEn} ${e.ref} ${e.title} ${e.meaning} ${e.tags?.join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [activeList, search, category])

  const visible = filtered.slice(0, visibleCount)

  const handleReset = async () => {
    await clearAll()
    window.location.reload()
  }

  const handleSelectSection = (key) => {
    setSection(key)
    setCategory('all')
  }

  return (
    <div className="min-h-screen pb-20">
      <Header
        search={search}
        onSearch={(v) => {
          setSearch(v)
          setView('home')
          if (!section) setSection('words')
        }}
      />

      {view === 'home' && (
        <main className="max-w-3xl mx-auto px-4 pt-4 space-y-5">
          {!search && <SectionCards section={section} onSelect={handleSelectSection} />}

          {section && (
            <>
              <div>
                <CategoryFilter selected={category} onSelect={setCategory} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="font-ui text-xs uppercase tracking-[0.15em] text-parchment-400">
                    {section === 'words' ? 'শব্দসমূহ' : 'আয়াতসমূহ'}
                  </h2>
                  <span className="font-ui text-[11px] text-parchment-400">{filtered.length} টি ফলাফল</span>
                </div>

                {filtered.length === 0 ? (
                  <div className="rounded-2xl bg-ink-800/60 ring-1 ring-white/5 p-8 text-center">
                    <p className="text-3xl mb-2">🔍</p>
                    <p className="font-body text-sm text-parchment-300">কোনো ফলাফল খুঁজে পাওয়া যায়নি।</p>
                    <p className="font-ui text-xs text-parchment-400 mt-1">ভিন্ন শব্দ বা ফিল্টার দিয়ে চেষ্টা করুন।</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2.5">
                      {visible.map((e) => (
                        <EntryCard
                          key={e.id}
                          entry={e}
                          isFav={favIds.has(e.id)}
                          onOpen={setSelectedEntry}
                          onToggleFavorite={onToggleFavorite}
                        />
                      ))}
                    </div>
                    {visibleCount < filtered.length && (
                      <button
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        className="w-full mt-4 font-ui text-sm py-2.5 rounded-xl bg-ink-800 text-parchment-300 ring-1 ring-white/5 hover:bg-ink-700 transition"
                      >
                        আরও দেখুন ({filtered.length - visibleCount} বাকি)
                      </button>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </main>
      )}

      {view === 'favorites' && (
        <FavoritesView favIds={favIds} onOpen={setSelectedEntry} onToggleFavorite={onToggleFavorite} />
      )}

      {view === 'spotlight' && <SpotlightView onOpen={setSelectedEntry} />}

      {view === 'progress' && (
        <ProgressView favIds={favIds} learnedIds={learnedIds} onReset={handleReset} />
      )}

      <BottomNav view={view} onChange={setView} />

      {selectedEntry && (
        <EntryModal
          entry={selectedEntry}
          isFav={favIds.has(selectedEntry.id)}
          isLearned={learnedIds.has(selectedEntry.id)}
          onClose={() => setSelectedEntry(null)}
          onToggleFavorite={onToggleFavorite}
          onToggleLearned={onToggleLearned}
          fetchNote={fetchNote}
          saveNote={saveNote}
        />
      )}
    </div>
  )
}

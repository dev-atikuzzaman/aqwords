'use client'
import { useCallback, useEffect, useState } from 'react'
import { getFavoriteIds, getLearnedIds, toggleFavorite, toggleLearned, getEntry, setNote as dbSetNote } from '../lib/db.js'

// শব্দ/আয়াতের ফেভারিট ও "শেখা হয়েছে" অবস্থা IndexedDB-এ সংরক্ষণ করে, মেমোরিতে ক্যাশ রাখে
export function useEntryData() {
  const [favIds, setFavIds] = useState(new Set())
  const [learnedIds, setLearnedIds] = useState(new Set())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true
    Promise.all([getFavoriteIds(), getLearnedIds()]).then(([favs, learned]) => {
      if (!mounted) return
      setFavIds(favs)
      setLearnedIds(learned)
      setReady(true)
    })
    return () => {
      mounted = false
    }
  }, [])

  const onToggleFavorite = useCallback(async (id) => {
    setFavIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    await toggleFavorite(id)
  }, [])

  const onToggleLearned = useCallback(async (id) => {
    setLearnedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    await toggleLearned(id)
  }, [])

  const fetchNote = useCallback(async (id) => {
    const entry = await getEntry(id)
    return entry.note || ''
  }, [])

  const saveNote = useCallback(async (id, note) => {
    await dbSetNote(id, note)
  }, [])

  return { favIds, learnedIds, ready, onToggleFavorite, onToggleLearned, fetchNote, saveNote }
}

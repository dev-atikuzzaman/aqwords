// নেটিভ IndexedDB ভিত্তিক লোকাল ডেটাবেইজ — ফেভারিট, শেখার অগ্রগতি ও ব্যক্তিগত নোট সংরক্ষণ করে।
// কোনো এক্সটার্নাল লাইব্রেরি নেই — সরাসরি ব্রাউজারের IndexedDB API ব্যবহার করা হয়েছে।
// সবকিছু ব্যবহারকারীর নিজের ডিভাইসেই থাকে, ইন্টারনেট ছাড়াও কাজ করে।
const DB_NAME = 'quran-dictionary-db'
const DB_VERSION = 1
const STORE = 'entrydata'

let dbPromise = null

function isBrowser() {
  return typeof window !== 'undefined' && typeof indexedDB !== 'undefined'
}

function getDB() {
  if (!isBrowser()) return Promise.resolve(null)
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'id' })
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }
  return dbPromise
}

const DEFAULT_ENTRY = (id) => ({ id, fav: false, learned: false, note: '', updatedAt: Date.now() })

function tx(db, mode) {
  const t = db.transaction(STORE, mode)
  return t.objectStore(STORE)
}

export async function getEntry(id) {
  try {
    const db = await getDB()
    if (!db) return DEFAULT_ENTRY(id)
    return await new Promise((resolve) => {
      const req = tx(db, 'readonly').get(id)
      req.onsuccess = () => resolve(req.result || DEFAULT_ENTRY(id))
      req.onerror = () => resolve(DEFAULT_ENTRY(id))
    })
  } catch (e) {
    console.error('DB read failed', e)
    return DEFAULT_ENTRY(id)
  }
}

export async function getAllEntries() {
  try {
    const db = await getDB()
    if (!db) return []
    return await new Promise((resolve) => {
      const req = tx(db, 'readonly').getAll()
      req.onsuccess = () => resolve(req.result || [])
      req.onerror = () => resolve([])
    })
  } catch (e) {
    console.error('DB read-all failed', e)
    return []
  }
}

async function upsert(id, patch) {
  try {
    const db = await getDB()
    if (!db) return null
    const existing = await getEntry(id)
    const updated = { ...existing, ...patch, id, updatedAt: Date.now() }
    return await new Promise((resolve) => {
      const req = tx(db, 'readwrite').put(updated)
      req.onsuccess = () => resolve(updated)
      req.onerror = () => resolve(null)
    })
  } catch (e) {
    console.error('DB write failed', e)
    return null
  }
}

export async function toggleFavorite(id) {
  const current = await getEntry(id)
  return upsert(id, { fav: !current.fav })
}

export async function toggleLearned(id) {
  const current = await getEntry(id)
  return upsert(id, { learned: !current.learned })
}

export async function setNote(id, note) {
  return upsert(id, { note })
}

export async function getStats() {
  const all = await getAllEntries()
  return {
    favorites: all.filter((e) => e.fav).length,
    learned: all.filter((e) => e.learned).length,
  }
}

export async function getFavoriteIds() {
  const all = await getAllEntries()
  return new Set(all.filter((e) => e.fav).map((e) => e.id))
}

export async function getLearnedIds() {
  const all = await getAllEntries()
  return new Set(all.filter((e) => e.learned).map((e) => e.id))
}

export async function clearAll() {
  try {
    const db = await getDB()
    if (!db) return false
    return await new Promise((resolve) => {
      const req = tx(db, 'readwrite').clear()
      req.onsuccess = () => resolve(true)
      req.onerror = () => resolve(false)
    })
  } catch (e) {
    console.error('DB clear failed', e)
    return false
  }
}

import { WORDS } from './words.js'
import { AYAHS } from './ayahs.js'

let wCounter = 1
export const WORD_LIST = WORDS.map((w) => ({
  ...w,
  id: `w${wCounter++}`,
  type: 'word',
  letter: w.translit.trim()[0].toUpperCase(),
}))

let aCounter = 1
export const AYAH_LIST = AYAHS.map((a) => ({
  ...a,
  id: `a${aCounter++}`,
  type: 'ayah',
  letter: a.surahEn.trim()[0].toUpperCase(),
}))

export const TOTAL_WORDS = WORD_LIST.length
export const TOTAL_AYAHS = AYAH_LIST.length

export function findEntry(id) {
  if (!id) return null
  if (id.startsWith('w')) return WORD_LIST.find((w) => w.id === id) || null
  if (id.startsWith('a')) return AYAH_LIST.find((a) => a.id === id) || null
  return null
}

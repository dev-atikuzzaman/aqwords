// বিষয়ভিত্তিক ক্যাটাগরি মেটাডেটা — শব্দ ও আয়াত দুটোতেই ব্যবহৃত হয়
export const CATEGORIES = [
  {
    key: 'faith',
    label: 'ঈমান ও আকীদা',
    sub: 'Faith & Creed',
    icon: '☪️',
    gradient: 'from-violet-500 to-purple-700',
    text: 'text-violet-300',
    ring: 'ring-violet-500/40',
    dot: 'bg-violet-400',
    desc: 'আল্লাহ, ফেরেশতা, কিতাব ও গায়েবের প্রতি বিশ্বাস সম্পর্কিত',
  },
  {
    key: 'worship',
    label: 'ইবাদত',
    sub: 'Worship',
    icon: '🕌',
    gradient: 'from-cyan-400 to-blue-700',
    text: 'text-cyan-300',
    ring: 'ring-cyan-500/40',
    dot: 'bg-cyan-400',
    desc: 'সালাত, সাওম, যাকাত, হজ্ব ও দোয়া সম্পর্কিত',
  },
  {
    key: 'character',
    label: 'আখলাক ও চরিত্র',
    sub: 'Character & Ethics',
    icon: '🌙',
    gradient: 'from-emerald-400 to-green-700',
    text: 'text-emerald-300',
    ring: 'ring-emerald-500/40',
    dot: 'bg-emerald-400',
    desc: 'সবর, শোকর, ইনসাফ, বিনয় ও চারিত্রিক গুণাবলি',
  },
  {
    key: 'society',
    label: 'সমাজ ও সম্পর্ক',
    sub: 'Society & Relations',
    icon: '🤝',
    gradient: 'from-amber-400 to-orange-700',
    text: 'text-amber-300',
    ring: 'ring-amber-500/40',
    dot: 'bg-amber-400',
    desc: 'পরিবার, প্রতিবেশী, ন্যায়বিচার ও সামাজিক দায়িত্ব',
  },
  {
    key: 'creation',
    label: 'সৃষ্টি ও বিজ্ঞান',
    sub: 'Creation & Science',
    icon: '🌌',
    gradient: 'from-sky-400 to-blue-800',
    text: 'text-sky-300',
    ring: 'ring-sky-500/40',
    dot: 'bg-sky-400',
    desc: 'মহাবিশ্ব, প্রকৃতি ও সৃষ্টিজগতের নিদর্শন',
  },
  {
    key: 'akhirah',
    label: 'পরকাল',
    sub: 'The Hereafter',
    icon: '⚖️',
    gradient: 'from-rose-400 to-pink-700',
    text: 'text-rose-300',
    ring: 'ring-rose-500/40',
    dot: 'bg-rose-400',
    desc: 'মৃত্যু, কবর, কিয়ামত, জান্নাত-জাহান্নাম সম্পর্কিত',
  },
  {
    key: 'heart',
    label: 'অন্তর ও আত্মশুদ্ধি',
    sub: 'Heart & Purification',
    icon: '✨',
    gradient: 'from-teal-400 to-cyan-800',
    text: 'text-teal-300',
    ring: 'ring-teal-500/40',
    dot: 'bg-teal-400',
    desc: 'তাকওয়া, তাওবা, ইখলাস ও অন্তরের প্রশান্তি',
  },
  {
    key: 'guidance',
    label: 'পথনির্দেশনা',
    sub: 'Guidance',
    icon: '📖',
    gradient: 'from-gold-400 to-orange-600',
    text: 'text-gold-300',
    ring: 'ring-gold-500/40',
    dot: 'bg-gold-400',
    desc: 'হিদায়াত, জ্ঞান, প্রজ্ঞা ও জীবন পরিচালনার নীতি',
  },
]

export const CATEGORY_MAP = CATEGORIES.reduce((acc, c) => {
  acc[c.key] = c
  return acc
}, {})

// গুরুত্ব/ফ্রিকোয়েন্সি লেভেল — ৮০/২০ নীতি অনুসারে আয়াত ও শব্দ বাছাইয়ে ব্যবহৃত
export const LEVELS = {
  core: { label: 'অত্যন্ত গুরুত্বপূর্ণ', color: 'bg-gold-500/15 text-gold-300 ring-gold-500/30' },
  practical: { label: 'ব্যবহারিক', color: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30' },
  advanced: { label: 'গভীর অধ্যয়ন', color: 'bg-rose-500/15 text-rose-300 ring-rose-500/30' },
}

export const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

export function toBengaliNumber(num) {
  return String(num)
    .split('')
    .map((d) => (/\d/.test(d) ? BENGALI_DIGITS[Number(d)] : d))
    .join('')
}

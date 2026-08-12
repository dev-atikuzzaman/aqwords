'use client'

export default function Header({ search, onSearch }) {
  return (
    <header className="sticky top-0 z-30 glass border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 pt-3 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl leading-none">📖</span>
            <div>
              <h1 className="font-display text-base font-bold text-parchment-100 leading-tight">
                আল-কুরআন ডিকশনারি
              </h1>
              <p className="font-ui text-[10px] text-gold-400/80 tracking-wide">শব্দ ও আয়াতের ব্যাখ্যা</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-parchment-400 text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="শব্দ, সূরা বা বিষয় খুঁজুন..."
            className="w-full font-body text-sm bg-ink-800/80 text-parchment-100 placeholder-parchment-400/70 rounded-xl pl-10 pr-4 py-2.5 ring-1 ring-white/5 focus:ring-gold-500/40 focus:outline-none transition"
          />
        </div>
      </div>
    </header>
  )
}

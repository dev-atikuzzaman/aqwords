import './globals.css'

export const metadata = {
  title: 'আল-কুরআন ডিকশনারি — শব্দ ও আয়াতের ব্যাখ্যা',
  description:
    'আল-কুরআনের গুরুত্বপূর্ণ শব্দসমূহ ও ৮০/২০ নীতি অনুসারে বাছাইকৃত আয়াতের ব্যাখ্যা, উপমা, বিজ্ঞানের সাথে তুলনা, প্রেক্ষাপট, তাৎপর্য ও হাদিস রেফারেন্সসহ ইনস্টলযোগ্য অফলাইন অভিধান।',
  manifest: '/manifest.json',
  themeColor: '#0F1220',
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/apple-touch-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@500;600;700&family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-900">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('/sw.js').catch(function () {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}

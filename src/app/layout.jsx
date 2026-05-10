import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://emersonalvarado.dev'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Emerson Alvarado | Desarrollador Full Stack React y Node.js',
    template: '%s | Emerson Alvarado',
  },
  description: 'Portfolio de Emerson Alvarado, desarrollador Full Stack en Sicilia especializado en React, Node.js, APIs y productos web escalables.',
  keywords: [
    'Emerson Alvarado',
    'desarrollador full stack',
    'desarrollador React',
    'desarrollador Node.js',
    'portfolio desarrollador web',
    'freelance developer Italy',
    'Sicilia desarrollador web',
  ],
  authors: [{ name: 'Emerson Alvarado' }],
  creator: 'Emerson Alvarado',
  publisher: 'Emerson Alvarado',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Emerson Alvarado | Desarrollador Full Stack React y Node.js',
    description: 'Portfolio profesional de Emerson Alvarado: desarrollo Full Stack, React, Node.js y soluciones web modernas.',
    siteName: 'Emerson Alvarado Portfolio',
    locale: 'es_LA',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Emerson Alvarado, desarrollador Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@emerson_jac083',
    creator: '@emerson_jac083',
    title: 'Emerson Alvarado | Desarrollador Full Stack React y Node.js',
    description: 'Portfolio profesional de Emerson Alvarado: React, Node.js, APIs y productos web escalables.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport = {
  themeColor: '#0f0f13',
  colorScheme: 'dark',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

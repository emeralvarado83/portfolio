import './globals.css'

export const metadata = {
  title: 'Emerson Alvarado | Desarrollador Full Stack',
  description: 'Emerson Alvarado — Desarrollador Full Stack especializado en React, Node.js y soluciones web modernas.',
  keywords: 'desarrollador, full stack, react, node.js, javascript, portfolio, desarrollo web',
  authors: [{ name: 'Emerson Alvarado' }],
  openGraph: {
    type: 'website',
    title: 'Emerson Alvarado | Desarrollador Full Stack',
    description: 'Portfolio profesional de Emerson Alvarado, desarrollador Full Stack con más de 5 años de experiencia.',
    siteName: 'Emerson Alvarado Portfolio',
    locale: 'es_LA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emerson Alvarado | Desarrollador Full Stack',
    description: 'Portfolio profesional de Emerson Alvarado, desarrollador Full Stack con más de 5 años de experiencia.',
  },
  icons: {
    icon: '/favicon.svg',
  },
  other: {
    'theme-color': '#0f0f13',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

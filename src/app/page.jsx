import Portfolio from '@/components/Portfolio'
import MaintenancePage from '@/components/MaintenancePage'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://emersonalvarado.dev'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Emerson Alvarado',
      url: siteUrl,
      email: 'mailto:admin@emersonalvarado.dev',
      jobTitle: 'Desarrollador Full Stack',
      description: 'Desarrollador Full Stack especializado en React, Node.js, APIs y productos web escalables.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sicilia',
        addressCountry: 'IT',
      },
      knowsAbout: ['React', 'Node.js', 'JavaScript', 'APIs', 'Desarrollo web', 'Arquitecturas cloud'],
      sameAs: [
        'https://github.com/emeralvarado83',
        'https://www.linkedin.com/in/emerson-alvarado-2b2384203/',
        'https://x.com/emerson_jac083',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Emerson Alvarado Portfolio',
      inLanguage: ['es', 'en', 'it'],
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: 'Emerson Alvarado - Desarrollo Full Stack',
      url: siteUrl,
      email: 'admin@emersonalvarado.dev',
      areaServed: ['Italia', 'España', 'Latinoamérica', 'Remoto'],
      serviceType: ['Desarrollo web Full Stack', 'Aplicaciones React', 'APIs Node.js', 'Consultoría técnica'],
      founder: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
}

export default function Home() {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return <MaintenancePage />
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Portfolio />
    </>
  )
}

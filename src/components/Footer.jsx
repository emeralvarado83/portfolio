'use client'

import { useLanguage } from '@/context/LanguageContext'
import './Footer.css'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/emeralvarado83',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/emerson-alvarado-2b2384203/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: 'https://x.com/emerson_jac083',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const currentYear = new Date().getFullYear()

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  const footerLinks = [
    { label: f.nav.home, href: '#hero' },
    { label: f.nav.about, href: '#about' },
    { label: f.nav.skills, href: '#skills' },
    { label: f.nav.projects, href: '#projects' },
    { label: f.nav.testimonials, href: '#testimonials' },
    { label: f.nav.contact, href: '#contact' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="footer__logo" href="#hero" onClick={(e) => handleNavClick(e, '#hero')}>
              <span className="footer__logo-bracket">&lt;</span>
              EA
              <span className="footer__logo-bracket">/&gt;</span>
            </a>
            <p className="footer__tagline">
              {f.tagline1}<br />
              {f.tagline2}
            </p>
            <div className="footer__social">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  className="footer__social-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__nav" aria-label="Navegación del pie de página">
            <h4 className="footer__nav-title">{f.nav_title}</h4>
            <ul className="footer__nav-list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a className="footer__nav-link" href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__contact">
            <h4 className="footer__nav-title">{f.contact_title}</h4>
            <div className="footer__contact-items">
              <a className="footer__contact-item" href="mailto:admin@emersonalvarado.dev">
                <span>📧</span>
                admin@emersonalvarado.dev
              </a>
              <span className="footer__contact-item">
                <span>📍</span>
                Sicilia, Italia
              </span>
              <span className="footer__contact-item footer__status">
                <span className="footer__status-dot" />
                {f.available}
              </span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">&copy; {currentYear} Emerson Alvarado.</p>
          <p className="footer__made">
            {f.made}
            <span className="footer__heart" aria-label="amor">❤️</span>
            {f.made_in}
          </p>
          <button className="footer__back-top" onClick={scrollToTop} aria-label="Volver arriba">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {f.back_top}
          </button>
        </div>
      </div>
    </footer>
  )
}

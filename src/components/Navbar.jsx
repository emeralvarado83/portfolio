'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import './Navbar.css'

const LANG_FLAGS = { es: '🇪🇸', en: '🇬🇧', it: '🇮🇹' }

export default function Navbar() {
  const { lang, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const navLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.testimonials, href: '#testimonials' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [t])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a
          className="navbar__logo"
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
        >
          <span className="navbar__logo-bracket">&lt;</span>
          EA
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <nav className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`}>
          <ul className="navbar__list">
            {navLinks.map((link) => (
              <li key={link.href} className="navbar__item">
                <a
                  className={`navbar__link${activeSection === link.href.replace('#', '') ? ' navbar__link--active' : ''}`}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="navbar__cta"
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
          >
            {t.nav.hire}
          </a>
        </nav>

        <div className="navbar__lang">
          {['es', 'en', 'it'].map((l) => (
            <button
              key={l}
              className={`navbar__lang-btn${lang === l ? ' navbar__lang-btn--active' : ''}`}
              onClick={() => setLanguage(l)}
              aria-label={l.toUpperCase()}
              title={l.toUpperCase()}
            >
              {LANG_FLAGS[l]}
            </button>
          ))}
        </div>

        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className="navbar__bar" />
          <span className="navbar__bar" />
          <span className="navbar__bar" />
        </button>
      </div>

      {menuOpen && <div className="navbar__backdrop" onClick={() => setMenuOpen(false)} />}
    </header>
  )
}

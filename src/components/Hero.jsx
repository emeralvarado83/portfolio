'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import './Hero.css'

export default function Hero() {
  const { t } = useLanguage()
  const typingRef = useRef(null)

  useEffect(() => {
    const el = typingRef.current
    if (!el) return

    const titles = t.hero.titles
    let titleIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId

    const type = () => {
      const current = titles[titleIndex]

      if (isDeleting) {
        charIndex--
      } else {
        charIndex++
      }

      el.textContent = current.substring(0, charIndex)

      let delay = isDeleting ? 60 : 100

      if (!isDeleting && charIndex === current.length) {
        delay = 2200
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        titleIndex = (titleIndex + 1) % titles.length
        delay = 400
      }

      timeoutId = setTimeout(type, delay)
    }

    timeoutId = setTimeout(type, 800)
    return () => clearTimeout(timeoutId)
  }, [t.hero.titles])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero__bg-grid" aria-hidden="true" />
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />
      <div className="hero__glow hero__glow--3" aria-hidden="true" />

      <div className="container hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          {t.hero.badge}
        </div>

        <h1 className="hero__name">
          <span className="hero__name-greeting">{t.hero.greeting}</span>
          <span className="hero__name-main hero__name-accent">Emerson Alvarado</span>
        </h1>

        <h2 className="hero__title">
          <span ref={typingRef} className="hero__typing" />
          <span className="hero__cursor" aria-hidden="true" />
        </h2>

        <p className="hero__tagline">
          {t.hero.tagline1}<br />
          {t.hero.tagline2}
        </p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('projects')}>
            {t.hero.cta_projects}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="hero__btn hero__btn--secondary" onClick={() => scrollTo('contact')}>
            {t.hero.cta_contact}
          </button>
        </div>

        <div className="hero__scroll-hint" aria-hidden="true">
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}

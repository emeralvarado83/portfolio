'use client'

import { useLanguage } from '@/context/LanguageContext'
import './About.css'

export default function About() {
  const { t } = useLanguage()

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.about.label}</span>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-desc">{t.about.desc}</p>
        </div>

        <div className="about__grid">
          <div className="about__photo-col">
            <div className="about__photo-wrapper">
              <div className="about__photo-ring" aria-hidden="true" />
              <div className="about__photo">
                <span className="about__photo-initials">EA</span>
              </div>
              <div className="about__photo-badge">
                <span>💻</span>
                <span>Full Stack Dev</span>
              </div>
            </div>
          </div>

          <div className="about__text-col">
            <h3 className="about__greeting">
              {t.about.greeting} <span className="about__accent">Emerson Alvarado</span> 👋
            </h3>
            <p className="about__bio" dangerouslySetInnerHTML={{ __html: t.about.bio1 }} />
            <p className="about__bio" dangerouslySetInnerHTML={{ __html: t.about.bio2 }} />
            <p className="about__bio">{t.about.bio3}</p>

            <div className="about__chips">
              <span className="about__chip">🇻🇪 Puerto Ordaz</span>
              <span className="about__chip">🎓 TSU en Informática</span>
              <span className="about__chip">💼 Freelancer & Contractor</span>
              <span className="about__chip">🌐 Open Source Contributor</span>
            </div>

            <div className="about__actions">
              <a className="about__btn about__btn--primary" href="#contact" onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                {t.about.cta_work}
              </a>
              <div className="about__cv-options" aria-label={t.about.cta_cv}>
                <a className="about__btn about__btn--secondary" href="/Emerson_Alvarado_CV.pdf" download>
                  {t.about.cta_cv_es}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1v8M3 6l4 4 4-4M2 12h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a className="about__btn about__btn--secondary" href="/Emerson_Alvarado_CV_Italiano.pdf" download>
                  {t.about.cta_cv_it}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 1v8M3 6l4 4 4-4M2 12h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

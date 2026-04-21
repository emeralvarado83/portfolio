'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import TestimonialForm from './TestimonialForm'
import './Testimonials.css'

const GRADIENTS = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
  'linear-gradient(135deg, #fd7043, #ff8a65)',
]

function getGradient(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length]
}

function getInitials(name) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

function StarRating({ count }) {
  return (
    <div className="testimonial-stars" aria-label={`${count} / 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="testimonial-star" aria-hidden="true">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setTestimonials(data) })
      .finally(() => setLoading(false))
  }, [])

  const updateScrollState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }

  const scroll = (direction) => {
    const el = trackRef.current
    if (!el) return
    const cardWidth = el.querySelector('.testimonial-card')?.offsetWidth || 320
    el.scrollBy({ left: direction === 'left' ? -(cardWidth + 20) : (cardWidth + 20), behavior: 'smooth' })
    setTimeout(updateScrollState, 400)
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.testimonials.label}</span>
          <h2 className="section-title">{t.testimonials.title}</h2>
          <p className="section-desc">{t.testimonials.desc}</p>
          <button className="testimonials__submit-btn" onClick={() => setShowForm(true)}>
            {t.testimonials.submit_btn}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="testimonials__loading">{t.testimonials.loading}</div>
      ) : testimonials.length === 0 ? (
        <div className="testimonials__empty">{t.testimonials.empty}</div>
      ) : (
        <div className="testimonials__outer">
          <div className="testimonials__track" ref={trackRef} onScroll={updateScrollState}>
            <div className="testimonials__padding" aria-hidden="true" />
            {testimonials.map((t_item) => (
              <article key={t_item.id} className="testimonial-card">
                <div className="testimonial-card__top">
                  <div
                    className="testimonial-card__avatar"
                    style={{ background: getGradient(t_item.name) }}
                    aria-hidden="true"
                  >
                    <span className="testimonial-card__initials">{getInitials(t_item.name)}</span>
                  </div>
                  <div className="testimonial-card__meta">
                    <strong className="testimonial-card__name">{t_item.name}</strong>
                    <span className="testimonial-card__role">{t_item.role} en {t_item.company}</span>
                  </div>
                  <span className="testimonial-card__quote-icon" aria-hidden="true">&ldquo;</span>
                </div>
                <StarRating count={t_item.rating} />
                <blockquote className="testimonial-card__text">&ldquo;{t_item.quote}&rdquo;</blockquote>
              </article>
            ))}
            <div className="testimonials__padding" aria-hidden="true" />
          </div>

          <div className="testimonials__controls">
            <button
              className={`testimonials__btn${!canScrollLeft ? ' testimonials__btn--disabled' : ''}`}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`testimonials__btn${!canScrollRight ? ' testimonials__btn--disabled' : ''}`}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Siguiente"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {showForm && <TestimonialForm onClose={() => setShowForm(false)} />}
    </section>
  )
}

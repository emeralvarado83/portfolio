'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import './Contact.css'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = c.err_name
    if (!formData.email.trim()) {
      errs.email = c.err_email
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = c.err_email_invalid
    }
    if (!formData.message.trim() || formData.message.trim().length < 20) {
      errs.message = c.err_message
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('sending')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || null,
        message: formData.message.trim(),
      }),
    })

    if (!res.ok) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }
    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setTimeout(() => setStatus('idle'), 5000)
  }

  const contactInfo = [
    { label: 'Email', value: 'admin@emersonalvarado.dev', href: 'mailto:admin@emersonalvarado.dev', icon: '📧' },
    { label: 'Ubicación', value: 'Sicilia, Italia', href: null, icon: '📍' },
    { label: c.availability.split(',')[0], value: c.availability, href: null, icon: '🕐' },
  ]

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{c.label}</span>
          <h2 className="section-title">{c.title}</h2>
          <p className="section-desc">{c.desc}</p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <h3 className="contact__info-title">{c.info_title}</h3>
            <p className="contact__info-text">{c.info_text}</p>

            <div className="contact__details">
              {contactInfo.map((item) => (
                <div key={item.label} className="contact__detail">
                  <span className="contact__detail-icon">{item.icon}</span>
                  <div>
                    <span className="contact__detail-label">{item.label}</span>
                    {item.href ? (
                      <a className="contact__detail-value contact__detail-link" href={item.href}>{item.value}</a>
                    ) : (
                      <span className="contact__detail-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact__form-wrapper">
            {status === 'success' ? (
              <div className="contact__success">
                <span className="contact__success-icon">✅</span>
                <h3 className="contact__success-title">{c.success_title}</h3>
                <p className="contact__success-text">{c.success_text}</p>
              </div>
            ) : status === 'error' ? (
              <div className="contact__success">
                <span className="contact__success-icon">❌</span>
                <h3 className="contact__success-title">{c.error_title}</h3>
                <p className="contact__success-text">{c.error_text}</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label className="contact__label" htmlFor="contact-name">{c.name_label}</label>
                    <input
                      id="contact-name"
                      className={`contact__input${errors.name ? ' contact__input--error' : ''}`}
                      type="text" name="name" placeholder={c.name_placeholder}
                      value={formData.name} onChange={handleChange} autoComplete="name"
                    />
                    {errors.name && <span className="contact__error">{errors.name}</span>}
                  </div>
                  <div className="contact__field">
                    <label className="contact__label" htmlFor="contact-email">{c.email_label}</label>
                    <input
                      id="contact-email"
                      className={`contact__input${errors.email ? ' contact__input--error' : ''}`}
                      type="email" name="email" placeholder={c.email_placeholder}
                      value={formData.email} onChange={handleChange} autoComplete="email"
                    />
                    {errors.email && <span className="contact__error">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-subject">{c.subject_label}</label>
                  <input
                    id="contact-subject" className="contact__input" type="text" name="subject"
                    placeholder={c.subject_placeholder} value={formData.subject} onChange={handleChange}
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-message">{c.message_label}</label>
                  <textarea
                    id="contact-message"
                    className={`contact__input contact__textarea${errors.message ? ' contact__input--error' : ''}`}
                    name="message" placeholder={c.message_placeholder}
                    value={formData.message} onChange={handleChange} rows={5}
                  />
                  {errors.message && <span className="contact__error">{errors.message}</span>}
                </div>

                <button
                  className={`contact__submit${status === 'sending' ? ' contact__submit--loading' : ''}`}
                  type="submit" disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <><span className="contact__spinner" aria-hidden="true" />{c.sending}</>
                  ) : (
                    <>
                      {c.submit}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M1 8h14M9 3l6 5-6 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

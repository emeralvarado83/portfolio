'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import './TestimonialForm.css'

const EMPTY = { name: '', role: '', company: '', quote: '', rating: 5 }

export default function TestimonialForm({ onClose }) {
  const { t } = useLanguage()
  const f = t.testimonialForm
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = f.err_name
    if (!form.role.trim()) e.role = f.err_role
    if (!form.company.trim()) e.company = f.err_company
    if (!form.quote.trim()) e.quote = f.err_quote
    else if (form.quote.trim().length < 20) e.quote = f.err_quote_len
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    setStatus('loading')
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        role: form.role.trim(),
        company: form.company.trim(),
        quote: form.quote.trim(),
        rating: form.rating,
      }),
    })

    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="tform-overlay" onClick={onClose}>
        <div className="tform" onClick={(e) => e.stopPropagation()}>
          <div className="tform__success">
            <span className="tform__success-icon">✅</span>
            <h3>{f.success_title}</h3>
            <p>{f.success_text}</p>
            <button className="tform__btn-primary" onClick={onClose}>{f.close}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tform-overlay" onClick={onClose}>
      <div className="tform" onClick={(e) => e.stopPropagation()}>
        <div className="tform__header">
          <h3 className="tform__title">{f.title}</h3>
          <button className="tform__close" onClick={onClose} aria-label={f.close}>✕</button>
        </div>

        <form className="tform__body" onSubmit={handleSubmit} noValidate>
          <div className="tform__row">
            <div className="tform__field">
              <label className="tform__label" htmlFor="tf-name">{f.name}</label>
              <input
                id="tf-name"
                className={`tform__input${errors.name ? ' tform__input--error' : ''}`}
                type="text" name="name" value={form.name} onChange={handleChange}
                placeholder={f.name_placeholder} autoComplete="name"
              />
              {errors.name && <span className="tform__error">{errors.name}</span>}
            </div>
            <div className="tform__field">
              <label className="tform__label" htmlFor="tf-role">{f.role}</label>
              <input
                id="tf-role"
                className={`tform__input${errors.role ? ' tform__input--error' : ''}`}
                type="text" name="role" value={form.role} onChange={handleChange}
                placeholder={f.role_placeholder}
              />
              {errors.role && <span className="tform__error">{errors.role}</span>}
            </div>
          </div>

          <div className="tform__field">
            <label className="tform__label" htmlFor="tf-company">{f.company}</label>
            <input
              id="tf-company"
              className={`tform__input${errors.company ? ' tform__input--error' : ''}`}
              type="text" name="company" value={form.company} onChange={handleChange}
              placeholder={f.company_placeholder}
            />
            {errors.company && <span className="tform__error">{errors.company}</span>}
          </div>

          <div className="tform__field">
            <label className="tform__label">{f.rating}</label>
            <div className="tform__stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n} type="button"
                  className={`tform__star${n <= form.rating ? ' tform__star--active' : ''}`}
                  onClick={() => setForm((p) => ({ ...p, rating: n }))}
                  aria-label={`${n}`}
                >★</button>
              ))}
            </div>
          </div>

          <div className="tform__field">
            <label className="tform__label" htmlFor="tf-quote">{f.quote}</label>
            <textarea
              id="tf-quote"
              className={`tform__textarea${errors.quote ? ' tform__input--error' : ''}`}
              name="quote" value={form.quote} onChange={handleChange}
              placeholder={f.quote_placeholder} rows={4}
            />
            {errors.quote && <span className="tform__error">{errors.quote}</span>}
          </div>

          {status === 'error' && <p className="tform__submit-error">{f.error}</p>}

          <div className="tform__actions">
            <button type="button" className="tform__btn-secondary" onClick={onClose}>
              {f.cancel}
            </button>
            <button type="submit" className="tform__btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? f.sending : f.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

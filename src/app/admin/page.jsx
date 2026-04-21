'use client'

import { useState, useEffect } from 'react'
import { ProjectCard } from '@/components/Projects'
import './admin.css'

const GRADIENT_PRESETS = [
  { label: 'Rojo',     value: 'linear-gradient(135deg, #2a0d0d 0%, #1a0808 50%, #3a1010 100%)' },
  { label: 'Azul',     value: 'linear-gradient(135deg, #1a2a4a 0%, #0d2137 50%, #1e3a5f 100%)' },
  { label: 'Púrpura',  value: 'linear-gradient(135deg, #1a0d2a 0%, #110820 50%, #221040 100%)' },
  { label: 'Verde',    value: 'linear-gradient(135deg, #0d2a1a 0%, #081a0d 50%, #10401a 100%)' },
  { label: 'Naranja',  value: 'linear-gradient(135deg, #2a1a0d 0%, #1a0d08 50%, #3a2010 100%)' },
  { label: 'Teal',     value: 'linear-gradient(135deg, #0d2a2a 0%, #081a1a 50%, #10403a 100%)' },
  { label: 'Rosa',     value: 'linear-gradient(135deg, #2a0d1a 0%, #1a0812 50%, #3a1025 100%)' },
  { label: 'Índigo',   value: 'linear-gradient(135deg, #0d1a2a 0%, #080d1a 50%, #101a3a 100%)' },
]

const EMPTY_PROJECT_FORM = {
  title: '',
  description: '',
  image_emoji: '🚀',
  image_gradient: GRADIENT_PRESETS[2].value,
  tags: '',
  github: '',
  live: '',
  featured: false,
  status: 'Producción',
  sort_order: 0,
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) setError('Credenciales incorrectas.')
      else onLogin()
    } catch {
      setError('Credenciales incorrectas.')
    }
    setLoading(false)
  }

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <div className="admin-login__logo">
          <span className="admin-login__bracket">&lt;</span>EA<span className="admin-login__bracket">/&gt;</span>
        </div>
        <h1 className="admin-login__title">Panel de administración</h1>
        <p className="admin-login__subtitle">Accede con tu cuenta</p>
        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-field">
            <label className="admin-label" htmlFor="email">Email</label>
            <input id="email" className="admin-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@email.com" required autoComplete="email" />
          </div>
          <div className="admin-field">
            <label className="admin-label" htmlFor="password">Contraseña</label>
            <input id="password" className="admin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button className="admin-btn-primary" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Testimonios ─────────────────────────────────────────────────────────────

function TestimonialRow({ t, onUpdate }) {
  const [loading, setLoading] = useState(false)

  const updateStatus = async (status) => {
    setLoading(true)
    const res = await fetch('/api/testimonials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: t.id, status }),
    })
    if (res.ok) onUpdate(t.id, status)
    setLoading(false)
  }

  return (
    <div className={`admin-card admin-card--${t.status}`}>
      <div className="admin-card__head">
        <div className="admin-card__info">
          <strong className="admin-card__name">{t.name}</strong>
          <span className="admin-card__role">{t.role} en {t.company}</span>
          <span className="admin-card__date">
            {new Date(t.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div className="admin-card__rating">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
        <span className={`admin-card__badge admin-card__badge--${t.status}`}>
          {{ pending: 'Pendiente', approved: 'Aprobado', rejected: 'Rechazado' }[t.status]}
        </span>
      </div>
      <blockquote className="admin-card__quote">"{t.quote}"</blockquote>
      <div className="admin-card__actions">
        {t.status !== 'approved' && <button className="admin-btn-approve" onClick={() => updateStatus('approved')} disabled={loading}>✓ Aprobar</button>}
        {t.status !== 'rejected' && <button className="admin-btn-reject" onClick={() => updateStatus('rejected')} disabled={loading}>✕ Rechazar</button>}
        {t.status !== 'pending' && <button className="admin-btn-pending" onClick={() => updateStatus('pending')} disabled={loading}>↩ Pendiente</button>}
      </div>
    </div>
  )
}

// ─── Mensajes ─────────────────────────────────────────────────────────────────

function MessageRow({ msg, onToggleRead }) {
  const [loading, setLoading] = useState(false)

  const toggleRead = async () => {
    setLoading(true)
    const res = await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: msg.id, read: !msg.read }),
    })
    if (res.ok) onToggleRead(msg.id, !msg.read)
    setLoading(false)
  }

  return (
    <div className={`admin-card ${msg.read ? 'admin-card--approved' : 'admin-card--pending'}`}>
      <div className="admin-card__head">
        <div className="admin-card__info">
          <strong className="admin-card__name">{msg.name}</strong>
          <span className="admin-card__role">{msg.email}</span>
          <span className="admin-card__date">
            {new Date(msg.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <span className={`admin-card__badge ${msg.read ? 'admin-card__badge--approved' : 'admin-card__badge--pending'}`}>
          {msg.read ? 'Leído' : 'No leído'}
        </span>
      </div>
      {msg.subject && <p className="admin-msg__subject">{msg.subject}</p>}
      <p className="admin-card__quote">{msg.message}</p>
      <div className="admin-card__actions">
        <a className="admin-btn-reply" href={`mailto:${msg.email}`}>✉ Responder</a>
        <button className={msg.read ? 'admin-btn-pending' : 'admin-btn-approve'} onClick={toggleRead} disabled={loading}>
          {msg.read ? '↩ Marcar no leído' : '✓ Marcar leído'}
        </button>
      </div>
    </div>
  )
}

// ─── Proyectos ────────────────────────────────────────────────────────────────

function ProjectAdminRow({ project, onEdit, onDelete, deleting }) {
  return (
    <div className="admin-card admin-card--pending">
      <div className="admin-card__head">
        <div className="admin-project-thumb" style={{ background: project.image_gradient }}>
          <span>{project.image_emoji}</span>
        </div>
        <div className="admin-card__info">
          <strong className="admin-card__name">{project.title}</strong>
          <div className="admin-project-tags">
            {project.tags.map((t) => <span key={t} className="admin-project-tag">{t}</span>)}
          </div>
        </div>
        <span className={`admin-card__badge admin-card__badge--${project.status === 'Producción' ? 'approved' : 'pending'}`}>
          {project.status}
        </span>
        {project.featured && (
          <span className="admin-card__badge admin-card__badge--pending">⭐ Dest.</span>
        )}
      </div>
      <div className="admin-card__actions">
        <button className="admin-btn-approve" onClick={onEdit}>✏ Editar</button>
        <button className="admin-btn-reject" onClick={onDelete} disabled={deleting}>
          {deleting ? '...' : '✕ Eliminar'}
        </button>
      </div>
    </div>
  )
}

function ProjectForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial)
  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }))

  const previewProject = {
    ...form,
    tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
  }

  return (
    <div className="admin-project-form">
      <div className="admin-project-form__cols">
        <div className="admin-project-form__fields">
          <div className="admin-field">
            <label className="admin-label">Título *</label>
            <input className="admin-input" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Nombre del proyecto" />
          </div>

          <div className="admin-field">
            <label className="admin-label">Descripción *</label>
            <textarea className="admin-input admin-textarea" value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Descripción breve del proyecto..." rows={3} />
          </div>

          <div className="admin-form-row">
            <div className="admin-field">
              <label className="admin-label">Emoji</label>
              <input className="admin-input admin-input--emoji" value={form.image_emoji} onChange={(e) => set('image_emoji', e.target.value)} placeholder="🚀" maxLength={4} />
            </div>
            <div className="admin-field" style={{ flex: 1 }}>
              <label className="admin-label">Estado</label>
              <select className="admin-input" value={form.status} onChange={(e) => set('status', e.target.value)}>
                <option>Producción</option>
                <option>Open Source</option>
                <option>Beta</option>
              </select>
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-label">Color de fondo</label>
            <div className="admin-gradient-picker">
              {GRADIENT_PRESETS.map((g) => (
                <button
                  key={g.label}
                  type="button"
                  className={`admin-gradient-swatch${form.image_gradient === g.value ? ' admin-gradient-swatch--active' : ''}`}
                  style={{ background: g.value }}
                  title={g.label}
                  onClick={() => set('image_gradient', g.value)}
                />
              ))}
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-label">Tecnologías (separadas por coma)</label>
            <input className="admin-input" value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="React, TypeScript, Supabase" />
          </div>

          <div className="admin-form-row">
            <div className="admin-field" style={{ flex: 1 }}>
              <label className="admin-label">URL GitHub</label>
              <input className="admin-input" value={form.github} onChange={(e) => set('github', e.target.value)} placeholder="https://github.com/..." type="url" />
            </div>
            <div className="admin-field" style={{ flex: 1 }}>
              <label className="admin-label">URL Live</label>
              <input className="admin-input" value={form.live} onChange={(e) => set('live', e.target.value)} placeholder="https://..." type="url" />
            </div>
          </div>

          <div className="admin-form-row">
            <label className="admin-check">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
              Destacado
            </label>
            <div className="admin-field" style={{ width: 110 }}>
              <label className="admin-label">Orden</label>
              <input className="admin-input" type="number" value={form.sort_order} onChange={(e) => set('sort_order', e.target.value)} min={0} />
            </div>
          </div>

          <div className="admin-card__actions" style={{ marginTop: '0.5rem' }}>
            <button className="admin-btn-approve" onClick={() => onSave(form)} disabled={saving || !form.title.trim() || !form.description.trim()}>
              {saving ? 'Guardando...' : '✓ Guardar proyecto'}
            </button>
            <button className="admin-btn-pending" onClick={onCancel} disabled={saving}>
              Cancelar
            </button>
          </div>
        </div>

        <div className="admin-project-preview">
          <p className="admin-label" style={{ marginBottom: '0.75rem' }}>Vista previa</p>
          <ProjectCard project={previewProject} />
        </div>
      </div>
    </div>
  )
}

function ProjectsSection({ projects, setProjects }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formInitial, setFormInitial] = useState(EMPTY_PROJECT_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const openNew = () => {
    setEditingId(null)
    setFormInitial(EMPTY_PROJECT_FORM)
    setShowForm(true)
  }

  const openEdit = (project) => {
    setEditingId(project.id)
    setFormInitial({ ...project, tags: project.tags.join(', '), github: project.github ?? '', live: project.live ?? '' })
    setShowForm(true)
  }

  const handleSave = async (form) => {
    setSaving(true)
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      image_emoji: form.image_emoji.trim() || '🚀',
      image_gradient: form.image_gradient,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      github: form.github.trim() || null,
      live: form.live.trim() || null,
      featured: form.featured,
      status: form.status,
      sort_order: Number(form.sort_order) || 0,
    }

    if (editingId) {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...payload }),
      })
      if (res.ok) {
        const data = await res.json()
        setProjects((prev) => prev.map((p) => (p.id === editingId ? data : p)))
      }
    } else {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const data = await res.json()
        setProjects((prev) => [...prev, data].sort((a, b) => a.sort_order - b.sort_order))
      }
    }

    setSaving(false)
    setShowForm(false)
    setEditingId(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este proyecto?')) return
    setDeletingId(id)
    const res = await fetch('/api/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== id))
    setDeletingId(null)
  }

  return (
    <>
      <div className="admin-projects-header">
        <span className="admin-label">{projects.length} proyecto{projects.length !== 1 ? 's' : ''}</span>
        {!showForm && (
          <button className="admin-btn-approve" onClick={openNew}>+ Nuevo proyecto</button>
        )}
      </div>

      {showForm && (
        <ProjectForm
          key={editingId ?? 'new'}
          initial={formInitial}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingId(null) }}
          saving={saving}
        />
      )}

      {projects.length === 0 && !showForm ? (
        <div className="admin-empty">No hay proyectos. ¡Agrega el primero!</div>
      ) : (
        <div className="admin-list">
          {projects.map((p) => (
            <ProjectAdminRow
              key={p.id}
              project={p}
              onEdit={() => openEdit(p)}
              onDelete={() => handleDelete(p.id)}
              deleting={deletingId === p.id}
            />
          ))}
        </div>
      )}
    </>
  )
}

// ─── AdminPage ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [section, setSection] = useState('testimonios')

  const [testimonials, setTestimonials] = useState([])
  const [filter, setFilter] = useState('pending')

  const [messages, setMessages] = useState([])
  const [msgFilter, setMsgFilter] = useState('unread')

  const [projects, setProjects] = useState([])

  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setSession(data)
        setCheckingAuth(false)
      })
      .catch(() => setCheckingAuth(false))
  }, [])

  useEffect(() => {
    if (!session) return
    async function fetchAll() {
      setLoadingData(true)
      const [tRes, mRes, pRes] = await Promise.all([
        fetch('/api/testimonials?all=true'),
        fetch('/api/contact'),
        fetch('/api/projects'),
      ])
      const [tData, mData, pData] = await Promise.all([
        tRes.ok ? tRes.json() : [],
        mRes.ok ? mRes.json() : [],
        pRes.ok ? pRes.json() : [],
      ])
      if (tData) setTestimonials(tData)
      if (mData) setMessages(mData)
      if (pData) setProjects(pData)
      setLoadingData(false)
    }
    fetchAll()
  }, [session])

  const handleTestimonialUpdate = (id, newStatus) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)))
  }

  const handleToggleRead = (id, newRead) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: newRead } : m)))
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setSession(null)
  }

  if (checkingAuth) return <div className="admin-loading">Cargando...</div>
  if (!session) return <LoginForm onLogin={() => {
    fetch('/api/auth/session')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setSession(data))
  }} />

  const testimonialCounts = {
    pending: testimonials.filter((t) => t.status === 'pending').length,
    approved: testimonials.filter((t) => t.status === 'approved').length,
    rejected: testimonials.filter((t) => t.status === 'rejected').length,
  }
  const filteredTestimonials = testimonials.filter((t) => t.status === filter)

  const unreadMessages = messages.filter((m) => !m.read)
  const readMessages = messages.filter((m) => m.read)
  const filteredMessages = msgFilter === 'unread' ? unreadMessages : readMessages

  return (
    <div className="admin-page">
      <header className="admin-header">
        <a className="admin-header__logo" href="/">
          <span className="admin-login__bracket">&lt;</span>EA<span className="admin-login__bracket">/&gt;</span>
        </a>
        <nav className="admin-section-nav">
          <button
            className={`admin-section-btn${section === 'testimonios' ? ' admin-section-btn--active' : ''}`}
            onClick={() => setSection('testimonios')}
          >
            Testimonios
            <span className="admin-tab__count">{testimonials.length}</span>
          </button>
          <button
            className={`admin-section-btn${section === 'mensajes' ? ' admin-section-btn--active' : ''}`}
            onClick={() => setSection('mensajes')}
          >
            Mensajes
            {unreadMessages.length > 0 && (
              <span className="admin-tab__count admin-tab__count--alert">{unreadMessages.length}</span>
            )}
          </button>
          <button
            className={`admin-section-btn${section === 'proyectos' ? ' admin-section-btn--active' : ''}`}
            onClick={() => setSection('proyectos')}
          >
            Proyectos
            <span className="admin-tab__count">{projects.length}</span>
          </button>
        </nav>
        <button className="admin-btn-logout" onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <main className="admin-main">
        {section === 'testimonios' && (
          <>
            <div className="admin-tabs">
              {[
                { key: 'pending', label: 'Pendientes' },
                { key: 'approved', label: 'Aprobados' },
                { key: 'rejected', label: 'Rechazados' },
              ].map(({ key, label }) => (
                <button key={key} className={`admin-tab${filter === key ? ' admin-tab--active' : ''}`} onClick={() => setFilter(key)}>
                  {label}
                  <span className="admin-tab__count">{testimonialCounts[key]}</span>
                </button>
              ))}
            </div>
            {loadingData ? (
              <div className="admin-loading">Cargando testimonios...</div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="admin-empty">No hay testimonios en esta categoría.</div>
            ) : (
              <div className="admin-list">
                {filteredTestimonials.map((t) => (
                  <TestimonialRow key={t.id} t={t} onUpdate={handleTestimonialUpdate} />
                ))}
              </div>
            )}
          </>
        )}

        {section === 'mensajes' && (
          <>
            <div className="admin-tabs">
              <button className={`admin-tab${msgFilter === 'unread' ? ' admin-tab--active' : ''}`} onClick={() => setMsgFilter('unread')}>
                No leídos
                <span className="admin-tab__count">{unreadMessages.length}</span>
              </button>
              <button className={`admin-tab${msgFilter === 'read' ? ' admin-tab--active' : ''}`} onClick={() => setMsgFilter('read')}>
                Leídos
                <span className="admin-tab__count">{readMessages.length}</span>
              </button>
            </div>
            {loadingData ? (
              <div className="admin-loading">Cargando mensajes...</div>
            ) : filteredMessages.length === 0 ? (
              <div className="admin-empty">No hay mensajes en esta categoría.</div>
            ) : (
              <div className="admin-list">
                {filteredMessages.map((msg) => (
                  <MessageRow key={msg.id} msg={msg} onToggleRead={handleToggleRead} />
                ))}
              </div>
            )}
          </>
        )}

        {section === 'proyectos' && (
          loadingData ? (
            <div className="admin-loading">Cargando proyectos...</div>
          ) : (
            <ProjectsSection projects={projects} setProjects={setProjects} />
          )
        )}
      </main>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import './Projects.css'

const statusColors = {
  Producción: { bg: 'rgba(74, 222, 128, 0.12)', color: '#4ade80', border: 'rgba(74, 222, 128, 0.25)' },
  'Open Source': { bg: 'rgba(79, 156, 249, 0.12)', color: 'var(--accent)', border: 'rgba(79, 156, 249, 0.25)' },
  Beta: { bg: 'rgba(251, 191, 36, 0.12)', color: '#fbbf24', border: 'rgba(251, 191, 36, 0.25)' },
}

export function ProjectCard({ project }) {
  const statusStyle = statusColors[project.status] || statusColors['Beta']

  return (
    <article className={`project-card${project.featured ? ' project-card--featured' : ''}`}>
      <div
        className="project-card__image"
        style={{ background: project.image_gradient }}
        aria-hidden="true"
      >
        <span className="project-card__emoji">{project.image_emoji}</span>
        {project.featured && (
          <span className="project-card__featured-badge">⭐ Destacado</span>
        )}
        <span
          className="project-card__status"
          style={{ background: statusStyle.bg, color: statusStyle.color, borderColor: statusStyle.border }}
        >
          {project.status}
        </span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>

        <div className="project-card__links">
          {project.github && (
            <a
              className="project-card__link project-card__link--github"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              {project._t?.code || 'Código'}
            </a>
          )}
          {project.live && (
            <a
              className="project-card__link project-card__link--live"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {project._t?.visit || 'Visitar'}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setProjects(data) })
  }, [])

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.projects.label}</span>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-desc">{t.projects.desc}</p>
        </div>

        {projects.length > 0 && (
          <div className="projects__grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={{ ...project, _t: t.projects }} />
            ))}
          </div>
        )}

        <div className="projects__more">
          <a
            className="projects__more-btn"
            href="https://github.com/emeralvarado83"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            {t.projects.more}
          </a>
        </div>
      </div>
    </section>
  )
}

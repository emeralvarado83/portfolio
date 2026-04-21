'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import './Skills.css'

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: '⚛️', level: 85 },
      { name: 'JavaScript', icon: '🟨', level: 90 },
      { name: 'TypeScript', icon: '🔷', level: 80 },
      { name: 'HTML5 / CSS3', icon: '🎨', level: 97 },
      { name: 'Next.js', icon: '▲', level: 80 },
      { name: 'Vite', icon: '⚡', level: 90 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 78 },
      { name: 'Express', icon: '🚂', level: 75 },
      { name: 'PostgreSQL', icon: '🐘', level: 80 },
      { name: 'MySQL', icon: '🐬', level: 80 },
    ],
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { name: 'Git & GitHub', icon: '🐙', level: 94 },
      { name: 'Figma', icon: '🖌️', level: 68 },
    ],
  },
]

function SkillCard({ name, icon, level }) {
  const [animated, setAnimated] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="skill-card" ref={cardRef}>
      <div className="skill-card__header">
        <span className="skill-card__icon" role="img" aria-label={name}>{icon}</span>
        <span className="skill-card__name">{name}</span>
        <span className="skill-card__level">{level}%</span>
      </div>
      <div className="skill-card__bar-bg">
        <div className="skill-card__bar-fill" style={{ width: animated ? `${level}%` : '0%' }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.skills.label}</span>
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-desc">{t.skills.desc}</p>
        </div>

        <div className="skills__categories">
          {skillCategories.map((cat) => (
            <div key={cat.category} className="skills__category">
              <h3 className="skills__category-title">{cat.category}</h3>
              <div className="skills__grid">
                {cat.skills.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

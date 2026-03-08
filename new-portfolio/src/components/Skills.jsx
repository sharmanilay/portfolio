import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'React', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js', color: '#000000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
      { name: 'Vue.js', color: '#4FC08D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
      { name: 'TypeScript', color: '#3178C6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'React Query', color: '#FF4154', icon: null, customSvg: 'reactquery' },
      { name: 'Tailwind CSS', color: '#06B6D4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Zustand', color: '#6D4C41', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg' },
    ]
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', color: '#000000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', themeAware: true, darkModeColor: '#FFFFFF' },
      { name: 'Go', color: '#00ADD8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg' },
      { name: 'Ruby on Rails', color: '#CC0000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rails/rails-original-wordmark.svg' },
      { name: 'Python', color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'FastAPI', color: '#009688', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'Redis', color: '#DC382D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
      { name: 'Docker', color: '#2496ED', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    ]
  },
  {
    title: 'Database & Cloud',
    icon: '☁️',
    skills: [
      { name: 'PostgreSQL', color: '#4169E1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', color: '#47A248', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'Firebase', color: '#FFCA28', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
      { name: 'Supabase', color: '#3ECF8E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
      { name: 'Convex', color: '#FF4154', icon: null, customSvg: 'convex' },
      { name: 'Google Cloud', color: '#4285F4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
      { name: 'GitHub Actions', color: '#2088FF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' },
    ]
  },
  {
    title: 'Tools & Product',
    icon: '🛠️',
    skills: [
      { name: 'Git', color: '#F05032', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'Playwright', color: '#2EAD33', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg' },
      { name: 'Cursor', color: '#00B4EF', icon: null, customSvg: 'cursor' },
      { name: 'OpenCode', color: '#211E1E', icon: null, customSvg: 'opencode' },
      { name: 'Grafana', color: '#F05A28', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg' },
      { name: 'Prometheus', color: '#E6522C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg' },
      { name: 'Postman', color: '#FF6C37', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
      { name: 'Claude Code', color: '#D77655', icon: null, customSvg: 'claude-code' },
    ]
  }
]

function Skills({ pill = 'red' }) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className={`skills section ${isVisible ? 'skills--visible' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="skills__header">
          <span className="skills__label">Skills & Expertise</span>
          <h2 className="skills__title">
            My <span className="gradient-text">Tech Arsenal</span>
          </h2>
          <p className="skills__subtitle">
            Technologies I've mastered building production-grade products
          </p>
        </div>

        <div className="skills__tabs">
          {skillCategories.map((category, index) => (
            <button
              key={category.title}
              className={`skills__tab ${activeCategory === index ? 'skills__tab--active' : ''}`}
              onClick={() => setActiveCategory(index)}
            >
              <span className="skills__tab-icon">{category.icon}</span>
              <span className="skills__tab-text">{category.title}</span>
            </button>
          ))}
        </div>

        <div className="skills__content">
          <div className="skills__grid">
            {skillCategories[activeCategory].skills.map((skill, index) => {
              let shadowColor = skill.color
              let filterStyle = `drop-shadow(0 0 8px ${shadowColor}40)`
              
              if (skill.themeAware) {
                const themeColor = pill === 'red' ? (skill.darkModeColor || '#FFFFFF') : '#333333'
                shadowColor = themeColor
                // Apply invert filter for Express.js in dark mode to make it white
                if (pill === 'red') {
                  filterStyle = `invert(1) drop-shadow(0 0 8px ${themeColor}40)`
                } else {
                  filterStyle = `drop-shadow(0 0 8px ${themeColor}40)`
                }
              }
              
              return (
                <div
                  key={skill.name}
                  className="skills__item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="skills__item-icon">
                    {skill.customSvg ? (
                      <img 
                        src={`/${skill.customSvg}.svg`} 
                        alt={skill.name}
                        style={{ 
                          filter: `drop-shadow(0 0 8px ${shadowColor}40)`,
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                      />
                    ) : (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        style={{ 
                          filter: filterStyle
                        }}
                      />
                    )}
                  </div>
                  <span className="skills__item-name">{skill.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="skills__additional">
          <h3 className="skills__additional-title">Also work with</h3>
          <div className="skills__tags">
            {['Nuxt.js', 'Redux', 'Vuex', 'Material-UI', 'Shadcn',
              'Firebase', 'Gemini API', 'OpenAI', 'Swift', 'Model Context Protocol'].map((tag) => (
                <span key={tag} className="skills__tag">{tag}</span>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

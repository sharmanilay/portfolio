import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', color: '#61DAFB', icon: '⚛️' },
      { name: 'Next.js', color: '#000000', icon: '▲' },
      { name: 'Vue.js', color: '#4FC08D', icon: '💚' },
      { name: 'TypeScript', color: '#3178C6', icon: 'TS' },
      { name: 'React Query', color: '#FF4154', icon: '🔄' },
      { name: 'Tailwind CSS', color: '#06B6D4', icon: '🎨' },
    ]
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', color: '#339933', icon: '📦' },
      { name: 'Express.js', color: '#000000', icon: '🚀' },
      { name: 'Go', color: '#00ADD8', icon: '🐹' },
      { name: 'Ruby on Rails', color: '#CC0000', icon: '💎' },
      { name: 'Python', color: '#3776AB', icon: '🐍' },
      { name: 'REST APIs', color: '#5D4FEB', icon: '🔌' },
    ]
  },
  {
    title: 'Database & Cloud',
    icon: '☁️',
    skills: [
      { name: 'PostgreSQL', color: '#4169E1', icon: '🐘' },
      { name: 'MongoDB', color: '#47A248', icon: '🍃' },
      { name: 'MySQL', color: '#4479A1', icon: '🗄️' },
      { name: 'BigQuery', color: '#669DF6', icon: '📊' },
      { name: 'Google Cloud', color: '#4285F4', icon: '☁️' },
      { name: 'Supabase', color: '#3ECF8E', icon: '🔐' },
    ]
  },
  {
    title: 'Tools & Product',
    icon: '🛠️',
    skills: [
      { name: 'Git/GitHub', color: '#F05032', icon: '🐙' },
      { name: 'CI/CD', color: '#2088FF', icon: '⚡' },
      { name: 'Docker', color: '#2496ED', icon: '🐳' },
      { name: 'Cursor', color: '#00B4EF', icon: '✨' },
      { name: 'OpenCode', color: '#007ACC', icon: '📝' },
      { name: 'React Native', color: '#61DAFB', icon: '📱' },
    ]
  }
]

function Skills() {
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
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skills__item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skills__item-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <span className="skills__item-name">{skill.name}</span>
              </div>
            ))}
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

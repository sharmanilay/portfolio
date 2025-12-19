import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 95, color: '#61DAFB' },
      { name: 'Next.js', level: 92, color: '#000000' },
      { name: 'Vue.js', level: 88, color: '#4FC08D' },
      { name: 'TypeScript', level: 90, color: '#3178C6' },
      { name: 'React Query', level: 85, color: '#FF4154' },
      { name: 'Tailwind CSS', level: 92, color: '#06B6D4' },
    ]
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 92, color: '#339933' },
      { name: 'Express.js', level: 90, color: '#000000' },
      { name: 'GraphQL', level: 85, color: '#E10098' },
      { name: 'Ruby on Rails', level: 78, color: '#CC0000' },
      { name: 'Python', level: 80, color: '#3776AB' },
      { name: 'REST APIs', level: 95, color: '#5D4FEB' },
    ]
  },
  {
    title: 'Database & Cloud',
    icon: '☁️',
    skills: [
      { name: 'PostgreSQL', level: 88, color: '#4169E1' },
      { name: 'MongoDB', level: 85, color: '#47A248' },
      { name: 'MySQL', level: 82, color: '#4479A1' },
      { name: 'BigQuery', level: 75, color: '#669DF6' },
      { name: 'Google Cloud', level: 82, color: '#4285F4' },
      { name: 'Supabase', level: 85, color: '#3ECF8E' },
    ]
  },
  {
    title: 'Tools & Product',
    icon: '🛠️',
    skills: [
      { name: 'Git/GitHub', level: 95, color: '#F05032' },
      { name: 'CI/CD', level: 85, color: '#2088FF' },
      { name: 'Stripe/Polar', level: 80, color: '#635BFF' },
      { name: 'Clerk Auth', level: 82, color: '#6C47FF' },
      { name: 'Postman', level: 88, color: '#FF6C37' },
      { name: 'React Native', level: 78, color: '#61DAFB' },
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
                <div className="skills__item-header">
                  <span className="skills__item-name">{skill.name}</span>
                  <span className="skills__item-level">{skill.level}%</span>
                </div>
                <div className="skills__bar">
                  <div 
                    className="skills__bar-fill"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      background: skill.color,
                      boxShadow: `0 0 20px ${skill.color}40`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills__additional">
          <h3 className="skills__additional-title">Also work with</h3>
          <div className="skills__tags">
            {['Nuxt.js', 'SCSS', 'Redux', 'Vuex', 'Material-UI', 'Shadcn', 
              'Docker', 'Firebase', 'Gemini API', 'OpenAI', 'Swift', 'Model Context Protocol'].map((tag) => (
              <span key={tag} className="skills__tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

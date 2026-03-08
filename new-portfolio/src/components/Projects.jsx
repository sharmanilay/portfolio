import { useEffect, useRef, useState } from 'react'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Jobestry',
    description: 'Open Source Chrome Extension that generates customized resumes and cover letters for different job postings. Tailor your application in seconds.',
    image: '/images/jobestry.png',
    tech: ['Chrome Extension', 'React', 'OpenAI', 'Tailwind'],
    link: null,
    github: 'https://github.com/sharmanilay/jobestry',
    featured: true,
    isOpenSource: true,
    year: '2025',
  },
  {
    id: 2,
    title: 'Hype My Hustle',
    description: 'Your all-in-one AI co-pilot for building in public. Get personalized roadmaps, daily tasks, and content ideas. Go from idea to MVP with audience in 2 weeks.',
    image: '/images/hypemyhustle.png',
    tech: ['Next.js', 'Supabase', 'OpenAI', 'Tailwind', 'Stripe'],
    link: 'https://hypemyhustle.com',
    github: null,
    featured: true,
    company: 'Digital Prysm Labs',
  },
  {
    id: 3,
    title: 'Promptery',
    description: 'Spotlight for your prompts. Save complex prompts with a keystroke, access them from anywhere with Spotlight-like speed. Perfect for writers, developers, and creators.',
    image: '/images/promptery.png',
    tech: ['macOS', 'Swift', 'Node.js', 'Polar'],
    link: 'https://promptery.app',
    github: null,
    featured: true,
    company: 'Digital Prysm Labs',
  },
  {
    id: 4,
    title: 'HypeShelf',
    description: 'Open Source content curation platform that helps creators discover, organize, and share inspiration across platforms. Turn bookmarks into actionable content.',
    image: '/images/hypeshelf.png',
    tech: ['Next.js', 'Convex', 'Clerk', 'Tailwind'],
    link: 'https://hypeshelfpro.vercel.app',
    github: 'https://github.com/sharmanilay/hypeshelf',
    featured: true,
    isOpenSource: true,
    year: '2024',
  },
  {
    id: 5,
    title: 'Focus Pro',
    description: 'Chrome Extension for focus sessions — Block distracting websites and have custom pomodoro sessions. Simple interface: "I want to focus on [task]".',
    image: '/images/focuspro.png',
    tech: ['React', 'JavaScript', 'Vite', 'Chrome APIs'],
    link: null,
    github: null,
    featured: true,
    year: '2025',
  },
  {
    id: 6,
    title: 'Whiskers',
    description: 'Dictation Assistant — Dictate content that gets cleaned and structured using AI. Replacing typing with voice for emails, docs, journaling.',
    image: '/images/whiskers.png',
    tech: ['Swift', 'Speech-to-Text', 'OpenAI Whisper', 'Gemini API'],
    link: null,
    github: null,
    featured: false,
    year: '2025',
  },
  {
    id: 7,
    title: 'React Easy Bar Chart',
    description: 'Open Source NPM Package — Lightweight React bar chart library with 5000+ downloads. Built on Canvas for optimal performance.',
    image: '/images/reacteasybarchart.png',
    tech: ['React', 'Canvas API', 'NPM', 'JavaScript'],
    link: 'https://www.npmjs.com/package/react-easy-bar-chart',
    github: null,
    featured: false,
    year: '2020',
  },
]

function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState('all')
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const filteredProjects = filter === 'featured' 
    ? projects.filter(p => p.featured)
    : projects

  return (
    <section id="projects" className={`projects section ${isVisible ? 'projects--visible' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="projects__header">
          <span className="projects__label">Portfolio</span>
          <h2 className="projects__title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="projects__subtitle">
            Products I've built and shipped to production
          </p>
        </div>

        <div className="projects__filters">
          <button 
            className={`projects__filter ${filter === 'all' ? 'projects__filter--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={`projects__filter ${filter === 'featured' ? 'projects__filter--active' : ''}`}
            onClick={() => setFilter('featured')}
          >
            Featured Only
          </button>
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <article 
              key={project.id} 
              className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-card__image">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-card__img"
                  />
                ) : (
                  <div className="project-card__placeholder">
                    <span className="project-card__number">0{index + 1}</span>
                  </div>
                )}
                <div className="project-card__overlay">
                  <div className="project-card__links">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-card__link"
                        aria-label="View live site"
                      >
                        <ExternalLinkIcon />
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-card__link"
                        aria-label="View on GitHub"
                      >
                        <GithubIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-card__content">
                <div className="project-card__meta">
                  {project.featured && (
                    <span className="project-card__badge">Featured</span>
                  )}
                  {project.isOpenSource && project.github ? (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-card__badge project-card__badge--opensource"
                    >
                      Open Source
                    </a>
                  ) : project.isOpenSource ? (
                    <span className="project-card__badge project-card__badge--opensource">Open Source</span>
                  ) : null}
                  {project.company && (
                    <span className="project-card__company">{project.company}</span>
                  )}
                  {project.year && (
                    <span className="project-card__year">{project.year}</span>
                  )}
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>
                <div className="project-card__tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="project-card__tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects__cta">
          <a 
            href="https://github.com/sharmanilay?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            className="projects__more-btn"
          >
            <span>View All Projects on GitHub</span>
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

export default Projects

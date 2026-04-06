import { useState, useEffect } from 'react'
import './Hero.css'

function Hero({ pill }) {
  const [displayText, setDisplayText] = useState('')
  const [currentRole, setCurrentRole] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const roles = [
    'Senior Software Engineer',
    'Full-Stack Developer',
    'React & Node.js Expert',
    'SaaS Builder',
    'Open Source Contributor',
    'Movie Buff',
  ]

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRole((currentRole + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <div className="hero__bg-effects">
        <div className="hero__gradient-orb hero__gradient-orb--1" />
        <div className="hero__gradient-orb hero__gradient-orb--2" />
        <div className="hero__gradient-orb hero__gradient-orb--3" />
        <div className="hero__grid" />
      </div>

      <div className="hero__container container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span className="hero__badge-text">Available for opportunities</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__greeting">Hey, I'm</span>
            <span className="hero__name">
              <span className="hero__name-text">Nilay Sharma</span>
              <span className="hero__name-highlight" />
            </span>
          </h1>

          <div className="hero__role">
            <span className="hero__role-prefix">I'm a</span>
            <span className="hero__role-text">
              {displayText}
              <span className="hero__cursor">|</span>
            </span>
          </div>

          <p className="hero__description">
            Full Stack Engineer with 7+ years of experience building and shipping production products from 0 → launch → scale. Expert in modern web architectures across TypeScript, Go, React, Next.js, Node.js, and cloud-native systems, with deep experience designing scalable backends, developer tooling, and AI-powered applications.
          </p>

          <div className="hero__cta">
            <button className="hero__btn hero__btn--primary" onClick={scrollToProjects}>
              <span className="hero__btn-text">View My Work</span>
              <span className="hero__btn-icon">→</span>
            </button>
            <button className="hero__btn hero__btn--secondary" onClick={scrollToContact}>
              <span className="hero__btn-text">Get In Touch</span>
            </button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__code-window">
            <div className="hero__code-header">
              <div className="hero__code-dots">
                <span className="hero__code-dot hero__code-dot--red" />
                <span className="hero__code-dot hero__code-dot--yellow" />
                <span className="hero__code-dot hero__code-dot--green" />
              </div>
              <span className="hero__code-title">developer.js</span>
            </div>
            <div className="hero__code-body">
              <pre className="hero__code">
                <code>
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-variable">developer</span> = {'{'}
                  {'\n'}  <span className="code-property">name</span>:{' '}
                  <span className="code-string">"Nilay Sharma"</span>,
                  {'\n'}  <span className="code-property">role</span>:{' '}
                  <span className="code-string">"Senior Software Engineer"</span>,
                  {'\n'}  <span className="code-property">location</span>:{' '}
                  <span className="code-string">"India 🇮🇳"</span>,
                  {'\n'}  <span className="code-property">stack</span>: [
                  {'\n'}    <span className="code-string">"React"</span>,{' '}
                  <span className="code-string">"Next.js"</span>,
                  {'\n'}    <span className="code-string">"Node.js"</span>,{' '}
                  <span className="code-string">"TypeScript"</span>,
                  {'\n'}    <span className="code-string">"PostgreSQL"</span>,{' '}
                  <span className="code-string">"GCP"</span>
                  {'\n'}  ],
                  {'\n'}  <span className="code-property">currently</span>:{' '}
                  <span className="code-string">"Digital Prysm Labs"</span>,
                  {'\n'}  <span className="code-property">workingTimeZones</span>: [
                  {'\n'}    <span className="code-string">"US"</span>,{' '}
                  <span className="code-string">"EU"</span>,{' '}
                  <span className="code-string">"APAC"</span>
                  {'\n'}  ],
                  {'\n'}{'}'};
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">Scroll to explore</span>
        <div className="hero__scroll-line">
          <span className="hero__scroll-dot" />
        </div>
      </div>
    </section>
  )
}

export default Hero

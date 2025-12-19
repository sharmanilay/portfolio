import { useEffect, useRef, useState } from 'react'
import './About.css'

function About() {
  const [isVisible, setIsVisible] = useState(false)
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
    <section id="about" className={`about section ${isVisible ? 'about--visible' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="about__header">
          <span className="about__label">About Me</span>
          <h2 className="about__title">
            Building the future,<br />
            <span className="gradient-text">one commit at a time</span>
          </h2>
        </div>

        <div className="about__grid">
          <div className="about__content">
            <div className="about__text">
              <p>
                Hey there! I'm <strong>Nilay Sharma</strong>, a Principal Software Engineer 
                with over 6 years of experience building production-grade SaaS products 
                and scalable applications that people actually use.
              </p>
              <p>
                Currently at <strong>Digital Prysm Labs</strong>, I own end-to-end product delivery — 
                from architecture and development to deployment and iteration based on user feedback. 
                I've shipped products like <strong>Promptery</strong> (Prompt Management SaaS) and 
                <strong> Hype My Hustle</strong> (AI accountability tool for creators).
              </p>
              <p>
                Before this, I spent 4+ years at <strong>Trajektory</strong> building market-leading 
                applications, designed scalable DevOps workflows achieving 90% reduction in release time, 
                and introduced code review processes that cut bugs by 50%.
              </p>
              <p>
                I hold a B.Tech in Computer Science from <strong>LNMIIT, Rajasthan</strong>. 
                When I'm not shipping code, you'll find me playing guitar, writing stage plays 
                (won Best Play at college fests!), or watching <span className="about__highlight">The Matrix</span> for the hundredth time 💊.
              </p>
            </div>

            <div className="about__quick-facts">
              <h3 className="about__facts-title">Quick Facts</h3>
              <ul className="about__facts-list">
                <li>🚀 Currently shipping SaaS products at Digital Prysm Labs</li>
                <li>🌍 Based in India, working remotely with global teams</li>
                <li>🎸 Guitar player & stage play writer</li>
                <li>🎬 Movie buff (Matrix, MCU, Sci-Fi enthusiast)</li>
                <li>🏆 Won Best Play & Best Script at multiple college fests</li>
                <li>👨‍🏫 Mentored teams under CSI, LNMIIT Chapter</li>
              </ul>
            </div>
          </div>

          <div className="about__visual">
            <div className="about__card-stack">
              <div className="about__card about__card--1">
                <div className="about__card-icon">💼</div>
                <h4>Digital Prysm Labs</h4>
                <p>Principal Engineer — Building & shipping SaaS products</p>
              </div>
              <div className="about__card about__card--2">
                <div className="about__card-icon">🌐</div>
                <h4>Trajektory</h4>
                <p>Senior Engineer — 4+ years building scalable apps</p>
              </div>
              <div className="about__card about__card--3">
                <div className="about__card-icon">📈</div>
                <h4>Drip Capital</h4>
                <p>Full-Stack — UI library reduced marketing spend by 39%</p>
              </div>
            </div>

            <div className="about__matrix-quote">
              <blockquote>
                "I know kung fu."
                <cite>— Neo, The Matrix</cite>
              </blockquote>
              <p className="about__matrix-note">
                (But instead of kung fu, it's React, Next.js, Node, TypeScript, PostgreSQL... 😄)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

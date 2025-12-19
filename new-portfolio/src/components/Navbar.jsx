import { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar({ onReset, pill }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: 'github', url: 'https://github.com/sharmanilay', label: 'GitHub' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/in/sharmanilay/', label: 'LinkedIn' },
    { icon: 'twitter', url: 'https://twitter.com/dohypemyhustle', label: 'Twitter' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__container container">
        <a href="#hero" className="navbar__logo" onClick={(e) => handleNavClick(e, '#hero')}>
          <span className="navbar__logo-symbol">&lt;/&gt;</span>
          <span className="navbar__logo-text">nilay</span>
        </a>

        <ul className={`navbar__links ${mobileMenuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a 
                href={href} 
                className="navbar__link"
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <div className="navbar__social">
            {socialLinks.map(({ icon, url, label }) => (
              <a 
                key={icon}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__social-link"
                aria-label={label}
              >
                <SocialIcon icon={icon} />
              </a>
            ))}
          </div>
          
          <button 
            className="navbar__pill-reset"
            onClick={onReset}
            title={`Currently: ${pill} pill. Click to choose again.`}
          >
            <span className={`navbar__pill-indicator navbar__pill-indicator--${pill}`} />
          </button>

          <button 
            className={`navbar__hamburger ${mobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={`navbar__mobile-overlay ${mobileMenuOpen ? 'navbar__mobile-overlay--open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Mobile menu */}
      <div className={`navbar__mobile-menu ${mobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map(({ label, href }, index) => (
            <li key={label} style={{ animationDelay: `${index * 0.1}s` }}>
              <a 
                href={href} 
                className="navbar__mobile-link"
                onClick={(e) => handleNavClick(e, href)}
              >
                <span className="navbar__mobile-link-number">0{index + 1}.</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="navbar__mobile-social">
          {socialLinks.map(({ icon, url, label }) => (
            <a 
              key={icon}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__mobile-social-link"
              aria-label={label}
            >
              <SocialIcon icon={icon} />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

function SocialIcon({ icon }) {
  const icons = {
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  }
  return icons[icon] || null
}

export default Navbar

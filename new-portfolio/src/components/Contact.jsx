import { useEffect, useRef, useState } from 'react'
import './Contact.css'

function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending', 'success', 'error'
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, open email client with pre-filled content
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:nilaysharma642@gmail.com?subject=${subject}&body=${body}`
    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(null), 3000)
  }

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'nilaysharma642@gmail.com',
      link: 'mailto:nilaysharma642@gmail.com'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: '/in/sharmanilay',
      link: 'https://www.linkedin.com/in/sharmanilay/'
    },
    {
      icon: '🐦',
      label: 'Twitter',
      value: '@dohypemyhustle',
      link: 'https://twitter.com/dohypemyhustle'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: '@sharmanilay',
      link: 'https://github.com/sharmanilay'
    },
  ]

  return (
    <section id="contact" className={`contact section ${isVisible ? 'contact--visible' : ''}`} ref={sectionRef}>
      <div className="contact__bg-gradient" />
      
      <div className="container">
        <div className="contact__header">
          <span className="contact__label">Get In Touch</span>
          <h2 className="contact__title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="contact__subtitle">
            Whether you have a project in mind or just want to say hi, 
            my inbox is always open. I'll get back to you as soon as possible!
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__info-header">
              <h3>Contact Information</h3>
              <p>Reach out through any of these channels</p>
            </div>
            
            <div className="contact__info-list">
              {contactInfo.map((item) => (
                <a 
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__info-item"
                >
                  <span className="contact__info-icon">{item.icon}</span>
                  <div className="contact__info-content">
                    <span className="contact__info-label">{item.label}</span>
                    <span className="contact__info-value">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact__matrix-cta">
              <p>
                "There is no spoon. There is only code." 
                <span className="contact__matrix-note">— Some Developer, probably</span>
              </p>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label htmlFor="name" className="contact__form-label">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="contact__form-input"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="email" className="contact__form-label">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="contact__form-input"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="message" className="contact__form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="contact__form-input contact__form-textarea"
                placeholder="Tell me about your project or just say hi!"
                rows="5"
                required
              />
            </div>

            <button 
              type="submit" 
              className={`contact__form-submit ${status === 'sending' ? 'contact__form-submit--sending' : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <span>Sending...</span>
              ) : status === 'success' ? (
                <span>✓ Opening email client</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <span className="contact__form-submit-icon">→</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

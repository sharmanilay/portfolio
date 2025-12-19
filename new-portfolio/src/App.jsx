import { useState, useEffect } from 'react'
import MatrixRain from './components/MatrixRain'
import PillChoice from './components/PillChoice'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [hasChosen, setHasChosen] = useState(false)
  const [pill, setPill] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has already chosen
    const savedPill = localStorage.getItem('matrixPill')
    if (savedPill) {
      setPill(savedPill)
      setHasChosen(true)
    }
    setIsLoading(false)
  }, [])

  const handlePillChoice = (choice) => {
    setPill(choice)
    localStorage.setItem('matrixPill', choice)
    // Add dramatic delay for effect
    setTimeout(() => {
      setHasChosen(true)
    }, 2000)
  }

  const resetChoice = () => {
    localStorage.removeItem('matrixPill')
    setHasChosen(false)
    setPill(null)
  }

  if (isLoading) {
    return <div className="loading-screen"><MatrixRain opacity={0.8} /></div>
  }

  if (!hasChosen) {
    return <PillChoice onChoice={handlePillChoice} currentPill={pill} />
  }

  // Red pill = Matrix theme with prominent rain, Blue pill = clean light theme
  const isRedPill = pill === 'red'

  return (
    <div className={`app ${isRedPill ? 'theme-dark' : 'theme-light'}`}>
      {isRedPill && <MatrixRain opacity={0.4} />}
      <Navbar onReset={resetChoice} pill={pill} />
      <main>
        <Hero pill={pill} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

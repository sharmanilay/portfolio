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
  const [pill, setPill] = useState('red')

  const handlePillChange = (choice) => {
    setPill(choice)
    localStorage.setItem('matrixPill', choice)
  }

  // Red pill = Matrix theme with prominent rain, Blue pill = clean light theme
  const isRedPill = pill === 'red'

  return (
    <div className={`app ${isRedPill ? 'theme-dark' : 'theme-light'}`}>
      {isRedPill && <MatrixRain opacity={0.4} />}
      <Navbar onPillChange={handlePillChange} pill={pill} />
      <main>
        <Hero pill={pill} />
        <About />
        <Skills pill={pill} />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

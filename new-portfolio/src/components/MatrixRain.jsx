import { useEffect, useRef } from 'react'
import './MatrixRain.css'

function MatrixRain({ opacity = 0.4 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Matrix characters - binary code like original + some katakana for Matrix feel
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ10'
    const charArray = chars.split('')

    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    
    // Each column's current y position
    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    // Speed for each column
    const speeds = []
    for (let i = 0; i < columns; i++) {
      speeds[i] = 0.3 + Math.random() * 0.7
    }

    function draw() {
      // Black background with trail effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Main red color with varying brightness
        const brightness = 0.3 + Math.random() * 0.4
        ctx.fillStyle = `rgba(229, 9, 20, ${brightness})`
        ctx.fillText(char, x, y)

        // Bright white "head" of the rain drop
        if (Math.random() > 0.95) {
          ctx.fillStyle = 'rgba(255, 150, 150, 1)'
          ctx.fillText(char, x, y)
        }

        // Reset drop when it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
          speeds[i] = 0.3 + Math.random() * 0.7
        }

        // Move drop down
        drops[i] += speeds[i]
      }
    }

    const interval = setInterval(draw, 45)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="matrix-rain"
      style={{ opacity }}
    />
  )
}

export default MatrixRain

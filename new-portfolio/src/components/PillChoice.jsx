import { useState } from 'react'
import './PillChoice.css'

function PillChoice({ onChoice, currentPill }) {
  const [isChoosing, setIsChoosing] = useState(false)

  const handleChoice = (pill) => {
    setIsChoosing(true)
    onChoice(pill)
  }

  return (
    <div className={`pill-choice ${isChoosing ? 'pill-choice--chosen' : ''} ${currentPill ? `pill-choice--${currentPill}` : ''}`}>
      <div className="pill-choice__bg-image" />
      
      <div className="pill-choice__buttons">
        <button 
          className="pill-button pill-button--red"
          onClick={() => handleChoice('red')}
          disabled={isChoosing}
        >
          <span className="pill-button__glow" />
          <span className="pill-button__text">Red Pill</span>
        </button>
        
        <button 
          className="pill-button pill-button--blue"
          onClick={() => handleChoice('blue')}
          disabled={isChoosing}
        >
          <span className="pill-button__glow" />
          <span className="pill-button__text">Blue Pill</span>
        </button>
      </div>

      {isChoosing && (
        <div className="pill-choice__loading">
          <div className="pill-choice__loading-text">
            {currentPill === 'red' ? 'Entering the Matrix...' : 'Returning to reality...'}
          </div>
        </div>
      )}
    </div>
  )
}

export default PillChoice

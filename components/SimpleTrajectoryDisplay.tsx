'use client'

import { TrajectoryState } from '@/lib/useGameState'

interface SimpleTrajectoryDisplayProps {
  trajectoryState: TrajectoryState
  className?: string
}

export default function SimpleTrajectoryDisplay({ 
  trajectoryState, 
  className = '' 
}: SimpleTrajectoryDisplayProps) {
  const { trajectory, commentary } = trajectoryState

  const isEmpty = trajectory.length === 0

  if (isEmpty) {
    return (
      <div className={`simple-trajectory-container empty ${className}`}>
        <div className="empty-state">
          <div className="text-neutral-500 text-center py-16 font-medium uppercase tracking-wide">
            YOUR TRAJECTORY WILL APPEAR HERE AS YOU CONSTRUCT IT...
          </div>
        </div>
      </div>
    )
  }

  const formatTrajectoryLine = (line: string) => {
    // Color-code different symbol types
    return line
      .replace(/(═══|───|>>>|\^\^\^|vvv)/g, '<span class="symbol-structural">$1</span>')
      .replace(/(~~~|◊◊◊|∞∞∞|\?\?\?|!!!)/g, '<span class="symbol-aesthetic">$1</span>')
      .replace(/(※|◊|★)/g, '<span class="symbol-synthesis">$1</span>')
      .replace(/\[([^\]]+)\](\d+)/g, '<span class="concept-reference">[$1]<span class="concept-number">$2</span></span>')
  }

  const copyToClipboard = () => {
    const trajectoryText = trajectory.map(line => line.text).join('\n')
    const commentaryText = Object.entries(commentary)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([num, text]) => `${num}. ${text}`)
      .join('\n')
    
    const fullText = `${trajectoryText}\n\n${commentaryText}`
    navigator.clipboard.writeText(fullText)
  }

  return (
    <div className={`simple-trajectory-container ${className}`}>
      <div className="trajectory-header">
        <h3 className="text-lg font-bold uppercase">Current Trajectory</h3>
        <button 
          onClick={copyToClipboard}
          className="text-xs btn-secondary px-3 py-1"
          title="Copy trajectory and commentary"
        >
          COPY
        </button>
      </div>
      
      <div className="trajectory-section">
        <div className="trajectory-content">
          {trajectory.map((line, index) => (
            <div 
              key={index} 
              className="trajectory-line"
              dangerouslySetInnerHTML={{ __html: formatTrajectoryLine(line.text) }}
            />
          ))}
        </div>
      </div>

      <div className="commentary-section">
        <h4 className="commentary-header">Commentary</h4>
        <div className="commentary-content">
          {Object.keys(commentary).length > 0 ? (
            Object.entries(commentary)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([num, text]) => (
                <div key={num} className="commentary-item">
                  <span className="commentary-number">{num}.</span>
                  <span className="commentary-text">{text}</span>
                </div>
              ))
          ) : (
            <div className="text-neutral-500 text-center py-8 font-medium uppercase tracking-wide text-sm">
              CONCEPT COMMENTARY WILL APPEAR HERE...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

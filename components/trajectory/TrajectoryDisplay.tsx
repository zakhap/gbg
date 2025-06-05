'use client'

import { useState } from 'react'

export interface ConceptData {
  id: string
  name: string
  number: number
  type: 'concept' | 'synthesis'
  position: { x: number; y: number }
  isHighlighted: boolean
  isRecent: boolean
}

export interface ConnectionData {
  id: string
  symbol: string
  type: 'structural' | 'aesthetic' | 'synthesis'
  from: string
  to: string
  isHighlighted: boolean
}

export interface TrajectoryData {
  concepts: ConceptData[]
  connections: ConnectionData[]
  title?: string
}

interface TrajectoryDisplayProps {
  trajectoryText: string
  className?: string
}

export default function TrajectoryDisplay({ trajectoryText, className = '' }: TrajectoryDisplayProps) {
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null)
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null)

  const parseTrajectory = (text: string): TrajectoryData => {
    if (!text.trim()) return { concepts: [], connections: [] }

    const lines = text.split('\n').filter(line => line.trim())
    const concepts: ConceptData[] = []
    const connections: ConnectionData[] = []
    let conceptCounter = 0
    let globalConceptIndex = 0

    lines.forEach((line, lineIndex) => {
      // Parse concepts and their numbers
      const conceptMatches = [...line.matchAll(/\[([^\]]+)\](\d+)?/g)]
      const symbolMatches = [...line.matchAll(/([═─>~◊∞?!※★^v<]+)/g)]

      conceptMatches.forEach((match, conceptIndex) => {
        const conceptName = match[1]
        const conceptNumber = match[2] ? parseInt(match[2]) : ++conceptCounter
        const conceptId = `concept-${lineIndex}-${conceptIndex}`

        // Check if this concept already exists
        let existingConcept = concepts.find(c => c.name === conceptName)
        
        if (!existingConcept) {
          // Determine if this is a synthesis concept
          const isSynthesis = line.includes('※') || line.includes('◊') || line.includes('★')
          
          // Linear positioning: concepts flow left to right
          const position = {
            x: globalConceptIndex * 280, // Consistent horizontal spacing
            y: isSynthesis ? 140 : 20 // Synthesis points drop below main line
          }

          concepts.push({
            id: conceptId,
            name: conceptName,
            number: conceptNumber,
            type: isSynthesis ? 'synthesis' : 'concept',
            position,
            isHighlighted: false,
            isRecent: lineIndex === lines.length - 1
          })

          globalConceptIndex++
        }

        // Create connections between adjacent concepts in the same line
        if (conceptIndex > 0 && symbolMatches.length > 0) {
          const fromConcept = conceptMatches[conceptIndex - 1][1]
          const toConcept = conceptName
          const symbolIndex = Math.min(conceptIndex - 1, symbolMatches.length - 1)
          const symbol = symbolMatches[symbolIndex][1]

          const connectionType = getSymbolType(symbol)
          
          connections.push({
            id: `connection-${lineIndex}-${conceptIndex}`,
            symbol,
            type: connectionType,
            from: fromConcept,
            to: toConcept,
            isHighlighted: false
          })
        }
      })
    })

    return { concepts, connections }
  }

  const getSymbolType = (symbol: string): 'structural' | 'aesthetic' | 'synthesis' => {
    if (['═══', '───', '>>>', '^^^', 'vvv'].some(s => symbol.includes(s))) return 'structural'
    if (['~~~', '◊◊◊', '∞∞∞', '???', '!!!'].some(s => symbol.includes(s))) return 'aesthetic' 
    return 'synthesis'
  }

  const trajectoryData = parseTrajectory(trajectoryText)

  if (trajectoryData.concepts.length === 0) {
    return (
      <div className={`trajectory-container empty ${className}`}>
        <div className="empty-state">
          <div className="empty-icon">○</div>
          <div className="empty-text">TRAJECTORY CONSTRUCTION SPACE</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`trajectory-container ${className}`}>
      <div className="trajectory-canvas">
        {trajectoryData.concepts.map((concept, index) => (
          <ConceptBox
            key={concept.id}
            concept={concept}
            isHovered={hoveredConcept === concept.id}
            onHover={setHoveredConcept}
            animationDelay={index * 150}
          />
        ))}
        
        {trajectoryData.connections.map((connection, index) => (
          <ConnectionSymbol
            key={connection.id}
            connection={connection}
            concepts={trajectoryData.concepts}
            isSelected={selectedConnection === connection.id}
            onSelect={setSelectedConnection}
            animationDelay={(trajectoryData.concepts.length + index) * 150}
          />
        ))}
      </div>
    </div>
  )
}

interface ConceptBoxProps {
  concept: ConceptData
  isHovered: boolean
  onHover: (id: string | null) => void
  animationDelay: number
}

function ConceptBox({ concept, isHovered, onHover, animationDelay }: ConceptBoxProps) {
  return (
    <div
      className={`concept-box ${concept.type} ${concept.isRecent ? 'recent' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{
        left: concept.position.x,
        top: concept.position.y,
        animationDelay: `${animationDelay}ms`
      }}
      onMouseEnter={() => onHover(concept.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="concept-content">
        <div className="concept-name">{concept.name}</div>
        <div className="concept-number">{concept.number}</div>
      </div>
      <div className="concept-shadow"></div>
    </div>
  )
}

interface ConnectionSymbolProps {
  connection: ConnectionData
  concepts: ConceptData[]
  isSelected: boolean
  onSelect: (id: string | null) => void
  animationDelay: number
}

function ConnectionSymbol({ connection, concepts, isSelected, onSelect, animationDelay }: ConnectionSymbolProps) {
  const fromConcept = concepts.find(c => c.name === connection.from)
  const toConcept = concepts.find(c => c.name === connection.to)

  if (!fromConcept || !toConcept) return null

  // Position connection symbol between the two concepts
  const fromRight = fromConcept.position.x + (fromConcept.type === 'synthesis' ? 280 : 200)
  const toLeft = toConcept.position.x
  const symbolX = fromRight + (toLeft - fromRight) / 2 - 30 // Center between concepts
  
  // Use the same Y level as the "from" concept
  const symbolY = fromConcept.position.y + (fromConcept.type === 'synthesis' ? 45 : 30)

  return (
    <div
      className={`connection-symbol ${connection.type} ${isSelected ? 'selected' : ''}`}
      style={{
        left: symbolX,
        top: symbolY,
        animationDelay: `${animationDelay}ms`
      }}
      onClick={() => onSelect(isSelected ? null : connection.id)}
    >
      <div className="symbol-content">
        {connection.symbol}
      </div>
    </div>
  )
}

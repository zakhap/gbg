'use client'

import { useState } from 'react'
import TrajectoryDisplay from '@/components/trajectory/TrajectoryDisplay'

interface TrajectoryModalProps {
  isOpen: boolean
  onClose: () => void
  trajectoryText: string
  title?: string
}

export default function TrajectoryModal({ isOpen, onClose, trajectoryText, title = "Current Trajectory" }: TrajectoryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="block max-w-7xl w-full max-h-[95vh] overflow-hidden">
        <div className="bg-orange-600 text-white p-6 border-b-4 border-black flex justify-between items-center">
          <h2 className="text-2xl font-bold uppercase">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-black text-3xl font-bold leading-none"
          >
            ×
          </button>
        </div>
        
        <div className="bg-white p-8 max-h-[calc(95vh-80px)] overflow-auto trajectory-modal">
          <TrajectoryDisplay 
            trajectoryText={trajectoryText}
            className="min-h-96"
          />
        </div>
      </div>
    </div>
  )
}

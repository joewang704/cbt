import React from 'react'
import { Router } from '@reach/router'

import './ExerciseContainer.scss'
import ThoughtReframing from './ThoughtReframing'
import ThoughtReframingForm from './ThoughtReframingForm'
import FacingFears from './FacingFears'
import AntiProcrastination from './AntiProcrastination'

const ExerciseContainer = () => {
  return (
    <div className="exercise-container">
      <Router>
        <ThoughtReframing path="thought-reframing" />
        <ThoughtReframingForm path="thought-reframing/:id" />
        <FacingFears path="facing-fears" />
        <AntiProcrastination path="anti-procrastination" />
      </Router>
    </div>
  )
}

export default ExerciseContainer


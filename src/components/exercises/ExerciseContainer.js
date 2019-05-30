import React from 'react'
import './ExerciseContainer.scss'
import { Router } from '@reach/router'

import ThoughtReframing from './ThoughtReframing'
import ThoughtReframingForm from './ThoughtReframingForm'

const ExerciseContainer = () => {
  return (
    <div className="exercise-container">
      <Router>
        <ThoughtReframing path="thought-reframing" />
        <ThoughtReframingForm path="thought-reframing/:id" />
      </Router>
    </div>
  )
}

export default ExerciseContainer


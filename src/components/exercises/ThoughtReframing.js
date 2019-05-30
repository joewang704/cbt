import React, { useEffect } from 'react'
import './ThoughtReframing.scss'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'
import { generateUUID, getExercise } from '../../utils/api.js'
import { updateExercise, createEmptyExercise } from '../../ducks/exercises'

function ThoughtReframing({ thoughts, navigate, createEmptyExercise, populateFromServer }) {
  useEffect(() => {
    getExercise('thoughtReframing').then(allThoughts => {
      // Populates exercise data from server
      // If data is empty, creates new empty exercise and redirects to form page
      if (allThoughts) {
        populateFromServer(allThoughts)
      } else if (!thoughts.length) {
        startNewExercise()
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const startNewExercise = () => {
    const uuid = generateUUID()
    createEmptyExercise(uuid)
    navigate(`/exercise/thought-reframing/${uuid}`)
  }

  const thoughtTable = thoughts.map(({ distortedThought, rationalizedThought, selectedDistortions }, i) => {
    const distortionsMarkup = selectedDistortions.map((name) => <div key={name}>{name}</div>)
    return (
      <div key={i} className="entry">
        <div className="date">3-11-2019</div>
        <div className="distortions-container">{distortionsMarkup}</div>
        <div className="thoughts-container">
          <div className="distortedThought">{distortedThought}</div>
          <div className="rationalThought">{rationalizedThought}</div>
        </div>
      </div>
    )
  })

  return (
    <div className="ThoughtReframing">
      {thoughtTable}
      <button onClick={startNewExercise} className="add-btn btn">Create New...</button>
    </div>
  )
}

export default connect(
  ({ exercises }) => {
    const { thoughtReframing: thoughts } = exercises
    return {
      thoughts: Object.keys(thoughts).map(id => thoughts[id])
    }
  },
  dispatch => ({
    createEmptyExercise: id => dispatch(createEmptyExercise(id)),
    populateFromServer: allThoughts => dispatch(updateExercise(state => {
      state.thoughtReframing = allThoughts
    }))
  })
)(ThoughtReframing)

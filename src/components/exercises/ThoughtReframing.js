import React, { useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import './ThoughtReframing.scss'
import { getExercise } from '../../utils/api.js'
import { populateFromServer, removeExerciseEntry } from '../../ducks/exercises'

function ThoughtReframing({ thoughts, navigate, populateFromServer, removeExerciseEntry }) {
  useEffect(() => {
    populateFromServer()
  }, [])

  const startNewExercise = () => {
    navigate(`/exercise/thought-reframing/new`)
  }

  const thoughtTable = thoughts.reverse().map(({ distortedThought, rationalizedThought, selectedDistortions, updatedAt, _id }, i) => {
    const distortionsMarkup = selectedDistortions.map((name) => <div key={name}>{name}</div>)
    return (
      <div key={i} className="entry">
        <div className="header">
          <div className="date">{moment(updatedAt).format("LLL")}</div>
          <i className="material-icons" onClick={() => removeExerciseEntry('thoughtReframing', _id)}>delete</i>
        </div>
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
    populateFromServer: () => dispatch(populateFromServer("thoughtReframing")),
    removeExerciseEntry: (exerciseType, id) => dispatch(removeExerciseEntry(exerciseType, id)),
  })
)(ThoughtReframing)

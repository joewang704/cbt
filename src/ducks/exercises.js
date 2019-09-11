import produce from 'immer'

import * as api from '../utils/api'

const ADD = 'exercises/ADD'
const REMOVE = 'exercises/REMOVE'
const UPDATE = 'exercises/UPDATE'

export const removeExerciseEntry = (exerciseType, id) => {
  return dispatch => {
    return api.removeExerciseEntry(exerciseType, id).then(() => {
      dispatch({
        type: REMOVE,
        payload: {
          exerciseType,
          id,
        },
      })
    }).catch(err => {
      //TODO: error modal
      console.log(err)
    })
  }
}

export const addExerciseEntry = (exerciseType, entry) => {
  // TODO: FINISH THIS CODE
  console.log('hi')
  return dispatch => {
    return api.addExerciseEntry(exerciseType, entry).then((data) => {
      console.log(data)
      dispatch({
        type: ADD,
        payload: {
          exerciseType,
          entry,
        },
      })
    }).catch(err => {
      //TODO: error modal
      console.log(err)
    })
  }
}

export const populateFromServer = (exerciseType) => {
  return dispatch => {
    return api.getExercise(exerciseType).then(exerciseData => {
      return dispatch(updateExercise(state => {
        state[exerciseType] = exerciseData.reduce((acc, curr) => {
          acc[curr._id] = curr
          return acc
        }, {})
      }))
    })
  }
}

export function updateExercise(updateFn) {
  return {
    type: UPDATE,
    payload: {
      updateFn,
    }
  }
}

const initialState = {
  thoughtReframing: {}
  
}

export default function reducer(state = initialState, action = {}) {
  const { payload, type } = action
  switch (type) {
    case UPDATE:
      return produce(state, payload.updateFn)
    case REMOVE:
      const { id, exerciseType } = payload
      return produce(state, state => {
        delete state[exerciseType][id]
      })
    default: return state
  }
}

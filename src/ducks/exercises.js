import produce from 'immer'

import * as api from '../utils/api'

const ADD = 'exercises/ADD'
const REMOVE = 'exercises/REMOVE'
const UPDATE = 'exercises/UPDATE'
const POPULATE = 'exercises/POPULATE'
const DANGER_MODIFY = 'exercises/DANGER_MODIFY'

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
  return dispatch => {
    return api.addExerciseEntry(exerciseType, entry).then((persistedEntryWithId) => {
      dispatch({
        type: ADD,
        payload: {
          exerciseType,
          entry: persistedEntryWithId,
          id: persistedEntryWithId._id,
        },
      })
    }).catch(err => {
      //TODO: error modal
      console.log(err)
    })
  }
}

export const updateExerciseEntry = (exerciseType, id, entry) => {
  return dispatch => {
    return api.updateExerciseEntry(exerciseType, id, entry).then(() => {
      const entryWithId = Object.assign({}, entry, { _id: id })
      dispatch({
        type: UPDATE,
        payload: {
          exerciseType,
          id,
          entry: entryWithId,
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
    return api.getExerciseEntries(exerciseType).then(entries => {
      dispatch({
        type: POPULATE,
        payload: { exerciseType, entries },
      })
    }).catch(err => {
      //TODO: error modal
      console.log(err)
    })
  }
}

export function dangerouslyModifyExerciseData(updateFn) {
  return {
    type: DANGER_MODIFY,
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
    // Note: We add braces to enclose scope of each case, allows for
    // payload destructuring without redefinition
    case REMOVE: {
      const { id, exerciseType } = payload
      return produce(state, state => {
        delete state[exerciseType][id]
      })
    }
    case UPDATE:
    case ADD: {
      const { id, entry, exerciseType } = payload
      return produce(state, state => {
        state[exerciseType][id] = entry
      })
    }
    case POPULATE: {
      const { exerciseType, entries } = payload
      return produce(state, state => {
        state[exerciseType] = entries.reduce((acc, curr) => {
          acc[curr._id] = curr
          return acc
        }, {})
      })
    }
    case DANGER_MODIFY: {
      return produce(state, payload.updateFn)
    }
    default: return state
  }
}

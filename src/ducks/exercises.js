import produce from 'immer'

const ADD = 'exercises/ADD'
const REMOVE = 'exercises/REMOVE'
const UPDATE = 'exercises/UPDATE'

export function createEmptyExercise(id) {
  return updateExercise(state => {
    state.thoughtReframing[id] = {
      distortedThought: '',
      rationalizedThought: '',
      selectedDistortions: [],
    }
  })
}

export function updateExercise(updateFn) {
  return {
    type: UPDATE,
    payload: {
      updateFn
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
    default: return state
  }
}

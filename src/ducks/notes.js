import { merge, copy } from './utils'

const CREATE = 'notes/CREATE'
const UPDATE = 'notes/UPDATE'

export function updateNote(id, content) {
  return dispatch => {
    persistNote(content).then(() => {
      dispatch({
        type: UPDATE,
        payload: {
          id,
          content,
        }
      })
    }).catch(err => console.error("Could not save note changes to server."))
  }
}


export function createNote(content) {
  return {
    type: CREATE,
    payload: {
      content
    },
  }
}

function persistNote(content) {
  // TODO: persist to database instead of local storage
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('test', content)
      resolve(true)
    } catch(err) {
      console.log(err)
      resolve(false)
    }
  })
}

let globalId = 0
const initialState = {
  '-1': {
    id: -1,
    content: '',
  }
}

export default function reducer(state = initialState, action = {}) {
  const { payload, type } = action
  switch (type) {
    case CREATE:
      const newState = copy(state)
      newState[globalId] = {
        id: globalId++,
        content: '',
      }
      return newState
    case UPDATE:
      const { id, content } = payload
      if (state[id]) {
        const newState = copy(state)
        newState[id] = {
          id,
          content,
        }
        return newState
      }
      // TODO: throw error
      return state
    default: return state
  }
}

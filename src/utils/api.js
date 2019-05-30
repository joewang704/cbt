// Talks to server, mocks out server functionality currently
import uuid from 'uuid/v4'


// TODO: replace with actual UUID generation
export function generateUUID() {
  return uuid()
}

export function persistExercise(exerciseId, id, body) {
  return getExercise(exerciseId).then(exercise => {
    if (exercise) {
      exercise[id] = body
    } else {
      exercise = { [id]: body }
    }
    try {
      localStorage.setItem(exerciseId, JSON.stringify(exercise))
      return true
    } catch {
      return false
    }
  })
}

export function getExercise(exerciseId) {
  return new Promise((resolve, reject) => {
    try {
      const exercise = JSON.parse(localStorage.getItem(exerciseId))
      setTimeout(() => resolve(exercise), 300)
    } catch {
      resolve(null)
    }
  })
}

export function getExerciseById(exerciseId, id) {
  return new Promise((resolve, reject) => {
    try {
      const exercise = JSON.parse(localStorage.getItem(exerciseId))
      setTimeout(() => resolve(exercise[id]), 300)
    } catch {
      reject(false)
    }
  })
}

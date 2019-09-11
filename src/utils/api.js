// Talks to server, mocks out server functionality currently
import uuid from 'uuid/v4'
import moment from 'moment'
import axios from 'axios'

const baseUrl = 'http://localhost:4000'

const url = (endpoint) => `${baseUrl}/${endpoint}`

const request = (method, endpoint, payload) => {
  switch (method) {
    case 'GET':
      return axios.get(url(endpoint), payload)
        .then(({ data }) => data)
        .catch(err => {
          // TODO: show error popup
          throw err
        })
    case 'POST':
      return axios.post(url(endpoint), payload)
        .then(({ data }) => data)
        .catch(err => {
          // TODO: show error popup
          throw err
        })
    case 'DELETE':
      return axios.delete(url(endpoint), payload)
        .then(({ data }) => data)
        .catch(err => {
          // TODO: show error popup
          throw err
        })
  }
}

// TODO: replace with actual UUID generation
export function generateUUID() {
  return uuid()
}

export function persistExercise(exerciseId, body) {
  /*return getExercise(exerciseId).then(exercise => {
    if (!body.created_at) {
      body.created_at = moment.utc().format()
    }
    body.updated_at = moment.utc().format()
    if (exercise) {
      exercise[id] = body
    } else {
      exercise = { [id]: body }
    }
    try {
      localStorage.setItem(exerciseId, JSON.stringify(exercise))
      return body
    } catch {
      return null
    }
  })*/
  return request('POST', `exercise/${exerciseId}`, body)
}

export function getExercise(exerciseType) {
  /*return new Promise((resolve, reject) => {
    try {
      const exercise = JSON.parse(localStorage.getItem(exerciseId))
      setTimeout(() => resolve(exercise), 300)
    } catch {
      resolve(null)
    }
  })*/
  return request('GET', `exercise/${exerciseType}`)
}

export function addExerciseEntry(exerciseType, entry) {
  return request('POST', `exercise/${exerciseType}`, entry)
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

export function removeExerciseEntry(exerciseType, id) {
  return request('DELETE', `exercise/${exerciseType}/${id}`)
}

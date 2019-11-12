import moment from 'moment'
import axios from 'axios'

const baseUrl = process.env.BACKEND_URL || 'http://localhost:4000'

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
    case 'PUT':
      return axios.put(url(endpoint), payload)
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

export function persistExercise(exerciseId, body) {
  return request('POST', `exercise/${exerciseId}`, body)
}

export function getExerciseEntries(exerciseType) {
  return request('GET', `exercise/${exerciseType}`)
}

export function addExerciseEntry(exerciseType, entry) {
  return request('POST', `exercise/${exerciseType}`, entry)
}

export function updateExerciseEntry(exerciseType, id, entry) {
  return request('PUT', `exercise/${exerciseType}/${id}`, entry)
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

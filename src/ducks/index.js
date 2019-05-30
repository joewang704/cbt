import { combineReducers } from 'redux'
import notes from './notes'
import ui from './ui'
import exercises from './exercises'

const rootReducer = combineReducers({
  notes,
  ui,
  exercises,
})

export default rootReducer


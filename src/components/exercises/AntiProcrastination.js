import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import './AntiProcrastination.scss'
import { populateFromServer, addExerciseEntry, updateExerciseEntry, removeExerciseEntry } from '../../ducks/exercises'
import { exerciseMetadata } from '../../utils/exercises'
import Obj from '../../utils/object'

const metadata = exerciseMetadata["AntiProcrastination"]
const columns = ['activity', 'predDifficulty', 'predSatisfaction', 'actualDifficulty', 'actualSatisfaction']
const columnTitles = ['Activity', 'Predicted Difficulty', 'Predicted Satisfaction', 'Actual Difficulty', 'Actual Satisfaction']

const formInitialState = columns.reduce((acc, curr) => {
  acc[curr] = ''
  return acc
}, {})

function AntiProcrastination({ entries, populateFromServer, addExerciseEntry, updateExerciseEntry, removeExerciseEntry }) {
  const [editing, setEditing] = useState({})
  const [form, setForm] = useState(formInitialState)
  const [validationMessages, setValidationMessages] = useState([])
  useEffect(() => {
    populateFromServer()
  }, [])

  const { description, tutorial } = metadata
  const isCreatingNew = editing.id === 'new'

  const startEditing = (id, columnName, initFormValues) => {
    if (id === 'new') {
      setEditing({ id: 'new' })
    } else if (id) {
      const initFormValuesSanitized = Obj.map(initFormValues, (key, value) => {
        if (columns.includes(key)) {
          return value === null || value === undefined ? "" : value
        }
        return
      })
      setForm(initFormValuesSanitized)
      setEditing({ id, col: columnName })
    } else {
      // throw error
      console.log("NO ID ASSOCIATED WITH ENTRY")
    }
  }

  const cancelEditing = () => {
    setEditing({})
    setForm(formInitialState)
  }

  const updateForm = (key, value) => setForm(Object.assign({}, form, { [key]: value }))

  const validateForm = (columns) => {
    let validated = true
    const validationMessages = []
    const addValidationMessage = (formKey, validationMessage) => {
      validationMessages.push(formKey + ' ' + validationMessage)
      validated = false
    }
    columns.forEach((col, i) => {
      const formValue = form[col]
      switch(col) {
        case 'activity':
          if (!formValue) {
            addValidationMessage(columnTitles[i], 'requires a value')
          }
          break
        case 'predDifficulty':
        case 'predSatisfaction': {
          const inputTitle = columnTitles[i]
          if (!formValue) {
            addValidationMessage(inputTitle, ' requires a value')
          } else if (isNaN(formValue)) {
            addValidationMessage(inputTitle, ' should be a number')
          } else if (formValue > 100 || formValue < 0) {
            addValidationMessage(inputTitle, ' must be a value from 0 to 100')
          }
          break
        }
        case 'actualDifficulty':
        case 'actualSatisfaction': {
          const inputTitle = columnTitles[i]
          if (!formValue) {
            return
          } else if (isNaN(formValue)) {
            addValidationMessage(inputTitle, ' should be a number')
          } else if (formValue > 100 || formValue < 0) {
            addValidationMessage(inputTitle, ' must be a value from 0 to 100')
          }
        }
      }
    })
    setValidationMessages(validationMessages)
    return validated
  }

  const submitForm = () => {
    if (!editing && !editing.id) {
      // TODO: error modal
    }
    if (!validateForm(columns)) {
      return
    }
    const sanitizedExerciseEntry = Obj.map(form, (_, v) => v === "" ? undefined : v)
    if (editing.id === "new") {
      addExerciseEntry(sanitizedExerciseEntry).then(() => {
        cancelEditing()
      })
    } else {
      // UPDATE: update current entry
      updateExerciseEntry(editing.id, sanitizedExerciseEntry).then(() => {
        cancelEditing()
      })
    }
  }

  const deleteEntry = (id) => {
    removeExerciseEntry(id).then(() => {
      cancelEditing()
    })
  }

  const submitOnEnter = (e) => {
    if (e.keyCode === 13) {
      submitForm()
    }
  }

  const entriesMarkup = entries.sort((a, b) => a.created_at - b.created_at).map(({ _id, ...data }) => {
    if (editing.col && editing.id === _id) {
      return (<div className="row" key={_id}>
        {columns.map(columnName => <input
          key={columnName}
          type="text"
          value={form[columnName]}
          onChange={(e) => updateForm(columnName, e.target.value)}
          onKeyDown={submitOnEnter}
          autoFocus={editing.col === columnName}>
        </input>)}
      </div>)
    }
    return (<div className="row" key={_id}>
      {columns.map(columnName => <div key={columnName} onClick={() => startEditing(_id, columnName, data)}>{data[columnName]}</div>)}
    </div>)
  })


  return (
    <div className="anti-procrastination-container">
      <div className="exercise-header">
        <div className="description">{description}</div><div className="tutorial">{tutorial}</div>
      </div>
      <div className="validation-messages-container">
        {validationMessages.map((message, i) => (
          <div key={i} className="validation-message">{message}</div>
        ))}
      </div>
      <div className="table">
        <div className="header">
          {["Activity", "Predicted Difficulty (0-100%)", "Predicted Satisfaction (0-100%)", "Actual Difficulty (0-100%)", "Actual Satisfaction (0-100%)"]
              .map(name => <div key={name}>{name}</div>)}
        </div>
        {entriesMarkup}
        {isCreatingNew && <div className="row">
          {columns.map((columnName, i) =>
            <input key={columnName} autoFocus={!i} type="text" value={form[columnName]} onChange={(e) => updateForm(columnName, e.target.value)} onKeyDown={submitOnEnter}></input>)}
        </div>}
        {editing.id ?
          <div className="btn-row">
            <div className="btn-row-el submit" onClick={submitForm}>Submit</div>
            <div className="btn-row-el cancel" onClick={cancelEditing}>Cancel</div>
            {editing.id !== 'new' && <div className="btn-row-el delete" onClick={() => deleteEntry(editing.id)}>Delete</div>}
          </div> :
          <div className="btn-row"><div className="btn-row-el add" onClick={() => startEditing('new')}>Add</div></div>
        }
      </div>
    </div>
  )
}

export default connect(
  ({ exercises }) => {
    return {
      entries: Obj.values(exercises.antiProcrastination)
    }
  },
  dispatch => ({
    populateFromServer: () => dispatch(populateFromServer("antiProcrastination")),
    addExerciseEntry: (entry) => dispatch(addExerciseEntry("antiProcrastination", entry)),
    updateExerciseEntry: (id, entry) => dispatch(updateExerciseEntry("antiProcrastination", id, entry)),
    removeExerciseEntry: (id) => dispatch(removeExerciseEntry("antiProcrastination", id)),
  })
)(AntiProcrastination)

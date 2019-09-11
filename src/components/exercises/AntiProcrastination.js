import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import './AntiProcrastination.scss'
import { populateFromServer, addExerciseEntry } from '../../ducks/exercises'
import { exerciseMetadata } from '../../utils/exercises'
import { toArr } from '../../utils/obj'

const metadata = exerciseMetadata["AntiProcrastination"]
const columns = ['activity', 'predDifficulty', 'predSatisfaction', 'actualDifficulty', 'actualSatisfaction']

function AntiProcrastination({ entries, populateFromServer, addExerciseEntry }) {
  const [editing, setEditing] = useState({})
  const [form, setForm] = useState({})
  const [entriesMarkupTable, setEntriesMarkupTable] = useState({})
  useEffect(() => {
    populateFromServer()
  }, [])
  /*useEffect(() => {
    console.log('Markup table updated')
    // Creates a nested dictionary to represent our table with cell markups as values
    setEntriesMarkupTable(entries.reduce((acc, { _id, ...data }) => {
      acc[_id] = columns.reduce((acc, columnName) => {
        acc[columnName] = <div key={columnName} onClick={() => setEditing({ id: _id, col: columnName })}>{data[columnName]}</div>
        return acc
      }, {})
      return acc
    }, {}))
  }, [entries])
  useEffect(() => {
    // If cell was just toggled into edit mode, indexes into dictionary to modify markup of chosen cell
    if (editing.col) {
      const { id, col } = editing
      setEntriesMarkupTable(table => {
        table[id][col] = <input key={col} type="text" value={form[col]} onChange={(e) => updateForm(col, e.target.value)}></input>
        return table
      })
    }
  }, [editing.col])*/

  const { description, tutorial } = metadata
  const isCreatingNew = editing.id === 'new'

  const cancelEditing = () => {
    setEditing({})
    setForm({})
  }

  const updateForm = (key, value) => setForm(form => Object.assign(form, { [key]: value }))

  const submitForm = () => {
    if (!editing && !editing.id) {
      // TODO: error modal
    }
    if (editing.id === "new") {
      // TODO: add new entry
      console.log(form)
      const entry = form
      addExerciseEntry(entry)
      cancelEditing()
    } else {
      // UPDATE: update current entry
    }
  }

  /*entries.forEach(({ _id }) => {
    const v = entriesMarkupTable[_id]
    if (v && v.actualDifficulty.type === "input") {
      console.log(v.actualDifficulty)
      console.log("SHOW HELLo")
      //test = v.actualDifficulty
      test = "Hello"
    }
  })*/

  // Parses dictionary into markup
  const entriesMarkup = entries.sort((a, b) => a.created_at - b.created_at).map(({ _id, ...data }) => {
    if (editing.col && editing.id === _id) {
      return (<div className="row" key={_id}>
        {columns.map(columnName => editing.col === columnName ?
          <input key={columnName} type="text" value={form[columnName]} onChange={(e) => updateForm(columnName, e.target.value)}></input> :
          <div key={columnName} onClick={() => setEditing({ id: _id, col: columnName })}>{data[columnName]}</div>)}
      </div>)
    }
    return (<div className="row" key={_id}>
      {columns.map(columnName => <div key={columnName} onClick={() => setEditing({ id: _id, col: columnName })}>{data[columnName]}</div>)}
    </div>)
  })

  return (
    <div className="anti-procrastination-container">
      <div className="exercise-header">
        <div className="description">{description}</div><div className="tutorial">{tutorial}</div>
      </div>
      <div className="table">
        <div className="header">
          {["Activity", "Predicted Difficulty (0-100%)", "Predicted Satisfaction (0-100%)", "Actual Difficulty (0-100%)", "Actual Satisfaction (0-100%)"]
              .map(str => <div key={str}>{str}</div>)}
        </div>
        {entriesMarkup}
        {isCreatingNew && <div className="row">
          {columns.map(columnName =>
            <input key={columnName} type="text" value={form[columnName]} onChange={(e) => updateForm(columnName, e.target.value)}></input>)}
        </div>}
        {isCreatingNew ?
          <div className="btn-row">
            <div className="btn-row-el submit" onClick={submitForm}>Submit</div>
            <div className="btn-row-el cancel" onClick={cancelEditing}>Cancel</div>
          </div> :
          <div className="btn-row"><div className="btn-row-el add" onClick={() => setEditing({ id: 'new' })}>Add</div></div>
        }
      </div>
    </div>
  )
}

export default connect(
  ({ exercises }) => {
    return {
      entries: toArr(exercises.antiProcrastination)
    }
  },
  dispatch => ({
    populateFromServer: () => dispatch(populateFromServer("antiProcrastination")),
    addExerciseEntry: (entry) => dispatch(addExerciseEntry("antiProcrastination", entry))
  })
)(AntiProcrastination)
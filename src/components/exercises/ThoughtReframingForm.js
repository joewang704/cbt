import React from 'react'
import './ThoughtReframingForm.scss'
import { connect } from 'react-redux'
import { updateExercise } from '../../ducks/exercises'
import { persistExercise } from '../../utils/api.js'
import CognitiveDistortions from '../../utils/distortions.json'

import { Editor } from 'slate-react'
import { Value } from 'slate'
import Plain from 'slate-plain-serializer'
import update from 'immutability-helper'
import { navigate } from '@reach/router'

const initialDistortedValue = JSON.parse(localStorage.getItem('test')) || Plain.deserialize('')
const initialRationalizedValue = JSON.parse(localStorage.getItem('test2')) || Plain.deserialize('')

class ThoughtReframingForm extends React.Component {

  state = {
    distortedThought: Value.fromJSON(initialDistortedValue),
    rationalizedThought: Value.fromJSON(initialRationalizedValue),
  }

  render() {
    const { selectedDistortions, id, entryNotFound } = this.props
    const { distortedThought, rationalizedThought } = this.state

    if (entryNotFound) {
      return <div>No entry was found</div>
    }

    // If form is filled out, show save button
    const showSaveButton = distortedThought && Plain.serialize(distortedThought)
      && rationalizedThought && Plain.serialize(rationalizedThought) && selectedDistortions.length
    return (
      <div className="ThoughtReframingForm">
        <div className="distorted-col">
          <div className="distorted-blurb">
            What negative thoughts are you experiencing? Remember to write down the actual thoughts and not just how you feel about them.
          </div>
          <Editor
            placeholder="Write down your negative thoughts..."
            value={distortedThought}
            onChange={this.onDistortedThoughtChange}
            //onKeyDown={this.onKeyDown}
            className="distorted-editor"
          />
        </div>
        <div className="cognitive-distortions">
          {CognitiveDistortions.map(({ name, description, example }) =>
            <div key={name} className="distortion" onClick={(event) => this.toggleCheckbox(name, event)}>
              <input type="checkbox" name={name} value={name} checked={selectedDistortions.includes(name)} readOnly />
              {name}
              <div className="description">{description}</div>
            </div>
          )}
        </div>
        <div className="distorted-col">
          <div className="rational-blurb">
            Now try to rewrite the thoughts - removing any cognitive distortions you found within them.
          </div>
          <Editor
            placeholder="Write down your rationalized thoughts..."
            value={rationalizedThought}
            onChange={this.onRationalizedThoughtChange}
            //onKeyDown={this.onKeyDown}
            className="rational-editor"
          />
        </div>
        {showSaveButton ? <button onClick={this.onSubmit} className="save-btn btn">Save</button> : undefined}
      </div>
    )
  }

  toggleCheckbox = (name, event) => {
    this.props.onSelectedDistortionsChange(name)
    event.preventDefault()
  }

  onDistortedThoughtChange = ({ value }) => {
    this.setState({ distortedThought: value })
  }

  onRationalizedThoughtChange = ({ value }) => {
    this.setState({ rationalizedThought: value })
  }

  onSubmit = () => {
    const { saveRationalizedThought, saveDistortedThought, selectedDistortions, id } = this.props
    let { rationalizedThought, distortedThought } = this.state
    rationalizedThought = Plain.serialize(rationalizedThought)
    distortedThought = Plain.serialize(distortedThought)
    persistExercise('thoughtReframing', id, { distortedThought, selectedDistortions, rationalizedThought }).then(success => {
      console.log(success)
      if (success) {
        saveRationalizedThought(rationalizedThought)
        saveDistortedThought(distortedThought)
        navigate('./')
      } else {
        // TODO: show error modal
      }
    })
  }
}

export default connect(
  ({ exercises }, { id }) => {
    const thoughtData = exercises.thoughtReframing[id]
    if (!thoughtData) {
      return { entryNotFound: true }
    }
    const { selectedDistortions, distortedThought, rationalizedThought } = thoughtData
    return {
      selectedDistortions: selectedDistortions || [],
      distortedThought: Plain.deserialize(distortedThought || ''),
      rationalizedThought: Plain.deserialize(rationalizedThought || ''),
    }
  },
  (dispatch, { id }) => ({
    saveDistortedThought: (distortedThought) => {
      dispatch(updateExercise(state => {
        state.thoughtReframing[id].distortedThought = distortedThought
      }))
    },
    saveRationalizedThought: (rationalizedThought) => {
      dispatch(updateExercise(state => {
        state.thoughtReframing[id].rationalizedThought = rationalizedThought
      }))
    },
    onSelectedDistortionsChange: (name) => {
      dispatch(updateExercise(state => {
        const indexOf = state.thoughtReframing[id].selectedDistortions.indexOf(name);
        if (indexOf >= 0) {
          state.thoughtReframing[id].selectedDistortions.splice(indexOf)
        } else {
          state.thoughtReframing[id].selectedDistortions.push(name)
        }
      }))
    }
  })
)(ThoughtReframingForm)

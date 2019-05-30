import React, { Component } from 'react'
import './App.scss'
import { connect } from 'react-redux'
import { Router } from '@reach/router'

import Header from './Header'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import ExerciseContainer from './exercises/ExerciseContainer'

class App extends Component {
  render() {
    const gridTemplateColumns = this.props.isSidebarOpen ? '1fr 5fr' : '1fr'
    return (
      <div className="App">
        <Header />
        <div className="content" style={{ gridTemplateColumns }}>
          <Sidebar />
          <Router>
            <Dashboard path="/" />
            <ExerciseContainer path="exercise/*" /> 
          </Router>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ ui }) => ({
    isSidebarOpen: ui.isSidebarOpen
  })
)(App)

import React from 'react'
import { connect } from 'react-redux'
import { Link } from '@reach/router'

import './Sidebar.scss'
import { exerciseMetadata } from '../utils/exercises'

const links = Object.keys(exerciseMetadata).map(k => {
  const { name, link } = exerciseMetadata[k]
  return <Link key={link} to={`/exercise/${link}`} className="link">{name}</Link>
})

const Sidebar = ({ isOpen }) => {
  return isOpen ? (
    <div className="sidebar-container">
      <h3>Exercises</h3>
      {links}
    </div>
  ) : null
}

export default connect(
  ({ ui }) => ({
    isOpen: ui.isSidebarOpen
  })
)(Sidebar)

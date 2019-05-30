import React from 'react'
import './Sidebar.css'

import { connect } from 'react-redux'

const Sidebar = ({ isOpen }) => {
  return isOpen ? (
    <div className="container">
    </div>
  ) : null
}

export default connect(
  ({ ui }) => ({
    isOpen: ui.isSidebarOpen
  })
)(Sidebar)

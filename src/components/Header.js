import React from 'react'
import './Header.css'
import { Icon } from './shared'

import { connect } from 'react-redux'
import { toggleSidebar } from '../ducks/ui'

const Header = ({ onDehazeClick }) => {
  return (
    <div className="Header">
      <Icon onClick={onDehazeClick}>dehaze</Icon> 
      <span id="Header-logo">Logo</span>
    </div>
  )
}

export default connect(
  null,
  dispatch => ({
    onDehazeClick: () => {
      dispatch(toggleSidebar())
    }
  })
)(Header)

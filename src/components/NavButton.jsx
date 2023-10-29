import React from 'react'
import '../components/NavButton.css'

const NavButton = (props) => {
  return (
    <div className='nav-button'>{props.name}</div>
  )
}

export default NavButton
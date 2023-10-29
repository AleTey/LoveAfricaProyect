import React from 'react';
import '../components/Nav.css';
import NavButton from './NavButton';
import '../assets/home_FILL0_wght400_GRAD0_opsz24.png'
import { Link, NavLink } from 'react-router-dom';

import '../components/NavButton.css';

const Nav = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="buttons-nav-container">

          <NavLink className={({ isActive }) => (isActive ? "active-link" : null)} to="home">
            {/* <NavButton name="HOME" /> */}
            <button type="button" className="btn btn-dark">HOME</button>
          </NavLink>

          <NavLink className={({ isActive }) => (isActive ? "active-link" : null)} to="/telas">
            {/* <NavButton name="TELAS" /> */}
            <button type="button" className="btn btn-dark">Telas</button>
          </NavLink>

          <NavLink className={({ isActive }) => (isActive ? "active-link" : null)} to="/distribuidores" >
            {/* <NavButton name="DISTRIBUIDORES" /> */}
            <button type="button" className="btn btn-dark">Proveedores</button>
          </NavLink>

        </div>
      </div>
    </nav>
  )
}

export default Nav
import React from 'react'
import { MdShoppingCart, } from 'react-icons/md'
import '../components/Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container-home">
        HOME
      </div>
      <div className="title-container">
        <h1 className='title'>Love Africa</h1>
      </div>
      <div className="user-container">
        <p>AleTey</p>
      </div>
      <div className="cart-container">
        <NavLink className={({ isActive }) => (isActive ? 'active-link' : null)} to='carrito'>
          <button >
            <p>1</p>
            <MdShoppingCart size={30} color='black' />
            {/* <i class="bi bi-cart"></i> */}
          </button>
        </NavLink>
       
      </div>

    </header>
  )
}

export default Header
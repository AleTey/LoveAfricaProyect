import React, { useState } from 'react'
import { MdShoppingCart, } from 'react-icons/md'
import '../components/Header.css';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {

  const [cartIsActive, setCartIsActive] = useState(false)

  return (
    <header>
      <div className="container-home">
        
      </div>
      <div className="title-container">
        <h1 className='title'>Love Africa</h1>
      </div>
      <div className="user-container">
        <p></p>
      </div>
      <div className="cart-container">
        <NavLink className={({ isActive }) => (isActive ? 'link-cart-active' : null)} to='carrito'>
          {/* <button > */}
            {/* <p>1</p> */}
            <MdShoppingCart className='cart' size={30} color='black'  />
            {/* <i class="bi bi-cart"></i> */}
          {/* </button> */}
        </NavLink>
       
      </div>

    </header>
  )
}

export default Header
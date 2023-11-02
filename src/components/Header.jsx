import React, { useState } from 'react'
import { MdShoppingCart, } from 'react-icons/md'
import '../components/Header.css';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserConnectedContext from '../context/userConnectedContext';
import ModalNewAcc from './ModalNewAcc';
import AccesContext from '../context/AccesContext';

const Header = () => {

  const [cartIsActive, setCartIsActive] = useState(false);
  const { userConected, setUserConnected } = useContext(UserConnectedContext);
  const { acces, setAcces } = useContext(AccesContext)
  const [modalNewAccForm, setModalNewAccForm] = useState(false)

  const handleClickPrueba = (e) => {
    console.log("prueba");
    setModalNewAccForm(true)
  }

  const handleCerrarSesion = (e) => {
    setUserConnected({})
    setAcces(false)
  }

  return (


    <header>

      {modalNewAccForm && <ModalNewAcc setModalNewAccForm={setModalNewAccForm} />}

      <div className="container-home">

      </div>
      <div className="title-container">
        <h1 className='title'>Love Africa</h1>
      </div>
      <div className="user-container">


        {/* <div class="btn-group">
          <button class="btn btn-secondary btn-sm dropdown-toggle user-options" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div className="user-name">
              <p><span>{userConected.usuario}</span></p>
            </div>
          </button>
          <ul class="dropdown-menu">
            ...
          </ul>
        </div> */}

        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {userConected.usuario}
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            {userConected.permiso === "6" && <li><a className={`dropdown-item ${modalNewAccForm ? 'active' : null} `} onClick={handleClickPrueba}>Nueva cuenta</a></li>}
            {/* <li><a className={`dropdown-item ${modalNewAccForm ? 'active' : null} `} onClick={handleClickPrueba}>Nueva cuenta</a></li> */}
            <li><a className="dropdown-item" onClick={handleCerrarSesion} >Cerrar sesion</a></li>
            {/* <li><a className="dropdown-item" href="#">Another action</a></li> */}
            {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
            {/* <li><hr className="dropdown-divider" /></li> */}
            {/* <li><a className="dropdown-item" href="#">Separated link</a></li> */}
          </ul>
        </div>


      </div>
      <div className="cart-container">
        <NavLink className={({ isActive }) => (isActive ? 'link-cart-active' : null)} to='carrito'>
          {/* <button > */}
          {/* <p>1</p> */}
          <MdShoppingCart className='cart' size={30} color='black' />
          {/* <i class="bi bi-cart"></i> */}
          {/* </button> */}
        </NavLink>

      </div>

    </header>
  )
}

export default Header
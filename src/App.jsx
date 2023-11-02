import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Home from './pages/Home';
import Telas from './pages/Telas';
import Carrito from './pages/Carrito';
import Distribuidores from './pages/Distribuidores';
import Acces from './pages/Acces';
import HeaderAcces from './components/HeaderAcces';
import { useContext } from 'react';
import UserConnectedContext from './context/userConnectedContext';
import AccesContext from './context/AccesContext';

function App() {
  const [count, setCount] = useState(0);
  // const [acces, setAcces] = useState(false);
  const {acces, setAcces} = useContext(AccesContext)

  const {userConnected, setUserConnected} = useContext(UserConnectedContext)

  return (
    <>
      <BrowserRouter>
        {
          !acces ?
            <>              
              <Acces />
            </>
            :
            <>
              <Header />
              <Nav />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/telas" element={<Telas />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="distribuidores" element={<Distribuidores />} />
              </Routes>
            </>
        }
      </BrowserRouter>
    </>
  )
}

export default App


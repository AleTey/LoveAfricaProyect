import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Home from './pages/Home';
import Telas from './pages/Telas';
import Carrito from './pages/Carrito';
import Distribuidores from './pages/Distribuidores';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/telas" element={<Telas />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="distribuidores" element={<Distribuidores />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


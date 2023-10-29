import React, { useEffect, useState } from 'react'
import TarjetaTela from '../components/TarjetaTela';
import '../pages/Telas.css';
import { MdAdd, MdDeblur } from 'react-icons/md'
import ModalAddElement from '../components/ModalAddElement';
import FormNuevaTela from '../components/FormNuevaTela';

const newTelaFormInitialState = {
  codigoDistribuidor: "",
  color: "",
  tipo: "",
  distribuidor: "",
  temporada: "",
  id: "",
}


const Telas = () => {

  const [lastSearch, setLastSearch] = useState("")
  const [buscador, setBuscador] = useState("")
  const [telaBuscada, setTelaBuscada] = useState([])
  // const [TelasAddedList, setTelasAddedList] = useState([]);
  const [db, setDb] = useState([]);
  const [isChanged, setIsChanged] = useState(false)
  const [modalWindowIsVisible, setModalWindowIsVisible] = useState(false)
  const [newTelaForm, setNewTelaForm] = useState(newTelaFormInitialState)
  // const [edit, setEdit] = useState({})

  useEffect(() => {
    const petition = async () => {
      console.log(db);
      const res = await fetch("http://localhost:3000/colors")
      const json = await res.json()

      setDb(json);
      setIsChanged(false)
    }
    petition();
  }, [isChanged]);

  useEffect(() => {
    const serchTerm = lastSearch.toLowerCase();

    const resultadosBusqueda = db.filter((el) => {
      return Object.values(el).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(serchTerm)
        }
        return false
      })
    })
    setTelaBuscada(resultadosBusqueda);
  }, [db]);


  const handleBuscador = (e) => {
    setBuscador(e.target.value)
  }

  const handleBuscar = (e) => {
    e.preventDefault();
    const serchTerm = buscador.toLowerCase();

    const resultadosBusqueda = db.filter((el) => {
      return Object.values(el).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(serchTerm)
        }
        return false
      })
    })
    setTelaBuscada(resultadosBusqueda);
    setLastSearch(buscador)
    setBuscador('')
  }

  const handleAddTela = (e) => {
    setModalWindowIsVisible(true)

  }

  return (
    <>
      {modalWindowIsVisible &&
        <ModalAddElement title="Agregar tela" setModalWindowIsVisible={setModalWindowIsVisible} newTelaForm={newTelaForm} setNewTelaForm={setNewTelaForm} initialState={newTelaFormInitialState}  >
          <FormNuevaTela newTelaForm={newTelaForm} setNewTelaForm={setNewTelaForm} initialState={newTelaFormInitialState} />
        </ModalAddElement>}
      <h2 className='title'>TELAS</h2>
      <div className="buscador-container">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input className="form-control me-2" name='buscador'  type="search" placeholder="Search" onChange={handleBuscador} value={buscador}  aria-label="Search" />
              <button className="btn btn-outline-success" type="submit" onClick={handleBuscar} >Search</button>
              <button type="button" className="btn btn-outline-secondary" onClick={handleAddTela}>Add Tela</button>
            </form>
          </div>
        </nav>

      </div>

      <div className="catalogo-container">
        <div className="container">

          {telaBuscada
            ? telaBuscada.map(tela => <TarjetaTela key={tela.id} tela={tela} setIsChanged={setIsChanged} />)
            : <p>"No se encontroron resultados"</p>
          }
        </div>
      </div>
    </>
  )
}

export default Telas


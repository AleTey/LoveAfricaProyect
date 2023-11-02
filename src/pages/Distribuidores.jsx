import React, { useContext, useEffect, useState } from 'react'
import '../pages/Distribuidores.css';

import FilaDistribuidores from '../components/FilaDistribuidores';
import ProveedoresListContext from '../context/ProveedoresListContext';
import ModalAddProveedor from '../components/ModalAddProveedor';
// import ProveedoresListContext from '../context/ProveedoresListContext';



const Distribuidores = () => {

  // const {proveedoresList, setProveedoresList} = useContext(ProveedoresListContext);

  const { proveedoresList, setProveedoresList } = useContext(ProveedoresListContext)
  // console.log(proveedoresList)
  const [dbDistribuidores, setdbDistribuidores] = useState(proveedoresList);
  const [disHasChanged, setDisHasChanged] = useState(false);
  const [addProveedor, setAddProveedor] = useState(false);
  const [provWasAdded, setProvWasAdded] = useState(false)

  const [buscadorProv, setBuscadorProv] = useState("");
  const [proveedoresEncontrados, setProveedoresEncontrados] = useState([]);


  useEffect(() => {
    const fetchDistribuidores = async () => {

      try {
        const res = await fetch("http://localhost:4000/distribuidores")
        // console.log(res);
        if (res.ok) {
          const json = await res.json();
          setdbDistribuidores(json);
          // console.log(dbDistribuidores)
          setProveedoresList(json)

          // console.log(proveedoresList)
        }
      } catch (error) {
        // console.log("error", res.status)
      }
      setDisHasChanged(false)
    }
    fetchDistribuidores();
  }, [disHasChanged, provWasAdded])


  const handleBuscadorProvInput = (e) => {
    setBuscadorProv([e.target.name] = e.target.value)
  }

  const handleBuscarProvBtn = (e) => {
    e.preventDefault();

    const elSerched = buscadorProv.toLowerCase();

    let disEncontrados = dbDistribuidores.filter((prov) => {
      // console.log(dbDistribuidores)
      return Object.values(prov).some((value) => {
        if (typeof value === "string") {
          // console.log(buscadorProv)
          return value.toLowerCase().includes(elSerched)
        }
        return false;
      })
    })
    setProveedoresEncontrados(disEncontrados);
    // console.log(proveedoresEncontrados)
  }

  const handleAddProvedorClick = (e) => {
    addProveedor ? setAddProveedor(false) : setAddProveedor(true)
  }


  return (

    <div className="main-container">
      {/* {console.log(proveedoresEncontrados)} */}
      <div className="title-container">
        <h2>Distribuidores</h2>
      </div>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          name='buscador'
          type="search"
          placeholder="Search"
          onChange={handleBuscadorProvInput}
          value={buscadorProv}
          aria-label="Search"
        />
        <div className="buttons-proveedor-container">
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleBuscarProvBtn}
          >
            Search
          </button>
        </div>
        <button
          type="button"
          id='add-tela-btn'
          className="btn btn-outline-secondary"
          onClick={handleAddProvedorClick}
        >
          Add Proveedor
        </button>
      </form>
      {/* <button type="button" className="btn btn-primary" onClick={handleAddProvedorClick}>Add Proveedor</button> */}
      {addProveedor && <ModalAddProveedor setAddProveedor={setAddProveedor} disHasChanged={disHasChanged} setProvWasAdded={setProvWasAdded} />}
      <div className="table-container">

        <div className="table-header">
          <div className="empresa__table-header">
            Empresa
          </div>
          <div className="rubro__table-header">
            Rubro
          </div>
        </div>
        <div className="body__table-container">

          {proveedoresEncontrados.length > 0 ? (proveedoresEncontrados.map(el => (
            
            <FilaDistribuidores key={el.id} el={el} setDisHasChanged={setDisHasChanged} />
          ))) :
            (dbDistribuidores.map(el => (
              <FilaDistribuidores key={el.id} el={el} setDisHasChanged={setDisHasChanged} />
            )))
          }
          {/* // <p>No se encontraron distribuidores</p>


            // dbDistribuidores.map(el => (
            //   <FilaDistribuidores key={el.id} el={el} setDisHasChanged={setDisHasChanged} />
            // )) */}



          {/* {dbDistribuidores ? dbDistribuidores.map(el => (
            <FilaDistribuidores key={el.id} el={el} setDisHasChanged={setDisHasChanged} />
          ))
            :
            <tr>
              <td>No se encontraron datos</td>
             
            </tr>
          } */}
        </div>
      </div>
    </div>
  )
}

export default Distribuidores
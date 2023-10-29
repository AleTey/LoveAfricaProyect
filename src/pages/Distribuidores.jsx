import React, { useContext, useEffect, useState } from 'react'
import '../pages/Distribuidores.css';

import FilaDistribuidores from '../components/FilaDistribuidores';
import ProveedoresListContext from '../context/ProveedoresListContext';
import ModalAddProveedor from '../components/ModalAddProveedor';
// import ProveedoresListContext from '../context/ProveedoresListContext';



const Distribuidores = () => {

  // const {proveedoresList, setProveedoresList} = useContext(ProveedoresListContext);

  const {proveedoresList,setProveedoresList} = useContext(ProveedoresListContext)
// console.log(proveedoresList)
  const [dbDistribuidores, setdbDistribuidores] = useState(proveedoresList);
  const [disHasChanged, setDisHasChanged] = useState(false);
  const [addProveedor, setAddProveedor] = useState(false);


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
  }, [disHasChanged])

  const expandHandler = (e) => {
    console.log(e)
  }

  const handleAddProvedorClick = (e) => {
    addProveedor ? setAddProveedor(false) : setAddProveedor(true)
  }


  return (
    <div className="main-container">
      <div className="title-container">
        <h2>Distribuidores</h2>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleAddProvedorClick}>Add Proveedor</button>
      {addProveedor && <ModalAddProveedor setAddProveedor={setAddProveedor} /> }
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
          {dbDistribuidores ? dbDistribuidores.map(el => (
            <FilaDistribuidores key={el.id} el={el} setDisHasChanged={setDisHasChanged} />
          ))
            :
            <tr>
              <td>No se encontraron datos</td>
              {/* {console.log(dbDistribuidores)} */}
            </tr>
          }
        </div>
      </div>
    </div>
  )
}

export default Distribuidores
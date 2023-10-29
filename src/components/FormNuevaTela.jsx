import React, { useContext, useState } from 'react'
import ProveedoresListContext from '../context/ProveedoresListContext'

const FormNuevaTela = ({ setNewTelaForm, newTelaForm, initialState }) => {

  const { proveedoresList, setProveedoresList } = useContext(ProveedoresListContext)
  const [provee, setProvee] = useState(proveedoresList)
  // console.log(proveedoresList)
  const handleForm = (e) => {
    setNewTelaForm({
      ...newTelaForm,
      [e.target.name]: e.target.value,
    })
    console.log(e.target.value)
    console.log(e.target.options[e.target.selectedIndex].getAttribute('key'))
    console.log(e.target)
  }

  const bntCleanHandler = (e) => {
    setNewTelaForm(initialState)
  }

  return (
    <>
      <span><h4>Color: <input type="text" name="color" onChange={handleForm} value={newTelaForm.color} /> </h4></span>
      <span><h4>Codigo: <input type="text" name="codigoDistribuidor" onChange={handleForm} value={newTelaForm.codigoDistribuidor} /> </h4></span>
      <span><h4>Tipo: <input type="text" name="tipo" onChange={handleForm} value={newTelaForm.tipo} /> </h4></span>
      <span><h4>Distribuidor: <input type="text" name="distribuidor" onChange={handleForm} value={newTelaForm.distribuidor} /> </h4></span>
      {/* {provee &&
      
        <select name="distribuidor" id="2" onChange={handleForm} >
          {provee.map((prov) => <option key={prov.id} value={prov.id} >{prov.empresa}</option>)}
        </select>
      } */}
      {/* {console.log(provee)} */}

      {/* <select name="distribuidor" id="5">
        <option >value</option>
        <option >value</option>
      </select> */}




      <span><h4>Temporada: <input type="text" name="temporada" onChange={handleForm} value={newTelaForm.temporada} /> </h4></span>
      <span><h4>Id: <input type="text" name="id" onChange={handleForm} value={newTelaForm.id} /> </h4></span>



      <button onClick={bntCleanHandler} >Limpiar</button>

    </>
  )
}

export default FormNuevaTela
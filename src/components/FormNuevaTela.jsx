import React, { useContext, useState } from 'react'
import ProveedoresListContext from '../context/ProveedoresListContext'
import '../components/FormNuevaTela.css';
import {MdOutlineCleaningServices} from 'react-icons/md'

const FormNuevaTela = ({ setNewTelaForm, newTelaForm, initialState }) => {

  const { proveedoresList, setProveedoresList } = useContext(ProveedoresListContext)
  const [provee, setProvee] = useState(proveedoresList)
  // console.log(proveedoresList)
  const handleForm = (e) => {
    // console.log(e.target)
    // console.log(e.target.name)
    // console.log(e.target.value)

    if (e.target.name === "distribuidor") {
      let dis = "";
      proveedoresList.map((el) => {
        // console.log(proveedoresList)
        if (el.id === e.target.value) {
          dis = el.empresa
          console.log(dis)
        }
      })
      setNewTelaForm({
        ...newTelaForm,
        "distribuidor": dis,
        "idDistribuidor": e.target.value,

      })
    } else {
      setNewTelaForm({
        ...newTelaForm,
        [e.target.name]: e.target.value,
      })

      // console.log(e.target.value)
      // console.log(e.target.options[e.target.selectedIndex].getAttribute('key'))
      // console.log(e.target)
    }
    // console.log(newTelaForm)
  }

  const bntCleanHandler = (e) => {
    setNewTelaForm(initialState)
  }

  return (
    <>
      <div className="inputs-nueva-tela-container">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput-color"
            placeholder="Color"
            name='color'
            onChange={handleForm}
            value={newTelaForm.color}
          // onBlur={handleBlur}
          />
          <label htmlFor="floatingInput-color">Ingresar color</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput-codigoDistribuidor"
            placeholder="Codigo distribuidor"
            name='codigoDistribuidor'
            onChange={handleForm}
            value={newTelaForm.codigoDistribuidor}
          // onBlur={handleBlur}
          />
          <label htmlFor="floatingInput-codigoDistribuidor">Ingresar codigo distribuidor</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput-tipo"
            placeholder="Tipo de tela"
            name='tipo'
            onChange={handleForm}
            value={newTelaForm.tipo}
          // onBlur={handleBlur}
          />
          <label htmlFor="floatingInput-tipo">Ingresar tipo de tela</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput-temporada"
            placeholder="Temporada"
            name='temporada'
            onChange={handleForm}
            value={newTelaForm.temporada}
          // onBlur={handleBlur}
          />
          <label htmlFor="floatingInput-tipo">Ingresar temporada</label>
        </div>


        {/* <span><h4>Color: <input type="text" name="color" onChange={handleForm} value={newTelaForm.color} /> </h4></span> */}
        {/* <span><h4>Codigo: <input type="text" name="codigoDistribuidor" onChange={handleForm} value={newTelaForm.codigoDistribuidor} /> </h4></span> */}
        {/* <span><h4>Tipo: <input type="text" name="tipo" onChange={handleForm} value={newTelaForm.tipo} /> </h4></span> */}
        {/* <span><h4>Distribuidor: </h4></span> */}
        {provee &&

          // <select name="distribuidor" id="2" onChange={handleForm} >
          <select className="form-select" aria-label="Default select example" name="distribuidor" id="2" onChange={handleForm}>
            <option value="">Seleccionar Proveedor</option>
            {provee.map((prov) => <option key={prov.id} value={prov.id} >{prov.empresa}</option>)}
          </select>
        }

      </div>


      {/* <span><h4>Temporada: <input type="text" name="temporada" onChange={handleForm} value={newTelaForm.temporada} /> </h4></span> */}




      {/* <button onClick={bntCleanHandler} ></button> */}
      <button type="button" className="btn btn-secondary cleaner" onClick={bntCleanHandler} ><MdOutlineCleaningServices size={30} /></button>

    </>
  )
}

export default FormNuevaTela
import React, { useState } from 'react';
import '../components/ModalAddProveedor.css';
// import '../constantes/initialFormAddProveedor';
import { initialFormAddProveedor } from '../constantes/initialFormAddProveedor'
import { expresiones } from '../constantes/exprecionesRegulares'
import { useForm } from '../hooks/useForm';

const validationForm = (form) => {
  let errors = {}
  console.log(errors)

  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;
  let regexTelefono = /^\d{7,14}$/;


  if (!form.empresa.trim()) {
    errors.empresa = "Campo oblicagorio"
  } else if (!regexName.test(form.empresa.trim())) {
    errors.empresa = "Se han encontrado caracteres invalidos"
  }
  // console.log(form.email)
  if (!form.email.trim()) {
    errors.email = "Email obligatorio"
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "Formato de mail invalido"
  }
  // console.log(form.contacto.cel)
  if (!form.contacto.cel.trim()) {
    errors.cel = "Cel oblicagorio"
  } else if (!regexTelefono.test(form.contacto.cel.trim())) {
    errors.cel = "Se han encontrado caracteres invalidos"
  }
  if (!form.contacto.caracteristica.trim()) {
    errors.caracteristica = "Caracteristica del pais obligatoria"
  }

  return errors
}

const errorFormString = "Hay errores en el formulario"

const ModalAddProveedor = ({ setAddProveedor, setDisHasChanged, setProvWasAdded }) => {

  const [nuevoProveedor, setNuevoProveedor] = useState(initialFormAddProveedor);
  const [successful, setSuccessful] = useState(false)
  const [errors, setErrors] = useState({})
  const [anyErrorsAtSubmint, setAnyErrorsAtSubmint] = useState({})
  const [errorsForm, setErrorsForm] = useState(false)

  const handleBlur = (e) => {

    setErrors(validationForm(nuevoProveedor))
  }

  const nuevoProveedorHandler = (e) => {
    setNuevoProveedor({
      ...nuevoProveedor,
      [e.target.name]: e.target.value,
    })
  }

  const nuevoProveedorContactHandler = (e) => {
    const { name, value } = e.target
    setNuevoProveedor({
      ...nuevoProveedor,
      contacto: {
        ...nuevoProveedor.contacto,
        [name]: value
      }
    })
  }

  const nuevoProveedorDireccionHandler = (e) => {
    const { name, value } = e.target
    setNuevoProveedor({
      ...nuevoProveedor,
      direccion: {
        ...nuevoProveedor.direccion,
        [name]: value,
      }
    })
  }

  const addBtnHandler = (e) => {
    e.preventDefault();
    nuevoProveedorHandler(e);

    setErrors(validationForm(nuevoProveedor))
    if (Object.keys(validationForm(nuevoProveedor)).length === 0) {

      if (Object.keys(errors).length === 0) {

        sendNewProveedor()
      } else {
        setErrorsForm(true)
      }
    } else {
      setErrors(validationForm(nuevoProveedor))
    }
  }

  const sendNewProveedor = async () => {
    try {
      const res = await fetch("http://localhost:4000/distribuidores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoProveedor)
      });
      // console.log(res)
      if (res.ok === true) {
        const json = await res.json()
        // console.log(res)
        // console.log(json)
        setSuccessful(true)
        setProvWasAdded(true)
        // setDisHasChanged(true)
        setTimeout(() => {
          setSuccessful(false)
          // setProvWasAdded(false)
          // setDisHasChanged(false)
          // setAddProveedor(false)
        }, 5000)
        setNuevoProveedor(initialFormAddProveedor)
        setErrorsForm(false)
      } else {
        console.log(res)
        console.log("ERROR!!")
      }
    } catch (error) {
      console.log(error)
      // console.log(res.statusText)
    }
  }


  return (
    <>

      <form action="nuevo-proovedor-form">
        <div className="add-proveedor-form">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput-empresa"
              placeholder="empresa"
              name='empresa'
              onChange={nuevoProveedorHandler}
              value={nuevoProveedor.empresa}
              onBlur={handleBlur}

              required
            />

            <label htmlFor="floatingInput-empresa">Empresa</label>
            {errors.empresa && <p className='errors' >{errors.empresa}</p>}
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput-email"
              placeholder="name@example.com"
              name='email'
              onChange={nuevoProveedorHandler}
              value={nuevoProveedor.email}
              onBlur={handleBlur}
              required
            />
            <label htmlFor="floatingInput-email">Email address</label>
            {errors.email && <p className='errors' >{errors.email}</p>}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput-localidad"
              placeholder="localidad"
              name='localidad'
              onChange={nuevoProveedorHandler}
              value={nuevoProveedor.localidad}
            />
            <label htmlFor="floatingInput-localidad">Localidad</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput-sector"
              placeholder="sector"
              name='sector'
              onChange={nuevoProveedorHandler}
              value={nuevoProveedor.sector}
              onBlur={handleBlur}
            />
            <label htmlFor="floatingInput-sector">Sector</label>
            {errors.sector && <p className='errors' >{errors.sector}</p>}
          </div>
          <b>Contacto</b>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput-contact-name"
              placeholder="nombre"
              name='nombre'
              onChange={nuevoProveedorContactHandler}
              value={nuevoProveedor.contacto.nombre}
              onBlur={handleBlur}
            />
            <label htmlFor="floatingInput-contact-name">Nombre</label>
            {errors.nombre && <p className='errors' >{errors.nombre}</p>}
          </div>
          <div className="contact-cel">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput-contact-caracteristica"
                placeholder="caracteristica"
                name='caracteristica'
                value={nuevoProveedor.contacto.caracteristica}
                onChange={nuevoProveedorContactHandler}
                onBlur={handleBlur}
              />
              <label htmlFor="floatingInput-contact-caracteristica"></label>
              {/* {errors.caracteristica && <p className='errors' >{errors.caracteristica}</p>} */}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput-contact-cel"
                placeholder="Cel"
                name='cel'
                onChange={nuevoProveedorContactHandler}
                value={nuevoProveedor.contacto.cel}
                onBlur={handleBlur}
                required
              />
              <label htmlFor="floatingInput-contact-cel">Cel</label>
              {(errors.cel || errors.caracteristica) && (<p className='errors' >{errors.cel || errors.caracteristica}</p>)}
            </div>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput-contact-email"
              placeholder="contact-email"
              name='emailContacto'
              onChange={nuevoProveedorContactHandler}
              value={nuevoProveedor.contacto.emailContacto}
              onBlur={handleBlur}
            />
            <label htmlFor="floatingInput-contact-email">Contact Email</label>
            {errors.emailContacto && <p className='errors' >{errors.emailContacto}</p>}
          </div>
          <b>Direccion</b>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput-direccion-calle"
              placeholder="calle"
              name='calle'
              onChange={nuevoProveedorDireccionHandler}
              value={nuevoProveedor.direccion.calle}
              onBlur={handleBlur}
            />
            <label htmlFor="floatingInput-direccion-calle">Calle</label>
            {errors.calle && <p className='errors' >{errors.calle}</p>}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput-direccion-nro"
              placeholder="nro"
              name='nro'
              onChange={nuevoProveedorDireccionHandler}
              value={nuevoProveedor.direccion.nro}
              onBlur={handleBlur}
            />
            <label htmlFor="floatingInput-direccion-nro">Nro</label>
            {errors.nro && <p className='errors' >{errors.nro}</p>}
          </div>

          {successful ?
            <div className="btn-send-new-proveedor-container">
              <button type="button" className="btn btn-success">Success</button>
            </div> :
            <div className="btn-send-new-proveedor-container">
              <button
                type="button"
                className="btn btn-primary"
                id='btn-send-new-proveedor'
                onClick={addBtnHandler}
              >
                Add
              </button>

            </div>
          }
          {errorsForm && <p className='errors'> {errorFormString} </p>}
        </div >
      </form>
    </>
  )
}

export default ModalAddProveedor
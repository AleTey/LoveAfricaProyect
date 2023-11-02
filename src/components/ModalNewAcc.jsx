import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './ModalNewAcc.css'
import { newAccInitialState } from '../constantes/newAccInitialState'

const validationForm = (form) => {

  const isValid = {};
  const errors = {};
  let continuar = true;

  // let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{3,}$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;
  let regexTelefono = /^\d{7,14}$/;

  if (!form.nombre.trim()) {
    errors.nombre = "El campo nombre es obligatorio"
    isValid.nombre = false
  } else if (!regexName.test(form.nombre.trim())) {
    errors.nombre = "Nombre invalido"
    isValid.nombre = false
  } else {
    isValid.nombre = true
    continuar = false;
  }
  if (!form.email.trim()) {
    errors.email = "El email es obligatorio"
    isValid.email = false;
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "Ingrese un email valido"
    isValid.email = false;
  } else {
    isValid.email = true
  }
  if (!form.password || !form.repeatPass) {
    errors.password = "Las contrase;as deben coincidir"
    errors.repeatPass = "las contrase;as deben coincidir"
    isValid.password = false
    isValid.repeatPass = false
  } else if (form.password !== form.repeatPass) {
    errors.password = "Las contrase;as deben coincidir"
    errors.repeatPass = "las contrase;as deben coincidir"
    isValid.password = false
    isValid.repeatPass = false
    // } else if (!regex.test(form.password)) {
    //   errors.password = "Contrase;a invalida"
    //   isValid.password = false;
  } else {
    isValid.password = true
    isValid.repeatPass = true
  }
  if (!form.permisos || form.permisos === "Nivel de permisos") {
    errors.permisos = "Debe elegir un permiso"
    isValid.permisos = false
  } else {
    isValid.permisos = true;
  }
  return { errors, isValid }
}

const ModalNewAcc = ({ setModalNewAccForm }) => {

  const [newAccForm, setNewAccForm] = useState(newAccInitialState)
  const [errorsForm, setErrorsForm] = useState({})
  const [isValid, setIsValid] = useState({})
  const [creacionExitosa, setCreacionExitosa] = useState(false);


  const handleCloseModal = (e) => {
    setModalNewAccForm(false)
  }

  const onChangeFormHandler = (e) => {
    setNewAccForm({
      ...newAccForm,
      [e.target.name]: e.target.value
    })
    setIsValid({
      ...isValid,
      ...validationForm(newAccForm).isValid
    })

    setErrorsForm({
      // ...errorsForm,
      ...validationForm(newAccForm).errors
    })
  }

  const handleKeyDown = (e) => {
    // setIsValid(validationForm(newAccForm).isValid)
    setIsValid({
      ...isValid,
      ...validationForm(newAccForm).isValid
    })
    setErrorsForm({
      // ...errorsForm,
      ...validationForm(newAccForm).errors
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setIsValid(validationForm(newAccForm).isValid)
    if (Object.keys(validationForm(newAccForm).errors).length === 0) {
      console.log("sin errores")
      sendFormNewAcc();
    } else {
      console.log("se encontraron errores")
    }
  }

  const sendFormNewAcc = () => {
    const sendFormNewAccFn = async () => {
      try {
        const res = await fetch("http://localhost:5000/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAccForm)
        });
        if (res.ok) {
          const json = await res.json()
          console.log(json)
          setCreacionExitosa(true)
          setNewAccForm(newAccInitialState)
          setIsValid({})
          setTimeout(() => {
            setCreacionExitosa(false)
          }, 5000)
        }
      } catch (error) {
        console.log("Ocurrio un error")
      }
    }
    sendFormNewAccFn()
  }

  return ReactDOM.createPortal(
    <>
      <div className="modal-new-acc-container">
        <div className="form-container">
          <div className="top__form-container">
            <button className='close-modal-new-acc' onClick={handleCloseModal}>X</button>
          </div>
          <div className="header__new-acc-form">
            <h4>Love Africa</h4>
            <h2 className='new-acc__new-acc'>Nueva Cuenta</h2>
          </div>
          <form>
            <div className="form-new-acc">
              <div className="form-floating">
                <input
                  type="text"
                  // className={`form-control ${isValid.nombre && "is-valid"} ${!isValid.nombre && "is-invalid"}`}
                  className={`form-control ${isValid.hasOwnProperty('nombre') ? (isValid.nombre ? 'is-valid' : 'is-invalid') : null}`}
                  id="floatingInput-nombre-new-acc"
                  placeholder="Nombre"
                  name='nombre'
                  value={newAccForm.nombre}
                  onChange={onChangeFormHandler}
                  onKeyDown={handleKeyDown}
                  // onChange={handleForm}
                  // value={newTelaForm.color}
                  onBlur={handleKeyDown}
                />
                <label htmlFor="floatingInput-nombre-new-acc">Nombre</label>
              </div>
              <div className="error-msg">
                {errorsForm.nombre && <p>{errorsForm.nombre}</p>}
              </div>
              <div className="form-floating ">
                <input
                  type="email"
                  className={`form-control ${isValid.hasOwnProperty('email') ? (isValid.email ? 'is-valid' : 'is-invalid') : null}`}
                  id="floatingInputUserNewAcc"
                  placeholder="name@example.com"
                  autoComplete='off'
                  name='email'
                  value={newAccForm.email}
                  onChange={onChangeFormHandler}
                  onKeyDown={handleKeyDown}
                  onBlur={handleKeyDown}
                />
                <label htmlFor="floatingInputInputUserNewAcc">Email address</label>
              </div>
              <div className="error-msg">
                {errorsForm.email && <p>{errorsForm.email}</p>}
              </div>
              <div className="form-floating">
                <input type="password"
                  className={`form-control ${isValid.hasOwnProperty('password') ? (isValid.password ? 'is-valid' : 'is-invalid') : null}`}
                  id="floatingPasswordNewAcc"
                  placeholder="Password"
                  autoComplete='new-password'
                  name='password'
                  value={newAccForm.password}
                  onChange={onChangeFormHandler}
                  onKeyDown={handleKeyDown}
                  onBlur={handleKeyDown}
                />
                <label htmlFor="floatingPasswordNewAcc">Password</label>
              </div>
              <div className="error-msg">
                {errorsForm.password && <p>{errorsForm.password}</p>}
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className={`form-control ${isValid.hasOwnProperty('repeatPass') ? (isValid.repeatPass ? 'is-valid' : 'is-invalid') : null}`}
                  id="floatingRepeatPasswordNewAcc"
                  placeholder="Password"
                  autoComplete='new-password'
                  name='repeatPass'
                  value={newAccForm.repeatPass}
                  onChange={onChangeFormHandler}
                  onKeyDown={handleKeyDown}
                  onBlur={handleKeyDown}
                />
                <label htmlFor="floatingRepeatPasswordNewAcc">Repeat Password</label>
              </div>
              <div className="error-msg">
                {errorsForm.repeatPass && <p>{errorsForm.repeatPass}</p>}
              </div>
              <select
                className={`form-select form-select-lg ${isValid.hasOwnProperty('permisos') ? (isValid.permisos ? 'is-valid' : 'is-invalid') : null}`}
                // defaultValue='Nivel de permisos'
                aria-label="Large select example"
                name='permisos'
                value={newAccForm.permisos}
                onChange={onChangeFormHandler}
                onKeyDown={handleKeyDown}
                onBlur={handleKeyDown}
              >
                <option >Nivel de permisos</option>
                <option value="1">Uno</option>
                <option value="2">Dos</option>
                <option value="3">Tres</option>
                <option value="4">Cuatro</option>
                <option value="5">Cinco</option>
                <option value="6">Seis</option>
              </select>
              <div className="error-msg">
                {errorsForm.permisos && <p>{errorsForm.permisos}</p>}
              </div>
              {creacionExitosa ?
                <div className="btn-send-new-proveedor-container">
                  <button type="button" className="btn btn-success">Success</button>
                </div> :
                <button className="btn btn-primary btn-submit-new-acc" type="submit" onClick={submitHandler}>Enviar</button>

              }
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('modal-new-acc-form')
  )
}

export default ModalNewAcc
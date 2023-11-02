import React, { useState } from 'react'
import './Acces.css';
import HeaderAcces from '../components/HeaderAcces';
import { formIngresoUsuario } from '../constantes/formIngresoUsuario'
import { useContext } from 'react';
import UserConnectedContext from '../context/userConnectedContext';
import AccesContext from '../context/AccesContext';
// import UserConnectedContext from '../context/userConnectedContext';

const Acces = () => {

  const [ingresoCuenta, setIngresoCuenta] = useState(formIngresoUsuario);
  const [nuevoUsuarioForm, setNuevoUsuarioForm] = useState(false)
  const [listaUsuarios, setListaUsuarios] = useState([])

  const { userConnected, setUserConnected } = useContext(UserConnectedContext)
  const { acces, setAcces } = useContext(AccesContext)

  const handleOnchangeIngresoCuenta = (e) => {
    setIngresoCuenta({
      ...ingresoCuenta,
      [e.target.name]: e.target.value
    })
  }

  // const handleIngresarBtn = (e) => {
  //   console.log(ingresoCuenta.usuario, ingresoCuenta.password)

  //   const buscarUsuario = async () => {

  //     try {
  //       const res = await fetch("http://localhost:5000/usuarios")
  //       if (res.ok) {
  //         const json = await res.json()
  //         // console.log(json)
  //         setListaUsuarios(json);
  //       }
  //     } catch (error) {
  //       console.log("error en la peticion")
  //     }
  //   }
  //   buscarUsuario();
  //   const usuarioExistente = listaUsuarios.filter(user => {
  //     if (user.email === ingresoCuenta.usuario) {
  //       if (user.password === ingresoCuenta.password) {
  //         setUserConnected({
  //           id: user.id,
  //           usuario: user.nombre,
  //           mail: user.email,
  //           permiso: user.permiso
  //         })
  //         setAcces(true);
  //         console.log(`user ${user.nombre} conected`)
  //       }
  //     }
  //   })
  //   console.log
  // }
  const handleIngresarBtn = async (e) => {
   

    try {
      const res = await fetch("http://localhost:5000/usuarios")
      // console.log(res)
      if (res.ok) {
        const json = await res.json()

        // console.log(json)
        const usuarioEncontrado = json.find(user => user.email === ingresoCuenta.usuario && user.password === ingresoCuenta.password)
        if (usuarioEncontrado) {
          // console.log(usuarioEncontrado)

          setUserConnected({
            id: usuarioEncontrado.id,
            usuario: usuarioEncontrado.email,
            nombre: usuarioEncontrado.nombre,
            permiso: usuarioEncontrado.permiso
          })
          // console.log(usuarioEncontrado)
          setAcces(true);
        } else {
          console.log("usuario o password incorrectos")
        }

      } else {
        console.log("error en la peticion");
      }
    } catch (error) {
      console.log("error en la peticion")
    }
  }
  // buscarUsuario();
  // const usuarioExistente = listaUsuarios.filter(user => {
  //   if (user.email === ingresoCuenta.usuario) {
  //     if (user.password === ingresoCuenta.password) {
  //       setUserConnected({
  //         id: user.id,
  //         usuario: user.nombre,
  //         mail: user.email,
  //         permiso: user.permiso
  //       })
  //       setAcces(true);
  //       console.log(`user ${user.nombre} conected`)
  //     }
  //   }
  // })
  // console.log


  const handleNuevoUsuarioBtn = (e) => {
    nuevoUsuarioForm ? setNuevoUsuarioForm(false) : setNuevoUsuarioForm(true)


  }

  return (
    <div className="acces-container">
      <HeaderAcces />
      <div className="cont-sup-form">

        <div className="container-form-acces acces-flex">
          <div className="mark-form-acces acces-flex">
            <div className="sign-in">
              <h1><span className='sign-in'>Sign in</span></h1>
            </div>
            <div className="inputs">
              <div className="form__form-acces">
                <form action="">
                  <div className="form-acces">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput-usuario"
                      autoComplete='user'
                      placeholder="usuario"
                      name='usuario'
                      onChange={handleOnchangeIngresoCuenta}
                      value={ingresoCuenta.usuario}
                      // onBlur={handleBlur}

                      required
                    />
                    <input
                      type="password"
                      className="form-control"
                      id="floatingInput-password"
                      placeholder="password"
                      name='password'
                      autoComplete='current-password'

                      onChange={handleOnchangeIngresoCuenta}
                      value={ingresoCuenta.password}
                    // onBlur={handleBlur}

                    // required
                    />

                    <div className="btn-send-new-proveedor-container">
                      <button type="button" className="btn btn-primary form-acces-submit-btn" onClick={handleIngresarBtn}>Ingresar</button>
                    </div> :
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <h1>Love Africa</h1> */}
    </div>
  )

}
export default Acces
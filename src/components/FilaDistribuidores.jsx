import React, { useState } from 'react'
import { MdOutlineExpandMore, MdOutlineExpandLess, MdOutlineEdit } from 'react-icons/md';
import '../components/FilaDistribuidores.css';


const initialStateSetEdit = {
  empresa: false,
  email: false,
  contacto: {
    nombre: false,
    cel: false,
    emailContacto: false
  },
  direction: {
    calle: false,
    nro: false
  },
  localidad: false,
  sector: false,
}


const FilaDistribuidores = ({ el, setDisHasChanged }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editDis, setEditDis] = useState(initialStateSetEdit)
  const [nombreEmpresa, setNombreEmpresa] = useState(false);
  const [celContacto, setCelContacto] = useState(false);
  const [emailContacto, setEmailContacto] = useState(false);

  const [formDis, setFormDis] = useState({
    empresa: el.empresa,
    email: el.email,
    contacto: {
      nombre: el.contacto.nombre,
      cel: el.contacto.cel,
      emailContacto: el.contacto.emailContacto
    },
    direccion: {
      calle: el.direccion.calle,
      nro: el.direccion.nro
    },
    localidad: el.localidad,
    sector: el.sector
  })

  const expandHandler = (e) => {
    isExpanded ? setIsExpanded(false) : setIsExpanded(true)
  }

  const formHandeler = (e) => {
    console.log(e)
    console.log(e.target)
    console.log(e.target.value)
    setFormDis({
      ...formDis,
      [e.target.name]: e.target.value
    })
  }
  const formContactHandeler = (e) => {
    console.log(e)
    console.log(e.target)
    console.log(e.target.value)
    setFormDis({
      ...formDis,
      contacto: {
        ...formDis.contacto,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleConfirmBtn = async (e) => {
    e.preventDefault();
    const newBody = {
      ...formDis,
      id: el.id
    }

    const res = await fetch(`http://localhost:4000/distribuidores/${el.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBody)
    })
    if (res.ok) {
      const objetoActualizado = await res.json();
      console.log(objetoActualizado);
      setDisHasChanged(true)
      setEditDis(initialStateSetEdit)
      setNombreEmpresa(false)
      setCelContacto(false)
      setEmailContacto(false)
    } else {
      console.log(res)
      console.log(res.status)
    }
  }

  const setEditDisHandler = (item) => {

    !editDis[item] ?
      setEditDis({
        ...editDis,
        [item]: true
      }) :
      setEditDis({
        ...editDis,
        [item]: false

      })
  }

  const handleNombreEmpresa = (e) => {
    nombreEmpresa ? setNombreEmpresa(false) : setNombreEmpresa(true)
  }

  const handleCelContacto = (e) => {
    celContacto ? setCelContacto(false) : setCelContacto(true);
  }

  const handleEmailContacto = (e) => {
    emailContacto ? setEmailContacto(false) : setEmailContacto(true);
  }


  return (
    <>
      <div className="wrapper">
        <div className={isExpanded ? 'is-expanded distribuidor-container' : "distribuidor-container"} onClick={expandHandler}  >
          <div className="empresa__distribuidor-container"  >
            {el.empresa}
          </div>
          <div className="rubro__distribuidor-container" >
            {el.sector}
          </div>
          {!isExpanded ? <MdOutlineExpandMore size={30} onClick={expandHandler} /> : <MdOutlineExpandLess size={30} />}
        </div>
        <div className={isExpanded ? 'expanded' : 'none'}>
          <div className="distribuidor-detalles">

            {el.empresa &&
              !editDis.empresa ?
              <div className="distribuidor-data">
                <b>Empresa:</b>  {el.empresa}
                <MdOutlineEdit onClick={() => setEditDisHandler("empresa")} />
              </div> :
              <>
                <div className="item-form">
                  <input onChange={formHandeler} type="text" value={formDis.empresa} name='empresa' />
                  <MdOutlineEdit onClick={() => setEditDisHandler("empresa")} />
                  <button onClick={handleConfirmBtn} className='confirm' type='submit'>Confirm</button>
                </div>
              </>
            }

            {el.email &&
              !editDis.email ?
              <div className="distribuidor-data">
                <b>Email:</b>  {el.email}
                <MdOutlineEdit onClick={() => setEditDisHandler("email")} />
              </div> :
              <>
                <div className="item-form">
                  <b>Email:</b>   <input onChange={formHandeler} type="text" value={formDis.email} name='email' />
                  <MdOutlineEdit onClick={() => setEditDisHandler("email")} />
                  <button onClick={handleConfirmBtn} className='confirm' type='submit'>Confirm</button>
                </div>
              </>
            }
            {el.localidad &&
              !editDis.localidad ?
              <div className="distribuidor-data">
                <b>Localidad:</b>  {el.localidad}
                <MdOutlineEdit onClick={() => setEditDisHandler("localidad")} />
              </div> :
              <>
                <div className="item-form">
                  <b>Localidad:</b> <input onChange={formHandeler} type="text" value={formDis.localidad} name='localidad' />
                  <MdOutlineEdit onClick={() => setEditDisHandler("localidad")} />
                  <button onClick={handleConfirmBtn} className='confirm' type='submit'>Confirm</button>
                </div>
              </>
            }
            <div className="distribuidor-data-contacto">
              <b>Contacto</b>
              {!nombreEmpresa ?
                <div className="distribuidor_data_contacto__nombre">
                  <b>Nombre:</b> {el.contacto.nombre}
                  <MdOutlineEdit onClick={handleNombreEmpresa} />
                </div> :
                <>
                  <div className="item-form">

                    <b> Nombre: </b><input type='text' onChange={formContactHandeler} value={formDis.contacto.nombre} name='nombre' />
                    <MdOutlineEdit onClick={handleNombreEmpresa} />
                    <button onClick={handleConfirmBtn} className='confirm' type='submit'>Confirm</button>
                  </div>
                </>
              }
              {!celContacto ?
                <div className="distribuidor_data_contacto__nombre">
                  <b>Cel:</b> {el.contacto.caracteristica} {el.contacto.cel}
                  <MdOutlineEdit onClick={handleCelContacto} />
                </div> :
                <div className="item-form">
                  <b>Cel:</b> <input type="text" name='cel' value={formDis.contacto.cel} onChange={formContactHandeler} />
                  <MdOutlineEdit onClick={handleCelContacto} />
                  <button onClick={handleConfirmBtn} className='confirm' type='submit'>Confirm</button>
                </div>
              }
              {!emailContacto ?
                <div className="distribuidor_data_contacto__nombre">
                  <b>Email:</b> {el.contacto.emailContacto}
                  <MdOutlineEdit onClick={handleEmailContacto} />
                </div>
                :
                <div className="item-form">
                  <b>Email:</b> <input type="text" name='emailContacto' value={formDis.contacto.emailContacto} onChange={formContactHandeler} />
                  <MdOutlineEdit onClick={handleEmailContacto} />
                  <button onClick={handleConfirmBtn} className='confirm' type='submit'>Confirm</button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
// formContactHandeler
export default FilaDistribuidores
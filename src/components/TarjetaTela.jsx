import React, { useContext, useEffect } from 'react'
import '../components/TarjetaTela.css';
import { MdAdd, MdOutlineCheck, MdOutlineEdit } from 'react-icons/md'
import { useState } from 'react';
import TelasAddedListContext from '../context/TelasAddedListContext';

const editInitialState = {
  codigoDistribuidor: ""
}

const TarjetaTela = ({ tela, setIsChanged }) => {
  const { telasAddedList, setTelasAddedList } = useContext(TelasAddedListContext)

  const [added, setAdded] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [editSucced, setEditSucced] = useState(false);

  const [edit, setEdit] = useState({
    codigoDistribuidor: tela.codigoDistribuidor,
    color: tela.color,
    tipo: tela.tipo,
    distribuidor: tela.distribuidor,
    temporada: tela.temporada,
  })

  useEffect(() => {
    setEditCard(false);
  }, [tela])

  const handleAddButton = (e) => {
    // added ? setAdded(false) : setAdded(true);
    if (added) {
      setAdded(false)
      const eliminarDeLista = telasAddedList.filter(item => item.id !== tela.id);
      setTelasAddedList(eliminarDeLista);

    } else {
      setAdded(true);
      setTelasAddedList([
        ...telasAddedList,
        tela
      ])
    }
  }

  // useEffect(()=>{
  //   // console.log(tela.id)
  //   telasAddedList.map((telaList)=> (telaList.id === tela.id && setAdded(true)))
    
  // },[TarjetaTela])

  useEffect(()=>{
    const isTelaAdded = telasAddedList.some((telaList)=> telaList.id === tela.id )
    setAdded(isTelaAdded)
  },[TarjetaTela])

  const handleEditForm = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    })
  }

  const handleEdditButton = (e) => {
    editCard ? setEditCard(false) : setEditCard(true);

  }
  // useEffect(() => {
  const handleConfirmBtn = async (e) => {
    e.preventDefault();

    try {
      const newBody = {
        ...edit,
        id: tela.id,
        idDistribuidor: tela.idDistribuidor,
        img: tela.img,
      }
      const res = await fetch(`http://localhost:3000/colors/${tela.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBody)
      })
      if (res.ok) {
        const objetoActualizado = await res.json();
        console.log(objetoActualizado);
        setIsChanged(true);
        setEditSucced(true);
        setTimeout(() => {
          setEditSucced(false)
        }, 5000);
      } else {
        console.log(res)
        console.log(res.status)
      }

    } catch (error) {
      console.log("Error:", error)
    }

  }
  // }, [tela])

  return (
    <>
      {!editCard ?
        <div className="tarjeta-tela-container" >
          {tela.img ? 
          <img src={tela.img} className="card-img-top img-tela-container" alt="..." />
          :
          <img src="src/db/imgs/image-not-found.jpg" className="card-img-top img-tela-container" alt="..." />
          }
          <div className="card-body tarjeta-tela-container">
            {/* <h5 className="card-title">Card title</h5> */}
            {/* className="card-text" */}
            <h5>Color: {tela.color}</h5>
            <h5>Codigo: {tela.codigoDistribuidor}</h5>
            <h5>Tipo: {tela.tipo}</h5>
            <h5>Distribuidor: {tela.distribuidor}</h5>
            <h5>Temporada: {tela.temporada}</h5>
            <h5>Id: {tela.id}</h5>
            <div className="acciones-container">
              {added ?
                <a className="btn btn-primary added" onClick={handleAddButton}><MdOutlineCheck size={30} color="white" /></a>
                :
                <a className="btn btn-primary" onClick={handleAddButton}><MdAdd size={30} color='white' /></a>
              }
              <a className="btn btn-primary"><MdOutlineEdit size={30} color='white' onClick={handleEdditButton} /></a>
            </div>
          </div>
        </div>

        :
        <div className="tarjeta-tela-container" >
          <img src={tela.img} className="card-img-top img-tela-container" alt="..." />
          <div className="card-body"></div>
          <div className="edit-card">

            <div className="form-floating mb-3 input-tela-form">
              <input type="text" className="form-control" id="floatingInput-tela-color" placeholder="Color" name='color' onChange={handleEditForm} value={edit.color} />
              <label htmlFor="floatingInput-contact-name">Color</label>
            </div>
            <div className="form-floating mb-3 input-tela-form">
              <input type="text" className="form-control" id="floatingInput-tela-codigo-distribuidor" placeholder="Codigo" name='codigoDistribuidor' onChange={handleEditForm} value={edit.codigoDistribuidor} />
              <label htmlFor="floatingInput-contact-name">Codigo Distribuidor</label>
            </div>
            <div className="form-floating mb-3 input-tela-form">
              <input type="text" className="form-control" id="floatingInput-tela-tipo" placeholder="Tipo" name='tipo' onChange={handleEditForm} value={edit.tipo} />
              <label htmlFor="floatingInput-contact-name">Tipo</label>
            </div>
            <div className="form-floating mb-3 input-tela-form">
              <input type="text" className="form-control" id="floatingInput-tela-distribuidor" placeholder="Color" name='distribuidor' onChange={handleEditForm} value={edit.distribuidor} />
              <label htmlFor="floatingInput-contact-name">Distribuidor</label>
            </div>
            <div className="form-floating mb-3 input-tela-form">
              <input type="text" className="form-control" id="floatingInput-tela-temporada" placeholder="Temporada" name='tamporada' onChange={handleEditForm} value={edit.temporada} />
              <label htmlFor="floatingInput-contact-name">Temporada</label>
            </div>

            {/* <span> <h4>Color:</h4> <input onChange={handleEditForm} type="text" name='color' value={edit.color} /></span>
            <span> <h4>Codigo:</h4><input onChange={handleEditForm} type="text" name='codigoDistribuidor' value={edit.codigoDistribuidor} /></span>
            <span> <h4>Tipo:</h4><input onChange={handleEditForm} type="text" name='tipo' value={edit.tipo} /></span>
            <span> <h4>Distribuidor:</h4><input onChange={handleEditForm} type="text" name='distribuidor' value={edit.distribuidor} /></span>
            <span> <h4>Temporada:</h4><input onChange={handleEditForm} type="text" name='temporada' value={edit.temporada} /> </span> */}
            <div className="btn-confirmar-edicion-container">
              {editSucced ?
                <button type="button" className="btn btn-success">Success</button> :
                <button
                  type="button"
                  className="btn btn-primary"
                  id='btn-confirm-edit'
                  onClick={handleConfirmBtn}
                >
                  Confirm
                </button>
              }
              {/* <div className="btn-send-new-proveedor-container"> */}
              {/* <button onClick={handleConfirmBtn} type='submit' className='btn-confirmar'>Confirmar</button> */}
            </div>
          </div>
          <div className="acciones-container">
            {added ?
              <a className="btn btn-primary added" onClick={handleAddButton}><MdOutlineCheck size={30} color="white" /></a>
              :
              <a className="btn btn-primary" onClick={handleAddButton}><MdAdd size={30} color='white' /></a>
            }
            <a className="btn btn-primary"><MdOutlineEdit size={30} color='white' onClick={handleEdditButton} /></a>
          </div>
        </div >

      }
      {/* <div className="tarjeta-tela-container">
        <div className="img-tela-container">
          <img className='img' src={tela.img} alt="" />
        </div>
        <div className="detalles-acciones-container">
          {!editCard ?

            <div className="detalles-tela">

              <h4>Color: {tela.color}</h4>
              <h4>Codigo: {tela.codigoDistribuidor}</h4>
              <h4>Tipo: {tela.tipo}</h4>
              <h4>Distribuidor: {tela.distribuidor}</h4>
              <h4>Temporada: {tela.temporada}</h4>
              <h4>Id: {tela.id}</h4>
            </div>
            :
            <div className="edit-card">
              <span> <h4>Color:</h4> <input onChange={handleEditForm} type="text" name='color' value={edit.color} /></span>
              <span> <h4>Codigo:</h4><input onChange={handleEditForm} type="text" name='codigoDistribuidor' value={edit.codigoDistribuidor} /></span>
              <span> <h4>Tipo:</h4><input onChange={handleEditForm} type="text" name='tipo' value={edit.tipo} /></span>
              <span> <h4>Distribuidor:</h4><input onChange={handleEditForm} type="text" name='distribuidor' value={edit.distribuidor} /></span>
              <span> <h4>Temporada:</h4><input onChange={handleEditForm} type="text" name='temporada' value={edit.temporada} /> </span>
              <div className="btn-confirmar-container">
                <button onClick={handleConfirmBtn} type='submit' className='btn-confirmar'>Confirmar</button>
              </div>
            </div>
          }
          <div className="acciones-container">
            {added
              ? <button onClick={handleAddButton} className='added card-telas-btn' >
                <MdOutlineCheck size={100} color="white" />
              </button>
              : <button onClick={handleAddButton} className='card-telas-btn' >
                <MdAdd size={100} color='white' />
              </button>
            }
            <button onClick={handleEdditButton} className='card-telas-btn' >
              <MdOutlineEdit size={100} color='white' />
            </button>

          </div>
        </div>
      </div> */}
    </>
  )
}

export default TarjetaTela
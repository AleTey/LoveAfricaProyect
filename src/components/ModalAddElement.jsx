// import React from 'react'
import '../components/ModalAddElement.css'
import { MdClose } from 'react-icons/md'
import ReactDOM from 'react-dom'
import { useState } from 'react'

const ModalAddElement = ({
  children,
  title,
  setModalWindowIsVisible,
  newTelaForm,
  setNewTelaForm,
  initialState,
  setIsChanged
}) => {

  const [successful, setSuccessful] = useState(false)

  const handleClose = (e) => {
    setModalWindowIsVisible(false);
  }

  const handleSelectFile = (e) => {
    console.log(e.target.files[0]);
  }

  const bntSendForm = (e) => {
    e.preventDefault();
    const sendForm = async () => {

      try {
        const res = await fetch("http://localhost:3000/colors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newTelaForm)
        });

        if (res.ok === true) {
          // console.log(res)
          const objLoaded = await res.json();
          // console.log(objLoaded);
          setNewTelaForm(initialState)
          setSuccessful(true)
          setIsChanged(true)
          setTimeout(() => {
            setSuccessful(false)
            setIsChanged(false)
          }, 5000)
        } else {
          console.log(res);
          console.log(res.status);
        }

      } catch (error) {
        console.log("Error:", error);
      }
    }
    sendForm();
  }

  return ReactDOM.createPortal(
    <div className="modal-widow-container">
      <button onClick={handleClose} className='close-window'>
        <MdClose />
      </button>
      <div className="container-add">
        <h4 className='title-add-tela'>{title}</h4>
        <div className="modal-window">
          <div className="form">
            {children}
          </div>
          {/* <div className="upload-img">
            <div className="img-carg">

            </div>
            <input type="file" name='file' onChange={handleSelectFile} className='btn-cargar' />
            <button className='btn-upload'>Guardar Img</button>
          </div> */}
        </div>

        {successful ?
          <div className="btn-send-new-color-container">
            <button type="button" className="btn btn-success">Success</button>
          </div> :
          <div className="btn-send-new-color-container">
            <button
              type="button"
              className="btn btn-primary"
              id='btn-send-new-color'
              onClick={bntSendForm}
            >
              Agregar
            </button>

          </div>
        }
      </div>
    </div>,
    document.getElementById('modal-window')
  )
}

export default ModalAddElement
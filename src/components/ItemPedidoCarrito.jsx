import React from 'react'
import './ItemPedidoCarrito.css';
import { useState } from 'react';
import { LuPlus, LuMinus, LuTrash2 } from 'react-icons/lu'


const ItemPedidoCarrito = ({ item, cant, setCant, deleteItem }) => {
  const [cantItems, setCantidadItems] = useState(1)

  const handleOnClickSum = (e) => {

    setCantidadItems(cantItems + 1)
    setCant(cant + 1)
  }
  const handleOnClickRes = (e) => {
    if (cantItems > 1) {
      setCantidadItems(cantItems - 1)
      setCant(cant - 1)
    }
  }

  const handleDeleteBtn = (e) => {
    deleteItem(item.id);
    // console.log(item.id)
  }

  return (
    <>
      <div className="item-carrito">
        <div className="img-item-carrito">
          {item.img ? <img src={item.img} alt="" /> : <img src="src/db/imgs/image-not-found.jpg" alt="" />}
        </div>
        <div className="detalle-item-carrito">
          <div className="detalles-primarios-carrito">
            <p>{item.color}</p>
          </div>
          <div className="detalles-secundarios-carrito">
            <p>{item.tipo}</p>
          </div>
        </div>
        <div className="cantidades__item-carrito-container">

          <div className="cantidades__item-carrito">
            {/* <button type="button" class="btn btn-primary cant-carrito-btn" onClick={handleOnClickSum}><LuPlus /></button> */}
            <LuPlus onClick={handleOnClickSum}/>
            <div className="cant-container__item-carrito">
              <p>{cantItems}</p>
            </div>
            {/* <button type="button" class="btn btn-primary cant-carrito-btn" onClick={handleOnClickRes}><LuMinus /></button> */}
            <LuMinus onClick={handleOnClickRes}/>
          </div>
        </div>
        <div className="eliminar__item-carrito-container">

          <div className="eliminar-item__item-carrito">
            {/* <button type="button" class="btn btn-primary" onClick={handleDeleteBtn}><LuTrash2 /></button> */}
            <LuTrash2 size="1.5rem" onClick={handleDeleteBtn} />
            {/* <button>  </button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemPedidoCarrito
import React from 'react'
import './PedidosCarrito.css';
import ItemPedidoCarrito from './ItemPedidoCarrito';
import { useState } from 'react';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';

const PedidosCarrito = ({ pack, deleteItem }) => {
  const [cant, setCant] = useState(1);
  const [expanded, setExpanded] = useState(true)

  const handleExpande = (e) => {
    expanded ? setExpanded(false) : setExpanded(true);
  }

  return (
    <>
      <div className="pack-container">
        <div className="header-container" onClick={handleExpande}>
          <div className="nombre-empresa__header">
            <h5>{pack.distribuidor.empresa}</h5>
          </div>

          <div className="rubro__header">
            <h6>{pack.distribuidor.sector}</h6>
          </div>
          <div className="expand-items-added-list">
            {expanded ? <MdOutlineExpandLess size="2rem" /> :
              <MdOutlineExpandMore size="2rem" />
            }
          </div>
        </div>
        <div className={expanded ? 'contenedor-items' : 'contenedor-items-off'}>

          {pack.selectTelas.map(objTela => (
            <ItemPedidoCarrito key={objTela.id} item={objTela} cant={cant} setCant={setCant} deleteItem={deleteItem} />
          ))}
        </div>
      </div>
    </>
  )
}

export default PedidosCarrito
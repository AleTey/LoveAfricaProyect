import React from 'react'
import '../pages/Carrito.css'
import { useContext } from 'react'
import TelasAddedListContext from '../context/TelasAddedListContext'
import ProveedoresListContext from '../context/ProveedoresListContext'
import { useState } from 'react'
import { useEffect } from 'react'
import PedidosCarrito from '../components/PedidosCarrito'

const Carrito = () => {

  const { telasAddedList, setTelasAddedList } = useContext(TelasAddedListContext)
  const { proveedoresList, setProveedoresList } = useContext(ProveedoresListContext);
  const [paquetesProvTelas, setPaquetesProvTelas] = useState([])
  const [idItemDelete, setIdItemDelete] = useState("")

  useEffect(() => {
    const proveedoresUsados = new Set();
    if (telasAddedList) {
      // console.log(telasAddedList)
      telasAddedList.forEach(el => {
        // console.log(el)
        proveedoresList.forEach(prov => {
          // console.log(prov)
          if (el.idDistribuidor === prov.id) {
            proveedoresUsados.add(prov)
          }
        });
      });
      console.log(proveedoresUsados)
    }

    if (proveedoresUsados) {
      setPaquetesProvTelas([])
      const newPack = []
      proveedoresUsados.forEach(prov => {
        // console.log(prov)
        const pack = {
          distribuidor: {},
          selectTelas: []
        }
        telasAddedList.forEach(el => {
          if (el.idDistribuidor === prov.id) {
            const entries = Object.entries(pack.distribuidor).length === 0;
            if (entries) {
              pack.distribuidor = prov
            }
            pack.selectTelas.push(el)
          }
        });
        console.log("pack", pack)
        newPack.push(pack)
        console.log("PaquetesProvTelas", paquetesProvTelas)
      });
      setPaquetesProvTelas(newPack)
    }
  }, [telasAddedList, PedidosCarrito])

  useEffect(()=>{

  },[idItemDelete])

  const deleteItem = (id) =>{
    
    const newArray = telasAddedList.filter((el)=> el.id !== id )
    console.log(newArray)
    // setPaquetesProvTelas(newArray);
    setTelasAddedList(newArray)
  }

  return (
    <div className="carrito-container">
      <div className="carrito-title-container">
        <h2>Carrito</h2>
      </div>
      <div className="sub-container-carrito">
        {paquetesProvTelas.map(pack => (
          <PedidosCarrito key={pack.distribuidor.id} pack={pack} deleteItem={deleteItem} />
        ))}
      </div>
    </div>

  )
}

export default Carrito
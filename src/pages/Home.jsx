import React, { useContext, useEffect } from 'react'
// import ProveedoresListContext from '../context/ProveedoresListContext'


const Home = () => {

  // const {setProveedoresList, setProveedoresList} = useContext(ProveedoresListContext)
  // const {proveedoresList,setProveedoresList} = useContext(ProveedoresListContext)

  // useEffect(() => {
  //   const fetchDistribuidores = async () => {

  //     try {
  //       const res = await fetch("http://localhost:4000/distribuidores")
  //       // console.log(res);
  //       if (res.ok) {
  //         const json = await res.json();
  //         // setdbDistribuidores(json);
  //         // console.log(dbDistribuidores)
  //         setProveedoresList(json)

  //         // console.log(proveedoresList)
  //       }
  //     } catch (error) {
  //       // console.log("error", res.status)
  //     }
  //     // setDisHasChanged(false)
  //   }
  //   fetchDistribuidores();
  // }, [])
  return (
    <h2>HOME</h2>
  )
}

export default Home
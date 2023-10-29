import { createContext, useState } from 'react';

const ListaProveedoresContext = createContext();

const listaProveedoresProvider = ({ children }) => {
  const [listaProveedores, setListaProveedores] = useState([]);

  const data = { listaProveedores, setListaProveedores };

  return (
    <listaProveedoresProvider value={data}>
      {children}
    </listaProveedoresProvider>
  )
}

export { listaProveedoresProvider };
export default ListaProveedoresContext;
import { createContext, useState } from "react";

const ProveedoresListContext = createContext();

const ProveedoresListProvider = ({ children }) => {
  const [proveedoresList, setProveedoresList] = useState([]);
  const data = { proveedoresList, setProveedoresList }

  return (
    <ProveedoresListContext.Provider value={data}>
      {children}
    </ProveedoresListContext.Provider>
  )

}

export { ProveedoresListProvider }
export default ProveedoresListContext


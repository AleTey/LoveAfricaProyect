import { useState } from "react";
import { createContext } from "react";

const AccesContext = createContext()

const AccesProvider = ({ children }) => {
  const [acces, setAcces] = useState(false);

  const data = { acces, setAcces }

  return (
    <AccesContext.Provider value={data}>
      {children}
    </AccesContext.Provider>
  )
}


export { AccesProvider }
export default AccesContext;
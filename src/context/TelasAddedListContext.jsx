import { createContext, useState } from "react";

const TelasAddedListContext = createContext();

const TelasAddedListProvider = ({ children }) => {

  const [telasAddedList, setTelasAddedList] = useState([])

  const data = { telasAddedList, setTelasAddedList }

  return (
    <TelasAddedListContext.Provider value={ data }>
      {children}
    </TelasAddedListContext.Provider>
  )
}

export { TelasAddedListProvider };
export default TelasAddedListContext;



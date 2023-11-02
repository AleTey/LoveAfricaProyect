import React, { createContext, useState } from 'react'

const UserConnectedContext = createContext();

const UserConnectedProvider = ({ children }) => {

  const [userConected, setUserConnected] = useState({})

  const data = { userConected, setUserConnected }

  return (
    <UserConnectedContext.Provider value={data} >
      {children}
    </UserConnectedContext.Provider>
  )
}



export default UserConnectedContext;
export { UserConnectedProvider }
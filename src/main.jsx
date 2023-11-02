import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TelasAddedListProvider } from './context/TelasAddedListContext.jsx'
import { ProveedoresListProvider } from './context/ProveedoresListContext.jsx'
import { UserConnectedProvider } from './context/userConnectedContext.jsx'
import { AccesProvider } from './context/AccesContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TelasAddedListProvider>
      <ProveedoresListProvider>
        <UserConnectedProvider>
          <AccesProvider>
            <App />
          </AccesProvider>
        </UserConnectedProvider>
      </ProveedoresListProvider>
    </TelasAddedListProvider>
  </React.StrictMode>,

)

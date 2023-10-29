import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TelasAddedListProvider } from './context/TelasAddedListContext.jsx'
import { ProveedoresListProvider } from './context/ProveedoresListContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TelasAddedListProvider>
      <ProveedoresListProvider>
        <App />
      </ProveedoresListProvider>
    </TelasAddedListProvider>
  </React.StrictMode>,
)

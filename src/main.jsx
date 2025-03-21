import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Authprovider } from './contexts/Auth.jsx'
import { GroupContextProvider } from './contexts/GroupContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GroupContextProvider>
      <Authprovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Authprovider>
    </GroupContextProvider>
  </StrictMode>,
)

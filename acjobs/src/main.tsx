import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routers from './routes'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  </StrictMode>,
)

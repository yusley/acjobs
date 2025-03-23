import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import Routers from './routes'
import { BrowserRouter } from 'react-router'
import AuthProvider from './contexts/authContext'
import { CookiesProvider } from 'react-cookie'
import JobsProvider from './contexts/jobsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <JobsProvider>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </JobsProvider>
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Global error handlers for better debugging in production/dev
window.addEventListener('error', (event) => {
  // event.error is often an Error object with stack
  console.error('[GlobalError] ', event.error || event.message || event)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('[UnhandledRejection] ', event.reason)
})

window.addEventListener('load', () => {
  console.log('[App] Loaded', { href: window.location.href })
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

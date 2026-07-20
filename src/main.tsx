import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const isWindows = /Win/i.test(navigator.platform) || /Windows/i.test(navigator.userAgent)

if (isWindows) {
  document.documentElement.classList.add('os-windows')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

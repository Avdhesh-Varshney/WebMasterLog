import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from "@/components/ui/sonner"
import ValueState from './context/ValueState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ValueState>
    <App />
    <Toaster />
    </ValueState>
  </StrictMode>,
)

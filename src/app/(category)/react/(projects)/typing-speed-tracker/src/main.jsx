import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TestModeContextProvider } from './context/TestModeContext.jsx'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ThemeContextProvider>
    <TestModeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TestModeContextProvider>
  </ThemeContextProvider>
  </React.StrictMode>,
)

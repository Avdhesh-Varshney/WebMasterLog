import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthWrapper from './hooks/UseAuth.jsx'
import NotesWrapper from './hooks/UseNote.jsx'
import FoldersWrapper from './hooks/UseFolder.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <NotesWrapper>
          <FoldersWrapper>
            <App />
            <Toaster />
          </FoldersWrapper>
        </NotesWrapper>
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)

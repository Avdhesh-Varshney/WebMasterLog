import { useEffect, useState } from 'react'
import './App.css'
import { GlobalStyles } from './styles/global'
import Header from './components/Header'
import TypingBox from './components/TypingBox'
import Footer from "./components/Footer"
import { ThemeProvider } from 'styled-components'
import { useTheme } from './context/ThemeContext'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'

function App() {
  const {theme} = useTheme();

  return (
    <ThemeProvider theme={{...theme}}>
      <ToastContainer />
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user' element={<UserPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App

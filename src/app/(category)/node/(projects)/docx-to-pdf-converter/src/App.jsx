import React from 'react'
import FileUpload from './Components/FileUpload'
import Navbar from './Components/Navbar'
import Landing from './Components/Landing'
import Center from './Components/Center'

function App() {
  return (
    <div>
      <Navbar/>
      <Landing/>
      <Center/>
      <FileUpload/>

    </div>
  )
}

export default App
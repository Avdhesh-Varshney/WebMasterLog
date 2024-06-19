import { Route, Routes } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import DashBoard from './pages/my/DashBoard'
import RegistrationSuccess from './pages/auth/RegistrationSuccess'
import { useContext, useEffect } from 'react'
import NewNote from './pages/my/NewNote'
import EditNote from './pages/my/EditNote'
import { AuthContext } from './contexts/AuthContext'
import Footer from './components/Footer'
import Info from './components/Info'
import ViewNote from './pages/my/ViewNote'

function App() {

  const { currentUser, fetchingUser, fetchCurrentUser } = useContext(AuthContext)
  // useEffect(() => {
  //   fetchCurrentUser();
  // }, [])
  if (fetchingUser) return <Info message="Loading..." />;


  return (

    <>
      <Routes>

        <Route path='/' element={<DashBoard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/registrationSuccess' element={<RegistrationSuccess />} />
        <Route path='/newnote/:folderId' element={<NewNote user={currentUser} />} />
        <Route path='/newnote' element={<NewNote user={currentUser} />} />
        <Route path='/editnote/:noteId' element={<EditNote user={currentUser} />} />
        <Route path='/:folderId' element={<DashBoard />} />
        <Route path='/note/:noteId' element={<ViewNote />} />

      </Routes>
      <Footer />
    </>

  )
}

export default App

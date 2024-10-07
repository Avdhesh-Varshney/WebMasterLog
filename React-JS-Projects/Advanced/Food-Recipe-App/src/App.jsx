import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import {recipeContext} from './context/context'
import { useState } from 'react'


 function App() {
  const [recipeList, setRecipeList] = useState([])
  return (
    <recipeContext.Provider value={{recipeList,setRecipeList}}>
      <div className="App bg-zinc-600 w-full h-screen bg-black text-white min-h-screen">
      <header>
        <Navbar/>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
    </recipeContext.Provider>
  )
}

export default App

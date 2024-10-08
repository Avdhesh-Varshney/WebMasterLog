import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import Recipes from './pages/Recipes'
import Home from './pages/Home'
import Default from './pages/Default'
import SingleRecipe from './pages/SingleRecipe'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route index element={<Home/>}/>
       <Route path="recipes" element={<Recipes/>}/>
       <Route path="recipes/:id" element={<SingleRecipe/>}/>
       <Route path="*" element={<Default/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

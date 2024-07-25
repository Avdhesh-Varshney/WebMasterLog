import { Provider } from "react-redux"
import Cart from "./pages/Cart"
import Products from "./pages/Products"
import store from "./redux/Store"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </Provider>
  )
}

export default App

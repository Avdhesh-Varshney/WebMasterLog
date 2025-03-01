import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="login" element={<h1>Login Page</h1>} />
          <Route path="signup" element={<h1>SignUp Page</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App;

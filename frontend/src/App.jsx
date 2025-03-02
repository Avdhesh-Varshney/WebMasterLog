import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/UserAuthForm";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="login" element={<UserAuthForm type="login" />} />
          <Route path="signup" element={<UserAuthForm type="signup" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;

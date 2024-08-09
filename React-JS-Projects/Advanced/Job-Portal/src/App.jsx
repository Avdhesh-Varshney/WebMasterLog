import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components";
import {
  Companies,
  FindJobs,
  JobDetail,
} from "./pages";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <main className='bg-[#f7fdfd]'>
      <Navbar />

      <Routes>
        <Route
          path='/'
          element={<Navigate to='/find-jobs' replace={true} />}
        />
        <Route
          path='/find-jobs'
          element={user?.token ? <FindJobs /> : <Navigate to='/user-auth' state={{ from: location }} replace />}
        />
        <Route
          path='/companies'
          element={user?.token ? <Companies /> : <Navigate to='/user-auth' state={{ from: location }} replace />}
        />
        <Route
          path='/job-detail/:id'
          element={user?.token ? <JobDetail /> : <Navigate to='/user-auth' state={{ from: location }} replace />}
        />
      </Routes>
    </main>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Report from './pages/Report';
import TransportationTask from './pages/TransportationTask';
import SignIn from './pages/SignIn';
import CustomizedSnackbars from './components/CustomizedSnackBars';
import RequireAuth from './components/auth/RequireAuth';
import { ROLES } from '../config/roles';
import Loading from './components/Loading';
import PersistLogin from './components/auth/PersistLogin';
import Prefetch from './components/auth/Prefetch';
import TaskReport from './pages/TaskReport';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="sign-in" element={<SignIn />} />

          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />

                  <Route path="report">
                    <Route index element={<Report />} />
                    <Route path=":id" element={<TaskReport />} />
                  </Route>

                  <Route
                    path="transportation-task"
                    element={<TransportationTask />}
                  />

                  {/* Wildcard route for 404 */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <CustomizedSnackbars />
      <Loading />
    </>
  );
};

export default App;

import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Sign_in from "./components/Login/Sign_in";
import Sign_up from "./components/Login/Sign_up";
import DefaultUser from "./components/UserPages/DefaultUser";
import AdminInterface from "./components/UserPages/AdminInterface";
import { AuthProv } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/Login",
    element: (
      <div>
        <Sign_in />
      </div>
    ),
  },
  {
    path: "/UserInterface",
    element: (
      <ProtectedRoutes>
        <DefaultUser />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/AdminInterface",
    element: (
      <ProtectedRoutes>
        <AdminInterface />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/Register",
    element: (
      <div>
        <Sign_up />
      </div>
    ),
    errorElement: <h1>Error</h1>,
  },
]);
function App() {
  return (
    <div>
      <AuthProv>
        <RouterProvider router={router}></RouterProvider>
      </AuthProv>
    </div>
  );
}

export default App;

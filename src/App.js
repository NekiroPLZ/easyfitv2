/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sign_in from "./components/Login/Sign_in";
import Sign_up from "./components/Login/Sign_up";
import DefaultUser from "./components/UserPages/DefaultUser";
import AdminInterface from "./components/UserPages/AdminInterface";
import { AuthProv } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import Questions from "./components/Questions/Questions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/Login",
    element: <Sign_in />,
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
  { path: "/Questions", element: <Questions /> },
]);
function App() {
  return (
    <div>
      <ThemeProvider>
        <AuthProv>
          <RouterProvider router={router}></RouterProvider>
        </AuthProv>
      </ThemeProvider>
    </div>
  );
}

export default App;

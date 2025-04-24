import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import MainLayout from "./Layouts/MainLayout";

import HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Customer/LoginForm";
import Register from "./Pages/Customer/RegisterForm";
import Dashboard from "./Pages/Customer/UserDashboard";
import Settings from "./Pages/Customer/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;

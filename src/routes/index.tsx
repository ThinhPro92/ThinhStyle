import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoutes from "./clientRoutes";
import { staffRoutes } from "./staffRoutes";

const router = createBrowserRouter([...clientRoutes(), ...staffRoutes()]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

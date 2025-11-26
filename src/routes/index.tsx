import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoutes from "./clientRoutes";

const router = createBrowserRouter([...clientRoutes()]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

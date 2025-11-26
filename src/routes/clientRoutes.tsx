import LayoutMain from "../components/layouts/LayoutMain";
import NotFound404 from "../components/NotFound404";
import HomePage from "../pages/HomePage";

const clientRoutes = () => [
  {
    path: "/",
    Component: LayoutMain,
    children: [
      { path: "", Component: HomePage },
      { path: "*", Component: NotFound404 },
    ],
  },
];

export default clientRoutes;

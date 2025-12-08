import LayoutMain from "../components/layouts/LayoutMain";
import NotFound404 from "../components/layouts/NotFound404";
import BarbersPage from "../pages/client/BarbersPage";
import BlogPage from "../pages/client/BlogPage";
import BookingPage from "../pages/client/BookingPage";
import HomePage from "../pages/client/HomePage";
import ServicesPage from "../pages/client/ServicesPage";

const clientRoutes = () => [
  {
    path: "/",
    Component: LayoutMain,
    children: [
      { index: true, Component: HomePage },
      { path: "/booking", Component: BookingPage },
      { path: "/booking/phone-verify", Component: BookingPage },
      { path: "/barbers", Component: BarbersPage },
      { path: "/services", Component: ServicesPage },
      { path: "/blogs", Component: BlogPage },
      { path: "*", Component: NotFound404 },
    ],
  },
];

export default clientRoutes;

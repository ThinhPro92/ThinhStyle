import LayoutMain from "../components/layouts/LayoutMain";
import NotFound404 from "../components/layouts/NotFound404";
import BarbersPage from "../pages/client/BarbersPage";
import BookingPage from "../pages/client/BookingPage";
import HomePage from "../pages/client/HomePage";

const clientRoutes = () => [
  {
    path: "/",
    Component: LayoutMain,
    children: [
      { index: true, Component: HomePage },
      { path: "/booking", Component: BookingPage },
      { path: "/booking/phone-verify", Component: BookingPage },
      { path: "/barbers", Component: BarbersPage },
      { path: "*", Component: NotFound404 },
    ],
  },
];

export default clientRoutes;

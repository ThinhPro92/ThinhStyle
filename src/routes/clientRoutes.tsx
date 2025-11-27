import LayoutMain from "../components/layouts/LayoutMain";
import NotFound404 from "../components/NotFound404";
import BookingPage from "../pages/client/BookingPage";
import HomePage from "../pages/client/HomePage";

const clientRoutes = () => [
  {
    path: "/",
    Component: LayoutMain,
    children: [
      { path: "", Component: HomePage },
      { path: "/booking", Component: BookingPage },
      { path: "/booking/phone-verify", Component: BookingPage },

      { path: "*", Component: NotFound404 },
    ],
  },
];

export default clientRoutes;

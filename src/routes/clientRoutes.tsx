import LayoutMain from "../components/layouts/LayoutMain";
import NotFound404 from "../components/layouts/NotFound404";
import BarbersPage from "../pages/client/BarbersPage";
import BlogPage from "../pages/client/BlogPage";
import BookingPage from "../pages/client/BookingPage";
import HistoryPage from "../pages/client/HistoryPage";
import HomePage from "../pages/client/HomePage";
import ProfileEditPage from "../pages/client/ProfileEditPage";
import ServicesPage from "../pages/client/ServicesPage";

const clientRoutes = () => [
  {
    path: "/",
    Component: LayoutMain,
    children: [
      { index: true, Component: HomePage },
      { path: "booking/*", Component: BookingPage },
      { path: "/barbers", Component: BarbersPage },
      { path: "/services", Component: ServicesPage },
      { path: "/blogs", Component: BlogPage },
      { path: "/profile/edit", Component: ProfileEditPage },
      { path: "/profile/history", Component: HistoryPage },
      { path: "*", Component: NotFound404 },
    ],
  },
];

export default clientRoutes;

import { StaffRoute } from "../components/auth/StaffRoute";
import StaffLoginForm from "../features/auth/staff/components/StaffLoginForm";
import AdminDashboard from "../components/layouts/DashboardAdmin";
import AdminNotFound from "../pages/admin/AdminNotFound";

import BarberAdmin from "../pages/admin/BarberAdmin";
import ServicesPage from "../pages/admin/ServicesPage";
import BlogsAdmin from "../pages/admin/BlogsAdmin";
import BarberDashboard from "../pages/admin/BarberDashboard";
import BookingsPage from "../pages/admin/BookingsPage";
import CustomersPage from "../pages/admin/CustomersPage";

export const staffRoutes = () => [
  {
    path: "/staff/login",
    Component: StaffLoginForm,
  },
  {
    path: "/admin",
    element: <StaffRoute />,
    children: [
      { path: "dashboard", Component: AdminDashboard },
      { path: "barbers", Component: BarberAdmin },
      { path: "services", Component: ServicesPage },
      { path: "blogs", Component: BlogsAdmin },
      { path: "bookings", Component: BookingsPage },
      { path: "customers", Component: CustomersPage },
      { path: "*", Component: AdminNotFound },
    ],
  },
  {
    path: "/barber",
    element: <StaffRoute />,
    children: [
      { path: "dashboard", Component: BarberDashboard },
      { path: "*", Component: AdminNotFound },
    ],
  },
];

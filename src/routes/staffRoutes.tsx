import { StaffRoute } from "../components/auth/StaffRoute";
import StaffLoginForm from "../features/auth/staff/components/StaffLoginForm";
import AdminDashboard from "../components/layouts/Dashboard";
import AdminNotFound from "../pages/admin/AdminNotFound";

import BarberAdmin from "../pages/admin/BarberAdmin";

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
      { path: "*", Component: AdminNotFound },
    ],
  },
  {
    path: "/barber",
    element: <StaffRoute />,
    children: [
      // { path: "schedule", Component: BarberSchedule },
      { path: "*", Component: AdminNotFound },
    ],
  },
];

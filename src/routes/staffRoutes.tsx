import { StaffRoute } from "../components/auth/StaffRoute";
import StaffLoginForm from "../features/auth/staff/components/StaffLoginForm";
import AdminDashboard from "../features/auth/staff/Dashboard";
import AdminNotFound from "../pages/admin/AdminNotFound";

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

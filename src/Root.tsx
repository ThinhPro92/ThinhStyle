import App from "./App";
import { useStaffAuthAdmin } from "./features/auth/staff/hooks/useStaffAuthAdmin";

export const Root = () => {
  useStaffAuthAdmin();
  return <App />;
};

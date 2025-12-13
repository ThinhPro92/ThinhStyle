import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { StaffUser } from "../../../../types/auth";
import { useStaffStore } from "../../../../store/useStaffStore";

interface AuthData {
  user: StaffUser;
  token: string;
}

export const useStaffAuthAdmin = () => {
  const { login, logout, setLoading } = useStaffStore();

  const query = useQuery<AuthData, Error>({
    queryKey: ["staffAuth"],
    queryFn: () => {
      const token = localStorage.getItem("staffToken");
      const role = localStorage.getItem("staffRole");
      const id = localStorage.getItem("staffId");
      const name = localStorage.getItem("staffName");

      if (!token || !role || !id || (role !== "admin" && role !== "barber")) {
        throw new Error("Unauthenticated");
      }

      return {
        user: {
          _id: id,
          name: name || "Staff",
          email: "staff@thinhstyle.com",
          role: role as "admin" | "barber",
        },
        token,
      };
    },
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      login(query.data.user, query.data.token);
    } else if (query.error) {
      logout();
    }
    setLoading(false);
  }, [query.data, query.error, login, logout, setLoading]);

  return query;
};

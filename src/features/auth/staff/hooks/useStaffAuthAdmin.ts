import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { StaffUser } from "../../../../types/auth";
import { useStaffStore } from "../../../../store/useStaffStore";
import apiClient from "../../../../lib/apiClient";
interface AuthData {
  user: StaffUser;
}

export const useStaffAuthAdmin = () => {
  const { login, logout, setLoading } = useStaffStore();

  const query = useQuery<AuthData, Error>({
    queryKey: ["staffAuth"],
    queryFn: async () => {
      const token = localStorage.getItem("staffToken");
      if (!token) throw new Error("Unauthenticated");

      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await apiClient.get("/auth/staff/verify");
      return res.data as AuthData;
    },
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      login(query.data.user, localStorage.getItem("staffToken") || "");
    } else if (query.error) {
      logout();
    }
    setLoading(false);
  }, [query.data, query.error, login, logout, setLoading]);

  return query;
};

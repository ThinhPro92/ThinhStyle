import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      const phone = localStorage.getItem("userPhone");
      if (token && phone) return { isLoggedIn: true, phone };
      return { isLoggedIn: false, phone: null };
    },
    staleTime: Infinity,
  });
};

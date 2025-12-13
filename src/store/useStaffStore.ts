import { create } from "zustand";
import type { StaffUser } from "../types/auth";

interface StaffStore {
  user: StaffUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (user: StaffUser, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useStaffStore = create<StaffStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: (user, token) => {
    localStorage.setItem("staffToken", token);
    localStorage.setItem("staffRole", user.role);
    localStorage.setItem("staffId", user._id);
    localStorage.setItem("staffName", user.name || "");
    set({ user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staffRole");
    localStorage.removeItem("staffId");
    localStorage.removeItem("staffName");
    localStorage.removeItem("staffUser");
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));

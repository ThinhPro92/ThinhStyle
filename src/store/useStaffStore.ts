import { create } from "zustand";
import type { StaffUser } from "../types/auth";
import apiClient from "../lib/apiClient";

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
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    set({ user, isAuthenticated: true, isLoading: false });
  },
  logout: () => {
    localStorage.removeItem("staffToken");
    delete apiClient.defaults.headers.common["Authorization"];
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
  setLoading: (loading) => set({ isLoading: loading }),
}));

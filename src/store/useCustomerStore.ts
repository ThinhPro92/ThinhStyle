import { create } from "zustand";
import toast from "react-hot-toast";
import type { CustomerUser } from "../types/auth";

interface CustomerStore {
  user: CustomerUser | null;
  isAuthenticated: boolean;

  login: (phone: string, name?: string) => void;
  updateName: (name: string) => void;
  logout: () => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (phone, name) => {
    const user = { phone, name, role: "customer" as const };
    localStorage.setItem("customerPhone", phone);
    if (name) localStorage.setItem("customerName", name);
    set({ user, isAuthenticated: true });
  },

  updateName: (name) => {
    localStorage.setItem("customerName", name);
    set((state) => ({
      user: state.user ? { ...state.user, name } : null,
    }));
  },

  logout: () => {
    localStorage.removeItem("customerPhone");
    localStorage.removeItem("customerName");
    toast.success("Đăng xuất thành công!");
    set({ user: null, isAuthenticated: false });
  },
}));

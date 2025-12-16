import { create } from "zustand";
import toast from "react-hot-toast";
import type { CustomerUser } from "../types/auth";

interface ActiveBooking {
  bookingCode: string;
  barberName: string;
  serviceNames: string[];
  date: Date;
  time: string;
  totalPrice: number;
}

interface CustomerStore {
  user: CustomerUser | null;
  isAuthenticated: boolean;
  activeBooking: ActiveBooking | null;

  login: (phone: string, name?: string) => void;
  updateName: (name: string) => void;
  setActiveBooking: (booking: ActiveBooking | null) => void;
  logout: () => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  user: null,
  isAuthenticated: false,
  activeBooking: null,

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

  setActiveBooking: (booking) => {
    if (booking) {
      localStorage.setItem("activeBooking", JSON.stringify(booking));
    } else {
      localStorage.removeItem("activeBooking");
    }
    set({ activeBooking: booking });
  },

  logout: () => {
    localStorage.removeItem("customerPhone");
    localStorage.removeItem("customerName");
    localStorage.removeItem("activeBooking");
    toast.success("Đăng xuất thành công!");
    set({ user: null, isAuthenticated: false, activeBooking: null });
  },
}));

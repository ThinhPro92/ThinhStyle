import { create } from "zustand";
import type { Booking } from "../types/booking";

export interface BookingForm {
  customerName: string;
  customerPhone: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  note: string;
}

interface BookingAdminStore {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  selectedBooking: Booking | null;
  form: BookingForm;

  openCreate: () => void;
  closeCreate: () => void;
  openEdit: (booking: Booking) => void;
  closeEdit: () => void;
  openDelete: (booking: Booking) => void;
  closeDelete: () => void;

  setForm: (updates: Partial<BookingForm>) => void;
  resetForm: () => void;
}

export const useBookingAdminStore = create<BookingAdminStore>((set) => ({
  isCreateOpen: false,
  isEditOpen: false,
  isDeleteOpen: false,
  selectedBooking: null,
  form: {
    customerName: "",
    customerPhone: "",
    barberId: "",
    serviceId: "",
    date: "",
    time: "",
    note: "",
  },

  openCreate: () => set({ isCreateOpen: true, selectedBooking: null }),
  closeCreate: () => set({ isCreateOpen: false }),
  openEdit: (booking) => set({ isEditOpen: true, selectedBooking: booking }),
  closeEdit: () => set({ isEditOpen: false, selectedBooking: null }),
  openDelete: (booking) =>
    set({ isDeleteOpen: true, selectedBooking: booking }),
  closeDelete: () => set({ isDeleteOpen: false, selectedBooking: null }),

  setForm: (updates) =>
    set((state) => ({ form: { ...state.form, ...updates } })),
  resetForm: () =>
    set({
      form: {
        customerName: "",
        customerPhone: "",
        barberId: "",
        serviceId: "",
        date: "",
        time: "",
        note: "",
      },
    }),
}));

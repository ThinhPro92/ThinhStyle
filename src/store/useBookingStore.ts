import { create } from "zustand";

export interface BookingForm {
  customerName: string;
  customerPhone: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  note: string;
}

interface BookingStore {
  isCreateOpen: boolean;
  form: BookingForm;

  openCreate: () => void;
  closeCreate: () => void;
  setForm: (updates: Partial<BookingForm>) => void;
  resetForm: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  isCreateOpen: false,
  form: {
    customerName: "",
    customerPhone: "",
    barberId: "",
    serviceId: "",
    date: "",
    time: "",
    note: "",
  },

  openCreate: () =>
    set({
      isCreateOpen: true,
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

  closeCreate: () => set({ isCreateOpen: false }),

  setForm: (updates) =>
    set((state) => ({
      form: { ...state.form, ...updates },
    })),

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

import { create } from "zustand";

export interface Barber {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  description?: string;
  rating?: number;
  commission: number;
  status: "active" | "inactive";
  totalRevenue: number;
  workingHours: Record<
    string,
    { isWorking: boolean; start?: string; end?: string }
  >;
  role: "barber";
}

interface BarberStore {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDetailOpen: boolean;
  isDeleteOpen: boolean;
  selectedBarber: Barber | null;
  search: string;

  openCreate: () => void;
  closeCreate: () => void;
  openEdit: (barber: Barber) => void;
  openDetail: (barber: Barber) => void;
  closeDetail: () => void;
  closeEdit: () => void;
  openDelete: (barber: Barber) => void;
  closeDelete: () => void;
  setSearch: (search: string) => void;
}

export const useBarberStore = create<BarberStore>((set) => ({
  isCreateOpen: false,
  isEditOpen: false,
  isDetailOpen: false,
  isDeleteOpen: false,
  selectedBarber: null,
  search: "",

  openCreate: () => set({ isCreateOpen: true, selectedBarber: null }),
  closeCreate: () => set({ isCreateOpen: false }),

  openEdit: (barber) => set({ isEditOpen: true, selectedBarber: barber }),
  openDetail: (barber) => set({ isDetailOpen: true, selectedBarber: barber }),
  closeDetail: () => set({ isDetailOpen: false, selectedBarber: null }),
  closeEdit: () => set({ isEditOpen: false, selectedBarber: null }),
  openDelete: (barber) => set({ isDeleteOpen: true, selectedBarber: barber }),
  closeDelete: () => set({ isDeleteOpen: false, selectedBarber: null }),
  setSearch: (search) => set({ search }),
}));

import { create } from "zustand";

export interface Service {
  _id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
  image?: string;
  isActive: boolean;
}

interface ServiceForm {
  name: string;
  price: number;
  duration: number;
  description: string;
  image: string;
  isActive: boolean;
}

interface ServiceStore {
  // Modal state
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  selectedService: Service | null;

  // Form state – ĐỔ HẾT VÀO ZUSTAND!
  form: ServiceForm;
  search: string;

  // Actions
  openCreate: () => void;
  closeCreate: () => void;
  openEdit: (service: Service) => void;
  closeEdit: () => void;
  openDelete: (service: Service) => void;
  closeDelete: () => void;
  setSearch: (search: string) => void;

  // Form actions
  setForm: (form: Partial<ServiceForm>) => void;
  resetForm: () => void;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  isCreateOpen: false,
  isEditOpen: false,
  isDeleteOpen: false,
  selectedService: null,
  search: "",

  form: {
    name: "",
    price: 0,
    duration: 30,
    description: "",
    image: "",
    isActive: true,
  },

  openCreate: () =>
    set({
      isCreateOpen: true,
      selectedService: null,
      form: {
        name: "",
        price: 0,
        duration: 30,
        description: "",
        image: "",
        isActive: true,
      },
    }),

  closeCreate: () => set({ isCreateOpen: false }),

  openEdit: (service) =>
    set({
      isEditOpen: true,
      selectedService: service,
      form: {
        name: service.name,
        price: service.price,
        duration: service.duration,
        description: service.description || "",
        image: service.image || "",
        isActive: service.isActive,
      },
    }),

  closeEdit: () => set({ isEditOpen: false, selectedService: null }),
  openDelete: (service) =>
    set({ isDeleteOpen: true, selectedService: service }),
  closeDelete: () => set({ isDeleteOpen: false, selectedService: null }),
  setSearch: (search) => set({ search }),

  setForm: (updates) =>
    set((state) => ({ form: { ...state.form, ...updates } })),
  resetForm: () =>
    set({
      form: {
        name: "",
        price: 0,
        duration: 30,
        description: "",
        image: "",
        isActive: true,
      },
    }),
}));

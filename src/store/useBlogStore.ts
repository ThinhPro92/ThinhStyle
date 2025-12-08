import { create } from "zustand";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  image?: string;
  featured: boolean;
  status: "draft" | "published";
  views: number;
  createdAt: string;
}

interface BlogStore {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDetailOpen: boolean;
  isDeleteOpen: boolean;
  selectedBlog: Blog | null;
  form: Partial<Blog>;

  openCreate: () => void;
  closeCreate: () => void;
  openEdit: (blog: Blog) => void;
  closeEdit: () => void;
  openDetail: (blog: Blog) => void;
  closeDetail: () => void;
  openDelete: (blog: Blog) => void;
  closeDelete: () => void;

  setForm: (updates: Partial<Blog>) => void;
  resetForm: () => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  isCreateOpen: false,
  isEditOpen: false,
  isDetailOpen: false,
  isDeleteOpen: false,
  selectedBlog: null,
  form: {
    title: "",
    excerpt: "",
    content: "",
    author: "ThinhStyle Team",
    category: "Xu hướng",
    featured: false,
    status: "draft",
  },

  openCreate: () =>
    set({
      isCreateOpen: true,
      selectedBlog: null,
      form: {
        title: "",
        excerpt: "",
        content: "",
        author: "ThinhStyle Team",
        category: "Xu hướng",
        featured: false,
        status: "draft",
      },
    }),
  closeCreate: () => set({ isCreateOpen: false }),

  openEdit: (blog) =>
    set({
      isEditOpen: true,
      selectedBlog: blog,
      form: { ...blog },
    }),
  closeEdit: () => set({ isEditOpen: false, selectedBlog: null }),

  openDetail: (blog) => set({ isDetailOpen: true, selectedBlog: blog }),
  closeDetail: () => set({ isDetailOpen: false, selectedBlog: null }),

  openDelete: (blog) => set({ isDeleteOpen: true, selectedBlog: blog }),
  closeDelete: () => set({ isDeleteOpen: false, selectedBlog: null }),

  setForm: (updates) =>
    set((state) => ({ form: { ...state.form, ...updates } })),
  resetForm: () =>
    set({
      form: {
        title: "",
        excerpt: "",
        content: "",
        author: "ThinhStyle Team",
        category: "Xu hướng",
        featured: false,
        status: "draft",
      },
    }),
}));

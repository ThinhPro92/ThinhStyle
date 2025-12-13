import { create } from "zustand";
import type { Blog } from "../types/blog";
import type { z } from "zod";
import { createBlogSchema } from "../validates/BlogSchema";

export type BlogForm = z.infer<typeof createBlogSchema>;

const DEFAULT_FORM_STATE: BlogForm = {
  title: "",
  excerpt: "",
  content: "",
  author: "ThinhStyle Team",
  category: "Xu hướng",
  featured: false,
  status: "draft",
  image: undefined,
};

interface BlogStore {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDetailOpen: boolean;
  isDeleteOpen: boolean;

  selectedBlog: Blog | null;

  form: BlogForm;
  search: string;

  openCreate: () => void;
  closeCreate: () => void;

  openEdit: (blog: Blog) => void;
  closeEdit: () => void;

  openDetail: (blog: Blog) => void;
  closeDetail: () => void;

  openDelete: (blog: Blog) => void;
  closeDelete: () => void;

  setForm: (updates: Partial<BlogForm>) => void;
  resetForm: () => void;
  setSearch: (value: string) => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  isCreateOpen: false,
  isEditOpen: false,
  isDetailOpen: false,
  isDeleteOpen: false,

  selectedBlog: null,
  search: "",
  form: { ...DEFAULT_FORM_STATE },

  openCreate: () =>
    set({
      isCreateOpen: true,
      selectedBlog: null,
      form: { ...DEFAULT_FORM_STATE },
    }),

  closeCreate: () => set({ isCreateOpen: false }),

  openEdit: (blog) =>
    set({
      isEditOpen: true,
      selectedBlog: blog,
      form: {
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        category: blog.category,
        image: blog.image,
        featured: blog.featured,
        status: blog.status,
      },
    }),

  closeEdit: () =>
    set({
      isEditOpen: false,
      selectedBlog: null,
      form: { ...DEFAULT_FORM_STATE },
    }),

  openDetail: (blog) =>
    set({
      isDetailOpen: true,
      selectedBlog: blog,
    }),

  closeDetail: () =>
    set({
      isDetailOpen: false,
      selectedBlog: null,
    }),

  openDelete: (blog) =>
    set({
      isDeleteOpen: true,
      selectedBlog: blog,
    }),

  closeDelete: () =>
    set({
      isDeleteOpen: false,
      selectedBlog: null,
    }),

  setForm: (updates) =>
    set((state) => ({
      form: { ...state.form, ...updates },
    })),

  resetForm: () =>
    set({
      form: { ...DEFAULT_FORM_STATE },
    }),

  setSearch: (value) => set({ search: value }),
}));

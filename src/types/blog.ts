import type { CreateBlogForm } from "../validates/BlogSchema";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: "Xu hướng" | "Mẹo vặt" | "Tư vấn" | "Sản phẩm";
  image?: string;
  featured: boolean;
  status: "draft" | "published";
  views: number;
  createdAt: string;
  updatedAt?: string;
}

export type CreateBlogData = CreateBlogForm & {
  slug?: string;
};

export type UpdateBlogData = Partial<CreateBlogData>;

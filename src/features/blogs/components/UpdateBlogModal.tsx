import { X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";

import { useBlogStore } from "../../../store/useBlogStore";
import { useBlogActions } from "../hooks/useBlogActions";

import {
  updateBlogSchema,
  type UpdateBlogForm,
} from "../../../validates/BlogSchema";

export default function UpdateBlogModal() {
  const { isEditOpen, closeEdit, selectedBlog, form, setForm, resetForm } =
    useBlogStore();
  const { update } = useBlogActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UpdateBlogForm>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: form,
  });

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setForm({ content: html });
      setValue("content", html, { shouldDirty: true });
    },
  });

  useEffect(() => {
    if (!isEditOpen || !selectedBlog) return;
    if (!editor) return;

    const values: UpdateBlogForm = {
      title: selectedBlog.title,
      excerpt: selectedBlog.excerpt || "",
      content: selectedBlog.content || "",
      author: selectedBlog.author || "ThinhStyle Team",
      category: selectedBlog.category || "Xu hướng",
      image: selectedBlog.image,
      featured: selectedBlog.featured ?? false,
      status: selectedBlog.status || "draft",
    };

    reset(values);
    resetForm();
    setForm(values);

    editor.commands.setContent(selectedBlog.content || "");
  }, [isEditOpen, selectedBlog, reset, resetForm, editor, setForm]);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "thinhstyle");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvzhf7x8t/image/upload",
        { method: "POST", body: data }
      );
      const json = (await res.json()) as { secure_url?: string };
      return json.secure_url || null;
    } catch {
      toast.error("Lỗi upload ảnh");
      return null;
    }
  };

  const handleCoverImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (!url) return;

    setForm({ image: url });
    setValue("image", url);
  };

  const handleInsertImage = async (file: File) => {
    const url = await uploadImage(file);
    if (!url) return;

    editor?.chain().focus().setImage({ src: url }).run();
  };

  const onSubmit: SubmitHandler<UpdateBlogForm> = (data) => {
    if (!selectedBlog) return;

    const titleForSlug = data.title ?? selectedBlog.title ?? "untitled";
    const slug = titleForSlug.toLowerCase().replace(/\s+/g, "-");

    update.mutate({
      id: selectedBlog._id,
      data: {
        ...data,
        slug,
        image: form.image,
        content: form.content,
      },
    });
  };

  if (!isEditOpen || !selectedBlog) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center p-4"
      onClick={closeEdit}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="w-full max-w-7xl bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-3xl overflow-hidden max-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Sửa Bài Viết
          </h2>
          <button
            aria-label="Đóng Modal"
            onClick={closeEdit}
            className="p-3 hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 h-full overflow-hidden">
          <div className="lg:col-span-1 p-8 space-y-6 border-r border-gray-800 overflow-y-auto">
            <input
              {...register("title")}
              onChange={(e) => setForm({ title: e.target.value })}
              placeholder="Tiêu đề bài viết"
              className="w-full text-3xl font-bold bg-transparent border-b-2 border-gray-700 focus:border-orange-500 outline-none pb-2 transition"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}

            <textarea
              {...register("excerpt")}
              onChange={(e) => setForm({ excerpt: e.target.value })}
              placeholder="Mô tả ngắn (SEO)"
              rows={3}
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
            />
            {errors.excerpt && (
              <p className="text-red-400 text-sm">{errors.excerpt.message}</p>
            )}

            <div className="flex justify-center">
              <label className="cursor-pointer group">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Cover"
                    className="w-full h-64 rounded-xl object-cover border-4 border-orange-500 group-hover:opacity-90 transition"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-800 rounded-xl border-4 border-dashed border-orange-500 flex items-center justify-center text-6xl group-hover:bg-gray-700 transition">
                    +
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImage}
                  className="hidden"
                />
              </label>
            </div>

            <select
              {...register("category")}
              onChange={(e) =>
                setForm({
                  category: e.target.value as UpdateBlogForm["category"],
                })
              }
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
            >
              <option value="Xu hướng">Xu hướng</option>
              <option value="Mẹo vặt">Mẹo vặt</option>
              <option value="Tư vấn">Tư vấn</option>
              <option value="Sản phẩm">Sản phẩm</option>
            </select>

            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                {...register("featured")}
                onChange={(e) => setForm({ featured: e.target.checked })}
                className="w-5 h-5 rounded accent-orange-500"
              />
              <span className="text-lg">Nổi bật (trang chủ)</span>
            </label>

            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={update.isPending}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition shadow-2xl disabled:opacity-70"
            >
              {update.isPending ? "Đang lưu..." : "Cập nhật"}
            </button>
          </div>

          <div className="lg:col-span-2 p-8">
            <div className="bg-white text-black rounded-2xl h-full flex flex-col overflow-hidden">
              <div className="border-b border-gray-300 p-4 flex gap-2 flex-wrap">
                <button
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`px-4 py-2 rounded ${
                    editor?.isActive("bold")
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Bold
                </button>

                <button
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`px-4 py-2 rounded ${
                    editor?.isActive("italic")
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Italic
                </button>

                <button
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`px-4 py-2 rounded ${
                    editor?.isActive("heading", { level: 2 })
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  H2
                </button>

                <label className="px-4 py-2 rounded bg-gray-200 cursor-pointer hover:bg-gray-300 transition">
                  Ảnh
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleInsertImage(file);
                    }}
                  />
                </label>
              </div>

              <EditorContent
                editor={editor}
                className="p-8 prose prose-lg max-w-none flex-1 overflow-y-auto"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

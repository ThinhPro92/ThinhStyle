import { X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useBlogStore } from "../../../store/useBlogStore";
import { useBlogActions } from "../hooks/useBlogActions";

export default function CreateBlogModal() {
  const { isCreateOpen, closeCreate, form, setForm } = useBlogStore();
  const { create } = useBlogActions();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: form.content,
    onUpdate: ({ editor }) => setForm({ content: editor.getHTML() }),
  });

  const uploadImage = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thinhstyle");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvzhf7x8t/image/upload",
      { method: "POST", body: data }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    setForm({ image: url });
    toast.success("Upload ảnh bìa thành công!");
  };

  const handleSubmit = () => {
    if (!form.title || !form.content)
      return toast.error("Nhập tiêu đề và nội dung!");
    create.mutate({
      ...form,
      slug: form.title.toLowerCase().replace(/ /g, "-"),
    });
  };

  if (!isCreateOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center"
      onClick={closeCreate}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="w-full h-full max-w-7xl mx-8 bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Viết Bài Mới
          </h2>
          <button
            onClick={closeCreate}
            className="p-3 hover:bg-white/10 rounded-xl"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 h-full">
          {/* Left: Form */}
          <div className="lg:col-span-1 p-8 space-y-6 border-r border-gray-800 overflow-y-auto">
            <input
              value={form.title}
              onChange={(e) => setForm({ title: e.target.value })}
              placeholder="Tiêu đề bài viết"
              className="w-full text-3xl font-bold bg-transparent border-b-2 border-gray-700 focus:border-orange-500 outline-none pb-2"
            />

            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ excerpt: e.target.value })}
              placeholder="Mô tả ngắn (SEO)"
              rows={3}
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />

            <div className="space-y-4">
              <div className="flex justify-center">
                <label className="cursor-pointer">
                  {form.image ? (
                    <img
                      src={form.image}
                      className="w-full h-64 rounded-xl object-cover border-4 border-orange-500"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-800 rounded-xl border-4 border-dashed border-orange-500 flex items-center justify-center text-6xl">
                      +
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
              </div>

              <select
                value={form.category}
                onChange={(e) => setForm({ category: e.target.value })}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl"
              >
                <option>Xu hướng</option>
                <option>Mẹo vặt</option>
                <option>Tư vấn</option>
                <option>Sản phẩm</option>
              </select>

              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ featured: e.target.checked })}
                />
                <label>Nổi bật (hiển thị trang chủ)</label>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={create.isPending}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition"
                >
                  {create.isPending ? "Đang đăng..." : "Đăng Bài"}
                </button>
                <button
                  onClick={() => create.mutate({ ...form, status: "draft" })}
                  className="px-8 py-5 border border-gray-600 rounded-xl hover:bg-white/10 transition"
                >
                  Lưu nháp
                </button>
              </div>
            </div>
          </div>

          {/* Right: Editor */}
          <div className="lg:col-span-2 p-8">
            <div className="bg-white text-black rounded-2xl h-full overflow-hidden">
              <div className="border-b border-gray-300 p-4 flex gap-2">
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
              </div>
              <div
                className="p-8 prose prose-lg max-w-none h-full overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html: form.content || "<p>Bắt đầu viết bài...</p>",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useBlogActions } from "../hooks/useBlogActions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import { useBlogStore } from "../../../store/useBlogStore";

export default function UpdateBlogModal() {
  const { isEditOpen, closeEdit, selectedBlog, form, setForm } = useBlogStore();
  const { update } = useBlogActions();

  // ================================
  // 1. Tiptap Editor
  // ================================
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: form.content || "",
    onUpdate: ({ editor }) => setForm({ content: editor.getHTML() }),
  });

  // ================================
  // 2. Đồng bộ dữ liệu khi mở modal
  // ================================
  useEffect(() => {
    if (isEditOpen && selectedBlog) {
      setForm({ ...selectedBlog });

      if (editor) editor.commands.setContent(selectedBlog.content || "");
    }
  }, [isEditOpen, selectedBlog, editor, setForm]);

  // ================================
  // 3. Upload Ảnh → Cloudinary → Insert vào Editor
  // ================================
  const uploadImage = async (file: File) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "thinhstyle");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvzhf7x8t/image/upload",
        { method: "POST", body: data }
      );
      const json = await res.json();
      return json.secure_url;
    } catch {
      toast.error("Lỗi upload ảnh");
      return null;
    }
  };

  const handleInsertImage = async (file: File) => {
    const url = await uploadImage(file);
    if (!url) return;

    editor?.chain().focus().setImage({ src: url }).run();
    toast.success("Đã chèn ảnh!");
  };

  // ================================
  // 4. Submit Cập nhật
  // ================================
  const handleSubmit = () => {
    if (!form.title || !form.content)
      return toast.error("Thiếu tiêu đề hoặc nội dung!");

    update.mutate({
      id: selectedBlog!._id,
      data: { ...form, slug: form.title.toLowerCase().replace(/ /g, "-") },
    });
  };

  if (!isEditOpen || !selectedBlog) return null;

  // ================================
  // UI Modal
  // ================================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center"
      onClick={closeEdit}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="w-full h-full max-w-7xl mx-8 bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Sửa Bài Viết
          </h2>
          <button
            onClick={closeEdit}
            className="p-3 hover:bg-white/10 rounded-xl"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 h-full">
          {/* Left Panel */}
          <div className="lg:col-span-1 p-8 space-y-6 border-r border-gray-800 overflow-y-auto">
            <input
              value={form.title}
              onChange={(e) => setForm({ title: e.target.value })}
              placeholder="Tiêu đề"
              className="w-full text-3xl font-bold bg-transparent border-b-2 border-gray-700 focus:border-orange-500 outline-none pb-2"
            />

            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ excerpt: e.target.value })}
              placeholder="Mô tả ngắn"
              rows={3}
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />

            {/* Main Image Upload */}
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
                  onChange={async (e) =>
                    e.target.files?.[0] &&
                    setForm({ image: await uploadImage(e.target.files[0]) })
                  }
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
              <label>Nổi bật</label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={update.isPending}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition"
            >
              {update.isPending ? "Đang cập nhật..." : "Cập Nhật Bài"}
            </button>
          </div>

          {/* Right Panel – Editor */}
          <div className="lg:col-span-2 p-8">
            <div className="bg-white text-black rounded-2xl h-full overflow-hidden">
              {/* Toolbar */}
              <div className="border-b border-gray-300 p-4 flex gap-2 items-center">
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

                {/* Insert Image Button */}
                <label className="px-4 py-2 rounded bg-gray-200 cursor-pointer">
                  Ảnh
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) =>
                      e.target.files?.[0] &&
                      handleInsertImage(e.target.files[0])
                    }
                  />
                </label>
              </div>

              {/* Editor */}
              <EditorContent
                editor={editor}
                className="p-8 prose prose-lg max-w-none h-full overflow-y-auto"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

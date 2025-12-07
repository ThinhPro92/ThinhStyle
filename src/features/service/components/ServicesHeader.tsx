// src/features/admin/services/components/ServicesHeader.tsx
import { Plus, Search } from "lucide-react";
import { useServiceStore } from "../../../store/useServiceStore";

export default function ServicesHeader() {
  const { search, setSearch, openCreate } = useServiceStore();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
        Quản Lý Dịch Vụ
      </h1>

      <div className="flex gap-4 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-4 py-3 bg-gray-900/50 border border border-gray-700 rounded-xl focus:border-orange-500 outline-none w-full sm:w-80 transition"
          />
        </div>

        <button
          onClick={openCreate}
          className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition"
        >
          <Plus className="w-6 h-6" /> Thêm Dịch Vụ
        </button>
      </div>
    </div>
  );
}

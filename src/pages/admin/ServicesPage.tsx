// src/pages/admin/ServicesPage.tsx
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useServiceStore } from "../../store/useServiceStore";
import apiClient from "../../lib/apiClient";
import ServicesGrid from "../../features/service/components/ServicesGrid";
import ServicesHeader from "../../features/service/components/ServicesHeader";
import CreateServiceModal from "../../features/service/components/CreateServiceModal";
import UpdateServiceModal from "../../features/service/components/UpdateServiceModal";
import DeleteServiceModal from "../../features/service/components/DeleteServiceModal";

export default function ServicesPage() {
  const { search, setSearch, openCreate } = useServiceStore();

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiClient.get("/services");
      return res.data.data;
    },
  });

  const filtered = services.filter((s: any) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300"
        >
          <ArrowLeft /> Quay lại Dashboard
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Quản Lý Dịch Vụ
          </h1>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm dịch vụ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none w-full sm:w-80"
              />
            </div>
            <button
              onClick={openCreate}
              className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition"
            >
              <Plus /> Thêm Dịch Vụ
            </button>
          </div>
        </div>

        <ServicesGrid services={filtered} />

        <CreateServiceModal />
        <UpdateServiceModal />
        <DeleteServiceModal />
      </div>
    </div>
  );
}

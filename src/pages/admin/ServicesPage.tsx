import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useServiceStore } from "../../store/useServiceStore";
import apiClient from "../../lib/apiClient";
import ServicesGrid from "../../features/service/components/ServicesGrid";
import CreateServiceModal from "../../features/service/components/CreateServiceModal";
import UpdateServiceModal from "../../features/service/components/UpdateServiceModal";
import DeleteServiceModal from "../../features/service/components/DeleteServiceModal";
import ServicesHeader from "../../features/service/components/ServicesHeader";
import type { Service } from "../../types/service";

export default function ServicesPage() {
  const { search } = useServiceStore();

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiClient.get("/services");
      return res.data.data;
    },
  });

  const filtered = services.filter((s) =>
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
        <ServicesHeader />
        <ServicesGrid services={filtered} />

        <CreateServiceModal />
        <UpdateServiceModal />
        <DeleteServiceModal />
      </div>
    </div>
  );
}

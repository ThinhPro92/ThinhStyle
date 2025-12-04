import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useBarberStore } from "../../store/useBarberStore";
import apiClient from "../../lib/apiClient";
import BarbersHeader from "../../features/staff/components/barber/BarbersHeader";
import BarbersGrid from "../../features/staff/components/barber/BarbersGrid";
import DeleteConfirmModal from "../../features/staff/components/barber/DeleteConfirmModal";
import CreateBarberModal from "../../features/staff/components/barber/CreateBarberModal";
import UpdateBarberModal from "../../features/staff/components/barber/UpdateBarberModal";
import DetailBarberModal from "../../features/staff/components/barber/DetailBarberModal";

export default function BarberAdmin() {
  const { search } = useBarberStore();

  const { data: barbers = [] } = useQuery({
    queryKey: ["barbers"],
    queryFn: async () => {
      const res = await apiClient.get("/barber");
      return res.data.data;
    },
  });

  const filtered = barbers.filter(
    (b: any) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Nút quay lại */}
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300"
        >
          <ArrowLeft className="w-5 h-5" /> Quay lại Dashboard
        </Link>

        <BarbersHeader />
        <BarbersGrid barbers={filtered} />
        <DetailBarberModal />
        <CreateBarberModal />
        <UpdateBarberModal />
        <DeleteConfirmModal />
      </div>
    </div>
  );
}

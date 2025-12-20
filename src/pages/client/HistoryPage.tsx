import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { useCustomerStore } from "../../store/useCustomerStore";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { format } from "date-fns";
import { useState } from "react";
import { X } from "lucide-react";

import type { Booking } from "../../types/booking";
import type { Barber } from "../../types/barber";
import type { Service } from "../../types/service";

const STATUS_STYLES: Record<
  Booking["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Chờ xác nhận",
    className: "bg-yellow-100 text-yellow-700",
  },
  confirmed: {
    label: "Đã xác nhận",
    className: "bg-blue-100 text-blue-700",
  },
  completed: {
    label: "Hoàn thành",
    className: "bg-green-100 text-green-700",
  },
  cancelled: {
    label: "Đã huỷ",
    className: "bg-red-100 text-red-700",
  },
  rejected: {
    label: "Từ chối",
    className: "bg-gray-200 text-gray-700",
  },
};

export default function HistoryPage() {
  const { user } = useCustomerStore();
  const queryClient = useQueryClient();
  const phone = user?.phone;

  /* =======================
      FETCH BOOKINGS
  ======================= */
  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: QUERY_KEYS.BOOKINGS({ customerPhone_like: phone }),
    queryFn: async () => {
      if (!phone) return [];
      const res = await apiClient.get("/bookings", {
        params: { customerPhone_like: phone },
      });
      return res.data.data || [];
    },
    enabled: !!phone,
  });

  /* =======================
      FETCH BARBERS
  ======================= */
  const { data: barbers = [] } = useQuery<Barber[]>({
    queryKey: ["barbers"],
    queryFn: async () => {
      const res = await apiClient.get("/barbers");
      return res.data.data || [];
    },
  });

  /* =======================
      FETCH SERVICES
  ======================= */
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiClient.get("/services");
      return res.data.data || [];
    },
  });

  /* =======================
      HELPERS MAP ID → DATA
  ======================= */
  const getBarberName = (barberId?: string) =>
    barbers.find((b) => b._id === barberId)?.name || "-";

  const getServices = (serviceIds?: string[]) =>
    services.filter((s) => serviceIds?.includes(s._id));

  const getTotalPrice = (serviceIds?: string[]) =>
    getServices(serviceIds).reduce((sum, s) => sum + s.price, 0);

  /* =======================
      CANCEL BOOKING
  ======================= */
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      apiClient.put(`/bookings/${id}`, {
        status: "cancelled",
        note: reason,
      }),
    onSuccess: () => {
      toast.success("Hủy lịch thành công");
      setCancelOpen(false);
      setReason("");
      setSelectedId(null);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BOOKINGS({ customerPhone_like: phone }),
      });
    },
    onError: () => toast.error("Hủy lịch thất bại"),
  });

  if (!user) {
    return (
      <p className="text-center py-20 text-gray-500">
        Bạn cần đăng nhập để xem lịch sử
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">Lịch Sử Đặt Lịch</h2>

      <div className="max-w-5xl mx-auto space-y-6">
        {isLoading ? (
          <p className="text-center py-20">Đang tải...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Chưa có lịch đặt nào
          </p>
        ) : (
          bookings.map((booking) => {
            const status = STATUS_STYLES[booking.status];

            return (
              <div
                key={booking._id}
                className="bg-white rounded-3xl shadow-md p-8 border border-gray-100"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold">
                      Mã đặt lịch:{" "}
                      <span className="font-bold">
                        {booking.bookingCode || "ONLINE"}
                      </span>
                    </p>
                    <p className="text-gray-500 mt-1">
                      {format(new Date(booking.date), "dd/MM/yyyy")} •{" "}
                      {booking.startTime}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* BODY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-gray-700">
                  <p>
                    <strong>Thợ cắt:</strong> {getBarberName(booking.barberId)}
                  </p>

                  <p>
                    <strong>Dịch vụ:</strong>{" "}
                    {getServices(booking.serviceIds)
                      .map((s) => s.name)
                      .join(", ") || "-"}
                  </p>

                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    <span className="text-orange-500 font-semibold">
                      {getTotalPrice(booking.serviceIds).toLocaleString(
                        "vi-VN"
                      )}
                      đ
                    </span>
                  </p>

                  {booking.note && booking.status === "cancelled" && (
                    <p className="md:col-span-2 text-red-500">
                      <strong>Lý do huỷ:</strong> {booking.note}
                    </p>
                  )}
                </div>

                {/* ACTION */}
                {booking.status === "pending" && (
                  <div className="flex justify-end mt-6">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setSelectedId(booking._id);
                        setCancelOpen(true);
                      }}
                    >
                      Huỷ lịch
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* MODAL */}
      {cancelOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Huỷ lịch</h3>
              <button aria-label="X" onClick={() => setCancelOpen(false)}>
                <X />
              </button>
            </div>

            <textarea
              className="w-full border rounded-xl p-4 mb-4 focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Lý do huỷ (bắt buộc)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <Button
              variant="destructive"
              className="w-full"
              disabled={!reason.trim() || cancelMutation.isPending}
              onClick={() =>
                selectedId && cancelMutation.mutate({ id: selectedId, reason })
              }
            >
              Xác nhận huỷ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

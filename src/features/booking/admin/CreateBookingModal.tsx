import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { useBookingAdminStore } from "../../../store/useBookingAdminStore";
import { useBookingActions } from "../hooks/useBookingActions";
import { useLayoutEffect } from "react";
import { createBookingSchema } from "../../../validates/BookingSchema";
import type { z } from "zod";
import type { Barber } from "../../../types/barber";
import type { Service } from "../../../types/service";
import { generateBookingCode } from "../../../utils/generateBookingCode";

type FormData = z.infer<typeof createBookingSchema>;

export default function CreateBookingModal() {
  const { isCreateOpen, closeCreate } = useBookingAdminStore();
  const { create } = useBookingActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createBookingSchema),
  });

  const { data: barbers = [], isLoading: loadingBarbers } = useQuery<Barber[]>({
    queryKey: QUERY_KEYS.BARBERS,
    queryFn: async () => (await apiClient.get("/barber")).data.data,
  });

  const { data: services = [], isLoading: loadingServices } = useQuery<
    Service[]
  >({
    queryKey: QUERY_KEYS.SERVICES,
    queryFn: async () => (await apiClient.get("/services")).data.data,
  });

  useLayoutEffect(() => {
    if (isCreateOpen) {
      reset({
        customerName: "",
        customerPhone: "",
        barberId: "",
        serviceIds: [],
        date: "",
        startTime: "",
        note: "",
      });
    }
  }, [isCreateOpen, reset]);

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      serviceIds: data.serviceIds || [],
      status: "pending" as const,
      note: data.note || "",
      bookingCode: generateBookingCode(),
      type: "walk_in" as const,
    };
    create.mutate(payload);
  };

  if (!isCreateOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={closeCreate}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-3xl p-10 max-w-5xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Đặt Lịch Cho Khách
          </h2>
          <button
            onClick={closeCreate}
            aria-label="X"
            className="p-3 hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            <input
              {...register("customerName")}
              placeholder="Tên khách hàng *"
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            />
            {errors.customerName && (
              <p className="text-red-400 text-sm">
                {errors.customerName.message}
              </p>
            )}

            <input
              {...register("customerPhone")}
              placeholder="Số điện thoại *"
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            />
            {errors.customerPhone && (
              <p className="text-red-400 text-sm">
                {errors.customerPhone.message}
              </p>
            )}

            <select
              {...register("barberId")}
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            >
              <option value="">Chọn thợ cắt</option>
              {loadingBarbers ? (
                <option>Đang tải...</option>
              ) : (
                barbers.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))
              )}
            </select>

            <input
              {...register("date")}
              type="date"
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            />

            <input
              {...register("startTime")}
              type="time"
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-lg font-medium mb-3 text-orange-400">
                Chọn dịch vụ (nhiều)
              </p>
              <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-4 max-h-64 overflow-y-auto">
                {loadingServices ? (
                  <p className="text-center text-gray-400">Đang tải...</p>
                ) : (
                  <div className="space-y-3">
                    {services.map((s) => (
                      <label
                        key={s._id}
                        className="flex items-center gap-4 cursor-pointer hover:bg-gray-700/50 p-3 rounded-xl transition"
                      >
                        <input
                          type="checkbox"
                          value={s._id}
                          {...register("serviceIds")}
                          className="w-6 h-6 accent-orange-500 rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{s.name}</p>
                          <p className="text-sm text-gray-400">
                            {s.price.toLocaleString()}đ
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {errors.serviceIds && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.serviceIds.message}
                </p>
              )}
            </div>

            <textarea
              {...register("note")}
              placeholder="Ghi chú (tùy chọn)"
              rows={4}
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={create.isPending}
            className="col-span-2 w-full bg-gradient-to-r from-orange-500 to-red-600 py-6 rounded-2xl font-bold text-2xl hover:scale-105 transition shadow-2xl disabled:opacity-70"
          >
            {create.isPending ? "Đang đặt lịch..." : "Xác Nhận Đặt Lịch"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { useBookingAdminStore } from "../../../store/useBookingAdminStore";
import { useBookingActions } from "../hooks/useBookingActions";
import { useLayoutEffect, startTransition } from "react";
import { updateBookingSchema } from "../../../validates/BookingSchema";
import type { z } from "zod";
import type { Barber } from "../../../types/barber";
import type { Service } from "../../../types/service";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof updateBookingSchema>;

export default function EditBookingModal() {
  const { isEditOpen, closeEdit, selectedBooking, setForm } =
    useBookingAdminStore();
  const { update } = useBookingActions();

  const {
    register,
    handleSubmit,

    reset,
  } = useForm<FormData>({
    resolver: zodResolver(updateBookingSchema),
  });

  const { data: barbers = [] } = useQuery<Barber[]>({
    queryKey: QUERY_KEYS.BARBERS,
    queryFn: async () => (await apiClient.get("/barber")).data.data,
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: QUERY_KEYS.SERVICES,
    queryFn: async () => (await apiClient.get("/services")).data.data,
  });

  useLayoutEffect(() => {
    if (selectedBooking && isEditOpen) {
      const defaultValues = {
        barberId: selectedBooking.barber?._id || "",
        serviceIds: selectedBooking.service
          ? [selectedBooking.service._id]
          : [],
        date: selectedBooking.date || "",
        startTime: selectedBooking.time || "",
        customerName: selectedBooking.customerName || "",
        customerPhone: selectedBooking.customerPhone || "",
        note: selectedBooking.note || "",
      };

      reset(defaultValues);

      startTransition(() => {
        setForm(defaultValues);
      });
    }
  }, [selectedBooking, isEditOpen, reset, setForm]);

  const onSubmit = (data: FormData) => {
    if (!selectedBooking) return;

    const payload = {
      barberId: data.barberId || selectedBooking.barber?._id,
      serviceIds: data.serviceIds?.length
        ? data.serviceIds
        : [selectedBooking.service?._id].filter(Boolean),
      date: data.date || selectedBooking.date,
      startTime: data.startTime || selectedBooking.time,
      customerName: data.customerName || selectedBooking.customerName,
      customerPhone: data.customerPhone || selectedBooking.customerPhone,
      note: data.note,
    };

    update.mutate({ id: selectedBooking._id, data: payload });
  };

  if (!isEditOpen || !selectedBooking) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4"
      onClick={closeEdit}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-3xl p-10 max-w-2xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Sửa Lịch Đặt
          </h2>
          <button
            onClick={closeEdit}
            className="p-3 hover:bg-white/10 rounded-xl transition"
          >
            {} <X className="w-8 h-8" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
        >
          <input
            {...register("customerName")}
            placeholder="Tên khách"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />
          <input
            {...register("customerPhone")}
            placeholder="SĐT"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />

          <select
            {...register("barberId")}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          >
            <option value="">Chọn thợ</option>
            {barbers.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            {...register("serviceIds")}
            multiple
            size={5}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          >
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} - {s.price.toLocaleString()}đ
              </option>
            ))}
          </select>

          <input
            {...register("date")}
            type="date"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />
          <input
            {...register("startTime")}
            type="time"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />

          <textarea
            value={selectedBooking.note || ""}
            onChange={(e) => setForm({ note: e.target.value })}
            placeholder="Ghi chú"
            rows={3}
            className="col-span-2 w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />

          <button
            type="submit"
            disabled={update.isPending}
            className="col-span-2 w-full bg-gradient-to-r from-orange-500 to-red-600 py-6 rounded-2xl font-bold text-2xl hover:scale-105 transition shadow-2xl disabled:opacity-70"
          >
            {update.isPending ? "Đang sửa..." : "Cập Nhật Lịch"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

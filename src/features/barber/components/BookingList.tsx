import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import EmptyState from "./EmptyState";
import BookingCard from "./BookingCard";
import { useEffect } from "react";
import type { BarberSocket } from "../../../types/barber";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import apiClient from "../../../lib/apiClient";
import type { StaffUser } from "../../../types/auth";
import type { Booking } from "../../../types/booking";

interface Props {
  socket: BarberSocket;
  staffUser: StaffUser;
}

export default function BookingList({ socket, staffUser }: Props) {
  const queryClient = useQueryClient();

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: QUERY_KEYS.BOOKINGS(staffUser._id),
    queryFn: async () => {
      const res = await apiClient.get(`/bookings/barber/${staffUser._id}`);
      return res.data.data || [];
    },
  });

  useEffect(() => {
    socket.emit("joinBarberRoom", staffUser._id);

    const handleNewBooking = (b: Booking) => {
      queryClient.setQueryData(
        QUERY_KEYS.BOOKINGS(staffUser._id),
        (old: Booking[] | undefined) => [b, ...(old || [])]
      );
      toast.success(`Khách mới: ${b.customerPhone} - ${b.time}`);
    };

    socket.on("newBooking", handleNewBooking);

    return () => {
      socket.off("newBooking", handleNewBooking);
    };
  }, [socket, staffUser._id, queryClient]);

  const updateStatus = async (id: string, status: string) => {
    await apiClient.patch(`/bookings/${id}`, { status });
    queryClient.setQueryData(
      QUERY_KEYS.BOOKINGS(staffUser._id),
      (old: Booking[] | undefined) =>
        old?.map((b) => (b._id === id ? { ...b, status } : b))
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold">Lịch cắt hôm nay</h2>
      {bookings.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {bookings.map((b) => (
            <BookingCard
              key={b._id}
              booking={b}
              onUpdateStatus={updateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

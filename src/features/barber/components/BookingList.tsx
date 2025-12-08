import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "./EmptyState";
import BookingCard from "./BookingCard";

interface Props {
  socket: any;
  staffUser: any;
}

export default function BookingList({ socket, staffUser }: Props) {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `https://api-class-o1lo.onrender.com/api/thinhstyle/bookings/barber/${staffUser._id}`
      );
      const data = await res.json();
      setBookings(data.data || []);
    };
    load();

    socket.emit("joinBarberRoom", staffUser._id);
    socket.on("newBooking", (b: any) => {
      setBookings((prev) => [b, ...prev]);
      toast.success(`Khách mới: ${b.customer.name} - ${b.time}`);
    });

    return () => socket.off("newBooking");
  }, [staffUser._id, socket]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(
      `https://api-class-o1lo.onrender.com/api/thinhstyle/bookings/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status } : b))
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

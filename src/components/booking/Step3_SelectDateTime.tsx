import { useState } from "react";
import { format, addDays, isToday } from "date-fns";

import { Clock, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import type { Step3Props } from "../../types";
import { useAvailableSlots } from "../../features/booking/hooks/useAvailableSlots";

interface Step3WithBarberProps extends Step3Props {
  barberId?: string;
}

export default function Step3_SelectDateTime({
  onNext,
  onPrev,
  barberId,
}: Step3WithBarberProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const {
    data: slotsData,
    isLoading,
    error,
  } = useAvailableSlots(selectedDate, barberId);

  const allTimeSlots = Array.from({ length: 26 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  const bookedSlots = slotsData?.bookedSlots || [];

  const getSlotStatus = (time: string) => {
    if (selectedTime === time)
      return "bg-accent text-white shadow-lg scale-105";
    if (bookedSlots.includes(time))
      return "bg-red-500 text-white line-through opacity-70 cursor-not-allowed";
    return "bg-green-500 hover:bg-green-600 text-white shadow-md hover:scale-105";
  };

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Chọn Ngày & Giờ Cắt
      </h2>

      <div className="grid grid-cols-7 gap-3 mb-10">
        {[...Array(7)].map((_, i) => {
          const date = addDays(new Date(), i);
          const dayName = isToday(date) ? "Hôm nay" : format(date, "EEE");
          const isSelected =
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <button
              key={i}
              onClick={() => {
                setSelectedDate(date);
                setSelectedTime(null);
              }}
              className={`p-4 rounded-2xl transition-all border-2 ${
                isSelected
                  ? "border-accent bg-accent/10 shadow-lg"
                  : "border-gray-200 hover:border-accent/50"
              }`}
            >
              <p className="text-xs text-gray-500">{dayName}</p>
              <p className="text-2xl font-bold">{format(date, "dd")}</p>
              <p className="text-sm text-gray-600">{format(date, "MMM")}</p>
            </button>
          );
        })}
      </div>

      {/* Danh sách giờ – dùng key để reset state */}
      <div className="mt-10" key={dateKey}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <Clock className="w-6 h-6 text-accent" />
          {format(selectedDate, "EEEE, dd/MM/yyyy")}
        </h3>

        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 animate-spin inline-block text-accent" />
            <span className="ml-3 text-lg">Đang tải giờ trống...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            Không tải được lịch. Vui lòng thử lại!
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {allTimeSlots.map((time) => {
              const isBooked = bookedSlots.includes(time);
              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() => setSelectedTime(time)}
                  className={`py-5 px-4 rounded-2xl font-bold text-lg transition-all transform ${getSlotStatus(
                    time
                  )}`}
                >
                  {time}
                  {isBooked && <p className="text-xs mt-1">Đã đặt</p>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10">
        <Button variant="outline" size="lg" onClick={onPrev}>
          Quay lại
        </Button>
        <Button
          size="lg"
          disabled={!selectedTime || isLoading}
          onClick={() => onNext({ date: selectedDate, time: selectedTime })}
          className="px-10"
        >
          Tiếp tục → {selectedTime && `- ${selectedTime}`}
        </Button>
      </div>
    </div>
  );
}

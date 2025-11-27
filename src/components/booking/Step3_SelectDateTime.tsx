// src/features/booking/components/Step3_SelectDateTime.tsx
import { useState } from "react";
import { format, addDays, isToday } from "date-fns";

import { Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";

const timeSlots = Array.from({ length: 26 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
});

// Giả lập slot đã đặt – sau này lấy từ API realtime
const bookedSlots = ["10:30", "14:00", "15:30", "18:30", "19:00"];

export default function Step3_SelectDateTime({
  onNext,
  onPrev,
}: {
  onNext: (data: any) => void;
  onPrev: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const getSlotStatus = (time: string) => {
    if (selectedTime === time)
      return "bg-accent text-white shadow-lg scale-105";
    if (bookedSlots.includes(time))
      return "bg-red-500 text-white line-through opacity-70";
    return "bg-green-500 hover:bg-green-600 text-white shadow-md hover:scale-105";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Chọn Ngày & Giờ Cắt
      </h2>

      {/* Chọn ngày - 7 ngày tới */}
      <div className="grid grid-cols-7 gap-3 mb-10">
        {[...Array(7)].map((_, i) => {
          const date = addDays(new Date(), i);
          const dayName = isToday(date) ? "Hôm nay" : format(date, "EEE");
          const isSelected =
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
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

      {/* Giờ cắt - giống rạp phim */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <Clock className="w-6 h-6 text-accent" />
          {format(selectedDate, "EEEE, dd/MM/yyyy")}
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {timeSlots.map((time) => (
            <button
              key={time}
              disabled={bookedSlots.includes(time)}
              onClick={() => setSelectedTime(time)}
              className={`py-5 px-4 rounded-2xl font-bold text-lg transition-all transform ${getSlotStatus(
                time
              )}`}
            >
              {time}
              {bookedSlots.includes(time) && (
                <p className="text-xs mt-1">Đã đặt</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <Button variant="outline" size="lg" onClick={onPrev}>
          ← Quay lại
        </Button>
        <Button
          size="lg"
          disabled={!selectedTime}
          onClick={() => onNext({ date: selectedDate, time: selectedTime })}
          className="px-10"
        >
          Tiếp tục → {selectedTime && `- ${selectedTime}`}
        </Button>
      </div>
    </div>
  );
}

import { format, addDays, isToday } from "date-fns";
import { Clock, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAvailableSlots } from "../../features/booking/hooks/useAvailableSlots";
import type { Step3Props } from "../../types/booking";
import type { Barber } from "../../types/barber";
import { useState } from "react";

interface Step3WithBarberProps extends Step3Props {
  barber?: Barber;
}

export default function Step3_SelectDateTime({
  onNext,
  onPrev,
  barber,
}: Step3WithBarberProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const barberId = barber?._id;
  const { data: slotsData, isLoading } = useAvailableSlots(
    selectedDate,
    barberId
  );

  const dayKey = selectedDate.getDay().toString();
  const workingHours = barber?.workingHours?.[dayKey];
  const isWorkingToday = workingHours?.isWorking ?? true;

  const generateTimeSlots = (): string[] => {
    if (!isWorkingToday) return [];

    const start = workingHours?.start || "09:00";
    const end = workingHours?.end || "21:00";

    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const slots: string[] = [];
    let hour = startHour;
    let minute = startMinute;

    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
      slots.push(
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`
      );
      minute += 15; // ← 15 phút linh hoạt
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }

    if (isToday(selectedDate)) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      return slots.filter((time) => {
        const [h, m] = time.split(":").map(Number);
        return h > currentHour || (h === currentHour && m > currentMinute);
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();
  const bookedSlots = slotsData?.bookedSlots || [];

  const getSlotStatus = (time: string) => {
    if (selectedTime === time)
      return "bg-orange-500 text-white shadow-lg scale-105";
    if (bookedSlots.includes(time))
      return "bg-red-600 text-white line-through opacity-80 cursor-not-allowed shadow-md";
    return "bg-green-500 hover:bg-green-600 text-white shadow-md hover:scale-105";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Chọn Ngày & Giờ Cắt
      </h2>

      <div className="grid grid-cols-7 gap-4 mb-10">
        {[...Array(7)].map((_, i) => {
          const date = addDays(new Date(), i);
          const isSelected =
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          return (
            <button
              key={i}
              onClick={() => {
                setSelectedDate(date);
                setSelectedTime(null);
              }}
              className={`p-6 rounded-2xl transition-all border-4 ${
                isSelected
                  ? "border-orange-500 bg-orange-500/20 shadow-xl scale-105"
                  : "border-gray-300 hover:border-orange-400"
              }`}
            >
              <p className="text-sm text-gray-600">
                {isToday(date) ? "Hôm nay" : format(date, "EEE")}
              </p>
              <p className="text-3xl font-bold mt-2">{format(date, "dd")}</p>
              <p className="text-sm text-gray-600">{format(date, "MMM")}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-3 text-gray-800">
          <Clock className="w-8 h-8 text-orange-500" />
          {format(selectedDate, "EEEE, dd/MM/yyyy")}
        </h3>

        {!isWorkingToday ? (
          <div className="text-center py-16">
            <p className="text-2xl text-red-500 font-medium">
              Thợ nghỉ ngày này
            </p>
            <p className="text-gray-500 mt-4">Vui lòng chọn ngày khác</p>
          </div>
        ) : isLoading ? (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto" />
            <p className="text-gray-500 mt-4">Đang tải lịch đặt...</p>
          </div>
        ) : timeSlots.length === 0 ? (
          <p className="text-center text-gray-500 py-16 text-xl">
            Không có khung giờ nào trong ngày này
          </p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
            {timeSlots.map((time) => {
              const isBooked = bookedSlots.includes(time);
              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() => !isBooked && setSelectedTime(time)}
                  className={`py-4 px-3 rounded-2xl font-bold text-lg transition-all transform ${getSlotStatus(
                    time
                  )} ${isBooked ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {time}
                  {isBooked && <p className="text-xs mt-1 font-normal">Bận</p>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-12">
        <Button variant="outline" size="lg" onClick={onPrev}>
          ← Quay lại chọn thợ
        </Button>
        <Button
          size="lg"
          disabled={!selectedTime}
          onClick={() => onNext({ date: selectedDate, time: selectedTime! })}
          className="px-12"
        >
          Tiếp tục → {selectedTime && `${selectedTime}`}
        </Button>
      </div>
    </div>
  );
}

import { format, addDays, isToday, setHours, setMinutes } from "date-fns";
import { Clock, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAvailableSlots } from "../../features/booking/hooks/useAvailableSlots";
import type { Step3Props } from "../../types/booking";
import type { Barber, WorkingHours } from "../../types/barber";
import { useState } from "react";

interface Step3WithBarberProps extends Step3Props {
  barber?: Barber;
}
const defaultWorkingHours: WorkingHours = {
  "0": { isWorking: false },
  "1": { isWorking: true, start: "09:00", end: "21:00" },
  "2": { isWorking: true, start: "09:00", end: "21:00" },
  "3": { isWorking: true, start: "09:00", end: "21:00" },
  "4": { isWorking: true, start: "09:00", end: "21:00" },
  "5": { isWorking: true, start: "09:00", end: "21:00" },
  "6": { isWorking: true, start: "09:00", end: "21:00" },
};

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

  // Safe access + fallback
  const dayKey = selectedDate.getDay().toString();
  console.log("Barber workingHours:", barber?.workingHours);
  const barberWorkingHours = barber?.workingHours || defaultWorkingHours;
  const workingHours = barberWorkingHours[dayKey];
  const isWorkingToday = workingHours?.isWorking ?? false;
  const generateTimeSlots = (): string[] => {
    if (!isWorkingToday || !workingHours?.start || !workingHours?.end)
      return [];

    const [startHour, startMinute] = workingHours.start.split(":").map(Number);
    const [endHour, endMinute] = workingHours.end.split(":").map(Number);

    const slots: string[] = [];
    let current = setMinutes(setHours(selectedDate, startHour), startMinute);

    const endTime = setMinutes(setHours(selectedDate, endHour), endMinute);

    while (current < endTime) {
      slots.push(format(current, "HH:mm"));
      current = new Date(current.getTime() + 30 * 60 * 1000); // 30 phút mỗi slot
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();
  const bookedSlots = slotsData?.bookedSlots || [];

  const getSlotStatus = (time: string) => {
    if (selectedTime === time)
      return "bg-orange-500 text-white shadow-lg scale-105";
    if (bookedSlots.includes(time))
      return "bg-red-500 text-white line-through opacity-70 cursor-not-allowed";
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
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5">
            {timeSlots.map((time) => {
              const isBooked = bookedSlots.includes(time);
              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() => setSelectedTime(time)}
                  className={`py-6 px-4 rounded-3xl font-bold text-xl transition-all transform ${getSlotStatus(
                    time
                  )} ${isBooked ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {time}
                  {isBooked && <p className="text-sm mt-2">Đã đặt</p>}
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

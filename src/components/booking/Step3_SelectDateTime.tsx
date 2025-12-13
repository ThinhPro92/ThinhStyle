import { useState } from "react";
import { format, addDays, isToday, setHours, setMinutes } from "date-fns";
import { Clock, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAvailableSlots } from "../../features/booking/hooks/useAvailableSlots";
import type { Step3Props } from "../../types/booking";
import type { Barber } from "../../types/barber";

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

  const workingHours = barber?.workingHours?.[selectedDate.getDay().toString()];
  const isWorkingToday = workingHours?.isWorking;

  const generateTimeSlots = () => {
    if (!isWorkingToday || !workingHours?.start || !workingHours?.end) {
      return [];
    }

    const [startHour, startMinute] = workingHours.start.split(":").map(Number);
    const [endHour, endMinute] = workingHours.end.split(":").map(Number);

    const slots: string[] = [];
    let current = setMinutes(setHours(selectedDate, startHour), startMinute);

    while (current < setMinutes(setHours(selectedDate, endHour), endMinute)) {
      slots.push(format(current, "HH:mm"));
      current = new Date(current.getTime() + 30 * 60 * 1000);
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
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Chọn Ngày & Giờ Cắt
      </h2>

      <div className="grid grid-cols-7 gap-3 mb-10">
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
              className={`p-4 rounded-2xl transition-all border-2 ${
                isSelected
                  ? "border-orange-500 bg-orange-500/10 shadow-lg"
                  : "border-gray-200 hover:border-orange-500/50"
              }`}
            >
              <p className="text-xs text-gray-500">
                {isToday(date) ? "Hôm nay" : format(date, "EEE")}
              </p>
              <p className="text-2xl font-bold">{format(date, "dd")}</p>
              <p className="text-sm text-gray-600">{format(date, "MMM")}</p>
            </button>
          );
        })}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <Clock className="w-6 h-6 text-orange-500" />
          {format(selectedDate, "EEEE, dd/MM/yyyy")}
        </h3>

        {!isWorkingToday ? (
          <p className="text-center text-red-500 py-12 text-xl">
            Thợ nghỉ ngày này
          </p>
        ) : isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 animate-spin inline-block text-orange-500" />
          </div>
        ) : timeSlots.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            Không có khung giờ nào
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {timeSlots.map((time) => {
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
          ← Quay lại
        </Button>
        <Button
          size="lg"
          disabled={!selectedTime}
          onClick={() => onNext({ date: selectedDate, time: selectedTime! })}
        >
          Tiếp tục → {selectedTime && `- ${selectedTime}`}
        </Button>
      </div>
    </div>
  );
}

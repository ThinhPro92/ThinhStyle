import { format, startOfWeek, addDays } from "date-fns";

export default function BookingCalendar() {
  const today = new Date();
  const weekStart = startOfWeek(today);

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-6">Lịch tuần này</h3>
      <div className="grid grid-cols-7 gap- gap-2">
        {[...Array(7)].map((_, i) => {
          const date = addDays(weekStart, i);
          return (
            <div key={i} className="text-center p-4 bg-gray-800/50 rounded-xl">
              <p className="text-sm text-gray-400">{format(date, "EEE")}</p>
              <p className="text-3xl font-bold">{format(date, "dd")}</p>
              <p className="text-xs text-orange-400 mt-2">12 lịch</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

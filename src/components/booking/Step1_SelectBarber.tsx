import { useBarbers } from "../../features/barber/hooks/useBarbersClient";
import type { Step1Props } from "../../types/booking";
import { Button } from "../ui/button";
import { useCustomerStore } from "../../store/useCustomerStore";
import PhoneModal from "../booking/PhoneModal";
import { useState } from "react";
import type { Barber } from "../../types/barber";

export default function Step1_SelectBarber({ onNext }: Step1Props) {
  const { data: barbers = [], isLoading } = useBarbers();
  const { isAuthenticated } = useCustomerStore();
  const [openPhoneModal, setOpenPhoneModal] = useState(false);

  const handleSelectBarber = (barber: Barber) => {
    if (!isAuthenticated) {
      setOpenPhoneModal(true);
      return;
    }
    onNext({ barber });
  };

  if (isLoading)
    return <div className="text-center py-20">Đang tải thợ cắt...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Chọn Thợ Cắt Yêu Thích
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <button
            key={barber._id}
            onClick={() => handleSelectBarber(barber)}
            className="group text-center hover:scale-105 transition-all"
          >
            <div className="overflow-hidden rounded-full mb-4 ring-4 ring-transparent group-hover:ring-accent/50 transition-all">
              <img
                src={barber.avatar || "/placeholder-barber.jpg"}
                alt={barber.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <h3 className="font-bold text-lg">{barber.name}</h3>
            <p className="text-accent">⭐ {barber.rating || "5.0"}</p>
            <Button className="mt-3 w-full">Chọn thợ này</Button>
          </button>
        ))}
      </div>
      <PhoneModal
        isOpen={openPhoneModal}
        onClose={() => setOpenPhoneModal(false)}
      />
    </div>
  );
}

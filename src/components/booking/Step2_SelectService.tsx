import { useState } from "react";
import { useServices } from "../../features/service/hooks/useServices";
import { Button } from "../ui/button";
import type { Step2Props } from "../../types/booking";
import type { Service } from "../../types/service";

export default function Step2_SelectService({
  onNext,
  onPrev,
  selectedBarber,
}: Step2Props) {
  const { data: services = [], isLoading } = useServices();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const toggleService = (service: Service) => {
    setSelectedServices((prev) =>
      prev.find((s) => s._id === service._id)
        ? prev.filter((s) => s._id !== service._id)
        : [...prev, service]
    );
  };
  if (isLoading)
    return <div className="text-center py-20">Đang tải dịch vụ...</div>;
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-4">Chọn Dịch Vụ</h2>
      <p className="text-center text-text-secondary mb-8">
        Thợ: <strong>{selectedBarber?.name}</strong>
      </p>

      <div className="space-y-4">
        {services.map((service: Service) => (
          <div
            key={service._id}
            onClick={() => toggleService(service)}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedServices.find((s) => s._id === service._id)
                ? "border-accent bg-accent/10"
                : "border-gray-200 hover:border-accent/50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl">{service.name}</h3>
                <p className="text-text-secondary">{service.duration} phút</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent">
                  {service.price.toLocaleString()}đ
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10">
        <Button variant="outline" size="lg" onClick={onPrev}>
          ← Quay lại
        </Button>
        <Button
          size="lg"
          disabled={selectedServices.length === 0}
          onClick={() => onNext({ services: selectedServices })}
        >
          Tiếp tục → ({selectedServices.length} dịch vụ)
        </Button>
      </div>
    </div>
  );
}

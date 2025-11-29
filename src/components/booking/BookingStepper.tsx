import { Check } from "lucide-react";
import type { BookingData } from "../../types";

const steps = ["Chọn thợ", "Dịch vụ", "Ngày giờ", "Xác nhận"];

interface BookingStepperProps {
  currentStep: number;
  bookingData: BookingData; // THÊM CÁI NÀY – QUAN TRỌNG NHẤT!
}

export default function BookingStepper({
  currentStep,
  bookingData,
}: BookingStepperProps) {
  // Logic kiểm tra bước nào đã hoàn thành thật sự
  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!bookingData.barber; // Chỉ hoàn thành khi đã chọn thợ
      case 2:
        return !!bookingData.services && bookingData.services.length > 0;
      case 3:
        return !!bookingData.date && !!bookingData.time;
      case 4:
        return false; // Bước cuối chưa bao giờ hoàn thành trước khi xác nhận
      default:
        return false;
    }
  };

  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((label, i) => {
        const stepNumber = i + 1;
        const isCompleted = isStepCompleted(stepNumber);
        const isActive = stepNumber === currentStep;
        const isFuture = stepNumber > currentStep;

        return (
          <div key={i} className="flex items-center">
            <div
              className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                ${
                  isCompleted
                    ? "bg-accent text-white shadow-lg"
                    : isActive
                    ? "bg-accent text-white ring-8 ring-accent/20 scale-110"
                    : isFuture
                    ? "bg-gray-200 text-gray-500"
                    : "bg-gray-300 text-gray-600"
                }`}
            >
              {isCompleted ? <Check className="w-6 h-6" /> : stepNumber}
            </div>

            <div className="hidden sm:block ml-3">
              <p
                className={`text-sm font-medium transition-colors
                ${isCompleted || isActive ? "text-accent" : "text-gray-500"}
              `}
              >
                {label}
              </p>
            </div>

            {/* Đường nối giữa các bước */}
            {i < 3 && (
              <div
                className={`w-24 h-1 mx-4 transition-all duration-500
                  ${
                    isStepCompleted(stepNumber + 1) ||
                    (isActive && stepNumber === currentStep)
                      ? "bg-accent"
                      : "bg-gray-300"
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

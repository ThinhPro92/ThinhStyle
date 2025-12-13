import { Check } from "lucide-react";
import type { BookingData } from "../../types/booking";

const steps = ["Chọn thợ", "Dịch vụ", "Ngày giờ", "Xác nhận"];

interface BookingStepperProps {
  currentStep: number;
  bookingData: BookingData;
}

export default function BookingStepper({
  currentStep,
  bookingData,
}: BookingStepperProps) {
  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!bookingData.barber;
      case 2:
        return !!bookingData.services && bookingData.services.length > 0;
      case 3:
        return !!bookingData.date && !!bookingData.time;
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
                ${isCompleted ? "bg-orange-500 text-white shadow-lg" : ""}
                ${
                  isActive
                    ? "bg-orange-500 text-white ring-8 ring-orange-500/20 scale-110"
                    : ""
                }
                ${isFuture ? "bg-gray-300 text-gray-600" : ""}
                ${
                  !isCompleted && !isActive && !isFuture
                    ? "bg-gray-400 text-gray-700"
                    : ""
                }
              `}
            >
              {isCompleted ? <Check className="w-6 h-6" /> : stepNumber}
            </div>
            <div className="hidden sm:block ml-4">
              <p
                className={`text-sm font-medium transition-colors ${
                  isCompleted || isActive ? "text-orange-500" : "text-gray-500"
                }`}
              >
                {label}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-24 h-1 mx-6 transition-all duration-500
                  ${
                    isStepCompleted(stepNumber + 1) ||
                    (isActive && stepNumber === currentStep)
                      ? "bg-orange-500"
                      : "bg-gray-300"
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

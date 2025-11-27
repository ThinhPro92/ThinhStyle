import { Check } from "lucide-react";

const steps = ["Chọn thợ", "Dịch vụ", "Ngày giờ", "Xác nhận"];

export default function BookingStepper({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all
            ${
              i < currentStep
                ? "bg-accent text-white"
                : i === currentStep
                ? "bg-accent text-white ring-8 ring-accent/20"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {i < currentStep ? <Check className="w-6 h-6" /> : i + 1}
          </div>
          <div className="hidden sm:block ml-3">
            <p className="text-sm text-gray-500">{label}</p>
          </div>
          {i < 3 && (
            <div
              className={`w-24 h-1 mx-4 ${
                i < currentStep - 1 ? "bg-accent" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

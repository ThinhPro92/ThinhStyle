// src/features/booking/BookingPage.tsx
import { useState } from "react";
import BookingStepper from "../../components/booking/BookingStepper";

import Step3_SelectDateTime from "../../components/booking/Step3_SelectDateTime";

import BookingSummaryCard from "../../components/booking/BookingSummaryCard";
import Step1_SelectBarber from "../../components/booking/Step1_SelectBarber";
import Step2_SelectService from "../../components/booking/Step2_SelectService";
import Step4_Confirm from "../../components/booking/Step4_Confirm";

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<any>({});

  const handleNext = (data: any) => {
    setBookingData((prev: any) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Đặt Lịch Cắt Tóc Online
        </h1>
        <p className="text-center text-text-secondary mb-12 text-lg">
          Chỉ 4 bước – Cắt Là Sướng!
        </p>

        <BookingStepper currentStep={currentStep} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && <Step1_SelectBarber onNext={handleNext} />}
            {currentStep === 2 && (
              <Step2_SelectService
                onNext={handleNext}
                onPrev={handlePrev}
                selectedBarber={bookingData.barber}
              />
            )}
            {currentStep === 3 && (
              <Step3_SelectDateTime onNext={handleNext} onPrev={handlePrev} />
            )}
            {currentStep === 4 && (
              <Step4_Confirm bookingData={bookingData} onPrev={handlePrev} />
            )}
          </div>

          {/* Tóm tắt đơn (desktop) */}
          <div className="hidden lg:block">
            <BookingSummaryCard data={bookingData} />
          </div>
        </div>

        {/* Tóm tắt đơn (mobile - fixed bottom) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4">
          <BookingSummaryCard data={bookingData} mobile />
        </div>
      </div>
    </div>
  );
}

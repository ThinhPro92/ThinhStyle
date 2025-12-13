// src/features/booking/BookingPage.tsx
import { useState } from "react";
import BookingStepper from "../../components/booking/BookingStepper";

import Step3_SelectDateTime from "../../components/booking/Step3_SelectDateTime";

import BookingSummaryCard from "../../components/booking/BookingSummaryCard";
import Step1_SelectBarber from "../../components/booking/Step1_SelectBarber";
import Step2_SelectService from "../../components/booking/Step2_SelectService";
import Step4_Confirm from "../../components/booking/Step4_Confirm";
import type {
  BookingData,
  BookingStep,
  ConfirmedBookingData,
} from "../../types/booking";

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [bookingData, setBookingData] = useState<BookingData>({});

  const handleNext = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => Math.min(prev + 1, 4) as BookingStep);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => {
      const nextStep = Math.max(prev - 1, 1) as BookingStep;

      setBookingData((current) => ({
        ...(nextStep >= 1 ? { barber: current.barber } : {}),
        ...(nextStep >= 2
          ? { services: current.services }
          : { services: undefined }),
        ...(nextStep >= 3
          ? { date: current.date, time: current.time }
          : { date: undefined, time: undefined }),
      }));

      return nextStep;
    });
  };

  // Tính tổng tiền
  const totalPrice =
    bookingData.services?.reduce((sum, s) => sum + s.price, 0) ?? 0;

  // Dữ liệu đã xác nhận cho Step 4
  const confirmedData: ConfirmedBookingData | null =
    bookingData.barber &&
    bookingData.services &&
    bookingData.services.length > 0 &&
    bookingData.date &&
    bookingData.time
      ? {
          barber: bookingData.barber,
          services: bookingData.services,
          date: bookingData.date,
          time: bookingData.time,
          totalPrice,
        }
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Đặt Lịch Cắt Tóc Online
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Chỉ 4 bước – Cắt Là Sướng!
        </p>

        <BookingStepper currentStep={currentStep} bookingData={bookingData} />

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
              <Step3_SelectDateTime
                onNext={handleNext}
                onPrev={handlePrev}
                barberId={bookingData.barber?._id}
              />
            )}

            {currentStep === 4 && confirmedData && (
              <Step4_Confirm bookingData={confirmedData} onPrev={handlePrev} />
            )}
          </div>

          <div className="hidden lg:block">
            <BookingSummaryCard data={bookingData} />
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 z-50">
          <BookingSummaryCard data={bookingData} mobile />
        </div>
      </div>
    </div>
  );
}

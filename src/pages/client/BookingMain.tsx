import React from "react";
import BookingStepper from "../../components/booking/BookingStepper";
import Step1_SelectBarber from "../../components/booking/Step1_SelectBarber";
import Step2_SelectService from "../../components/booking/Step2_SelectService";
import Step3_SelectDateTime from "../../components/booking/Step3_SelectDateTime";
import Step4_Confirm from "../../components/booking/Step4_Confirm";
import BookingSummaryCard from "../../components/booking/BookingSummaryCard";
import { useCustomerStore } from "../../store/useCustomerStore";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import { Button } from "../../components/ui/button";
import type {
  BookingData,
  BookingStep,
  ConfirmedBookingData,
  Booking,
} from "../../types/booking";
import type { Barber } from "../../types/barber";
import { QUERY_KEYS } from "../../constants/queryKeys";

export default function BookingMain() {
  const { user } = useCustomerStore();

  const [currentStep, setCurrentStep] = React.useState<BookingStep>(1);
  const [bookingData, setBookingData] = React.useState<BookingData>({});

  const phone = user?.phone;

  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: QUERY_KEYS.BOOKINGS({ customerPhone_like: phone }),
    queryFn: async () => {
      if (!phone) return [];
      const res = await apiClient.get("/bookings", {
        params: { customerPhone_like: phone },
      });
      return res.data.data || [];
    },
    enabled: !!phone,
  });

  const hasActiveBooking = bookings.some(
    (b) => b.status === "pending" || b.status === "confirmed"
  );

  if (!isLoading && hasActiveBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-red-600">
            Không thể đặt lịch mới
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Bạn đang có một lịch <strong>đang hiệu lực</strong>
            (chờ xác nhận hoặc đã được xác nhận).
            <br />
            Vui lòng hủy hoặc hoàn thành lịch hiện tại trước khi đặt lịch mới.
          </p>
          <Button
            size="lg"
            onClick={() => (window.location.href = "/profile/history")}
          >
            Xem lịch sử & huỷ lịch
          </Button>
        </div>
      </div>
    );
  }

  const handleNext = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => Math.min(prev + 1, 4) as BookingStep);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as BookingStep);
  };

  const totalPrice =
    bookingData.services?.reduce((sum, s) => sum + s.price, 0) ?? 0;

  const confirmedData: ConfirmedBookingData | null =
    bookingData.barber &&
    bookingData.services &&
    bookingData.services.length > 0 &&
    bookingData.date &&
    bookingData.time
      ? {
          barber: bookingData.barber as Barber,
          services: bookingData.services,
          date: bookingData.date,
          time: bookingData.time,
          totalPrice,
          status: "pending",
        }
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-4">
          Đặt Lịch Cắt Tóc Online
        </h1>

        <BookingStepper currentStep={currentStep} bookingData={bookingData} />

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
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
                barber={bookingData.barber}
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
      </div>
    </div>
  );
}

import type { Barber } from "./barber";
import type { Service } from "./service";

export type BookingStep = 1 | 2 | 3 | 4;

export interface BookingData {
  barber?: Barber;
  services?: Service[];
  date?: Date;
  time?: string | null;

  bookingCode?: string;
  totalPrice?: number;
}
export interface ConfirmedBookingData {
  barber: Barber;
  services: Service[];
  date: Date;
  time: string;
  totalPrice?: number;
  bookingCode?: string;
}
export interface StepProps<T = Partial<BookingData>> {
  onNext: (data: T) => void;
  onPrev?: () => void;
}

export interface Step1Props extends StepProps {
  // dùng chung StepProps
}
export interface Step2Props extends StepProps {
  selectedBarber?: Barber;
}
export interface Step3Props extends StepProps {
  barberId?: string;
}

export interface ConfirmedBookingData {
  barber: Barber;
  services: Service[];
  date: Date;
  time: string;
  totalPrice?: number;
  bookingCode?: string;
}
export interface Step4Props {
  bookingData: ConfirmedBookingData;
  onPrev: () => void;
}

export type PaymentStatus = "pending" | "paid" | "failed";
export interface CreateBookingPayload {
  barberId: string;
  serviceIds: string[];
  date: string;
  startTime: string;
  note?: string;
  paymentStatus?: PaymentStatus;
}

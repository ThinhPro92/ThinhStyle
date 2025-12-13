import type { Barber } from "./barber";
import type { Service } from "./service";

export type BookingStep = 1 | 2 | 3 | 4;

export interface BookingData {
  barber?: Barber;
  services?: Service[];
  date?: Date;
  time?: string;
  note?: string;
  totalPrice?: number;
  bookingCode?: string;
}

export interface ConfirmedBookingData
  extends Required<Pick<BookingData, "barber" | "services" | "date" | "time">> {
  totalPrice: number;
  bookingCode?: string;
}

export interface StepProps<T = Partial<BookingData>> {
  onNext: (data: T) => void;
  onPrev?: () => void;
}

export interface Step1Props extends StepProps<{ barber: Barber }> {}
export interface Step2Props extends StepProps<{ services: Service[] }> {
  selectedBarber?: Barber;
}
export interface Step3Props extends StepProps<{ date: Date; time: string }> {
  barberId?: string;
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

export type UpdateBookingData = Partial<
  Omit<CreateBookingPayload, "paymentStatus">
>;

export interface Booking {
  _id: string;
  barber: { _id: string; name: string };
  customerName: string;
  customerPhone: string;
  service: { _id: string; name: string; price: number };
  date: string;
  time: string;
  note?: string;
  status: "pending" | "accepted" | "completed" | "rejected" | "cancelled";
  bookingCode: string;
  createdAt: string;
}

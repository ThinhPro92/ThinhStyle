import type { Socket } from "socket.io-client";

export interface Barber {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  avatarPublicId?: string;
  description?: string;
  rating?: number;
  status: "active" | "inactive";
  totalRevenue: number;
  workingHours: Record<
    string,
    { isWorking: boolean; start?: string; end?: string }
  >;
  role: "barber";
}

export type WorkingHours = Barber["workingHours"];

export interface CreateBarberData
  extends Omit<Barber, "_id" | "totalRevenue" | "rating" | "workingHours"> {
  workingHours: WorkingHours;
  rating: number;
  totalRevenue: number;
  password: string;
}

export type UpdateBarberData = Partial<CreateBarberData>;

export interface BarberAdmin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: "active" | "inactive";
  totalRevenue: number;
}
export interface BarberWithBookingCount extends Barber {
  bookingCount?: number;
}
export type BarberSocket = Socket;

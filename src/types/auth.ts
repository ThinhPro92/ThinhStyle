export type Role = "customer" | "barber" | "admin";

export interface CustomerUser {
  _id?: string;
  phone: string;
  name?: string;
  role: "customer";
}

export interface StaffUser {
  _id?: string;
  email: string;
  name?: string;
  role: "barber" | "admin";
}

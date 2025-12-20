export interface Customer {
  _id: string;
  name?: string;
  email?: string;
  phone: string;
  status: "active" | "blocked";
  bookingCount: number;
  createdAt: string;
  updatedAt: string;
}

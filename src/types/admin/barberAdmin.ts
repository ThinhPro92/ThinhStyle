export interface BarberAdmin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  commission: number;
  status: "active" | "inactive";
  totalRevenue: number;
}

export enum Role {
  CUSTOMER = "customer",
  BARBER = "barber",
  ADMIN = "admin",
}

export interface User {
  _id: string;
  phone: string;
  email?: string;
  name?: string;
  role: Role;
  avatar?: string;
}

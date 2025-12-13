export interface Service {
  _id: string;
  name: string;
  price: number;
  duration: number; // phút
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateServiceData
  extends Omit<Service, "_id" | "createdAt" | "updatedAt"> {}

export type UpdateServiceData = Partial<CreateServiceData>;

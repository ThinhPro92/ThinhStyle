export interface Barber {
  _id: string;
  name: string;
  phone?: string;
  avatar?: string;
  description?: string;
  rating?: number;
  role?: string;
  workingHours?: Record<
    string,
    { isWorking: boolean; start?: string; end?: string }
  >;
}

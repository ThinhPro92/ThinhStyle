export const QUERY_KEYS = {
  BARBERS: ["barbers"],
  BOOKINGS: (params?: {
    customerPhone?: string;
    customerPhone_like?: string;
    status?: string;
  }) => ["bookings", params],

  // Services
  SERVICES: ["services"],
  SERVICES_HOME: ["services-home"],
  // booking
  AVAILABLE_SLOTS: (date: string, barberId?: string) =>
    ["available-slots", date, barberId].filter(Boolean),
  // blogs
  BLOGS: ["blogs"],
  BLOG_DETAIL: (id: string) => ["blog", id],
  STAFF_AUTH: ["staffAuth"],
};

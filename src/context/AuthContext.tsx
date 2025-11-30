// src/context/AuthContext.tsx
import { createContext, useEffect, useState, type ReactNode } from "react";

interface StaffUser {
  _id: string;
  email: string;
  name?: string;
  role: "admin" | "barber";
}

interface AuthContextType {
  user: StaffUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Lấy thông tin từ localStorage (vì API mượn không có /auth/me)
  const token =
    typeof window !== "undefined" ? localStorage.getItem("staffToken") : null;
  const role =
    typeof window !== "undefined" ? localStorage.getItem("staffRole") : null;
  const staffId =
    typeof window !== "undefined" ? localStorage.getItem("staffId") : null;

  // Giả lập user từ localStorage
  const user: StaffUser | null =
    token && role && staffId
      ? {
          _id: staffId,
          email: "admin@thinhstyle.com", // tạm thời
          name: role === "admin" ? "Thịnh Admin" : "Barber Pro",
          role: role as "admin" | "barber",
        }
      : null;

  // Giả lập loading 300ms cho mượt
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!token && !!role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

// src/hooks/useStaffAuth.ts
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export const useStaffAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useStaffAuth must be used within AuthProvider");
  }
  return context;
};

import { Routes, Route } from "react-router-dom";
import BookingMain from "./BookingMain";

import VerifyOTPPage from "./VerifyOTPPage";

export default function BookingPage() {
  return (
    <Routes>
      <Route path="/" element={<BookingMain />} />
      <Route path="/verify-otp" element={<VerifyOTPPage />} />
    </Routes>
  );
}

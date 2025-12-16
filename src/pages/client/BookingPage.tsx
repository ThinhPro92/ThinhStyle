import { Routes, Route } from "react-router-dom";
import BookingMain from "./BookingMain";
import BookingSuccessPage from "./BookingSuccessPage";

export default function BookingPage() {
  return (
    <Routes>
      <Route path="/" element={<BookingMain />} />
      <Route path="/success" element={<BookingSuccessPage />} />
    </Routes>
  );
}

// src/pages/PhoneVerifyPage.tsx (tạm thời)
import { useLocation, useNavigate } from "react-router-dom";

export default function PhoneVerifyPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const phone = state?.phone;

  // Sau khi xác nhận OTP thành công:
  const handleSuccess = () => {
    // Lưu token vào localStorage hoặc zustand
    navigate("/booking");
  };

  return <div>Nhập mã OTP gửi về {phone}</div>;
}

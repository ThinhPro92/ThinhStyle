import { useState } from "react";
import OTPInput from "react-otp-input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "../../store/useCustomerStore";
import toast from "react-hot-toast";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, verifyLogin } = useCustomerStore(); // ← LẤY verifyLogin

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Mã OTP phải có 6 chữ số");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      verifyLogin(); // ← GỌI verifyLogin()
      toast.success("Xác thực thành công!");
      navigate("/booking");
    }, 1000);
  };

  const handleResend = () => {
    toast.success("Mã OTP mới đã được gửi!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-lg w-full text-center">
        <h2 className="text-4xl font-bold mb-8">Xác Nhận OTP</h2>
        <p className="text-lg text-gray-600 mb-12">
          Nhập mã 6 chữ số đã gửi đến{" "}
          <strong className="text-orange-500">{user?.phone}</strong>
        </p>

        <OTPInput
          value={otp}
          onChange={(value) => setOtp(value.replace(/\D/g, ""))}
          numInputs={6}
          renderSeparator={<span className="w-6" />}
          renderInput={(props) => (
            <input
              {...props}
              type="text"
              inputMode="numeric"
              className="w-16 h-16 text-4xl font-bold text-center border-2 border-gray-300 rounded-2xl focus:border-orange-500 outline-none bg-gray-50 transition"
              style={{ caretColor: "transparent" }}
            />
          )}
          containerStyle="justify-center gap-4 mb-16"
          shouldAutoFocus
        />

        <Button
          size="lg"
          className="w-full text-2xl py-10 mb-6 rounded-2xl"
          onClick={handleVerify}
          disabled={loading || otp.length < 6}
        >
          {loading ? "Đang xác thực..." : "Xác Nhận"}
        </Button>

        <p className="text-base text-gray-500">
          Không nhận được mã?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-orange-500 underline font-semibold hover:text-orange-600"
          >
            Gửi lại
          </button>
        </p>
      </div>
    </div>
  );
}

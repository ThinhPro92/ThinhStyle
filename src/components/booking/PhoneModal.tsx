// src/components/booking/PhoneModal.tsx
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function PhoneModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!/^(0[3|5|7|8|9])+([0-9]{8})\b/.test(phone)) {
      alert("Số điện thoại không hợp lệ");
      return;
    }

    setLoading(true);
    try {
      // Gọi API gửi OTP (sẽ làm sau)
      // const res = await apiClient.post("/auth/send-otp", { phone });

      // Tạm thời: giả lập thành công
      setTimeout(() => {
        setLoading(false);
        onClose();
        // Chuyển sang trang OTP
        navigate("/booking/phone-verify", { state: { phone } });
      }, 1000);
    } catch (err) {
      setLoading(false);
      alert("Gửi OTP thất bại");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-2xl transition-all">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-center w-full">
                    Đặt Lịch Nhanh
                  </h2>
                  <button onClick={onClose} className="absolute top-6 right-6">
                    <X className="w-7 h-7 h-7 text-gray-500" />
                  </button>
                </div>

                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-10 h-10 text-accent" />
                  </div>
                  <p className="text-xl font-semibold">
                    Nhập số điện thoại của bạn
                  </p>
                  <p className="text-gray-500 mt-2">
                    Chúng tôi sẽ gửi mã xác nhận ngay!
                  </p>
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="090 303 9559"
                  className="w-full px-6 py-5 text-xl text-center border-2 border-gray-300 rounded-2xl focus:border-accent focus:outline-none transition mb-6"
                  maxLength={11}
                />

                <Button
                  size="lg"
                  className="w-full text-xl py-8"
                  onClick={handleSubmit}
                  disabled={loading || phone.length < 10}
                >
                  {loading ? "Đang gửi mã..." : "Gửi mã xác nhận →"}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Bằng việc tiếp tục, bạn đồng ý với{" "}
                  <span className="text-accent">Điều khoản dịch vụ</span>
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

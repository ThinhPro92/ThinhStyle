import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useCustomerStore } from "../../store/useCustomerStore";
import toast from "react-hot-toast";
import TermsModal from "./TermsModal";

export default function PhoneModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const navigate = useNavigate();
  const { setTempPhone } = useCustomerStore();

  const handleSubmit = () => {
    if (!/^0\d{9}$/.test(phone)) {
      toast.error("Số điện thoại phải bắt đầu bằng 0 và đúng 10 số");
      return;
    }
    if (!agreeTerms) {
      toast.error("Bạn phải đồng ý với điều khoản dịch vụ");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setTempPhone(phone);
      setLoading(false);
      onClose();
      toast.success("Mã OTP đã gửi thành công!");
      navigate("/booking/verify-otp");
    }, 1000);
  };

  return (
    <>
      {/* PhoneModal – z-50 */}
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
            <div className="fixed inset-0 bg-black/60" />
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
                <Dialog.Panel className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-6">Đặt Lịch Nhanh</h2>
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-10 h-10 text-orange-500" />
                    </div>
                    <p className="text-xl font-semibold">
                      Nhập số điện thoại của bạn
                    </p>
                    <p className="text-gray-500 mt-2">
                      Chúng tôi sẽ gửi mã OTP xác nhận
                    </p>
                  </div>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="090 303 9559"
                    className="w-full px-6 py-5 text-xl text-center border-2 border-gray-300 rounded-2xl focus:border-orange-500 focus:outline-none transition mb-6"
                    maxLength={10}
                  />

                  <label className="flex items-center gap-3 mb-8 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-5 h-5 accent-orange-500 rounded"
                    />
                    <span className="text-sm text-gray-600">
                      Tôi đồng ý với{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTermsOpen(true);
                        }}
                        className="text-orange-500 underline font-medium hover:text-orange-600"
                      >
                        Điều khoản dịch vụ & Chính sách bảo mật
                      </button>
                    </span>
                  </label>

                  <Button
                    size="lg"
                    className="w-full text-xl py-8"
                    onClick={handleSubmit}
                    disabled={loading || phone.length < 10 || !agreeTerms}
                  >
                    {loading ? "Đang gửi mã..." : "Gửi mã xác nhận →"}
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
}

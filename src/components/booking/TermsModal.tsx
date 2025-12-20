import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

export default function TermsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-[999]" onClose={onClose}>
        {" "}
        {/* ← z-60 > z-50 */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
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
              <Dialog.Panel className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-10 shadow-2xl">
                <div className="flex justify-between items-center mb-8 sticky top-0 bg-white pt-4 -mt-4">
                  <h2 className="text-3xl font-bold">
                    Điều khoản dịch vụ & Chính sách bảo mật
                  </h2>
                  <button
                    onClick={onClose}
                    aria-label="X"
                    className="p-3 hover:bg-gray-100 rounded-xl transition"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                  <section>
                    <h3 className="text-2xl font-bold mb-4">
                      1. Điều khoản dịch vụ
                    </h3>
                    <p className="leading-relaxed">
                      ThinhStyle cung cấp dịch vụ đặt lịch cắt tóc online. Khi
                      sử dụng, bạn đồng ý:
                    </p>
                    <ul className="list-disc pl-8 space-y-3 mt-4">
                      <li>
                        Đến đúng giờ đã đặt. Trễ quá 15 phút có thể bị hủy lịch
                      </li>
                      <li>Không hủy lịch quá 3 lần trong 30 ngày</li>
                      <li>Thông tin chỉ dùng để xác thực và thông báo</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold mb-4">
                      2. Chính sách bảo mật
                    </h3>
                    <p className="leading-relaxed">
                      Chúng tôi cam kết bảo vệ thông tin:
                    </p>
                    <ul className="list-disc pl-8 space-y-3 mt-4">
                      <li>Số điện thoại chỉ dùng gửi OTP và thông báo</li>
                      <li>Không chia sẻ với bên thứ ba</li>
                      <li>Dữ liệu được mã hóa an toàn</li>
                    </ul>
                  </section>

                  <p className="text-sm text-gray-500 mt-12 text-right">
                    Cập nhật lần cuối: 17/12/2025
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

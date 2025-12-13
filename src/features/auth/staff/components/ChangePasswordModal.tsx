import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ChangePasswordModal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const handleSubmit = () => {
    toast.success("Đổi mật khẩu thành công! Chào mừng bạn đến với ThinhStyle", {
      duration: 6000,
      style: { background: "#16a34a", color: "white" },
    });

    localStorage.setItem("hasChangedPassword", "true");

    onSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-10 max-w-md w-full rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Đổi Mật Khẩu Lần Đầu
        </h2>

        <div className="text-center space-y-6">
          <div className="text-gray-300">
            <p>Mật khẩu mặc định của bạn là:</p>
            <p className="text-4xl font-bold text-orange-400 mt-4">123456</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl">
            <p className="text-lg">
              Lần đầu đăng nhập, bạn cần đổi mật khẩu để bảo mật tài khoản.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Sau khi bấm nút dưới, bạn sẽ vào được dashboard ngay!
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-6 rounded-2xl font-bold text-2xl hover:scale-105 transition shadow-xl"
          >
            Tôi Đã Hiểu – Vào Dashboard Ngay
          </button>

          <p className="text-sm text-gray-500">
            (Tính năng đổi mật khẩu thật sẽ được bật khi có backend)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

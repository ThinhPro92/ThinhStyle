import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useBarberStore } from "../../../../store/useBarberStore";
import { useBarberActions } from "../../hooks/useBarberActions";

const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export default function UpdateBarberModal() {
  const { isEditOpen, closeEdit, selectedBarber } = useBarberStore();
  const { update } = useBarberActions();
  const [avatar, setAvatar] = useState(selectedBarber?.avatar || "");

  const [form, setForm] = useState({
    name: selectedBarber?.name || "",
    phone: selectedBarber?.phone || "",
    email: selectedBarber?.email || "",
    description: selectedBarber?.description || "",
    commission: selectedBarber?.commission || 40,
    status: selectedBarber?.status || "active",
  });

  const [workingHours, setWorkingHours] = useState(
    selectedBarber?.workingHours || {
      "0": { isWorking: false },
      "1": { isWorking: true, start: "09:00", end: "21:00" },
      "2": { isWorking: true, start: "09:00", end: "21:00" },
      "3": { isWorking: true, start: "09:00", end: "21:00" },
      "4": { isWorking: true, start: "09:00", end: "21:00" },
      "5": { isWorking: true, start: "09:00", end: "21:00" },
      "6": { isWorking: true, start: "09:00", end: "21:00" },
    }
  );

  const uploadImage = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thinhstyle");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvzhf7x8t/image/upload",
      { method: "POST", body: data }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone)
      return toast.error("Thiếu thông tin bắt buộc!");
    update.mutate({
      id: selectedBarber!._id,
      data: { ...form, avatar, workingHours },
    });
  };

  if (!isEditOpen || !selectedBarber) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4"
      onClick={closeEdit}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-4xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Sửa Thông Tin Thợ
          </h2>
          <button
            onClick={closeEdit}
            className="p-3 hover:bg-white/10 rounded-xl"
          >
            <X className="w-7 h-7" />
            {}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <label className="cursor-pointer">
                {avatar ? (
                  <img
                    src={avatar}
                    className="w-40 h-40 rounded-full object-cover border-4 border-orange-500"
                    alt="haha"
                  />
                ) : (
                  <div className="w-40 h-40 bg-gray-800 rounded-full border-4 border-dashed border-orange-500 flex items-center justify-center text-6xl">
                    +
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) =>
                    e.target.files?.[0] &&
                    setAvatar(await uploadImage(e.target.files[0]))
                  }
                  className="hidden"
                />
              </label>
            </div>

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Họ tên"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Số điện thoại"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Mô tả"
              rows={4}
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />

            <div className="flex items-center justify-between">
              <span>Hoa hồng (%)</span>
              <input
                type="number"
                value={form.commission}
                onChange={(e) =>
                  setForm({ ...form, commission: +e.target.value })
                }
                className="w-24 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-center"
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Trạng thái</span>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as "active" | "inactive",
                  })
                }
                className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl"
              >
                <option value="active">Đang làm việc</option>
                <option value="inactive">Nghỉ việc</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Giờ làm việc</h3>
            <div className="space-y-3">
              {Object.keys(workingHours).map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <span className="w-24 text-sm">{days[+day]}</span>
                  <input
                    type="checkbox"
                    checked={workingHours[day].isWorking}
                    onChange={(e) =>
                      setWorkingHours((prev) => ({
                        ...prev,
                        [day]: { ...prev[day], isWorking: e.target.checked },
                      }))
                    }
                    className="w-5 h-5"
                  />
                  {workingHours[day].isWorking && (
                    <>
                      <input
                        type="time"
                        value={workingHours[day].start || "09:00"}
                        onChange={(e) =>
                          setWorkingHours((prev) => ({
                            ...prev,
                            [day]: { ...prev[day], start: e.target.value },
                          }))
                        }
                        className="px-3 py-2 bg-gray-800 rounded"
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={workingHours[day].end || "21:00"}
                        onChange={(e) =>
                          setWorkingHours((prev) => ({
                            ...prev,
                            [day]: { ...prev[day], end: e.target.value },
                          }))
                        }
                        className="px-3 py-2 bg-gray-800 rounded"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={update.isPending}
          className="w-full mt-8 bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition"
        >
          {update.isPending ? "Đang cập nhật..." : "Cập Nhật Ngay"}
        </button>
      </motion.div>
    </motion.div>
  );
}

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBarberStore } from "../../../../store/useBarberStore";
import { useBarberActions } from "../../hooks/useBarberActions";
import { startTransition, useLayoutEffect, useState } from "react";
import { updateBarberSchema } from "../../../../validates/BarberSchema";
import type { z } from "zod";
import type { UpdateBarberData, WorkingHours } from "../../../../types/barber";

type FormData = z.infer<typeof updateBarberSchema>;

const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export default function UpdateBarberModal() {
  const { isEditOpen, closeEdit, selectedBarber } = useBarberStore();
  const { update } = useBarberActions();
  const [avatar, setAvatar] = useState("");
  const [workingHours, setWorkingHours] = useState<WorkingHours>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(updateBarberSchema),
  });

  useLayoutEffect(() => {
    if (selectedBarber && isEditOpen) {
      reset({
        name: selectedBarber.name,
        phone: selectedBarber.phone,
        email: selectedBarber.email,
        description: selectedBarber.description,
        commission: selectedBarber.commission,
        status: selectedBarber.status,
      });

      startTransition(() => {
        setAvatar(selectedBarber.avatar || "");
        setWorkingHours(selectedBarber.workingHours || {});
      });
    }
  }, [selectedBarber, isEditOpen, reset]);

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

  const onSubmit = (data: FormData) => {
    const payload: UpdateBarberData = {
      ...data,
      avatar,
      workingHours,
    };
    update.mutate({
      id: selectedBarber!._id,
      data: payload,
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
            {}
            <X className="w-7 h-7" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-8"
        >
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
              {...register("name")}
              placeholder="Họ tên"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <input
              {...register("phone")}
              placeholder="Số điện thoại"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}

            <input
              {...register("email")}
              placeholder="Email"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <textarea
              {...register("description")}
              placeholder="Mô tả"
              rows={4}
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />

            <div className="flex items-center justify-between">
              <span>Hoa hồng (%)</span>
              <input
                type="number"
                {...register("commission", { valueAsNumber: true })}
                className="w-24 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-center"
              />
              {errors.commission && (
                <p className="text-red-500">{errors.commission.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span>Trạng thái</span>
              <select
                {...register("status")}
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
                    aria-label={`Trạng thái làm việc ngày ${days[+day]}`}
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
                        aria-label={`Giờ bắt đầu ${days[+day]}`}
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
                        aria-label={`Giờ kết thúc ${days[+day]}`}
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
          <button
            type="submit"
            disabled={update.isPending}
            className="w-full mt-8 bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition"
          >
            {update.isPending ? "Đang cập nhật..." : "Cập Nhật Ngay"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

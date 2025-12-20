import { motion } from "framer-motion";
import BarberCard from "./BarberCard";
import type { Barber } from "../../../../types/barber";

interface Props {
  barbers: Barber[];
}

export default function BarbersGrid({ barbers }: Props) {
  if (barbers.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl">Chưa có thợ nào</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {barbers.map((barber) => (
        <motion.div key={barber._id} layoutId={barber._id}>
          <BarberCard barber={barber} />
        </motion.div>
      ))}
    </motion.div>
  );
}

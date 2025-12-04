import { motion } from "framer-motion";
import BarberCard from "./BarberCard";

interface Props {
  barbers: any[];
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
        <BarberCard key={barber._id} barber={barber} />
      ))}
    </motion.div>
  );
}

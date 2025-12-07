// src/features/admin/services/components/ServicesGrid.tsx
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

interface Props {
  services: any[];
}

export default function ServicesGrid({ services }: Props) {
  if (services.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl">Chưa có dịch vụ nào</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </motion.div>
  );
}

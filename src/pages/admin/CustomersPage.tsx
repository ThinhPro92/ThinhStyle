import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerList from "../../features/customer/components/CustomerList";

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back button */}
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại Dashboard
        </Link>

        <CustomerList />
      </div>
    </div>
  );
}

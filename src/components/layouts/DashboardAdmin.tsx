import Sidebar from "../../features/staff/components/Sidebar";
import StatsCards from "../../features/staff/components/StatsCards";
import RevenueChart from "../../features/staff/components/RevenueChart";
import TopBarbers from "../sections/TopBarbers";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-black/50 backdrop-blur-xl border-b border-orange-500/20 p-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Chào mừng Admin ThinhStyle
          </h1>
        </header>

        <main className="p-8 space-y-8">
          <StatsCards />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>

            <TopBarbers />
          </div>
        </main>
      </div>
    </div>
  );
}

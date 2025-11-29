import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const LayoutMain = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50 dark:bg-gray-950">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutMain;

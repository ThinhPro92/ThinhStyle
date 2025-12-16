import { Link } from "react-router-dom";
import { Phone, Scissors, Menu, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import PhoneModal from "../booking/PhoneModal";
import ThemeToggle from "./ThemeToggle";
import { useCustomerStore } from "../../store/useCustomerStore";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openPhoneModal, setOpenPhoneModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useCustomerStore();
  const displayName = user?.name || user?.phone || "Khách";
  return (
    <header className="bg-header text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <Scissors className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform" />
            <div>
              <h1 className="text-2xl font-bold tracking-tighter">
                ThinhStyle
              </h1>
              <p className="text-xs text-text-muted -mt-1">Cắt Là Sướng</p>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="hover:text-accent transition">
              Trang chủ
            </Link>
            <Link to="/barbers" className="hover:text-accent transition">
              Thợ cắt
            </Link>
            <Link to="/services" className="hover:text-accent transition">
              Dịch vụ
            </Link>
            <Link to="/booking" className="hover:text-accent transition">
              Đặt lịch
            </Link>
            <Link to="/blogs" className="hover:text-accent transition">
              Về chúng tôi
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4" />
              <span>090 303 9559</span>
            </div>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{displayName}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
                    <Link
                      to="/profile/history"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-3 hover:bg-white/10 transition"
                    >
                      Lịch sử đặt lịch
                    </Link>
                    <Link
                      to="/profile/edit"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-3 hover:bg-white/10 transition"
                    >
                      Đổi tên hiển thị
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-red-500/20 transition flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                className="hidden sm:flex text-lg px-8 py-6"
                onClick={() => setOpenPhoneModal(true)}
              >
                Đặt lịch ngay
              </Button>
            )}
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent"
              >
                Trang chủ
              </Link>
              <Link
                to="/barbers"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent"
              >
                Thợ cắt
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent"
              >
                Dịch vụ
              </Link>
              <Link
                to="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent"
              >
                Về chúng tôi
              </Link>
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent font-bold"
              >
                Đặt lịch ngay
              </Link>
              <Button
                className="w-full mt-4"
                onClick={() => setOpenPhoneModal(true)}
              >
                Đặt lịch ngay
              </Button>
            </nav>
          </div>
        )}
        <PhoneModal
          isOpen={openPhoneModal}
          onClose={() => setOpenPhoneModal(false)}
        />
      </div>
    </header>
  );
}

// src/components/layout/Header.tsx
import { Link } from "react-router-dom";

import { Phone, Scissors, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-header text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Scissors className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform" />
            <div>
              <h1 className="text-2xl font-bold tracking-tighter">
                ThinhStyle
              </h1>
              <p className="text-xs text-text-muted -mt-1">Cắt Là Sướng</p>
            </div>
          </Link>

          {/* Desktop Menu */}
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
          </nav>

          {/* CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4" />
              <span>090 303 9559</span>
            </div>

            <Button className="hidden sm:flex">
              <Link to="/booking">Đặt lịch ngay</Link>
            </Button>

            {/* Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu đơn giản */}
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
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-accent font-bold"
              >
                Đặt lịch ngay
              </Link>
              <Button className="w-full mt-4">
                <Link to="/booking">Đặt lịch ngay</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

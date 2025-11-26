import { Link } from "react-router-dom";
import { Scissors, Phone, MapPin, Clock, Globe } from "lucide-react";
import InstagramIcon from "../icons/InstagramIcon";
import FaceBookIcon from "../icons/FaceBookIcon";
import TwitterIcon from "../icons/TwitterIcon";

export default function Footer() {
  return (
    <footer className="bg-footer text-text-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Scissors className="w-10 h-10 text-accent" />
              <div>
                <h2 className="text-2xl font-bold text-white">ThinhStyle</h2>
                <p className="text-sm text-accent">Cắt Là Sướng</p>
              </div>
            </div>
            <p className="text-sm">
              Tiệm tóc nam cao cấp – Phong cách hiện đại
            </p>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>090 303 9559</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>123 Đường ABC, Q.1, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4" />
                <span>08:00 - 21:00 (T2 - CN)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/barbers" className="hover:text-accent transition">
                  Đội ngũ thợ
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent transition">
                  Bảng giá dịch vụ
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-accent transition">
                  Đánh giá khách hàng
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-accent transition">
                  Đặt lịch online
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Theo dõi chúng tôi
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition">
                <Globe className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent transition">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent transition">
                <FaceBookIcon className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent transition">
                <TwitterIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm">
          <p>
            &copy; 2025 ThinhStyle - Cắt Là Sướng. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="vi">
      <body className={`${beVietnam.variable} bg-slate-50 text-slate-900`}>

        <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <span className="text-xl font-semibold text-blue-600">
              <Link href="/">Health<span className="text-slate-800">Booking</span></Link>
            </span>

            <button className="px-4 py-2 rounded-xl border border-blue-100 text-blue-600 hover:bg-blue-50 transition text-sm">
              Đăng nhập
            </button>
          </div>
        </header>

        {children}

        <footer className="bg-blue-50 py-10">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
            <p className="font-medium text-blue-600">
              HealthBooking
            </p>
            <p className="text-xs text-slate-500">
              © 2025 – Nền tảng đặt lịch phòng khám
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

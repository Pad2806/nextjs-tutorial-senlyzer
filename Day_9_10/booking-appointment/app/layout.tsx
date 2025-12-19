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
            <Link href="/" className="text-xl font-semibold text-blue-600">
              Health<span className="text-slate-800">Booking</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/#guide"
                className="text-sm text-slate-700 hover:text-blue-600"
              >
                Hướng dẫn đặt lịch
              </Link>

              <button className="px-4 py-2 rounded-xl border border-blue-100 text-blue-600 hover:bg-blue-50 transition text-sm">
                Đăng nhập
              </button>
            </div>
          </div>
        </header>

        {children}

        <footer className="bg-slate-50 border-t">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center">
            <p className="text-sm font-medium text-slate-700">HealthBooking</p>
            <p className="text-xs text-slate-500 mt-1">
              © 2025 – Nền tảng đặt lịch phòng khám
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

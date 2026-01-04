import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";
import AuthProvider from "@/app/provider/SessionProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thiện Nhân Hospital - Đặt lịch khám bệnh",
  description: "Hệ thống đặt lịch khám bệnh trực tuyến tại Thiện Nhân Hospital",
  icons: {
    icon: "/favicon.png",
  },
};

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
      <body
        suppressHydrationWarning
        className={`${beVietnam.variable} bg-slate-50 text-slate-900`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

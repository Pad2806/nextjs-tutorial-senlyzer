"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/chat") return null;

  return (
    <footer className="bg-slate-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-sm font-medium text-slate-700">HealthBooking</p>
        <p className="text-xs text-slate-500 mt-1">
          © 2025 – Nền tảng đặt lịch phòng khám
        </p>
      </div>
    </footer>
  );
}

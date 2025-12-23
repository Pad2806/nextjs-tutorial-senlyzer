"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isLoading } = useRequireAuth({ roles: ["admin"] });
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white border rounded-xl p-6 shadow">
          Checking admin permission...
        </div>
      </div>
    );
  }

  const item = (href: string, label: string) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    return (
      <Link
        href={href}
        className={`block px-4 py-3 rounded-xl font-medium transition
          ${
            active
              ? "bg-blue-50 text-blue-900 border border-blue-200"
              : "text-slate-700 hover:bg-slate-100"
          }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r">
        <div className="px-6 py-5 border-b">
          <h1 className="text-lg font-bold text-blue-700">Clinic Admin</h1>
        </div>

        <nav className="p-4 space-y-2">
          {item("/admin", "Quản lý lịch hẹn")}
          {item("/admin/payments", "Quản lý thanh toán")}
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}

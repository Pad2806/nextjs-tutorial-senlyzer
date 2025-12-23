"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRequireAuth({ roles: ["admin"] });

  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-xl font-medium transition ${
      pathname.startsWith(path)
        ? "bg-white text-blue-900 shadow"
        : "text-blue-100 hover:bg-blue-800"
    }`;

  return (
    <div className="min-h-screen flex bg-blue-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-xl font-bold leading-tight">
            Hospital <br /> Admin System
          </h1>
          <p className="text-blue-200 text-sm mt-1">Appointment Management</p>
        </div>

        <nav className="space-y-2 flex-1">
          <Link href="/admin/bookings" className={linkClass("/admin/bookings")}>
            Booking Management
          </Link>

          <Link href="/admin/payments" className={linkClass("/admin/payments")}>
            Payment Management
          </Link>
        </nav>

        <div className="pt-6 border-t border-blue-800 text-xs text-blue-300">
          © {new Date().getFullYear()} Hospital System
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

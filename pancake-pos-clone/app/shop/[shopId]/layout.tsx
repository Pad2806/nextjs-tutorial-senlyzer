"use client";

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/Header';
import { usePathname } from 'next/navigation';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Full screen pages: Root shop (POS), Returned Orders, and Order
  // We check if it ends with a number (shopId) for the root POS page, or matches specific subpaths
  const isPosPage = /^\/shop\/\d+$/.test(pathname); 
  const isFullScreenPage = isPosPage || pathname.includes('/returned-orders') || pathname.includes('/order') || pathname.includes('/livestream-manager') || pathname.includes('/list-returned-orders');

  return (
    <div className="flex min-h-screen bg-[#F2F4F7]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {!isFullScreenPage && <DashboardHeader />}
        <main className={`flex-1 overflow-y-auto w-full ${isFullScreenPage ? 'p-0' : 'p-6'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function RootSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Area */}
      <div className={`h-16 flex items-center px-4 border-b border-gray-50 gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
         <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">P</div>
         {!isCollapsed && <span className="text-lg font-bold text-blue-800 whitespace-nowrap overflow-hidden">Pancake POS</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
         <Link 
            href="/dashboard"
            title="Bảng điều khiển"
            className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-all ${
               pathname === '/dashboard' 
               ? 'bg-blue-50 text-blue-700' 
               : 'text-gray-600 hover:bg-gray-50'
            } ${isCollapsed ? 'justify-center' : ''}`}
         >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Bảng điều khiển</span>}
         </Link>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100">
         <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium w-full ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "Mở rộng" : "Thu gọn"}
         >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!isCollapsed && <span>Thu gọn</span>}
         </button>
      </div>
    </aside>
  );
}

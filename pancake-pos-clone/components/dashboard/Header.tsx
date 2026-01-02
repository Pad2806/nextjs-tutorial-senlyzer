"use client";

import { useState } from 'react';
import { Bell, Search, ChevronDown, HelpCircle, User, Settings, Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Left: Search */}
      <div className="flex items-center gap-4 flex-1">
         <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm đơn hàng, khách hàng..." 
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
            />
         </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors hidden sm:block">
           <HelpCircle className="w-5 h-5" />
        </button>

        <div className="relative">
          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative">
             <Bell className="w-5 h-5" />
             <span className="absolute top-1.5 right-1.5 w-2 flex h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
             </span>
          </button>
        </div>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        {/* Store Info */}
        <div className="flex items-center gap-3 pl-1 cursor-pointer">
           <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-gray-700">Cửa hàng chính</p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-green-600">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Online
              </div>
           </div>
           
           <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-2 gap-1 border-gray-200"
              >
                <StoreIcon className="w-4 h-4 text-gray-500" />
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </Button>
           </div>
        </div>

        {/* User Avatar Dropdown */}
        <div className="relative ml-2">
            <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
                <User className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
                <>
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowUserMenu(false)} 
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                        <Link href="/dashboard/settings/account" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                            <Settings className="w-4 h-4" />
                            Thiết lập tài khoản
                        </Link>
                        <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4" />
                                Ngôn ngữ
                            </div>
                            <span className="text-xs text-gray-400">›</span>
                        </button>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <Link href="/auth/login" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                            <LogOut className="w-4 h-4" />
                            Đăng xuất
                        </Link>
                    </div>
                </>
            )}
        </div>
      </div>
    </header>
  );
}

function StoreIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-10h2m-2-4h2m-7 4h2m-2-4h2" />
        </svg>
    )
}

"use client";

import { useState } from 'react';
import { 
  ArrowUpRight, 
  RefreshCcw, 
  ShoppingCart, 
  Package, 
  HelpCircle,
  X 
} from 'lucide-react';
import Link from 'next/link';

export default function ShopOverviewPage() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Black Advertising Banner */}
      {showBanner && (
        <div className="relative bg-black rounded-lg p-6 lg:p-8 overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <button 
              onClick={() => setShowBanner(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="z-10 space-y-2">
               <div className="flex items-center gap-2 text-[#FF4D4F] font-bold tracking-widest text-xs uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D4F]"></span>
                  Pancake
               </div>
               <h3 className="text-xl md:text-2xl font-bold leading-tight">
                 MỚI NHẤT: TÍCH HỢP PLUGIN TIKTOK GMX MAX TRÊN POS
               </h3>
               <p className="text-gray-400 text-sm">
                 Quản lý đơn hàng và vận hành TikTok Shop hiệu quả
               </p>
            </div>
            
            {/* Abstract Graphic lines (CSS) */}
            <div className="hidden md:block">
               <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
                 <path d="M5 55L45 15L85 40L125 10L165 30L195 5" stroke="#FF4D4F" strokeWidth="3" />
               </svg>
            </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center gap-3">
         <div className="flex items-center gap-2 pl-2">
            <span className="text-sm font-medium text-gray-600">Khoảng thời gian</span>
         </div>
         <div className="h-6 w-px bg-gray-200"></div>
         
         <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm font-medium hover:bg-white transition-colors flex items-center gap-2">
            📅 7 ngày qua
         </button>
         
         <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">So sánh với</span>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-500 hover:text-gray-900 transition-colors">
               Trước đó 7 ngày
            </button>
         </div>

         <div className="flex-1"></div>

         <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Thêm lọc
         </button>
         <button className="p-1.5 text-gray-400 hover:text-blue-600">
            <RefreshCcw className="w-4 h-4" />
         </button>
         <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
            ⚙️ Cấu hình
         </button>
      </div>

      {/* Stats Cards Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {/* Card 1: Green */}
         <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded bg-[#4CAF50] text-white flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4" />
               </div>
               <h3 className="font-semibold text-gray-700">Tổng hàng chốt</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-gray-500 mb-1">Tổng tiền</p>
                  <p className="text-xl font-bold text-[#4CAF50]">0 ₫</p>
                  <p className="text-[10px] text-red-500">-</p>
               </div>
               <div>
                   <p className="text-xs text-gray-500 mb-1">Số lượng</p>
                   <p className="text-xl font-bold text-gray-900">0</p>
                   <p className="text-[10px] text-red-500">-</p>
               </div>
            </div>
         </div>

         {/* Card 2: Orange */}
         <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded bg-[#FF9800] text-white flex items-center justify-center">
                  <RefreshCcw className="w-4 h-4" />
               </div>
               <h3 className="font-semibold text-gray-700">Tổng hàng hoàn</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-gray-500 mb-1">Tổng tiền</p>
                  <p className="text-xl font-bold text-[#FF9800]">0 ₫</p>
                  <p className="text-[10px] text-red-500">-</p>
               </div>
               <div>
                   <p className="text-xs text-gray-500 mb-1">Số lượng</p>
                   <p className="text-xl font-bold text-gray-900">0</p>
                   <p className="text-[10px] text-red-500">-</p>
               </div>
            </div>
         </div>

         {/* Card 3: Blue (Simple) */}
         <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#1890FF] text-white flex items-center justify-center">
                     <Package className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-gray-700">Có thể bán</h3>
               </div>
               <span className="text-xl font-bold text-gray-900">0</span>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-4 pt-4 border-t border-gray-100">
               <div>
                  <p className="text-xs text-gray-500 mb-1">Giá nhập</p>
                  <p className="text-lg font-semibold text-gray-900">0 ₫</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500 mb-1">Giá bán</p>
                  <p className="text-lg font-semibold text-gray-900">0 ₫</p>
               </div>
            </div>
         </div>
      </div>

      {/* Stats Cards Row 2 (Detailed) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-5">
             <div className="grid grid-cols-3 gap-6 divide-x divide-gray-100">
                {/* Total */}
                <div className="space-y-4">
                   <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                      <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">$</div>
                      Tổng cộng
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-xs text-gray-500">Doanh thu:</span>
                      <span className="font-bold text-gray-900">0 ₫</span>
                   </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-gray-500">Đơn chốt:</span>
                      <span className="font-bold text-gray-900">0</span>
                   </div>
                </div>
                
                {/* Online */}
               <div className="space-y-4 pl-6">
                   <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                      <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">🌐</div>
                      Online
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-xs text-gray-500">Doanh thu:</span>
                      <span className="font-bold text-gray-900">0 ₫</span>
                   </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-gray-500">Đơn chốt:</span>
                      <span className="font-bold text-gray-900">0</span>
                   </div>
                </div>

                {/* Counter */}
               <div className="space-y-4 pl-6">
                   <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                      <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">🏪</div>
                      Bán tại quầy
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-xs text-gray-500">Doanh thu:</span>
                      <span className="font-bold text-gray-900">0 ₫</span>
                   </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-gray-500">Đơn chốt:</span>
                      <span className="font-bold text-gray-900">0</span>
                   </div>
                </div>
             </div>
             
             {/* Chart Tabs (Placeholder) */}
             <div className="mt-8 border-b border-gray-200 flex gap-6 text-sm">
                <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-medium">Tổng quan</button>
                <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700">Nguồn đơn</button>
                <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700">Trạng thái</button>
             </div>
             <div className="h-64 flex items-center justify-center text-gray-400 mt-4">
                Biểu đồ chưa có dữ liệu
             </div>
          </div>

          {/* Right Widget: Business Info */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col h-full">
             <h3 className="font-semibold text-gray-800 mb-4">Thông tin kinh doanh hôm nay</h3>
             
             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded">
                   <p className="text-xs text-gray-500">Doanh thu</p>
                   <p className="font-bold text-gray-900 mt-1">0 ₫</p>
                </div>
                 <div className="bg-gray-50 p-3 rounded">
                   <p className="text-xs text-gray-500">Đơn chốt</p>
                   <p className="font-bold text-gray-900 mt-1">0</p>
                </div>
             </div>

             {/* Feedback Box */}
             <div className="mt-auto bg-white border border-blue-200 rounded-lg p-4 shadow-lg shadow-blue-50 relative">
                <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-b border-r border-blue-200 transform rotate-45"></div>
                <h4 className="font-bold text-sm text-gray-800 mb-1">Ý kiến của bạn rất quan trọng!</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  2 phút điền khảo sát để giúp chúng tôi nâng cấp trải nghiệm tốt hơn
                </p>
             </div>
             
             <div className="flex justify-end mt-4">
                <button className="w-10 h-10 bg-[#0052CC] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors">
                   <span className="text-xl">📝</span>
                </button>
             </div>
          </div>
      </div>
    </div>
  );
}

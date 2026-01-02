"use client";

import { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Clock, 
  Bell, 
  HelpCircle, 
  User, 
  Settings,
  RefreshCw,
  Calendar,
  LayoutGrid,
  List,
  ArrowUpDown,
  Filter,
  Box,
  MoreHorizontal
} from 'lucide-react';

export default function OrdersPage() {
  const [activeTypeTab, setActiveTypeTab] = useState('Tất cả');
  const [activeCategoryTab, setActiveCategoryTab] = useState('Đơn hàng');
  const [activeStatus, setActiveStatus] = useState('Tất cả');

  // Status mapping based on category
  const statuses = {
    'Đơn hàng': [
      { name: 'Tất cả', count: 0 },
      { name: 'Mới', count: 0 },
      { name: 'Chờ hàng', count: 0 },
      { name: 'Đã xác nhận', count: 0 },
      { name: 'Đang đóng hàng', count: 0 },
      { name: 'Chờ chuyển hàng', count: 0 },
      { name: 'Đã gửi hàng', count: 0 },
      { name: 'Đã nhận', count: 0 },
      { name: 'Đã thu tiền', count: 0 },
    ],
    'Cần xử lý': [
      { name: 'Tất cả', count: 0 },
      { name: 'Giao không thành', count: 0 },
      { name: 'Chưa đối soát', count: 0 },
      { name: 'Đối soát lệch', count: 0 },
      { name: 'Quá ngày giao hàng', count: 0 },
      { name: 'Trễ lấy hàng', count: 0 },
      { name: 'Không lấy được hàng', count: 0 },
    ],
    'Trễ giao': [
      { name: 'Tất cả', count: 0 },
      { name: 'Cần xử lý', count: 0 },
      { name: 'Đã xử lý', count: 0 },
      { name: 'Đã phản hồi', count: 0 },
    ],
    'Vị trí': [
        { name: 'Tất cả', count: 0 },
        { name: 'Nội thành', count: 0 },
        { name: 'Ngoại thành', count: 0 },
        { name: 'Ngoại tỉnh', count: 0 },
        { name: 'Không xác định', count: 0 },
    ]
  };

  const getActiveStatuses = () => {
    return statuses[activeCategoryTab as keyof typeof statuses] || [];
  };

  return (
    <div className="flex h-screen bg-[#EAEDF1] overflow-hidden">
       {/* Main Content Area */}
       <div className="flex-1 flex flex-col min-w-0">
          
          {/* 1. Top Header (Search & User) */}
          <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
             <div className="flex-1 max-w-2xl relative">
                <input 
                  type="text" 
                  placeholder="Mã đơn / Mã vận chuyển / Tên / Địa chỉ / Số điện thoại / Ghi chú" 
                  className="w-full h-9 bg-gray-100 border-none rounded px-4 pl-10 text-sm focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             </div>
             
             <div className="flex items-center gap-4 ml-4">
                <div className="relative">
                   <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-sm text-gray-700 font-medium transition-colors">
                      Tất cả các kho <ChevronDown className="w-4 h-4" />
                   </button>
                </div>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <div className="flex items-center gap-3 text-gray-500">
                   <Clock className="w-5 h-5 hover:text-gray-700 cursor-pointer" />
                   <Bell className="w-5 h-5 hover:text-gray-700 cursor-pointer" />
                   <HelpCircle className="w-5 h-5 hover:text-gray-700 cursor-pointer" />
                   <User className="w-5 h-5 hover:text-gray-700 cursor-pointer" />
                </div>
             </div>
          </header>

          {/* 2. Filter Bar (Type Tabs & Actions) */}
          <div className="bg-white px-4 py-2 border-b border-gray-200 flex justify-between items-center shrink-0">
              <div className="flex bg-gray-100 rounded p-1">
                  {['Tất cả', 'Bán tại quầy', 'Online'].map(tab => (
                      <button 
                        key={tab}
                        className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${activeTypeTab === tab ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => setActiveTypeTab(tab)}
                      >
                          {tab}
                      </button>
                  ))}
              </div>
              <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 bg-white hover:bg-gray-50">In đơn</button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 bg-white hover:bg-gray-50">Cập nhật nhanh</button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 bg-white hover:bg-gray-50">Đóng hàng</button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 bg-white hover:bg-gray-50">Xuất</button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 bg-white hover:bg-gray-50">Nhập</button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 bg-white hover:bg-gray-50 flex items-center gap-1">
                      Thao tác <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-1.5 bg-[#0052CC] hover:bg-blue-700 text-white rounded font-medium text-sm">
                      Tạo đơn
                  </button>
              </div>
          </div>

          {/* 3. Category Tabs & Tools */}
          <div className="bg-white px-4 pt-3 flex flex-col shrink-0">
             <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <div className="flex gap-6">
                      {['Đơn hàng', 'Cần xử lý', 'Trễ giao', 'Vị trí'].map(cat => (
                          <button 
                             key={cat}
                             className={`relative pb-2 text-sm font-medium transition-colors ${activeCategoryTab === cat ? 'text-[#0052CC]' : 'text-gray-600 hover:text-gray-900'}`}
                             onClick={() => {
                                 setActiveCategoryTab(cat);
                                 setActiveStatus('Tất cả'); // Reset status on cat switch
                             }}
                          >
                              {cat}
                              {activeCategoryTab === cat && (
                                  <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-[#0052CC]"></div>
                              )}
                          </button>
                      ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                      <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><RefreshCw className="w-4 h-4" /></button>
                      <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><Calendar className="w-4 h-4" /></button>
                      <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><LayoutGrid className="w-4 h-4" /></button>
                      <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><List className="w-4 h-4" /></button>
                      <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><ArrowUpDown className="w-4 h-4" /></button>
                      <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><Filter className="w-4 h-4" /></button>
                  </div>
             </div>

             {/* 3.5 Active Filters Row (Conditional) */}
             {(activeCategoryTab === 'Trễ giao' || activeCategoryTab === 'Vị trí') && (
                 <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                     <div className="flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-sm px-2 py-1 rounded shadow-sm">
                         <span className="font-semibold">Trạng thái:</span> 
                         <span>{activeCategoryTab === 'Trễ giao' ? 'Đã gửi hàng' : 'Đã xác nhận'}</span>
                         <button className="text-gray-400 hover:text-gray-600 ml-1"><ChevronDown className="w-3 h-3" /></button>
                         <button className="text-gray-400 hover:text-red-500 ml-1">×</button>
                     </div>
                 </div>
             )}

             {/* 4. Status Filter Pills */}
             <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
                {getActiveStatuses().map(status => (
                    <button
                        key={status.name}
                        className={`px-3 py-1 text-sm border rounded-full whitespace-nowrap transition-colors flex items-center gap-1 ${activeStatus === status.name ? 'border-[#0052CC] text-[#0052CC] bg-blue-50 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => setActiveStatus(status.name)}
                    >
                        {status.name} <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full ml-1">{status.count}</span>
                         {status.name === 'Trễ giao hàng' && <MoreHorizontal className="w-3 h-3 ml-1" />}
                    </button>
                ))}
                 <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronDown className="w-4 h-4" /></button>
             </div>
          </div>

          {/* 5. Main Content (Empty State) */}
          <div className="flex-1 bg-[#EEF2F5] p-3 overflow-hidden flex flex-col">
              {/* Table Header like */}
              <div className="h-10 bg-[#D4DBE6] rounded-t flex items-center px-4 border-b border-gray-300 text-xs font-semibold text-gray-600 uppercase">
                  {/* Just a placeholder for the header style shown in the screenshot */}
              </div>
              <div className="flex-1 bg-white flex flex-col items-center justify-center rounded-b border border-t-0 border-gray-200 shadow-sm">
                   <div className="flex flex-col items-center gap-3 opacity-50">
                       <Box className="w-16 h-16 text-gray-300 stroke-[1]" />
                       <span className="text-gray-400 text-sm">Trống</span>
                   </div>
              </div>
          </div>

          {/* 6. Footer (Stats) */}
          <div className="h-10 bg-[#F0F2F5] border-t border-gray-200 px-4 flex justify-between items-center shrink-0 text-xs font-medium text-gray-700 select-none">
             <div className="flex items-center gap-6">
                <span>COD: <span className="font-bold">0 ₫</span></span>
                <span>Trả trước: <span className="font-bold">0 ₫</span></span>
                <span>Cước VC: <span className="font-bold">0 ₫</span></span>
                <span>Phí VC thu khách: <span className="font-bold">0 ₫</span></span>
             </div>
             <button className="text-blue-600 hover:text-blue-800">
                <Settings className="w-4 h-4" />
             </button>
          </div>

       </div>
    </div>
  );
}

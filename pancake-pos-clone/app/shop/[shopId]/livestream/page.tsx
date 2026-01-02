"use client";

import { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Clock, 
  Bell, 
  HelpCircle, 
  User, 
  RefreshCw,
  Calendar,
  Inbox
} from 'lucide-react';

export default function LivestreamPage() {
  const [showScriptModal, setShowScriptModal] = useState(false);

  return (
    <div className="flex h-screen bg-[#F2F4F7] overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
            {/* 1. Main Header */}
            <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
                <div className="flex-1 max-w-2xl relative">
                    <input 
                        type="text" 
                        placeholder="Tên chiến dịch livestream" 
                        className="w-full h-9 bg-gray-100 border-none rounded px-4 pl-10 text-sm focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                
                <div className="flex items-center gap-4 ml-4">
                    <div className="relative">
                       <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-sm text-gray-700 font-medium transition-colors">
                          Tất cả các kho <ChevronDown className="w-4 h-4" />
                       </button>
                    </div>
                    {/* Icons */}
                    <div className="flex items-center gap-3 text-gray-500">
                       <Clock className="w-5 h-5 hover:text-gray-700 cursor-pointer" />
                       <Bell className="w-5 h-5 hover:text-gray-700 cursor-pointer" />
                       <HelpCircle className="w-5 h-5 hover:text-gray-700 cursor-pointer" />
                       <User className="w-5 h-5 hover:text-gray-700 cursor-pointer" />
                    </div>
                </div>
            </header>
            
            {/* 2. Page Content Wrapper */}
            <div className="flex-1 overflow-y-auto p-6">
                 {/* Title & Action */}
                <div className="flex justify-between items-center mb-4"> 
                    <h1 className="text-xl font-bold text-gray-800">Livestream</h1>
                    <button 
                        className="bg-[#0052CC] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm"
                        onClick={() => setShowScriptModal(true)}
                    >
                        Tạo kịch bản
                    </button>
                </div>

                {/* Table Container (The white box) */}
                <div className="bg-white rounded lg:rounded-lg shadow-sm border border-gray-200 min-h-[500px] flex flex-col">
                    {/* Tabs & Filters */}
                    <div className="px-4 border-b border-gray-200 flex justify-between items-center">
                        {/* Left Tabs */}
                        <div className="flex pt-1">
                            <button className="px-4 py-3 text-sm font-semibold text-[#0052CC] border-b-2 border-[#0052CC] hover:bg-blue-50/50 rounded-t">
                                Livestream
                            </button>
                        </div>
                        {/* Right Filters */}
                        <div className="flex items-center gap-2 py-2">
                            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded border border-gray-200">
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded border border-gray-200">
                                <Calendar className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Table Area */}
                    <div className="flex-1 overflow-x-auto">
                        <div className="min-w-[1600px] h-full flex flex-col">
                            {/* Table Header */}
                            <div className="bg-[#EBEBEB] grid grid-cols-[2fr_1.2fr_1.5fr_1.5fr_1.2fr_1.2fr_0.8fr_1fr_1fr_0.8fr] gap-4 px-4 py-3 text-xs font-bold text-gray-700 border-b border-gray-200">
                                <div>Chiến dịch livestream</div>
                                <div>Trang phát</div>
                                <div>Kho tạo đơn</div>
                                <div>Kho đồng bộ tồn</div>
                                <div>Ngày tạo</div>
                                <div>Thời gian kết thúc</div>
                                <div>Bình luận</div>
                                <div>Khách hàng</div> 
                                <div>Doanh thu</div>
                                <div>Trạng thái</div>
                            </div>

                            {/* Empty State */}
                            <div className="flex-1 flex flex-col items-center justify-center p-10 text-gray-300 bg-white">
                               <div className="mb-4">
                                   <Inbox className="w-16 h-16 stroke-[1]" />
                               </div>
                               <span className="text-sm">Trống</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Modal: Tạo kịch bản */}
        {showScriptModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                <div className="bg-white rounded-lg w-[500px] shadow-xl animate-in fade-in zoom-in duration-200 border border-gray-200">
                     <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800">Tạo kịch bản</h3>
                        <button onClick={() => setShowScriptModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
                     </div>
                     <div className="p-6 space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Tên kịch bản <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:border-blue-500 outline-none placeholder:text-gray-400" placeholder="Nhập tên kịch bản" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Kho tạo đơn</label>
                            <div className="relative">
                                <select className="w-full h-10 border border-gray-300 rounded px-3 text-sm appearance-none outline-none bg-white text-gray-600">
                                    <option>Chọn kho hàng</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700">Kho đồng bộ tồn</label>
                             <div className="relative">
                                <select className="w-full h-10 border border-gray-300 rounded px-3 text-sm appearance-none outline-none bg-white text-gray-800">
                                    <option>Chọn kho hàng</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                     </div>
                     <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-lg">
                        <button 
                            onClick={() => setShowScriptModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Hủy
                        </button>
                        <button className="px-6 py-2 bg-[#0052CC] text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm transition-colors">
                            Đồng ý
                        </button>
                     </div>
                </div>
            </div>
        )}
    </div>
  );
}

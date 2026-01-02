"use client";

import { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Clock, 
  Bell, 
  HelpCircle, 
  User, 
  Inbox,
  Download,
  RefreshCw,
  LayoutGrid,
  ListFilter, 
  ChevronRight,
  Calendar,
  Zap,
  Plus,
  X,
  ScanBarcode,
  Filter
} from 'lucide-react';
import Link from 'next/link';

export default function ReturnsPage() {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  return (
    <div className="flex h-screen bg-[#F2F4F7] overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
            {/* 1. Header */}
            <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
                <div className="flex-1 max-w-2xl relative">
                    <input 
                        type="text" 
                        placeholder="Mã đơn đổi trả / Khách hàng / Số điện thoại ..." 
                        className="w-full h-9 bg-gray-200 border-none rounded px-4 pl-10 text-sm focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                
                <div className="flex items-center gap-4 ml-4">
                    <div className="relative">
                       <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded text-sm text-gray-700 font-medium transition-colors">
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
            
            {/* 2. Content */}
            <div className="flex-1 overflow-y-auto p-6">
                 {/* Title & Actions */}
                <div className="flex justify-between items-center mb-4"> 
                    <h1 className="text-xl font-bold text-gray-800">Đổi trả</h1>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setShowExportModal(true)}
                            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm"
                        >
                            Xuất
                        </button>
                        <button 
                             onClick={() => setShowUpdateModal(true)}
                             className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm"
                        >
                             <Zap className="w-4 h-4 text-gray-500" /> Cập nhật nhanh
                        </button>
                        <Link href="/shop/100934568/returned-orders">
                            <button className="bg-[#0052CC] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors">
                                Tạo đơn trả hàng
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded lg:rounded-lg shadow-sm border border-gray-200 min-h-[500px] flex flex-col">
                    {/* Tabs & Tools */}
                    <div className="px-4 border-b border-gray-200 flex justify-between items-center">
                         <div className="flex">
                            <button className="px-4 py-3 text-sm font-semibold text-[#0052CC] border-b-2 border-[#0052CC] hover:bg-blue-50/50 rounded-t">
                                Đổi trả
                            </button>
                         </div>
                         <div className="flex items-center gap-2 py-2">
                            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 border border-gray-200 shadow-sm"><RefreshCw className="w-4 h-4" /></button>
                            <div className="relative">
                                <button onClick={() => setShowDateFilter(!showDateFilter)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500 border border-gray-200 shadow-sm"><Calendar className="w-4 h-4" /></button>
                                {showDateFilter && (
                                    <div className="absolute right-0 top-full mt-2 w-[600px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex overflow-hidden">
                                        <div className="w-40 border-r border-gray-100 bg-gray-50 p-2 space-y-1">
                                            {['Hôm nay', 'Hôm qua', '7 ngày qua', '30 ngày qua', 'Tháng trước', 'Đầu tuần đến nay'].map(opt => (
                                                <button key={opt} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-white hover:shadow-sm rounded transition-colors">{opt}</button>
                                            ))}
                                        </div>
                                        <div className="flex-1 p-4">
                                            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                                <input type="date" className="border rounded px-2 py-1 text-sm" />
                                                <span>→</span>
                                                <input type="date" className="border rounded px-2 py-1 text-sm" />
                                            </div>
                                            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
                                                <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
                                                {Array.from({length: 31}).map((_, i) => (
                                                    <div key={i} className={`p-2 rounded cursor-pointer hover:bg-blue-50 ${i === 26 ? 'bg-blue-500 text-white' : ''}`}>{i + 1}</div>
                                                ))}
                                            </div>
                                            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                                                <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50">Mặc định</button>
                                                <button onClick={() => setShowDateFilter(false)} className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50">Đóng</button>
                                                <button className="px-3 py-1.5 text-sm bg-[#0052CC] text-white rounded hover:bg-blue-700">Áp dụng</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setShowColumnConfig(true)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500 border border-gray-200 shadow-sm"><LayoutGrid className="w-4 h-4" /></button>
                            
                            <div className="relative">
                                <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500 border border-gray-200 shadow-sm"><ListFilter className="w-4 h-4" /></button>
                                {showFilterDropdown && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-1">
                                        <div className="group relative">
                                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex justify-between items-center">
                                                <span>Người tạo</span>
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            </button>
                                            {/* Submenu */}
                                            <div className="hidden group-hover:block absolute right-full top-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 mr-1">
                                                 <div className="px-3 py-2 border-b border-gray-100">
                                                     <input type="text" placeholder="Tìm kiếm" className="w-full h-8 px-2 border border-gray-200 rounded text-sm outline-none focus:border-blue-500" />
                                                 </div>
                                                 <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2">
                                                     <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold">AD</span>
                                                     Anh Duy
                                                 </button>
                                            </div>
                                        </div>
                                        {['Đơn vị vận chuyển', 'Khách hàng', 'Nhân viên tạo đơn gốc', 'Đơn đổi mới', 'Kho', 'Nguồn đơn hàng'].map(item => (
                                            <button key={item} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex justify-between items-center group">
                                                <span>{item}</span>
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                         </div>
                    </div>

                    {/* Filters Row */}
                    <div className="px-4 py-2 border-b border-gray-200 flex items-center gap-1 overflow-x-auto no-scrollbar">
                        {[
                            { label: 'Tất cả', count: 0, active: true },
                            { label: 'Mới', count: 0 },
                            { label: 'Đã gửi hàng', count: 0 },
                            { label: 'Hoàn tất', count: 0 },
                            { label: 'Đã huỷ', count: 0 },
                            { label: 'Đã xóa', count: 0 },
                        ].map((stat) => (
                             <button 
                                key={stat.label}
                                className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                                    stat.active 
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium' 
                                    : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                                }`}
                             >
                                {stat.label} <span className="ml-1 text-xs opacity-80">{stat.count}</span>
                             </button>
                        ))}
                    </div>

                    {/* Scrollable Table Area */}
                    <div className="flex-1 overflow-x-auto">
                        <div className="min-w-[1500px] h-full flex flex-col">
                            {/* Table Header */}
                            <div className="bg-[#EBEBEB] grid grid-cols-[40px_100px_120px_150px_150px_180px_200px_120px_120px] gap-4 px-4 py-3 text-xs font-bold text-gray-700 border-b border-gray-200 uppercase">
                                <div className="flex items-center justify-center"><input type="checkbox" className="rounded border-gray-400" /></div>
                                <div>ID</div>
                                <div>Giảm giá</div>
                                <div>Tổng tiền hàng trả</div>
                                <div>Tạo lúc</div>
                                <div>COD đơn đổi</div> 
                                <div>Ghi chú nội bộ</div>
                                <div>Người tạo đơn gốc</div>
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

        {/* Modal: Cấu hình cột */}
        {showColumnConfig && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                <div className="bg-white rounded-lg w-[800px] shadow-xl animate-in fade-in zoom-in duration-200 border border-gray-200 flex flex-col max-h-[90vh]">
                     <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 shrink-0">
                        <h3 className="text-lg font-bold text-gray-800">Cấu hình cột</h3>
                        <button onClick={() => setShowColumnConfig(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
                     </div>
                     <div className="flex flex-1 overflow-hidden">
                        {/* Search and Checkboxes */}
                        <div className="w-1/2 p-4 border-r border-gray-100 overflow-y-auto">
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder="Tìm kiếm cột" className="w-full h-9 pl-9 pr-4 border border-gray-200 rounded text-sm outline-none focus:border-blue-500" />
                            </div>
                            <div className="space-y-3">
                                {['ID', 'Người tạo', 'Thẻ', 'Khách hàng', 'Phí trả hàng', 'Tổng tiền hàng trả', 'COD đơn đổi', 'Người tạo đơn gốc', 'Đơn đổi mới', 'NV chăm sóc', 'Sản phẩm', 'SĐT', 'Giảm giá', 'Tạo lúc', 'Ghi chú nội bộ', 'Sản phẩm đổi mới', 'Trạng thái'].map(col => (
                                    <label key={col} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-0" defaultChecked={!['Đơn đổi mới', 'NV chăm sóc'].includes(col)} />
                                        <span className="text-sm text-gray-700">{col}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Right Side List */}
                        <div className="w-1/2 p-4 overflow-y-auto bg-gray-50/50">
                             <h4 className="text-sm font-semibold text-gray-700 mb-3">Cột hiển thị</h4>
                             <div className="space-y-2">
                                {['ID', 'Người tạo', 'Thẻ', 'Sản phẩm', 'Khách hàng', 'SĐT', 'Phí trả hàng', 'Giảm giá'].map(col => (
                                    <div key={col} className="bg-white border border-gray-200 rounded p-2 flex justify-between items-center shadow-sm cursor-move">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400">::</span>
                                            <span className="text-sm text-gray-700">{col}</span>
                                        </div>
                                        <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" />
                                    </div>
                                ))}
                             </div>
                        </div>
                     </div>
                     <div className="p-4 border-t border-gray-100 flex justify-end gap-2 shrink-0">
                         <button onClick={() => setShowColumnConfig(false)} className="px-4 py-2 border border-gray-200 rounded text-gray-700 text-sm hover:bg-gray-50">Huỷ</button>
                         <button className="px-4 py-2 bg-[#0052CC] text-white rounded text-sm hover:bg-blue-700 font-medium">Áp dụng</button>
                     </div>
                </div>
            </div>
        )}

        {/* Modal: Xuất Excel */}
        {showExportModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                <div className="bg-white rounded-lg w-[600px] shadow-xl animate-in fade-in zoom-in duration-200 border border-gray-200">
                     <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800">Xuất Excel</h3>
                        <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
                     </div>
                     <div className="p-6 space-y-6">
                        {/* Sample File */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                            <label className="text-sm font-semibold text-gray-800 block">Chọn mẫu file</label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <select className="w-full h-10 border border-gray-300 rounded px-3 text-sm appearance-none outline-none bg-white text-gray-700">
                                        <option>Mặc định</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                <button className="bg-[#0052CC] hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm flex items-center gap-2">
                                    <Download className="w-4 h-4" /> Tải xuống
                                </button>
                            </div>
                        </div>

                        {/* List Selection */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                             <label className="text-sm font-semibold text-gray-800 block">Danh sách đơn</label>
                             <div className="space-y-3">
                                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded text-blue-700 text-sm">
                                    <ScanBarcode className="w-5 h-5" />
                                    <span>Quét Barcode (đơn hàng, vận đơn) để thêm đơn hàng</span>
                                </div>
                                <p className="text-xs text-gray-500 pl-1">0 Đơn được chọn</p>
                                <label className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                                    <Filter className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-700">Chọn toàn bộ đơn đổi trả theo bộ lọc hiện tại</span>
                                </label>
                             </div>
                        </div>
                     </div>
                </div>
            </div>
        )}

        {/* Modal: Cập nhật nhanh */}
        {showUpdateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                <div className="bg-white rounded-lg w-[650px] shadow-xl animate-in fade-in zoom-in duration-200 border border-gray-200">
                     <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800">Cập nhật nhanh đơn đổi trả</h3>
                         <button onClick={() => setShowUpdateModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
                     </div>
                     <div className="p-6 space-y-5 bg-gray-50/50">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 shadow-sm">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-800">Hình thức cập nhật</label>
                                <div className="relative">
                                    <select className="w-full h-10 border border-gray-300 rounded px-3 text-sm appearance-none outline-none bg-white text-gray-700 font-medium">
                                        <option>✩ Cập nhật trạng thái</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="flex justify-end pt-2">
                                     <button className="px-3 py-1.5 bg-gray-100 text-gray-400 rounded text-xs font-medium cursor-not-allowed">Cập nhật</button>
                                </div>
                            </div>
                        </div>

                         <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 shadow-sm">
                             <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-800">⚙ Cấu hình trạng thái</label>
                                <div className="relative">
                                    <select className="w-full h-10 border border-gray-300 rounded px-3 text-sm appearance-none outline-none bg-white text-gray-400">
                                        <option>Chọn trạng thái</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3 shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                                <span>✓ 0 Đơn được chọn</span>
                            </div>
                             <label className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                    <span className="text-sm text-gray-700">Chọn toàn bộ đơn đổi trả theo bộ lọc hiện tại</span>
                            </label>
                        </div>
                     </div>
                </div>
            </div>
        )}
    </div>
  );
}

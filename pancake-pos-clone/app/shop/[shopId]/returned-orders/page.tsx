"use client";

import { 
  Plus, 
  Search, 
  ScanBarcode, 
  ChevronDown, 
  Calendar, 
  Printer, 
  Save, 
  Clock, 
  Bell, 
  HelpCircle, 
  User, 
  Box,
  CreditCard,
  Info,
  MoreHorizontal
} from 'lucide-react';

export default function ReturnedOrdersPage() {
  return (
    <div className="flex h-screen bg-[#EAEDF1] overflow-hidden">
       {/* Main Content Area */}
       <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
             <div className="flex items-center gap-4">
                <h1 className="text-lg font-bold text-gray-800">Tạo đơn</h1>
             </div>
             
             <div className="flex items-center gap-4">
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

          {/* Tab Bar */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-2 shrink-0">
             <div className="flex items-center px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold cursor-pointer border border-blue-100">
                Trả hàng
             </div>
             <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                <Plus className="w-5 h-5 text-gray-500" />
             </button>
          </div>

          {/* Workspace */}
          <div className="flex-1 overflow-y-auto p-3">
             <div className="flex flex-col lg:flex-row gap-3 h-full min-h-min">
                
                {/* LEFT COLUMN (Main) */}
                <div className="flex-1 flex flex-col gap-3 min-w-0">
                   
                   {/* 1. Trả hàng Block */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[320px]">
                      <div className="p-3 border-b border-gray-100 flex items-center justify-between gap-3">
                         <h3 className="font-semibold text-gray-800">Trả hàng</h3>
                         <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded text-xs text-gray-600">
                               Online <ChevronDown className="w-3 h-3" />
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded text-xs text-gray-600">
                               Kho mặc định <ChevronDown className="w-3 h-3" />
                            </button>
                         </div>
                      </div>
                      <div className="p-3 border-b border-gray-100 flex items-center gap-3">
                          <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                              type="text" 
                              placeholder="Nhập mã, tên sản phẩm hoặc Barcode" 
                              className="w-full h-9 pl-9 pr-24 bg-gray-50 border border-gray-200 rounded text-sm focus:border-blue-500 outline-none transition-colors"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 hover:bg-gray-200 rounded text-gray-500 transition-colors cursor-pointer group">
                               <ScanBarcode className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                               <span className="text-xs text-gray-500 font-medium group-hover:text-gray-700">(F9)</span>
                            </button>
                         </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                         <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                            <Box className="w-8 h-8 text-gray-300" />
                         </div>
                         <span className="text-sm">Giỏ hàng trống</span>
                      </div>
                   </div>

                   {/* 2. Đơn đổi hàng Block */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[320px]">
                      <div className="p-3 border-b border-gray-100 flex items-center justify-between gap-3">
                         <h3 className="font-semibold text-gray-800">Đơn đổi hàng</h3>
                         <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded text-xs text-gray-600">
                               Chọn nguồn đơn <ChevronDown className="w-3 h-3" />
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded text-xs text-gray-600">
                               Kho mặc định <ChevronDown className="w-3 h-3" />
                            </button>
                         </div>
                      </div>
                      <div className="p-3 border-b border-gray-100 flex items-center justify-between gap-3">
                         <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 bg-white border border-blue-500 text-blue-600 rounded text-xs font-medium">Sản phẩm</button>
                            <button className="px-3 py-1.5 bg-gray-100 text-gray-500 rounded text-xs font-medium hover:bg-gray-200">Combo</button>
                         </div>
                         <div className="flex-1 relative">
                            <input 
                              type="text" 
                              placeholder="Nhập mã, tên sản phẩm hoặc Barcode" 
                              className="w-full h-8 pl-3 pr-2 bg-gray-50 border border-gray-200 rounded text-xs focus:border-blue-500 outline-none"
                            />
                         </div>
                         <div className="flex items-center gap-2">
                             <label className="flex items-center gap-1 text-xs text-gray-600">
                               <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                               Còn hàng
                            </label>
                            <button className="flex items-center gap-1 px-2 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700">
                               <ScanBarcode className="w-3 h-3" /> (F9)
                            </button>
                         </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                         <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                            <Box className="w-8 h-8 text-gray-300" />
                         </div>
                         <span className="text-sm">Giỏ hàng trống</span>
                      </div>
                   </div>

                   {/* 3. Bottom Row: Info/Payment & Notes */}
                   <div className="flex flex-col xl:flex-row gap-3 xl:items-start">
                      {/* Left Side: Info & Payment */}
                      <div className="flex-1 flex flex-col gap-3 w-full">
                         {/* Return Info */}
                         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 className="font-semibold text-gray-800 mb-3">Thông tin trả hàng</h3>
                            <div className="space-y-3">
                               <div className="grid grid-cols-[140px_1fr_30px] gap-2 items-center">
                                  <span className="text-sm text-gray-600">Giảm giá đơn trả hàng</span>
                                  <input type="text" className="h-8 bg-gray-50 border border-gray-200 rounded px-3 text-right text-sm" defaultValue="0" />
                                  <span className="text-sm text-gray-500">đ</span>
                               </div>
                               <div className="grid grid-cols-[140px_1fr_30px] gap-2 items-center">
                                  <span className="text-sm text-gray-600">Phí trả hàng</span>
                                  <input type="text" className="h-8 bg-gray-50 border border-gray-200 rounded px-3 text-right text-sm" defaultValue="0" />
                                  <span className="text-sm text-gray-500">đ</span>
                               </div>
                               <div className="pt-2 border-t border-gray-50 grid grid-cols-[140px_1fr_30px] gap-2 items-center font-medium">
                                  <span className="text-sm text-gray-600">Tổng tiền hàng trả</span>
                                  <span className="text-right text-sm text-gray-900">0</span>
                                  <span className="text-sm text-gray-500">đ</span>
                               </div>
                               <div className="grid grid-cols-[140px_1fr_30px] gap-2 items-center font-bold text-blue-600">
                                  <span className="text-sm">Tổng tiền trả</span>
                                  <span className="text-right text-sm">0</span>
                                  <span className="text-sm">đ</span>
                               </div>
                            </div>
                         </div>

                         {/* Payment */}
                         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-center mb-3">
                               <h3 className="font-semibold text-gray-800">Thanh toán</h3>
                               <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><MoreHorizontal className="w-4 h-4" /></button>
                            </div>
                            <div className="flex gap-4 mb-3">
                               <label className="flex items-center gap-2 text-sm text-gray-600">
                                  <input type="checkbox" className="rounded border-gray-300" /> Miễn phí giao hàng
                               </label>
                               <label className="flex items-center gap-2 text-sm text-gray-600">
                                  <input type="checkbox" className="rounded border-gray-300" /> Tính thuế đơn hàng
                               </label>
                            </div>
                            <div className="space-y-3">
                               <div className="grid grid-cols-[140px_1fr_30px] gap-2 items-center">
                                  <span className="text-sm text-gray-600">Phí vận chuyển</span>
                                  <input type="text" className="h-8 bg-gray-50 border border-gray-200 rounded px-3 text-right text-sm" defaultValue="0" />
                                  <span className="text-sm text-gray-500">đ</span>
                               </div>
                               <div className="grid grid-cols-[140px_1fr_30px] gap-2 items-center">
                                  <span className="text-sm text-gray-600">Giảm giá đơn hàng</span>
                                  <input type="text" className="h-8 bg-gray-50 border border-gray-200 rounded px-3 text-right text-sm" defaultValue="0" />
                                  <span className="text-sm text-gray-500">đ</span>
                               </div>
                               <div className="grid grid-cols-[140px_1fr_30px] gap-2 items-center">
                                  <span className="text-sm text-gray-600">Tiền chuyển khoản</span>
                                  <input type="text" className="h-8 bg-gray-50 border border-gray-200 rounded px-3 text-right text-sm" defaultValue="0" />
                                  <span className="text-sm text-gray-500">đ</span>
                               </div>
                               <div className="grid grid-cols-[140px_1fr_30px] gap-2 items-center">
                                  <span className="text-sm text-gray-600">Tiền từ đơn gốc</span>
                                  <input type="text" className="h-8 bg-gray-50 border border-gray-200 rounded px-3 text-right text-sm" defaultValue="0" />
                                  <span className="text-sm text-gray-500">đ</span>
                               </div>
                               <div className="grid grid-cols-[140px_1fr_30px] gap-2 items-center">
                                  <span className="text-sm text-gray-600">Phụ thu</span>
                                  <input type="text" className="h-8 bg-gray-50 border border-gray-200 rounded px-3 text-right text-sm" defaultValue="0" />
                                  <span className="text-sm text-gray-500">đ</span>
                               </div>
                               {/* Totals */}
                               <div className="pt-3 border-t border-gray-100 space-y-1">
                                   <div className="flex justify-between text-sm font-medium">
                                       <span>Tổng số tiền</span>
                                       <span>0 đ</span>
                                   </div>
                                    <div className="flex justify-between text-sm text-green-600">
                                       <span>Giảm giá</span>
                                       <span>0 đ</span>
                                   </div>
                                   <div className="flex justify-between text-sm text-blue-600 font-medium">
                                       <span>Sau giảm giá</span>
                                       <span>0 đ</span>
                                   </div>
                                   <div className="flex justify-between text-sm text-blue-600 font-medium">
                                       <span>Cần thanh toán</span>
                                       <span>0 đ</span>
                                   </div>
                                   <div className="flex justify-between text-sm font-medium">
                                       <span>Đã thanh toán</span>
                                       <span>0 đ</span>
                                   </div>
                                   <div className="flex justify-between text-sm font-bold text-red-600">
                                       <span>Còn thiếu</span>
                                       <span>0 đ</span>
                                   </div>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Right Side: Notes */}
                      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
                         <h3 className="font-semibold text-gray-800 mb-4">Ghi chú</h3>
                         <div className="flex bg-gray-100 p-1 rounded-lg mb-3">
                            <button className="flex-1 py-1 text-sm font-medium bg-white text-blue-600 shadow-sm rounded">Nội bộ</button>
                            <button className="flex-1 py-1 text-sm font-medium text-gray-500 hover:text-gray-700">Để in</button>
                         </div>
                         <textarea 
                            className="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm resize-none focus:border-blue-500 outline-none"
                            placeholder="Viết ghi chú hoặc /shortcut để ghi chú nhanh"
                         ></textarea>
                         <div className="mt-3">
                            <button className="flex flex-col items-center justify-center w-16 h-16 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 gap-1">
                                <Plus className="w-4 h-4" />
                                <span className="text-[10px]">Tải lên</span>
                            </button>
                         </div>
                      </div>
                   </div>
                </div>

                {/* RIGHT COLUMN (Sidebar Info) */}
                <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-3 shrink-0">
                   {/* Status Block */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-3">
                         <h3 className="font-semibold text-gray-800">Trạng thái</h3>
                         <input type="text" className="w-32 h-7 bg-gray-50 border border-gray-200 rounded px-2 text-xs placeholder:text-gray-400" placeholder="Mã tuỳ chỉnh" />
                      </div>
                      <div className="space-y-3">
                         <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm text-gray-600">Tạo lúc</span>
                            <div className="relative">
                               <input type="text" className="w-full h-8 bg-white border border-blue-500 rounded px-3 text-sm" defaultValue="21:42 27/12/2025" />
                               <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Trả cho đơn hàng</span>
                            <button className="text-sm font-medium text-blue-600 hover:underline">Đơn hàng</button>
                         </div>
                         <div className="mt-1">
                             <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">Thêm thẻ</button>
                         </div>
                      </div>
                   </div>

                   {/* Customer Block */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Khách hàng</h3>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                         <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Tên khách hàng" />
                         <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Số điện thoại" />
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-center text-blue-600 text-sm gap-2">
                          <Info className="w-4 h-4" />
                          Chưa có thông tin
                      </div>
                   </div>

                   {/* Shipping Block */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Nhận hàng</h3>
                      <div className="space-y-3">
                         <div className="relative">
                            <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Chọn địa chỉ" />
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                         </div>
                         <div className="grid grid-cols-[120px_1fr] gap-2 items-center">
                            <span className="text-sm text-gray-600">Dự kiến nhận hàng</span>
                             <div className="relative">
                                <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Chọn ngày" />
                                <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                             </div>
                         </div>

                         <div className="grid grid-cols-2 gap-3">
                             <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Tên người nhận" />
                             <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Số điện thoại" />
                         </div>
                         <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Địa chỉ chi tiết" />
                         <div className="relative">
                            <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Chọn địa chỉ" />
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                         </div>
                      </div>
                   </div>

                   {/* Transport Block */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                       <div className="flex justify-between items-center mb-4">
                           <h3 className="font-semibold text-gray-800">Vận chuyển</h3>
                           <button className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 flex items-center gap-1">
                               Đơn vị VC <ChevronDown className="w-3 h-3" />
                           </button>
                       </div>
                       <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 w-24">Kích thước</span>
                                <input type="text" className="w-12 h-8 bg-gray-50 border border-gray-200 rounded text-center text-sm" placeholder="0" />
                                <span className="text-gray-400">x</span>
                                <input type="text" className="w-12 h-8 bg-gray-50 border border-gray-200 rounded text-center text-sm" placeholder="0" />
                                <span className="text-gray-400">x</span>
                                <input type="text" className="w-12 h-8 bg-gray-50 border border-gray-200 rounded text-center text-sm" placeholder="0" />
                                <span className="text-sm text-gray-500">(cm)</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                                <span className="text-sm text-gray-600">Mã vận đơn</span>
                                <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded px-3 h-8">
                                    <span className="text-sm text-gray-500">Phí</span>
                                    <span className="text-sm font-medium">0</span>
                                </div>
                            </div>
                       </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Footer Bar */}
          <div className="h-16 bg-white border-t border-gray-200 px-4 flex justify-between items-center shrink-0 z-10">
             <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                   <span className="text-sm text-gray-600 font-medium">Tổng số tiền:</span>
                   <span className="text-lg font-bold text-gray-900">0 ₫</span>
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-sm text-gray-600">COD:</span>
                   <span className="text-base font-bold text-red-600">0 ₫</span>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-teal-500 text-teal-600 bg-teal-50 rounded-lg font-medium hover:bg-teal-100 transition-colors">
                   Trạng thái: Mới
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                   <Printer className="w-4 h-4" />
                   In (F4)
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#0052CC] hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm transition-colors">
                   <Save className="w-4 h-4" />
                   Lưu (F2)
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}

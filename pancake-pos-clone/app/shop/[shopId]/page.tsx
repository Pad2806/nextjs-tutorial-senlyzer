"use client";

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  ScanBarcode, 
  MoreVertical, 
  ChevronDown, 
  Calendar, 
  Printer, 
  Save, 
  Clock, 
  Bell, 
  HelpCircle, 
  User, 
  Maximize2,
  Box,
  Image as ImageIcon,
  MoreHorizontal
} from 'lucide-react';
export default function NewPosPage() {
  return (
    <div className="flex h-screen bg-[#EAEDF1] overflow-hidden">
       {/* Main Content Area */}
       <div className="flex-1 flex flex-col min-w-0">
          {/* POS Header */}
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
                Đơn mới (F6)
             </div>
             <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                <Plus className="w-5 h-5 text-gray-500" />
             </button>
          </div>

          {/* Scrollable Workspace */}
          <div className="flex-1 overflow-y-auto p-3">
             <div className="flex flex-col lg:flex-row gap-3 h-full min-h-min">
                
                {/* LEFT COLUMN (65%) */}
                <div className="flex-1 flex flex-col gap-3 min-w-0">
                   {/* Product Section */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[450px]">
                      <div className="p-3 border-b border-gray-100 flex items-center justify-between gap-3">
                         <div className="flex items-center gap-2">
                            <button className="px-4 py-1.5 bg-white border border-blue-500 text-blue-600 rounded text-sm font-medium">Sản phẩm</button>
                            <button className="px-4 py-1.5 bg-gray-100 text-gray-500 rounded text-sm font-medium hover:bg-gray-200">Combo</button>
                         </div>
                         <div className="flex-1 relative">
                            <input 
                              type="text" 
                              placeholder="Nhập mã, tên sản phẩm hoặc Barcode" 
                              className="w-full h-9 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded text-sm focus:border-blue-500 outline-none transition-colors"
                            />
                         </div>
                         <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer select-none">
                               <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0" defaultChecked />
                               Còn hàng
                            </label>
                            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                               <ScanBarcode className="w-4 h-4" /> (F9)
                            </button>
                         </div>
                      </div>
                      
                      {/* Empty State */}
                      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Box className="w-10 h-10 text-gray-300" />
                         </div>
                         <span className="text-sm">Giỏ hàng trống</span>
                      </div>
                   </div>

                   {/* Payment & Note Section (Row) */}
                   <div className="flex flex-col xl:flex-row gap-3">
                      {/* Payment */}
                      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                         <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-800">Thanh toán</h3>
                            <button className="p-1 hover:bg-gray-100 rounded"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
                         </div>
                         
                         <div className="space-y-3">
                            <div className="flex gap-4">
                               <label className="flex items-center gap-2 text-sm text-gray-600">
                                  <input type="checkbox" className="rounded border-gray-300" /> Miễn phí giao hàng
                               </label>
                               <label className="flex items-center gap-2 text-sm text-gray-600">
                                  <input type="checkbox" className="rounded border-gray-300" /> Chỉ thu phí nếu hoàn
                               </label>
                            </div>
                            
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
                               <span className="text-sm text-gray-600">Phụ thu</span>
                               <input type="text" className="h-8 bg-gray-50 border border-gray-200 rounded px-3 text-right text-sm" defaultValue="0" />
                               <span className="text-sm text-gray-500">đ</span>
                            </div>
                         </div>
                         
                         {/* Summary */}
                         <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                             <div className="flex justify-between text-sm">
                                 <span className="text-gray-600">Tổng số tiền</span>
                                 <span className="font-bold text-gray-900">0 đ</span>
                             </div>
                             <div className="flex justify-between text-sm font-medium text-blue-600">
                                 <span>Còn thiếu</span>
                                 <span>0 đ</span>
                             </div>
                         </div>
                      </div>

                      {/* Notes */}
                      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
                         <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-800">Ghi chú</h3>
                         </div>
                         <div className="flex bg-gray-100 p-1 rounded-lg mb-3">
                            <button className="flex-1 py-1 text-sm font-medium bg-white text-blue-600 shadow-sm rounded">Nội bộ</button>
                            <button className="flex-1 py-1 text-sm font-medium text-gray-500 hover:text-gray-700">Để in</button>
                         </div>
                         <textarea 
                            className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm resize-none focus:border-blue-500 outline-none"
                            placeholder="Viết ghi chú hoặc /shortcut để ghi chú nhanh"
                         ></textarea>
                         <div className="mt-3">
                            <button className="flex flex-col items-center justify-center w-20 h-20 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 gap-1">
                                <Plus className="w-5 h-5" />
                                <span className="text-xs">Tải lên</span>
                            </button>
                         </div>
                      </div>
                   </div>
                </div>

                {/* RIGHT COLUMN (35%) */}
                <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col gap-3 shrink-0">
                   {/* Info Block */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-4 cursor-pointer">
                         <h3 className="font-semibold text-gray-800">Thông tin</h3>
                         <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="space-y-3">
                         <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm text-gray-600">Tạo lúc</span>
                            <div className="relative">
                               <input type="text" className="w-full h-8 bg-gray-50 border border-gray-200 rounded px-3 text-sm" defaultValue="21:33 27/12/2025" />
                               <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                         </div>
                         <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm text-gray-600">NV xử lý</span>
                            <div className="relative">
                               <select className="w-full h-8 bg-gray-50 border border-gray-200 rounded px-3 text-sm appearance-none outline-none">
                                  <option>Anh Duy</option>
                               </select>
                               <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                         </div>
                         <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm text-gray-600">NV chăm sóc</span>
                            <input type="text" className="w-full h-8 bg-gray-50 border border-gray-200 rounded px-3 text-sm placeholder:text-gray-400" placeholder="Chọn NV chăm sóc" />
                         </div>
                         <div className="mt-2">
                             <button className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">Thêm thẻ</button>
                         </div>
                      </div>
                   </div>

                   {/* Customer Block */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-4">
                         <h3 className="font-semibold text-gray-800">Khách hàng</h3>
                         <div className="flex gap-2">
                            <button className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 flex items-center gap-1">
                               Giới tính <ChevronDown className="w-3 h-3" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded"><MoreHorizontal className="w-4 h-4 text-gray-400" /></button>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                         <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Tên khách hàng" />
                         <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="SĐT" />
                      </div>
                      <div className="space-y-3">
                         <input type="email" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Địa chỉ email" />
                         <div className="relative">
                            <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Ngày sinh" />
                            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                         </div>
                      </div>
                   </div>

                   {/* Shipping Info Block */}
                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="flex justify-between items-center mb-4">
                         <h3 className="font-semibold text-gray-800">Nhận hàng</h3>
                      </div>
                      <div className="space-y-3">
                         <div className="relative">
                            <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Chọn địa chỉ" />
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                         </div>
                         <div className="relative">
                            <input type="text" className="w-full h-9 bg-gray-50 border border-gray-200 rounded px-3 text-sm" placeholder="Chọn ngày" />
                            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                                <span className="text-sm text-gray-600 w-20">Kích thước</span>
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
                   <span className="text-sm text-gray-600">Cần thanh toán:</span>
                   <span className="text-lg font-bold text-gray-900">0 ₫</span>
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-sm text-gray-600">COD:</span>
                   <span className="text-base font-bold text-red-600">0 ₫</span>
                </div>
             </div>
             <div className="flex items-center gap-3">
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

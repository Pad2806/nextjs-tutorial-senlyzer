"use client";

import { useState } from 'react';
import { Camera, Facebook } from 'lucide-react';

export default function AccountSettingsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pt-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
         <div className="flex flex-col lg:flex-row p-6 md:p-8 gap-8">
            {/* Left: Avatar */}
            <div className="w-full lg:w-1/3 flex flex-col items-center border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-6 shrink-0">
               <div className="relative group">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                     <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-blue-600 transition-colors">
                     <Camera className="w-4 h-4" />
                  </button>
               </div>
               
               <div className="text-center mt-4 space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">Anh Duy</h3>
                  <p className="text-sm text-gray-500">tuiladuyne28@gmail.com</p>
                  <button className="text-xs border border-gray-300 rounded px-2 py-1 mt-2 text-gray-600 hover:bg-gray-50 transition-colors">
                     Thay đổi ảnh đại diện
                  </button>
               </div>

               <div className="w-full mt-8 space-y-6">
                  <div className="space-y-2">
                     <label className="text-sm font-semibold text-gray-700">Ngôn ngữ & Múi giờ</label>
                     <p className="text-xs text-gray-500">Ngôn ngữ:</p>
                     <select className="w-full h-10 px-3 rounded border border-gray-300 bg-white text-sm outline-none focus:border-blue-500">
                        <option>Tiếng Việt</option>
                        <option>English</option>
                     </select>
                  </div>

                   <div className="space-y-2">
                     <p className="text-xs text-gray-500">Múi giờ:</p>
                     <select className="w-full h-10 px-3 rounded border border-gray-300 bg-white text-sm outline-none focus:border-blue-500">
                        <option>(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
                     </select>
                  </div>
                  
                  <button className="w-full py-2.5 bg-[#FF4D4F] text-white font-medium rounded hover:bg-[#ff3537] transition-colors shadow-sm text-sm">
                     Đăng xuất khỏi tất cả thiết bị khác
                  </button>
               </div>
            </div>
            
            {/* Right: Info Form */}
            <div className="flex-1 space-y-6">
               <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Thông tin cơ bản</h3>
               <p className="text-xs text-gray-500 -mt-4">Các thông tin sử dụng để đăng nhập vào Pancake POS</p>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-sm text-gray-700 font-medium">Họ:</label>
                     <input type="text" defaultValue="Anh" className="w-full h-10 px-3 rounded border border-gray-300 focus:border-blue-500 outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-sm text-gray-700 font-medium">Tên:</label>
                     <input type="text" defaultValue="Duy" className="w-full h-10 px-3 rounded border border-gray-300 focus:border-blue-500 outline-none text-sm" />
                  </div>
               </div>

               <div className="space-y-1">
                  <label className="text-sm text-gray-700 font-medium">Tên đăng nhập:</label>
                  <input type="text" placeholder="Nhập tên người dùng" className="w-full h-10 px-3 rounded border border-gray-300 focus:border-blue-500 outline-none text-sm" />
               </div>

               <div className="space-y-1">
                  <label className="text-sm text-gray-700 font-medium">Số điện thoại:</label>
                  <input type="text" placeholder="-" className="w-full h-10 px-3 rounded border border-gray-300 focus:border-blue-500 outline-none text-sm" />
               </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700 font-medium">Email:</label>
                  <input type="text" defaultValue="tuiladuyne28@gmail.com" className="w-full h-10 px-3 rounded border border-gray-300 focus:border-blue-500 outline-none text-sm bg-gray-50" readOnly />
               </div>
               
               <div className="flex justify-end pt-4">
                  <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed font-medium text-sm">
                     Lưu thay đổi
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Linked Accounts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
         <div>
            <h3 className="font-bold text-gray-900">Liên kết tài khoản</h3>
            <p className="text-sm text-gray-500">Liên kết tài khoản đến các mạng xã hội</p>
         </div>
         <button className="flex items-center gap-2 px-4 py-2 border border-blue-100 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm font-medium">
            <Facebook className="w-4 h-4 fill-current" />
            Liên kết tài khoản Facebook
            <span className="text-blue-400">🔗</span>
            Liên kết với tài khoản Facebook
         </button>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
         <div>
            <h3 className="font-bold text-gray-900">Mật khẩu</h3>
            <p className="text-sm text-gray-500">Thiết lập lại mật khẩu của bạn</p>
         </div>
         <button className="px-6 py-2 bg-[#0052CC] text-white rounded hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium">
            Đổi mật khẩu
         </button>
      </div>
    </div>
  );
}

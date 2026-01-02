"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Check, Facebook, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex w-full bg-white font-sans">
      {/* Left Panel - Marketing */}
      <div className="hidden lg:flex w-[45%] bg-[#F0F5FF] flex-col justify-center px-12 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 space-y-8">
            <Link href="/" className="mb-8 block">
               <span className="text-3xl font-bold text-[#0066D6]">Pancake ID</span>
            </Link>

            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Quản lý bán hàng đa kênh <br/>
              <span className="text-blue-600">tập trung & hiệu quả</span>
            </h2>

            <div className="space-y-4">
               {[
                 "Đồng bộ đơn hàng từ Facebook, Shopee, Lazada, TikTok",
                 "Quản lý tồn kho thời gian thực",
                 "Kết nối vận chuyển tự động",
                 "Báo cáo doanh thu chi tiết",
                 "Chăm sóc khách hàng tự động"
               ].map((feature, idx) => (
                 <div key={idx} className="flex items-center gap-3">
                   <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                     <Check className="w-3 h-3 text-white" strokeWidth={3} />
                   </div>
                   <span className="text-gray-600 font-medium">{feature}</span>
                 </div>
               ))}
            </div>

            {/* Illustration Placeholder */}
            <div className="mt-8 relative">
               <div className="bg-white p-4 rounded-xl shadow-lg border border-blue-50/50 max-w-sm">
                  <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-2">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Mail className="w-4 h-4" />
                     </div>
                     <div>
                        <div className="h-2 w-24 bg-gray-200 rounded mb-1"></div>
                        <div className="h-2 w-16 bg-gray-100 rounded"></div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="h-2 w-full bg-gray-100 rounded"></div>
                     <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
                     <div className="h-2 w-4/6 bg-gray-100 rounded"></div>
                  </div>
               </div>
               
               {/* Floating avatars */}
               <div className="absolute -right-4 -top-6 flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 shadow-md"></div>
                  ))}
               </div>
            </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-20 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header & Tabs */}
          <div className="text-center space-y-6">
             {/* Logo on mobile only */}
             <div className="lg:hidden flex justify-center mb-4">
                <Link href="/" className="text-2xl font-bold text-[#0066D6]">Pancake ID</Link>
             </div>

             <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 pb-4 text-base font-medium transition-colors relative ${
                    activeTab === 'login' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Đăng nhập
                  {activeTab === 'login' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 pb-4 text-base font-medium transition-colors relative ${
                    activeTab === 'register' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Đăng ký
                  {activeTab === 'register' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
             </div>
          </div>
          
          {/* Form */}
          <div className="space-y-6 pt-4">
             <div className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder={activeTab === 'login' ? "Email/ SĐT/ Tên người dùng" : "Email hoặc Số điện thoại"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <input 
                    type="password" 
                    placeholder="Mật khẩu của bạn"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                
                {activeTab === 'register' && (
                   <div>
                    <input 
                      type="password" 
                      placeholder="Xác nhận mật khẩu"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                )}
             </div>

             {activeTab === 'login' && (
                <div className="flex justify-end">
                   <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                     Quên mật khẩu?
                   </Link>
                </div>
             )}

             <Link href="/dashboard" className="w-full">
               <Button className="w-full rounded-full h-12 text-base font-bold bg-[#0066D6] hover:bg-[#0051ab] hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 shadow-md transform hover:-translate-y-0.5">
                  {activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký ngay'}
               </Button>
             </Link>

             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Bạn cũng có thể dùng</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-[#1877F2] text-white hover:bg-[#166fe5] active:bg-[#1565d1] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                   <Facebook className="w-5 h-5 fill-current" />
                   <span className="font-semibold">Facebook</span>
                </button>
                
                <button className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 group">
                   <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                   <span className="font-semibold">Google</span>
                </button>
             </div>
          </div>
          
          <div className="text-center text-xs text-gray-500 pt-8">
             Bằng việc đăng ký, bạn đồng ý với <Link href="#" className="underline hover:text-blue-600">Điều khoản sử dụng</Link> & <Link href="#" className="underline hover:text-blue-600">Chính sách bảo mật</Link> của chúng tôi.
          </div>
        </div>
      </div>
    </div>
  );
}

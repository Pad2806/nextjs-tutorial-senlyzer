"use client";

import { Button } from './ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white pt-10 pb-20 md:pt-24 lg:pb-40">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl blob-animate" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl blob-animate delay-1000" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8"
          >
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/60 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-primary shadow-sm hover:shadow-md transition-all cursor-default">
              ✨ Một sản phẩm của hệ sinh thái Pancake
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:leading-[1.15]">
              Quản lý bán hàng <br className="hidden lg:block"/>
              <span className="text-gradient">Đa Kênh Toàn Diện</span>
            </h1>
            
            <p className="max-w-2xl text-lg text-gray-600 md:text-xl leading-relaxed">
              Xử lý đồng bộ đơn hàng từ Facebook, Shopee, TikTok Shop, Lazada... tại một nơi duy nhất. Giúp bạn tăng trưởng doanh thu mà không lo vận hành.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto pt-2">
              <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-lg shadow-blue-500/25 bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95">
                Dùng thử miễn phí
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-medium border-2 hover:bg-gray-50 text-gray-600">
                Xem bảng giá
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-6">
               {["Không cần cài đặt", "Đăng ký 30s", "Hỗ trợ 24/7", "Dùng thử 14 ngày"].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
               ))}
            </div>
          </motion.div>

          {/* Right Image/Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[650px] lg:max-w-none perspective-1000"
          >
             {/* Decorative Elements */}
             <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
             
             {/* Main Dashboard Mockup */}
            <div className="relative rounded-2xl bg-white shadow-2xl border border-gray-200/60 overflow-hidden transform hover:-rotate-1 transition-transform duration-500">
                {/* Header Bar */}
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-4 py-3 backdrop-blur-sm">
                   <div className="flex gap-2">
                     <div className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                     <div className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                     <div className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                   </div>
                   <div className="h-6 w-1/3 rounded-md bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                      <div className="h-1.5 w-20 bg-gray-200 rounded-full opacity-50"></div>
                   </div>
                   <div className="w-10"></div>
                </div>

                {/* Body */}
                <div className="p-6 grid grid-cols-12 gap-6 bg-slate-50 min-h-[400px]">
                   {/* Sidebar */}
                   <div className="hidden sm:flex col-span-2 flex-col gap-3">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`h-10 rounded-lg ${i===1 ? 'bg-blue-600 shadow-lg shadow-blue-500/30' : 'hover:bg-gray-200/50'} w-full transition-colors`}></div>
                      ))}
                   </div>
                   
                   {/* Main Content */}
                   <div className="col-span-12 sm:col-span-10 flex flex-col gap-6">
                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { color: 'bg-blue-500', label: 'Doanh thu' },
                          { color: 'bg-green-500', label: 'Đơn hàng' },
                          { color: 'bg-purple-500', label: 'Khách hàng' }
                        ].map((stat, i) => (
                          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                              <div className="h-2 w-16 bg-gray-100 rounded mb-3"></div>
                              <div className="h-6 w-24 bg-gray-800 rounded opacity-10"></div>
                              <div className={`mt-3 h-1 w-full rounded-full ${stat.color} opacity-20`}>
                                <div className={`h-full w-2/3 rounded-full ${stat.color}`}></div>
                              </div>
                          </div>
                        ))}
                      </div>

                      {/* Chart Area */}
                      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex-1 flex items-end justify-between gap-2">
                         {[35, 55, 40, 70, 50, 80, 65, 90, 60, 75].map((h, i) => (
                           <div key={i} className="w-full bg-blue-50 rounded-t-sm relative group overflow-hidden" style={{ height: `${h}%` }}>
                              <div className="absolute inset-x-0 bottom-0 bg-blue-500 h-0 transition-all duration-1000 group-hover:h-full opacity-80" style={{ height: `${h}%` }}></div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
            </div>
            
            {/* Floating Elements (Glassmorphism) */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40"
            >
               <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 font-semibold uppercase">Tăng trưởng</p>
                   <p className="text-xl font-bold text-gray-900">+128%</p>
                 </div>
               </div>
            </motion.div>

             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -top-6 -right-6 hidden lg:block bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40"
            >
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                       <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    +2k
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

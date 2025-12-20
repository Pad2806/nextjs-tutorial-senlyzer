"use client";

import BookingForm from "@/app/components/booking/BookingForm";

export default function HomePage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-5 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-semibold leading-tight text-slate-900">
                Đặt lịch khám <br />
                <span className="text-blue-600">nhanh chóng & an tâm</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-md">
                Kết nối trực tiếp với bác sĩ và phòng khám uy tín. Không xếp
                hàng – không chờ đợi.
              </p>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>
      <section id="guide" className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">
              Hướng dẫn đặt lịch
            </h2>
            <p className="text-slate-500 mt-3">Chỉ với 3 bước đơn giản</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg mb-6">
                1
              </div>
              <h3 className="font-medium text-slate-900 text-lg">
                Điền thông tin
              </h3>
              <p className="text-slate-500 mt-2 text-sm">
                Nhập thông tin cá nhân và nhu cầu khám bệnh.
              </p>
            </div>

            <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg mb-6">
                2
              </div>
              <h3 className="font-medium text-slate-900 text-lg">
                Thanh toán giữ lịch
              </h3>
              <p className="text-slate-500 mt-2 text-sm">
                Quét mã QR và chuyển khoản để giữ lịch khám.
              </p>
            </div>

            <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg mb-6">
                3
              </div>
              <h3 className="font-medium text-slate-900 text-lg">
                Nhận xác nhận
              </h3>
              <p className="text-slate-500 mt-2 text-sm">
                Hệ thống xác nhận và thông báo lịch khám cho bạn.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-slate-900 text-center">
            Vì sao nên đặt lịch trước?
          </h2>
          <p className="text-slate-500 text-center mt-2">
            Trải nghiệm khám bệnh nhanh chóng và minh bạch hơn
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-blue-600 text-2xl mb-3"></div>
              <h3 className="font-medium text-slate-900">Đặt lịch nhanh</h3>
              <p className="text-sm text-slate-500 mt-1">
                Giảm thời gian chờ đợi tại phòng khám.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-blue-600 text-2xl mb-3"></div>
              <h3 className="font-medium text-slate-900">Minh bạch chi phí</h3>
              <p className="text-sm text-slate-500 mt-1">
                Biết trước chi phí, không phát sinh.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-blue-600 text-2xl mb-3"></div>
              <h3 className="font-medium text-slate-900">Bác sĩ uy tín</h3>
              <p className="text-sm text-slate-500 mt-1">
                Thông tin rõ ràng, được xác thực.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

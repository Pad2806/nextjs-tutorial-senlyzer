'use client';

import BookingForm from '@/app/components/booking/BookingForm';

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
                Kết nối trực tiếp với bác sĩ và phòng khám uy tín.
                Không xếp hàng – không chờ đợi.
              </p>
            </div>
          </div>
          <BookingForm />

        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            {
              title: 'Đặt lịch nhanh',
              desc: 'Giảm thời gian chờ đợi tại phòng khám.',
            },
            {
              title: 'Minh bạch chi phí',
              desc: 'Biết trước chi phí, không phát sinh.',
            },
            {
              title: 'Bác sĩ uy tín',
              desc: 'Thông tin rõ ràng, được xác thực.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

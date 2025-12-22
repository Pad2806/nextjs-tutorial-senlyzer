"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "./usePayment";
import { generateSepayQR } from "@/app/lib/payment/sepayqr";

// type BookingResponse = {
//   id: string;
//   status: "pending" | "paid" | "expired";
//   amount: number;
// };

// export default function PaymentClient() {
//   const { bookingId } = usePayment();
//   const router = useRouter();

//   const [booking, setBooking] = useState<BookingResponse | null>(null);

//   // 1️⃣ LOAD BOOKING BAN ĐẦU (ĐỂ CÓ AMOUNT)
//   useEffect(() => {
//     if (!bookingId) return;

//     fetch(`/api/bookings/${bookingId}`, { cache: "no-store" })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.id) {
//           setBooking(data);
//         }
//       });
//   }, [bookingId]);

//   // 2️⃣ POLLING STATUS
//   useEffect(() => {
//     if (!bookingId) return;

//     const timer = setInterval(async () => {
//       const res = await fetch(`/api/bookings/${bookingId}`, {
//         cache: "no-store",
//       });
//       const data = await res.json();

//       if (!data?.status) return;

//       setBooking(data); // ✅ CẬP NHẬT UI

//       if (data.status === "paid") {
//         router.replace(`/result?bookingId=${bookingId}&status=paid`);
//       }

//       if (data.status === "expired") {
//         router.replace(`/result?bookingId=${bookingId}&status=expired`);
//       }
//     }, 3000);

//     return () => clearInterval(timer);
//   }, [bookingId, router]);

//   if (!booking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Đang tạo mã thanh toán...
//       </div>
//     );
//   }

//   const qrUrl = generateSepayQR({
//     bankCode: "TPB",
//     accountNo: "23238628888",
//     amount: booking.amount, // ✅ KHÔNG CÒN undefined
//     description: `DATLICH_${booking.id}`,
//   });

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-slate-50">
//       <div className="bg-white p-6 rounded-xl text-center space-y-4">
//         <h1 className="text-lg font-semibold">Thanh toán giữ lịch</h1>

//         <img src={qrUrl} className="w-64 h-64 mx-auto" />

//         <p className="text-sm text-slate-600">
//           Nội dung chuyển khoản:
//           <br />
//           <b>DATLICH_{booking.id}</b>
//         </p>

//         <p className="text-sm text-orange-600">Trạng thái: {booking.status}</p>
//       </div>
//     </main>
//   );
// }
type BookingResponse = {
  id: string;
  status: "pending" | "paid" | "expired";
  amount: number;
  patientName: string;
  serviceName: string;
  clinicName: string;
};
function BookingStatus({ status }: { status: BookingResponse["status"] }) {
  if (status === "pending") {
    return (
      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm">
        ⏳ Đang chờ thanh toán
      </span>
    );
  }
  if (status === "paid") {
    return (
      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
        ✅ Đã thanh toán
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
      ❌ Hết hạn
    </span>
  );
}

export default function PaymentClient() {
  const { bookingId } = usePayment();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingResponse | null>(null);

  //  1️⃣ LOAD BOOKING BAN ĐẦU (ĐỂ CÓ AMOUNT)
  useEffect(() => {
    if (!bookingId) return;

    fetch(`/api/bookings/${bookingId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id) {
          setBooking(data);
        }
      });
  }, [bookingId]);

  // 2️⃣ POLLING STATUS
  useEffect(() => {
    if (!bookingId) return;

    const timer = setInterval(async () => {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (!data?.status) return;

      setBooking(data); // ✅ CẬP NHẬT UI

      if (data.status === "paid") {
        router.replace(`/result?bookingId=${bookingId}&status=paid`);
      }

      if (data.status === "expired") {
        router.replace(`/result?bookingId=${bookingId}&status=expired`);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [bookingId, router]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tạo mã thanh toán...
      </div>
    );
  }

  useEffect(() => {
    if (!bookingId) return;

    const load = async () => {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (!data?.id) return;

      setBooking(data);

      if (data.status === "paid") {
        router.replace(`/result?bookingId=${bookingId}&status=paid`);
      }
      if (data.status === "expired") {
        router.replace(`/result?bookingId=${bookingId}&status=expired`);
      }
    };

    load();
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, [bookingId, router]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tạo mã thanh toán...
      </div>
    );
  }

  const qrUrl = generateSepayQR({
    bankCode: "TPB",
    accountNo: "23238628888",
    amount: booking.amount,
    description: `DATLICH_${booking.id}`,
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-6 rounded-xl space-y-4 w-[360px] text-center">
        <h1 className="text-lg font-semibold">Thanh toán giữ lịch</h1>

        <div className="text-sm text-slate-600 space-y-1">
          <p>
            <b>Bệnh nhân:</b> {booking.patientName}
          </p>
          <p>
            <b>Dịch vụ:</b> {booking.serviceName}
          </p>
          <p>
            <b>Phòng khám:</b> {booking.clinicName}
          </p>
        </div>

        <img src={qrUrl} className="w-56 h-56 mx-auto" />

        <p className="text-sm text-slate-600">
          Nội dung chuyển khoản:
          <br />
          <span className="font-mono font-semibold">DATLICH_{booking.id}</span>
        </p>

        <BookingStatus status={booking.status} />
      </div>
    </main>
  );
}

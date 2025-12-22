// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { usePayment } from "./usePayment";
// import { generateSepayQR } from "@/app/lib/payment/sepayqr";

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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "./usePayment";
import { generateSepayQR } from "@/app/lib/payment/sepayqr";

type BookingResponse = {
  id: string;
  status: "pending" | "paid" | "expired";
  amount: number;
  patientName: string;
  serviceName: string;
  clinicName: string;
};

export default function PaymentClient() {
  const { bookingId } = usePayment();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingResponse | null>(null);

  // LOAD BOOKING
  useEffect(() => {
    if (!bookingId) return;

    fetch(`/api/bookings/${bookingId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then(setBooking);
  }, [bookingId]);

  // POLLING STATUS
  useEffect(() => {
    if (!bookingId) return;

    const timer = setInterval(async () => {
      const res = await fetch(`/api/bookings/${bookingId}`);
      const data = await res.json();

      if (data.status === "paid") {
        router.replace(`/result?bookingId=${bookingId}&status=paid`);
      }
      if (data.status === "expired") {
        router.replace(`/result?bookingId=${bookingId}&status=expired`);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [bookingId, router]);

  // ✅ LOG (HOOK PHẢI Ở TRÊN)
  useEffect(() => {
    if (booking) {
      console.log("BOOKING DATA:", booking);
    }
  }, [booking]);

  // RENDER
  if (!booking) return <div>Đang tạo mã thanh toán...</div>;

  const qrUrl = generateSepayQR({
    bankCode: "TPB",
    accountNo: "23238628888",
    amount: booking.amount,
    description: `DATLICH_${booking.id}`,
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{booking.clinicName}</h2>
        <p className="text-sm">{booking.serviceName}</p>
        <p className="text-sm text-slate-500">
          Bệnh nhân: <b>{booking.patientName}</b>
        </p>
      </div>

      <img src={qrUrl} className="w-56 h-56 mx-auto" />

      <span className="inline-flex px-4 py-1.5 rounded-full text-sm font-semibold bg-orange-100 text-orange-600">
        ⏳ Chờ thanh toán
      </span>
    </div>
  );
}

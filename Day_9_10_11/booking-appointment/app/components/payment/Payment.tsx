// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { generateSepayQR } from '@/app/lib/payment/sepayqr';
// import { usePayment } from './usePayment';

// export default function PaymentClient() {
//   const router = useRouter();
//   const { bookingId, name, service, amount } = usePayment();
//   const [copied, setCopied] = useState(false);

//   if (!bookingId) {
//     return <div>Thiếu thông tin thanh toán</div>;
//   }

//   const qrUrl = generateSepayQR({
//     bankCode: 'VCB',
//     accountNo: '0123456789',
//     amount,
//     description: `DATLICH_${bookingId}`,
//   });
//   // 🔹 Polling kiểm tra trạng thái booking
//   useEffect(() => {
//     let alive = true;

//     const checkStatus = async () => {
//       try {
//         const res = await fetch(`/api/bookings/${bookingId}`, {
//           cache: 'no-store',
//         });

//         if (!res.ok) return;

//         const data = await res.json();

//         if (!alive) return;

//         if (data.status === 'paid') {
//           setStatus('paid');
//           setChecking(false);

//           // 👉 redirect tự động
//           router.push(`/result?status=paid&bookingId=${bookingId}`);
//         } else {
//           setStatus('pending');
//           setChecking(false);
//         }
//       } catch {
//         if (!alive) return;
//         setChecking(false);
//       }
//     };

//     checkStatus(); // check ngay lần đầu
//     const interval = setInterval(checkStatus, 3000);

//     return () => {
//       alive = false;
//       clearInterval(interval);
//     };
//   }, [bookingId, router]);

//   // 🔹 Download QR
//   const handleDownload = async () => {
//     const res = await fetch(qrUrl);
//     const blob = await res.blob();
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `QR_DATLICH_${bookingId}.png`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // 🔹 Copy QR
//   const handleCopyQR = async () => {
//     try {
//       const res = await fetch(qrUrl);
//       const blob = await res.blob();

//       const item = new ClipboardItem({
//         'image/png': blob,
//         'text/plain': new Blob([qrUrl], { type: 'text/plain' }),
//       });

//       await navigator.clipboard.write([item]);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       setCopied(false);
//     }
//   };

//   return (
//     <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-slate-50 py-5">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-lg shadow-blue-100 p-8 space-y-8 text-center">
//         <div>
//           <h1 className="text-2xl font-semibold text-slate-900">
//             Thanh toán giữ lịch
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Quét mã hoặc tải QR để chuyển khoản
//           </p>
//         </div>

//         <div className="bg-blue-50 rounded-xl p-4 text-sm text-left space-y-1">
//           <p><span className="text-slate-500">Khách hàng:</span> <b>{name}</b></p>
//           <p><span className="text-slate-500">Dịch vụ:</span> <b>{service}</b></p>
//           <p>
//             <span className="text-slate-500">Số tiền:</span>{' '}
//             <b className="text-blue-600">{amount.toLocaleString()}đ</b>
//           </p>
//         </div>

//         <div className="flex justify-center">
//           <div className="bg-white p-4 rounded-2xl border">
//             <img src={qrUrl} className="w-64 h-64" />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <button
//             onClick={handleDownload}
//             className="rounded-xl border border-blue-200 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50"
//           >
//             Tải mã QR
//           </button>

//           <button
//             onClick={handleCopyQR}
//             className={`rounded-xl py-3 text-sm font-medium flex justify-center gap-2
//               ${
//                 copied
//                   ? 'bg-green-600 text-white'
//                   : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
//               }
//             `}
//           >
//             {copied ? '✓ Đã copy' : 'Copy QR'}
//           </button>
//         </div>

//         {/* 🔹 Trạng thái tự động */}
//         <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
//           {checking ? (
//             <p>Đang kiểm tra trạng thái thanh toán...</p>
//           ) : status === 'paid' ? (
//             <p className="text-green-600 font-medium">
//               Thanh toán thành công. Đang chuyển trang...
//             </p>
//           ) : (
//             <p>
//               Chưa nhận được thanh toán. Vui lòng chuyển khoản đúng nội dung:
//               <br />
//               <b className="text-blue-600">DATLICH_{bookingId}</b>
//             </p>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateSepayQR } from "@/app/lib/payment/sepayqr";
import { usePayment } from "./usePayment";

type Booking = {
  id: string;
  name: string;
  amount: number;
  status: "pending" | "paid";
  service_name: string;
};

export default function PaymentClient() {
  const router = useRouter();
  const { bookingId } = usePayment();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [checking, setChecking] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!bookingId) {
    return <div className="p-6 text-center">Thiếu thông tin thanh toán</div>;
  }

  // 🔹 Load booking + polling
  // useEffect(() => {
  //   let alive = true;

  //   const fetchBooking = async () => {
  //     try {
  //       const res = await fetch(`/api/bookings/${bookingId}`, {
  //         cache: "no-store",
  //       });
  //       if (!res.ok) return;

  //       const data = await res.json();
  //       if (!alive) return;

  //       setBooking(data);

  //       if (data.status === "paid") {
  //         router.push(`/result?status=paid&bookingId=${bookingId}`);
  //       }

  //       setChecking(false);
  //     } catch {
  //       setChecking(false);
  //     }
  //   };

  //   fetchBooking();
  //   const interval = setInterval(fetchBooking, 3000);

  //   return () => {
  //     alive = false;
  //     clearInterval(interval);
  //   };
  // }, [bookingId, router]);
  useEffect(() => {
    if (!bookingId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        cache: "no-store",
      });

      if (!res.ok) return;

      const data = await res.json();

      if (data.status === "paid") {
        clearInterval(interval);
        router.push(`/result?status=paid&bookingId=${bookingId}`);
      }

      if (data.status === "expired") {
        clearInterval(interval);
        router.push(`/result?status=expired`);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bookingId, router]);

  if (!booking) {
    return <div className="p-6 text-center">Đang tải thông tin booking...</div>;
  }

  const qrUrl = generateSepayQR({
    bankCode: "CTG",
    accountNo: "106877456357",
    amount: booking.amount,
    description: `DATLICH_${booking.id}`,
  });

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-slate-50 py-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 space-y-6 text-center">
        <h1 className="text-xl font-semibold">Thanh toán giữ lịch</h1>

        <div className="bg-blue-50 rounded-xl p-4 text-sm text-left">
          <p>
            <b>Khách hàng:</b> {booking.name}
          </p>
          <p>
            <b>Dịch vụ:</b> {booking.service_name}
          </p>
          <p>
            <b>Số tiền:</b>{" "}
            <span className="text-blue-600 font-semibold">
              {booking.amount.toLocaleString()}đ
            </span>
          </p>
        </div>

        <img src={qrUrl} className="mx-auto w-64 h-64" />

        <div className="text-sm bg-slate-50 rounded-xl p-3">
          {checking ? (
            "Đang kiểm tra trạng thái thanh toán..."
          ) : booking.status === "paid" ? (
            <span className="text-green-600 font-medium">
              Thanh toán thành công
            </span>
          ) : (
            <>
              Chưa nhận được thanh toán.
              <br />
              Nội dung:
              <b className="text-blue-600 block">DATLICH_{booking.id}</b>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

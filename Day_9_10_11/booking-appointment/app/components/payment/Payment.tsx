"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "./usePayment";
import { generateSepayQR } from "@/app/lib/payment/sepayqr";

export default function PaymentClient() {
  const { bookingId } = usePayment();
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setBooking(data);

        if (data.status === "paid") {
          router.push(`/result?bookingId=${bookingId}`);
        }
      }
    };

    fetchBooking();
    const interval = setInterval(fetchBooking, 3000);
    return () => clearInterval(interval);
  }, [bookingId, router]);

  if (!bookingId) return <div>Thiếu bookingId</div>;
  if (!booking) return <div>Đang tải thông tin thanh toán...</div>;

  const qrUrl = generateSepayQR({
    bankCode: "VietinBank",
    accountNo: "106877456357",
    amount: booking.amount,
    description: `DATLICH_${booking.id}`,
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow p-8 text-center space-y-4">
        <h1 className="text-xl font-semibold">Thanh toán giữ lịch</h1>

        <img src={qrUrl} className="mx-auto w-64 h-64" />

        <p className="text-sm text-slate-500">
          Nội dung chuyển khoản:
          <br />
          <b>DATLICH_{booking.id}</b>
        </p>

        <p className="text-xs text-slate-400">
          Sau khi chuyển tiền, hệ thống sẽ tự động xác nhận.
        </p>
      </div>
    </main>
  );
}

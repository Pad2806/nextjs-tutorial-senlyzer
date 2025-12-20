"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "./usePayment";
import { generateSepayQR } from "@/app/lib/payment/sepayqr";

export default function PaymentClient() {
  const router = useRouter();
  const { bookingId } = usePayment();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;

    fetch(`/api/bookings/${bookingId}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setBooking(data);
        setLoading(false);
      });
  }, [bookingId]);

  if (!bookingId) {
    return <div className="text-center">Thiếu thông tin thanh toán</div>;
  }

  if (loading) {
    return <div className="text-center">Đang tải thông tin...</div>;
  }

  if (!booking) {
    return <div className="text-center">Booking không tồn tại</div>;
  }

  const qrUrl = generateSepayQR({
    bankCode: "CTG", // VietinBank
    accountNo: "1133668899", // STK thật
    amount: booking.amount,
    description: `DATLICH_${booking.id}`,
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow p-8 space-y-4 text-center">
        <h1 className="text-xl font-semibold">Thanh toán giữ lịch</h1>

        <p>
          <b>Dịch vụ:</b> {booking.service_name}
        </p>
        <p>
          <b>Số tiền:</b> {booking.amount.toLocaleString()}đ
        </p>

        <img src={qrUrl} className="mx-auto w-64 h-64" />

        <p className="text-sm text-slate-500">
          Nội dung chuyển khoản:
          <br />
          <b>DATLICH_{booking.id}</b>
        </p>
      </div>
    </main>
  );
}

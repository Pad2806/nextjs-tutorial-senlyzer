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

    fetch(`/api/bookings/${bookingId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then(setBooking);
  }, [bookingId]);

  useEffect(() => {
    if (!bookingId) return;

    const t = setInterval(async () => {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.status === "paid") {
        router.push(`/result?bookingId=${bookingId}`);
      }
    }, 3000);

    return () => clearInterval(t);
  }, [bookingId, router]);

  if (!booking) return <div>Đang tạo mã thanh toán...</div>;

  const qrUrl = generateSepayQR({
    bankCode: "TPB",
    accountNo: "23238628888",
    amount: booking.amount,
    description: `DATLICH_${booking.id}`,
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-6 rounded-xl text-center space-y-4">
        <h1 className="text-lg font-semibold">Thanh toán giữ lịch</h1>

        <img src={qrUrl} className="w-64 h-64 mx-auto" />

        <p className="text-sm text-slate-600">
          Nội dung chuyển khoản:
          <br />
          <b>DATLICH_{booking.id}</b>
        </p>
      </div>
    </main>
  );
}

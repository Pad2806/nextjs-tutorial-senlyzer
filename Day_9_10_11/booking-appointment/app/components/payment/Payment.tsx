"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "./usePayment";

export default function PaymentClient() {
  const { bookingId } = usePayment();
  const router = useRouter();

  if (!bookingId) return <div>Thiếu bookingId</div>;

  const qrUrl = `https://qr.sepay.vn/img?bank=CTG&acc=106877456357&amount=150000&des=DATLICH-${bookingId}`;

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "paid") {
          router.push(`/result?bookingId=${bookingId}`);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bookingId, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl text-center space-y-4">
        <h1 className="text-xl font-semibold">Thanh toán giữ lịch</h1>
        <img src={qrUrl} className="mx-auto w-64 h-64" />
        <p className="text-sm text-slate-500">
          Nội dung chuyển khoản: <b>DATLICH-{bookingId}</b>
        </p>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "./usePayment";

export default function PaymentClient() {
  const { bookingId } = usePayment();
  const router = useRouter();

  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;

    fetch("/api/payments/sepay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("API ERROR");
        return res.json();
      })
      .then((data) => {
        setQrUrl(data.qr_url);
      })
      .catch(() => setError("Không tạo được mã thanh toán"));
  }, [bookingId]);

  // polling status
  useEffect(() => {
    if (!bookingId) return;

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

  if (!bookingId) return <div>Thiếu bookingId</div>;
  if (error) return <div>{error}</div>;
  if (!qrUrl) return <div>Đang tạo mã thanh toán...</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow p-8 text-center space-y-4">
        <h1 className="text-xl font-semibold">Thanh toán giữ lịch</h1>

        <img src={qrUrl} className="mx-auto w-64 h-64" />

        <p className="text-xs text-slate-500">
          Sau khi chuyển tiền, hệ thống sẽ tự động xác nhận.
        </p>
      </div>
    </main>
  );
}

"use client";
import { useSearchParams } from "next/navigation";
import { generateSepayQR } from "@/app/lib/payment/vietqr";
import { useState } from "react";

export default function PaymentPage() {
  const params = useSearchParams();
  const name = params.get("name") || "Khách hàng";
  const phone = params.get("phone") || "";
  const amount = Number(params.get("amount")) || 150000;
  const [copied, setCopied] = useState(false);

  const qrUrl = generateSepayQR({
    bankCode: "VCB",
    accountNo: "0123456789",
    amount,
    description: `DATLICH_${phone}`,
  });

  const handleDownload = async () => {
    const res = await fetch(qrUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `QR_DATLICH_${phone || "booking"}.png`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // const handleCopyQR = async () => {
  //   try {
  //     const res = await fetch(qrUrl);
  //     const blob = await res.blob();
  //     const item = new ClipboardItem({
  //       "image/png": blob,
  //       "text/plain": new Blob([qrUrl], { type: "text/plain" }),
  //     });
  //     await navigator.clipboard.write([item]);
  //     alert("Đã copy QR");
  //   } catch {
  //     alert("Copy thất bại");
  //   }
  // };
  const handleCopyQR = async () => {
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();

      const item = new ClipboardItem({
        "image/png": blob,
        "text/plain": new Blob([qrUrl], { type: "text/plain" }),
      });

      await navigator.clipboard.write([item]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg shadow-blue-100 p-8 space-y-8 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Thanh toán giữ lịch
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quét mã hoặc tải QR để chuyển khoản
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 text-sm text-left space-y-1">
          <p>
            <span className="text-slate-500">Khách hàng:</span> <b>{name}</b>
          </p>
          <p>
            <span className="text-slate-500">Số tiền:</span>{" "}
            <b className="text-blue-600">{amount.toLocaleString()}đ</b>
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <img
              src={qrUrl}
              alt="QR thanh toán"
              className="w-64 h-64"
              id="qr-image"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleDownload}
            className="rounded-xl border border-blue-200 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
          >
            Tải mã QR
          </button>
          <button
            onClick={handleCopyQR}
            className={`rounded-xl py-3 text-sm font-medium transition flex items-center justify-center gap-2
              ${
                copied
                  ? "bg-green-600 text-white border border-green-600"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-100"
              }
            `}
          >
            {copied ? (
              <>
                <span>✓</span>
                <span>Đã copy</span>
              </>
            ) : (
              "Copy QR"
            )}
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 space-y-1">
          <p className="font-medium text-slate-800">VIETCOMBANK</p>
          <p className="text-base">0123456789</p>
          <p className="text-blue-600">
            Nội dung: <b>DATLICH_{phone}</b>
          </p>
        </div>

        <p className="text-xs text-slate-400">
          Hệ thống sẽ tự động xác nhận sau 1–3 phút
        </p>
      </div>
    </main>
  );
}

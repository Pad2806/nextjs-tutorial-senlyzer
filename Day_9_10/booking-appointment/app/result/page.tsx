"use client";

import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const status = params.get("status");
  const name = params.get("name") || "Khách hàng";

  const isPaid = status === "paid";

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow p-8 text-center space-y-4">
        {isPaid ? (
          <>
            <h1 className="text-2xl font-semibold text-green-600">
              Đặt lịch thành công
            </h1>
            <p className="text-slate-600">
              Cảm ơn <b>{name}</b>. Lịch khám của bạn đã được xác nhận.
            </p>
            <ul className="text-sm text-slate-500 text-left mt-4 space-y-2">
              <li>• Zalo xác nhận đã được gửi</li>
              <li>• Điều dưỡng đang tiếp nhận hồ sơ</li>
              <li>• Lịch khám đã lưu trên hệ thống</li>
            </ul>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-orange-500">
              Chưa thanh toán
            </h1>
            <p className="text-slate-600">
              Nhân viên CSKH sẽ liên hệ để tư vấn và hỗ trợ bạn.
            </p>
            <ul className="text-sm text-slate-500 text-left mt-4 space-y-2">
              <li>• Hướng dẫn thanh toán tại quầy</li>
              <li>• Hỗ trợ sắp xếp lịch phù hợp</li>
            </ul>
          </>
        )}
      </div>
    </main>
  );
}

"use client";
import { useBookingForm } from "./useBookingForm";

export default function BookingForm() {
  const { update, submit, errors } = useBookingForm();

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-lg shadow-blue-100 p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Đặt lịch khám</h2>
        <p className="text-sm text-slate-500 mt-1">
          Thông tin của bạn được bảo mật tuyệt đối
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="form-label">Họ và tên *</label>
          <input
            className={`form-input ${
              errors.name ? "border-red-500 focus:ring-red-500" : ""
            }`}
            placeholder="Nguyễn Văn A"
            onChange={(e) => update("name", e.target.value)}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="form-label">Số điện thoại *</label>
          <input
            className={`form-input ${
              errors.phone ? "border-red-500 focus:ring-red-500" : ""
            }`}
            placeholder="0901234567"
            onChange={(e) => update("phone", e.target.value)}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="form-label">Email</label>
          <input
            className={`form-input ${
              errors.email ? "border-red-500 focus:ring-red-500" : ""
            }`}
            placeholder="email@example.com"
            onChange={(e) => update("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            className="form-input"
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">Dịch vụ</option>
            <option>Khám tổng quát</option>
            <option>Da liễu</option>
            <option>Nội khoa</option>
          </select>

          <select
            className="form-input"
            onChange={(e) => update("clinic", e.target.value)}
          >
            <option value="">Phòng khám</option>
            <option>Tại 123 Hàm Nghi</option>
            <option>Tại 345 Nguyễn Văn Linh</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center bg-blue-50 rounded-xl px-5 py-4">
        <span className="text-sm text-slate-600">Phí giữ lịch</span>
        <span className="text-xl font-semibold text-blue-600">150.000đ</span>
      </div>

      <button
        onClick={submit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 text-sm font-medium transition"
      >
        Giữ lịch & thanh toán
      </button>
    </div>
  );
}

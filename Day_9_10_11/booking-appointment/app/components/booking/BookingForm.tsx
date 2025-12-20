"use client";
import { useBookingForm } from "./useBookingForm";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
export default function BookingForm() {
  const { update, submit, errors } = useBookingForm();
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [clinics, setClinics] = useState<{ id: string; name: string }[]>([]);
  const { status } = useSession();
  const isLoadingSession = status === "loading";

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then(setServices);

    fetch("/api/clinics")
      .then((res) => res.json())
      .then(setClinics);
  }, []);

  return (
    <div
      id="booking"
      className="max-w-md w-full bg-white rounded-3xl shadow-lg shadow-blue-100 p-8 space-y-8"
    >
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
            <option value="">Chọn dịch vụ</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>

          <select
            className="form-input"
            onChange={(e) => update("clinic", e.target.value)}
          >
            <option value="">Chọn phòng khám</option>
            {clinics.map((clinic) => (
              <option key={clinic.id} value={clinic.id}>
                {clinic.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center bg-blue-50 rounded-xl px-5 py-4">
        <span className="text-sm text-slate-600">Phí giữ lịch</span>
        <span className="text-xl font-semibold text-blue-600">150.000đ</span>
      </div>

      <button
        onClick={submit}
        disabled={isLoadingSession}
        className={`w-full rounded-xl py-4 text-sm font-medium transition
          ${
            isLoadingSession
              ? "bg-slate-300 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }
        `}
      >
        {isLoadingSession
          ? "Đang kiểm tra đăng nhập..."
          : "Giữ lịch & thanh toán"}
      </button>

      {status === "unauthenticated" && (
        <p className="text-xs text-slate-500 text-center">
          Bạn cần đăng nhập để đặt lịch.
        </p>
      )}
    </div>
  );
}

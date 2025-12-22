"use client";

import { useEffect, useState } from "react";
import { useBookingForm } from "./useBookingForm";
import {
  User,
  Phone,
  Building2,
  Stethoscope,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface InputProps {
  label: string;
  icon?: React.ReactNode;
  value?: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
}

interface SelectOption {
  id: string;
  name: string;
}

interface SelectProps {
  label: string;
  icon?: React.ReactNode;
  value?: string;
  error?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export default function BookingForm() {
  const { form, update, submit, errors, isSubmitting, status } =
    useBookingForm();

  const [services, setServices] = useState<SelectOption[]>([]);
  const [clinics, setClinics] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [s, c] = await Promise.all([
        fetch("/api/services").then((r) => r.json()),
        fetch("/api/clinics").then((r) => r.json()),
      ]);
      setServices(s);
      setClinics(c);
      setIsLoading(false);
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-16 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-6">
        <h2 className="text-2xl font-bold text-white">Thông tin đặt lịch</h2>
        <p className="text-blue-100 mt-1 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Bảo mật tuyệt đối
        </p>
      </div>

      <div className="p-10 space-y-6">
        <Input
          label="Họ và tên"
          icon={<User />}
          value={form.name}
          error={errors.name}
          onChange={(v) => update("name", v)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Giới tính"
            value={form.gender}
            error={errors.gender}
            options={[
              { id: "male", name: "Nam" },
              { id: "female", name: "Nữ" },
              { id: "other", name: "Khác" },
            ]}
            onChange={(v) => update("gender", v)}
          />

          <Input
            label="Tuổi"
            type="number"
            value={form.age}
            error={errors.age}
            onChange={(v) => update("age", v)}
          />
        </div>
        <Input
          label="Số điện thoại"
          icon={<Phone />}
          value={form.phone}
          error={errors.phone}
          onChange={(v) => update("phone", v)}
        />

        <Select
          label="Dịch vụ"
          icon={<Stethoscope />}
          value={form.service}
          error={errors.service}
          options={services}
          onChange={(v) => update("service", v)}
        />

        <Select
          label="Phòng khám"
          icon={<Building2 />}
          value={form.clinic}
          error={errors.clinic}
          options={clinics}
          onChange={(v) => update("clinic", v)}
        />

        <Input
          label="Ngày & giờ khám"
          icon={<Clock />}
          type="datetime-local"
          value={form.appointmentDate}
          error={errors.appointmentDate}
          onChange={(v) => update("appointmentDate", v)}
        />

        <div>
          <label className="block text-sm font-medium mb-2">
            Mô tả triệu chứng
          </label>
          <textarea
            value={form.symptoms}
            onChange={(e) => update("symptoms", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Triệu chứng, tiền sử bệnh, ghi chú cho bác sĩ..."
          />
        </div>

        <button
          onClick={submit}
          disabled={isSubmitting || status === "loading"}
          className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex justify-center gap-2 disabled:bg-slate-400"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Đang xử lý
            </>
          ) : (
            "Xác nhận & thanh toán"
          )}
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  icon,
  value,
  error,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-3 text-blue-600">{icon}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            icon ? "pl-10" : "pl-4"
          } ${error ? "border-red-500 bg-red-50" : "border-slate-300"}`}
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, icon, value, error, options, onChange }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-3 text-blue-600">{icon}</span>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            icon ? "pl-10" : "pl-4"
          } ${error ? "border-red-500 bg-red-50" : "border-slate-300"}`}
        >
          <option value="">Chọn</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

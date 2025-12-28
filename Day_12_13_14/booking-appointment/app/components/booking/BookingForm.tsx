"use client";

import { useEffect, useState } from "react";
import { useBookingForm } from "./useBookingForm";
import {
  User,
  Phone,
  Building2,
  Stethoscope,
  Clock,
  Loader2,
} from "lucide-react";

interface Option {
  id: string;
  name: string;
}

interface TimeSlot {
  time: string;
  capacity: number;
  booked: number;
  available: number;
}

interface InputProps {
  label: string;
  value?: string;
  type?: string;
  icon?: React.ReactNode;
  error?: string;
  min?: string;
  onChange: (value: string) => void;
}

interface SelectOption {
  id: string;
  name: string;
}

interface SelectProps {
  label: string;
  value?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
}
type BookingResponse = {
  id: string;
  status: "pending" | "paid" | "expired";
  amount: number;
  patientName: string;
  serviceName: string;
  clinicName: string;
};

export default function BookingForm() {
  const { form, update, submit, errors, isSubmitting } = useBookingForm();
  const [clinics, setClinics] = useState<Option[]>([]);
  const [services, setServices] = useState<Option[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [hasCheckedSlots, setHasCheckedSlots] = useState(false);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = today.toLocaleDateString("en-CA");

  useEffect(() => {
    Promise.all([
      fetch("/api/clinics").then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
    ]).then(([c, s]) => {
      setClinics(c);
      setServices(s);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!form.clinic || !form.service || !form.appointmentDate) {
      setHasCheckedSlots(false);
      return;
    }

    setHasCheckedSlots(false);
    fetch(
      `/api/available-slots?clinic_id=${form.clinic}&service_id=${form.service}&date=${form.appointmentDate}`,
      { cache: "no-store" }
    )
      .then((r) => r.json())
      .then((d: TimeSlot[]) => {
        setTimeSlots(d);
        setHasCheckedSlots(true);
      });
  }, [form.clinic, form.service, form.appointmentDate]);

  if (loading) {
    return (
      <div className="p-16 flex justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 space-y-6">
      <Input
        label="Họ và tên"
        icon={<User />}
        value={form.name}
        error={errors.name}
        onChange={(v) => update("name", v)}
      />

      <Input
        label="Số điện thoại"
        icon={<Phone />}
        value={form.phone}
        error={errors.phone}
        onChange={(v) => update("phone", v)}
      />

      <Select
        label="Phòng khám"
        icon={<Building2 />}
        value={form.clinic}
        options={clinics}
        error={errors.clinic}
        onChange={(v) => {
          update("clinic", v);
          update("service", "");
          update("appointmentDate", "");
          update("appointmentTime", "");
          setTimeSlots([]);
        }}
      />

      <Select
        label="Dịch vụ"
        icon={<Stethoscope />}
        value={form.service}
        options={services}
        disabled={!form.clinic}
        error={errors.service}
        onChange={(v) => {
          update("service", v);
          update("appointmentDate", "");
          update("appointmentTime", "");
          setTimeSlots([]);
        }}
      />

      <Input
        label="Ngày khám"
        type="date"
        icon={<Clock />}
        value={form.appointmentDate}
        error={errors.appointmentDate}
        min={minDate}
        onChange={(v) => {
          update("appointmentDate", v);
          update("appointmentTime", "");
          setTimeSlots([]);
        }}
      />

      <Select
        label="Giờ khám"
        value={form.appointmentTime}
        disabled={timeSlots.length === 0}
        options={timeSlots.map((s) => ({
          id: s.time,
          name: `${s.time} (còn ${s.available} chỗ)`,
        }))}
        error={errors.appointmentTime}
        onChange={(v) => update("appointmentTime", v)}
      />

      {hasCheckedSlots && timeSlots.length === 0 && (
        <div className="p-4 bg-orange-50 text-orange-600 rounded-xl border border-orange-200 text-sm font-medium text-center">
          Rất tiếc, đã kín lịch cho ngày này. Vui lòng chọn ngày khác.
        </div>
      )}

      <button
        onClick={submit}
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold disabled:bg-slate-400"
      >
        {isSubmitting ? "Đang xử lý..." : "Xác nhận & thanh toán"}
      </button>
    </div>
  );
}

function Input({
  label,
  value,
  type = "text",
  icon,
  error,
  min,
  onChange,
}: InputProps) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="relative mt-1">
        {icon && <span className="absolute left-3 top-3">{icon}</span>}
        <input
          type={type}
          value={value ?? ""}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full py-3 rounded-xl border ${
            icon ? "pl-10" : "pl-4"
          } ${error ? "border-red-500" : "border-slate-300"}`}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
  disabled,
  error,
  icon,
}: SelectProps) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="relative mt-1">
        {icon && <span className="absolute left-3 top-3">{icon}</span>}
        <select
          value={value ?? ""}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full py-3 rounded-xl border ${
            icon ? "pl-10" : "pl-4"
          } ${
            error ? "border-red-500" : "border-slate-300"
          } disabled:bg-slate-100`}
        >
          <option value="">Chọn</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

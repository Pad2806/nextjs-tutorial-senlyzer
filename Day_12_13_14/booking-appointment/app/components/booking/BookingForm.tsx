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
  Users,
  Calendar,
  FileText,
  X,
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
  const { form, update, submit, errors, isSubmitting, validateForm } = useBookingForm();
  const [clinics, setClinics] = useState<Option[]>([]);
  const [services, setServices] = useState<Option[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [hasCheckedSlots, setHasCheckedSlots] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Giới tính"
          icon={<Users />}
          value={form.gender}
          options={[
            { id: "male", name: "Nam" },
            { id: "female", name: "Nữ" },
            { id: "other", name: "Khác" },
          ]}
          error={errors.gender}
          onChange={(v) => update("gender", v)}
        />
        <Input
          label="Tuổi"
          type="number"
          icon={<Calendar />}
          value={form.age}
          error={errors.age}
          onChange={(v) => update("age", v)}
        />
      </div>

      <TextArea
        label="Mô tả bệnh lý"
        icon={<FileText />}
        value={form.symptoms}
        error={errors.symptoms}
        onChange={(v) => update("symptoms", v)}
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
        onClick={() => {
          if (validateForm()) setShowModal(true);
        }}
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold disabled:bg-slate-400 hover:bg-blue-700 transition"
      >
        Xác nhận
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Xác nhận thông tin
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-xl space-y-2 text-blue-900">
                <div className="flex justify-between">
                  <span className="text-blue-600">Bệnh nhân:</span>
                  <span className="font-medium">{form.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">SĐT:</span>
                  <span className="font-medium">{form.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Phòng khám:</span>
                  <span className="font-medium">
                    {clinics.find((c) => c.id === form.clinic)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Dịch vụ:</span>
                  <span className="font-medium">
                    {services.find((s) => s.id === form.service)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Thời gian:</span>
                  <span className="font-medium">
                    {form.appointmentTime} - {form.appointmentDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-blue-200 rounded-xl bg-white shadow-sm">
                <span className="text-slate-600 font-medium">
                  Tiền đặt cọc
                </span>
                <span className="text-lg font-bold text-blue-600">
                  2.000 đ
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={submit}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-slate-400 transition"
              >
                {isSubmitting ? "Đang xử lý..." : "Thanh toán"}
              </button>
            </div>
          </div>
        </div>
      )}
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

function TextArea({
  label,
  value,
  icon,
  error,
  onChange,
}: {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="relative mt-1">
        {icon && <span className="absolute left-3 top-3">{icon}</span>}
        <textarea
          rows={3}
          value={value ?? ""}
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

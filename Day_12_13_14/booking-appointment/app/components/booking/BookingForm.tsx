"use client";

import { useEffect, useState, useRef } from "react";
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
  const { form, update, submit, errors, isSubmitting, validateBookingAvailability } = useBookingForm();
  const [clinics, setClinics] = useState<Option[]>([]);
  const [services, setServices] = useState<Option[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [doctors, setDoctors] = useState<Option[]>([]); // New state for doctors
  const [hasCheckedSlots, setHasCheckedSlots] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = today.toLocaleDateString("en-CA");
  const datePickerRef = useRef<HTMLInputElement>(null);

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

  // UseEffect to fetch doctors
  useEffect(() => {
    if (!form.clinic || !form.service) {
        setDoctors([]);
        return;
    }
    fetch(`/api/doctors?clinic_id=${form.clinic}&service_id=${form.service}`)
        .then((r) => r.json())
        .then((data) => {
            if (Array.isArray(data)) {
                // Map to ensure name property exists (handle name vs full_name)
                const mappedDoctors = data.map((d: any) => ({
                    id: d.id,
                    name: d.name || d.full_name || d.fullName || "Bác sĩ",
                }));
                setDoctors(mappedDoctors);
            } else {
                setDoctors([]);
            }
        })
        .catch(err => {
            console.error("Failed to load doctors", err);
            setDoctors([]);
        });
  }, [form.clinic, form.service]);

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
        let slots = d;
        const now = new Date();
        const isToday =
          form.appointmentDate === now.toLocaleDateString("en-CA");

        if (isToday) {
          const currentTime = now.toTimeString().slice(0, 5);
          slots = slots.filter((s) => s.time > currentTime);
        }

        setTimeSlots(slots);
        setHasCheckedSlots(true);
      });
  }, [form.clinic, form.service, form.appointmentDate]);

  // Helper to determine active date tab
  const getSelectedDateTab = () => {
    if (!form.appointmentDate) return null;
    const selected = new Date(form.appointmentDate);
    selected.setHours(0,0,0,0);
    const t = new Date();
    t.setHours(0,0,0,0);
    
    const diffTime = selected.getTime() - t.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays >= 0 && diffDays <= 2) return diffDays; // 0, 1, 2
    return "other";
  };
  
  const selectedTab = getSelectedDateTab();

  if (loading) {
    return (
      <div className="p-16 flex justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
      {/* SECTION 1: APPOINTMENT DETAILS */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center border-b pb-2">
          Nội dung chi tiết đặt hẹn
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <Select
              label="Bệnh viện/phòng khám Vinmec *"
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
              label="Chuyên khoa *"
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

            <Select
                label="Bác sĩ"
                value={form.doctor} 
                options={[
                    {id: "", name: "Chọn Bác sĩ muốn khám"},
                    ...doctors
                ]} 
                onChange={(v) => update("doctor", v)}
                disabled={doctors.length === 0}
            />

          </div>

          {/* Right Column: Time Selection */}
          <div className="space-y-4 relative">
             <label className="text-sm font-medium block text-slate-900">Thời gian khám *</label>
             
             {/* Disable Overlay if Clinic/Service not selected */}
             {(!form.clinic || !form.service) && (
                <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl border border-dashed border-slate-300">
                    <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded shadow-sm border">
                        Vui lòng chọn Phòng khám & Chuyên khoa trước
                    </span>
                </div>
             )}

             {/* Custom Date Picker Tabs */}
             <div className={`flex gap-4 mb-4 overflow-x-auto pb-2 ${(!form.clinic || !form.service) ? 'opacity-50 pointer-events-none' : ''}`}>
                {[0, 1, 2].map(offset => {
                    const d = new Date();
                    d.setDate(d.getDate() + offset);
                    const dateStr = d.toLocaleDateString("en-CA"); // YYYY-MM-DD
                    const displayDate = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth()+1).padStart(2, '0')}`;
                    
                    const weekdays = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
                    const realDayName = weekdays[d.getDay()];

                    const isSelected = selectedTab === offset;
                    
                    return (
                        <button 
                            key={offset}
                            onClick={() => {
                                update("appointmentDate", dateStr);
                                update("appointmentTime", "");
                                setTimeSlots([]);
                            }}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition min-w-[100px] ${
                                isSelected 
                                ? "bg-emerald-500 text-white border-emerald-500 shadow-md transform scale-105" 
                                : "bg-gray-50 text-slate-600 border-slate-100 hover:border-emerald-200 hover:bg-white"
                            }`}
                        >
                            <span className="text-lg font-bold">{displayDate}</span>
                            <span className="text-xs font-medium opacity-90">{realDayName}</span>
                        </button>
                    )
                })}
                <div className="relative">
                    <input 
                        ref={datePickerRef}
                        type="date" 
                        min={minDate}
                        className="sr-only"
                        onChange={(e) => {
                             if(e.target.value) {
                                 update("appointmentDate", e.target.value);
                                 update("appointmentTime", "");
                                 setTimeSlots([]);
                             }
                        }}
                    />
                    <button 
                        onClick={() => {
                            if (datePickerRef.current) {
                                try {
                                    datePickerRef.current.showPicker();
                                } catch (e) {
                                    // Fallback for older browsers
                                    datePickerRef.current.click();
                                }
                            }
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition min-w-[100px] h-full ${
                        selectedTab === "other"
                        ? "bg-emerald-500 text-white border-emerald-500 shadow-md" 
                        : "bg-gray-50 text-slate-600 border-slate-100 hover:border-emerald-200"
                    }`}>
                        {selectedTab === "other" && form.appointmentDate ? (
                             <>
                                <span className="text-lg font-bold">
                                    {form.appointmentDate.split('-').reverse().slice(0,2).join('/')}
                                </span>
                                <span className="text-xs font-medium flex items-center gap-1">
                                    Ngày khác <Calendar className="w-3 h-3" />
                                </span>
                             </>
                        ) : (
                             <>
                                <span className="text-lg font-bold">--/--</span>
                                <span className="text-xs font-medium flex items-center gap-1">
                                    Ngày khác <Calendar className="w-3 h-3" />
                                </span>
                             </>
                        )}
                        
                    </button>
                 </div>
             </div>

             {/* Time Slots Grid */}
             <div>
                {timeSlots.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map(s => (
                            <button
                                key={s.time}
                                onClick={() => update("appointmentTime", s.time)}
                                className={`py-2 px-1 text-sm rounded border transition ${
                                    form.appointmentTime === s.time
                                    ? "bg-blue-100 text-blue-700 border-blue-300 font-semibold"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                                }`}
                            >
                                {s.time}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-lg text-center border border-dashed border-slate-200">
                        {form.appointmentDate ? "Đang tải hoặc không có giờ trống..." : "Vui lòng chọn ngày khám"}
                    </div>
                )}
                {errors.appointmentDate && <p className="text-sm text-red-600 mt-1">{errors.appointmentDate}</p>}
                {errors.appointmentTime && <p className="text-sm text-red-600 mt-1">{errors.appointmentTime}</p>}

                {hasCheckedSlots && timeSlots.length === 0 && form.appointmentDate && (
                    <div className="mt-2 text-sm text-orange-600">Đã hết lịch cho ngày này</div>
                )}
             </div>
             
             <p className="text-xs text-slate-500 italic mt-4">
                *Lưu ý: Tổng đài viên sẽ gọi lại cho quý khách để xác nhận thông tin thời gian dựa theo đăng ký và điều chỉnh nếu cần thiết.
             </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: CUSTOMER INFO */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center border-b pb-2">
          Thông tin khách hàng
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
                {/* Name + Gender Row */}
                <div className="flex gap-4 items-start">
                    <div className="flex-1">
                       <label className="text-sm font-medium mb-1 block">Họ và tên *</label>
                       <input 
                           placeholder="Họ và tên"
                           value={form.name}
                           onChange={(e) => update("name", e.target.value)}
                           className={`w-full py-3 px-4 rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-100 outline-none`}
                        />
                        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                         <label className="text-sm font-medium mb-1 block">Giới tính *</label>
                         <div className="flex items-center gap-4 px-2 h-[50px]">
                             <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="male"
                                    checked={form.gender === "male"} 
                                    onChange={() => update("gender", "male")}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm">Nam</span>
                             </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="female"
                                    checked={form.gender === "female"} 
                                    onChange={() => update("gender", "female")}
                                    className="w-4 h-4 text-pink-500"
                                />
                                <span className="text-sm">Nữ</span>
                             </label>
                        </div>
                        {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender}</p>}
                    </div>
                </div>

                <Input
                    label="Số điện thoại *"
                    placeholder="Nhập số điện thoại"
                    value={form.phone}
                    error={errors.phone}
                    onChange={(v) => update("phone", v)}
                />

            </div>

            {/* Right Column */}
            <div className="space-y-4">
                <Input
                    label="Tuổi *"
                    type="number"
                    placeholder="Nhập tuổi"
                    value={form.age}
                    error={errors.age}
                    onChange={(v) => update("age", v)}
                />
            </div>
        </div>
        
        <div className="mt-4">
             <TextArea
                label="Lý do khám *"
                value={form.symptoms}
                error={errors.symptoms}
                onChange={(v) => update("symptoms", v)}
             />
        </div>
        
        <div className="mt-4 flex items-start gap-2">
            <input type="checkbox" id="consent" className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed">
                Tôi đã đọc và đồng ý với <a href="#" className="text-blue-600 hover:underline">Chính sách bảo vệ dữ liệu cá nhân</a> và chấp thuận để xử lý dữ liệu cá nhân...
            </label>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
            onClick={async () => {
            const isValid = await validateBookingAvailability();
            if (isValid) setShowModal(true);
            }}
            disabled={isSubmitting}
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl disabled:bg-slate-400 min-w-[200px]"
        >
            {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Content Kept Same as Before but updated style if needed */}
             <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Xác nhận thông tin
              </h3>
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
                  <span className="text-blue-600">Ngày sinh:</span>
                  <span className="font-medium">{form.dob ? form.dob : "—"}</span>
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
                    {form.appointmentTime} -{" "}
                    {form.appointmentDate?.split("-").reverse().join("/")}
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

// Helper Inputs 
function Input({
  label,
  value,
  type = "text",
  placeholder,
  icon,
  error,
  min,
  onChange,
}: InputProps & { placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-3 text-slate-400">{icon}</span>}
        <input
          type={type}
          value={value ?? ""}
          min={min}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full py-3 rounded-xl border ${
            icon ? "pl-10" : "pl-4"
          } ${error ? "border-red-500 hover:border-red-500" : "border-slate-300 hover:border-blue-400"} transition focus:ring-2 focus:ring-blue-100 outline-none`}
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
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

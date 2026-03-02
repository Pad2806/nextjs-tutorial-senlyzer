"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useBookingForm } from "./useBookingForm";
import {
  User,
  Phone,
  Building2,
  Stethoscope,
  Clock,
  Loader2,
  Calendar,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  MapPin,
  HeartPulse,
  Info
} from "lucide-react";
import { generateSepayQR } from "@/app/lib/payment/sepayqr";

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
  placeholder?: string;
}

export default function BookingForm() {
  const { form, update, submit, errors, isSubmitting, validateBookingAvailability, reset } = useBookingForm();
  
  // UI States
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Data States
  const [clinics, setClinics] = useState<Option[]>([]);
  const [services, setServices] = useState<Option[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [hasCheckedSlots, setHasCheckedSlots] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const datePickerRef = useRef<HTMLInputElement>(null);
  
  // Payment States
  const [paymentBookingId, setPaymentBookingId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "paid" | "expired">("pending");
  const [paymentCreatedAt, setPaymentCreatedAt] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = today.toLocaleDateString("en-CA");

  // Step Validation
  const canGoToStep2 = !!form.clinic && !!form.service;
  const canGoToStep3 = canGoToStep2 && !!form.appointmentDate && !!form.appointmentTime;
  const canSubmit = canGoToStep3 && !!form.name && !!form.phone && !!form.age && !!form.gender && !!form.consent;

  // Initial Data Fetch
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

  // Fetch Available Slots
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

  // Payment Status Polling
  useEffect(() => {
    if (!paymentBookingId || paymentStatus === "paid" || paymentStatus === "expired") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/bookings/${paymentBookingId}`);
        const data = await res.json();
        
        if (data.created_at && !paymentCreatedAt) {
            setPaymentCreatedAt(data.created_at);
        }

        if (data.status === "paid") {
          setPaymentStatus("paid");
          clearInterval(interval);
        } else if (data.status === "expired") {
          setPaymentStatus("expired");
          clearInterval(interval);
        }
      } catch (e) {
        console.error(e);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [paymentBookingId, paymentStatus]);

  // Handle Tab Date Logic
  const getSelectedDateTab = () => {
    if (!form.appointmentDate) return null;
    const selected = new Date(form.appointmentDate);
    selected.setHours(0,0,0,0);
    const t = new Date();
    t.setHours(0,0,0,0);
    
    const diffTime = selected.getTime() - t.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays >= 0 && diffDays <= 4) return diffDays; // 0 to 4
    return "other";
  };
  const selectedTab = getSelectedDateTab();

  const handleNextStep = () => {
    if (currentStep === 1 && canGoToStep2) {
      setDirection('forward');
      setCurrentStep(2);
    } else if (currentStep === 2 && canGoToStep3) {
      setDirection('forward');
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setDirection('backward');
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <div className="p-16 flex justify-center items-center h-[500px]">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin w-8 h-8 text-teal-600" />
            <span className="text-slate-500 font-medium animate-pulse">Đang tải dữ liệu phòng khám...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-6 sm:p-10 border border-slate-100 overflow-hidden relative">
      
      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative z-10">
          {[
            { step: 1, label: "Dịch vụ", icon: <Stethoscope size={20} /> },
            { step: 2, label: "Thời gian", icon: <Clock size={20} /> },
            { step: 3, label: "Thông tin", icon: <User size={20} /> }
          ].map((s, i) => (
            <div key={s.step} className="flex flex-col items-center gap-2 relative z-10 w-1/3">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  currentStep === s.step 
                    ? "bg-teal-500 text-white shadow-teal-200 ring-4 ring-teal-50 scale-110" 
                    : currentStep > s.step 
                      ? "bg-teal-100 text-teal-600" 
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {currentStep > s.step ? <CheckCircle2 size={24} /> : s.icon}
              </div>
              <span className={`text-sm font-bold transition-colors ${currentStep === s.step ? 'text-teal-700' : currentStep > s.step ? 'text-teal-600' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
          ))}

          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-slate-100 -z-0">
             <div 
                className="h-full bg-teal-400 transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
             ></div>
          </div>
        </div>
      </div>

      {/* Forms Container with simple fade transition simulation */}
      <div className="relative min-h-[450px]">
        {/* STEP 1: Dịch vụ & Phòng khám */}
        <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${currentStep === 1 ? 'opacity-100 translate-x-0 z-10' : direction === 'forward' ? '-translate-x-full opacity-0 z-0' : 'translate-x-full opacity-0 z-0'}`}>
           <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center text-lg">1</span>
              Chọn Dịch Vụ Khám
           </h2>
           
           <div className="space-y-6">
               {/* Clinics Selection */}
               <div>
                  <label className="text-sm font-bold text-slate-600 mb-3 block uppercase tracking-wider">Cơ sở / Phòng khám</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {clinics.map(c => (
                         <button
                            key={c.id}
                            onClick={() => {
                                update("clinic", c.id);
                                if (form.clinic !== c.id) {
                                  update("service", ""); // reset service if clinic changes
                                  update("appointmentDate", "");
                                  update("appointmentTime", "");
                                }
                            }}
                            className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-4 ${
                                form.clinic === c.id 
                                ? "border-teal-500 bg-teal-50/50 shadow-md shadow-teal-100/50" 
                                : "border-slate-100 hover:border-teal-200 hover:bg-slate-50"
                            }`}
                         >
                            <div className={`p-3 rounded-full mt-1 ${form.clinic === c.id ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                                <Building2 size={24} />
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg ${form.clinic === c.id ? 'text-teal-900' : 'text-slate-700'}`}>{c.name}</h3>
                                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={14}/> Đà Nẵng</p>
                            </div>
                         </button>
                     ))}
                  </div>
                  {errors.clinic && <p className="text-sm text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={14}/> {errors.clinic}</p>}
               </div>

               {/* Services Selection */}
               <div className={`transition-opacity duration-300 ${!form.clinic ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                  <label className="text-sm font-bold text-slate-600 mb-3 block uppercase tracking-wider">Chuyên khoa</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                     {services.map(s => (
                         <button
                            key={s.id}
                            onClick={() => {
                                update("service", s.id);
                                // Auto advance to step 2 after a short delay for better UX
                                setTimeout(() => {
                                    setDirection('forward');
                                    setCurrentStep(2);
                                }, 300);
                            }}
                            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                                form.service === s.id 
                                ? "border-teal-500 bg-teal-50 text-teal-800 font-bold shadow-sm" 
                                : "border-slate-100 hover:border-teal-200 text-slate-700 bg-white"
                            }`}
                         >
                            <div className={`p-2 rounded-lg ${form.service === s.id ? 'bg-teal-100 text-teal-600' : 'bg-slate-50 text-slate-400'}`}>
                                <HeartPulse size={20} />
                            </div>
                            <span className="flex-1">{s.name}</span>
                            {form.service === s.id && <CheckCircle2 size={18} className="text-teal-500"/>}
                         </button>
                     ))}
                  </div>
                  {errors.service && <p className="text-sm text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={14}/> {errors.service}</p>}
               </div>
           </div>

           {/* Next Action */}
           <div className="mt-10 flex justify-end">
               <button
                  onClick={handleNextStep}
                  disabled={!canGoToStep2}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-95"
               >
                  Tiếp tục chọn giờ <ChevronRight size={20} />
               </button>
           </div>
        </div>

        {/* STEP 2: Thời gian */}
        <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${currentStep === 2 ? 'opacity-100 translate-x-0 z-10' : direction === 'forward' ? 'translate-x-full opacity-0 z-0' : '-translate-x-full opacity-0 z-0'}`}>
           <div className="flex items-center gap-4 mb-6">
               <button onClick={handlePrevStep} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition"><ArrowLeft size={24} /></button>
               <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center text-lg">2</span>
                  Chọn Thời Gian Khám
               </h2>
           </div>

           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50">
               <label className="text-sm font-bold text-slate-600 mb-3 block uppercase tracking-wider">Ngày khám</label>
               {/* 5-Day Horizontal Scroll Calendar */}
               <div className="flex gap-3 mb-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
                  {[0, 1, 2, 3, 4].map(offset => {
                      const d = new Date();
                      d.setDate(d.getDate() + offset);
                      const dateStr = d.toLocaleDateString("en-CA");
                      const displayDate = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth()+1).padStart(2, '0')}`;
                      const weekdays = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
                      const realDayName = offset === 0 ? "Hôm nay" : offset === 1 ? "Ngày mai" : weekdays[d.getDay()];
                      const isSelected = selectedTab === offset;
                      
                      return (
                          <button 
                              key={offset}
                              onClick={() => {
                                  update("appointmentDate", dateStr);
                                  update("appointmentTime", "");
                                  setTimeSlots([]);
                              }}
                              className={`flex-none snap-center flex flex-col items-center justify-center py-4 px-6 rounded-2xl border-2 transition-all min-w-[110px] ${
                                  isSelected 
                                  ? "bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200/50 transform scale-105" 
                                  : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:bg-blue-50/30"
                              }`}
                          >
                              <span className="text-xs font-medium opacity-80 mb-1 uppercase tracking-wider">{realDayName}</span>
                              <span className="text-2xl font-black">{displayDate.split('/')[0]}</span>
                              <span className="text-sm font-semibold opacity-90 mt-1">Th {displayDate.split('/')[1]}</span>
                          </button>
                      )
                  })}
                  
                  {/* Custom Date Picker Button */}
                  <div className="relative flex-none snap-center min-w-[110px]">
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
                          onClick={() => datePickerRef.current?.showPicker?.()}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all w-full h-full ${
                          selectedTab === "other"
                          ? "bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200/50" 
                          : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 border-dashed"
                      }`}>
                          <Calendar size={28} className="mb-2 opacity-50"/>
                          <span className="text-sm font-bold text-center leading-tight">Ngày<br/>khác</span>
                          {selectedTab === "other" && form.appointmentDate && (
                              <span className="mt-2 text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                                  {form.appointmentDate.split('-').reverse().slice(0,2).join('/')}
                              </span>
                          )}
                      </button>
                   </div>
               </div>

               {/* Time Slots */}
               <div className={`transition-opacity duration-300 ${!form.appointmentDate ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                   <label className="text-sm font-bold text-slate-600 mb-3 block uppercase tracking-wider flex items-center justify-between">
                       Giờ khám
                       {timeSlots.length > 0 && <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full normal-case tracking-normal font-medium">{timeSlots.length} khung giờ trống</span>}
                   </label>
                   
                   {timeSlots.length > 0 ? (
                       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                           {timeSlots.map(s => (
                               <button
                                   key={s.time}
                                   onClick={() => {
                                       update("appointmentTime", s.time);
                                       setTimeout(() => {
                                           if (canGoToStep2 && form.appointmentDate) {
                                              setDirection('forward');
                                              setCurrentStep(3);
                                           }
                                       }, 300);
                                   }}
                                   className={`py-3 px-2 text-base font-bold rounded-xl border-2 transition-all ${
                                       form.appointmentTime === s.time
                                       ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20 ring-offset-2"
                                       : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                                   }`}
                               >
                                   {s.time}
                               </button>
                           ))}
                       </div>
                   ) : form.appointmentDate ? (
                       <div className="py-12 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-slate-500">
                           {hasCheckedSlots ? (
                               <>
                                   <Clock size={32} className="mb-3 text-orange-400 opacity-50"/>
                                   <p className="font-medium">Rất tiếc! Đã hết lịch trống cho ngày này.</p>
                                   <p className="text-sm mt-1">Vui lòng chọn ngày khác.</p>
                               </>
                           ) : (
                               <Loader2 className="animate-spin w-6 h-6 text-teal-500" />
                           )}
                       </div>
                   ) : (
                       <div className="py-10 bg-white/50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-medium">
                           Vui lòng chọn ngày khám ở trên
                       </div>
                   )}
                   {errors.appointmentTime && <p className="text-sm text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={14}/> {errors.appointmentTime}</p>}
               </div>
           </div>

           {/* Next Action */}
           <div className="mt-8 flex justify-between items-center">
               <div className="hidden sm:flex items-center gap-2 text-slate-500 text-sm bg-blue-50 px-3 py-2 rounded-lg">
                   <Info size={16} className="text-blue-500"/> Tổng đài viên sẽ gọi lại xác nhận sau khi đặt.
               </div>
               <button
                  onClick={handleNextStep}
                  disabled={!canGoToStep3}
                  className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-95"
               >
                  Tiếp tục nhập thông tin <ChevronRight size={20} />
               </button>
           </div>
        </div>

        {/* STEP 3: Thông tin cá nhân */}
        <div className={`transition-all duration-500 ease-in-out absolute inset-0 ${currentStep === 3 ? 'opacity-100 translate-x-0 z-10' : direction === 'forward' ? 'translate-x-[200%] opacity-0 z-0' : '-translate-x-full opacity-0 z-0'}`}>
           <div className="flex items-center gap-4 mb-6">
               <button onClick={handlePrevStep} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition"><ArrowLeft size={24} /></button>
               <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center text-lg">3</span>
                  Thông tin người khám
               </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* AutoFill Hint (Fake UI for Demo of Smart Flow) */}
                <div className="col-span-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 p-4 rounded-xl flex items-start gap-3">
                    <User className="text-teal-600 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-teal-900">Khám cho bản thân?</h4>
                        <p className="text-sm text-teal-700 mt-1">Hệ thống có thể tự động điền thông tin nếu bạn đã đăng nhập.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <Input
                        label="Họ và tên *"
                        placeholder="Nguyễn Văn A"
                        value={form.name}
                        error={errors.name}
                        icon={<User size={18}/>}
                        onChange={(v) => update("name", v)}
                    />
                    
                    <Input
                        label="Số điện thoại *"
                        placeholder="0912..."
                        value={form.phone}
                        error={errors.phone}
                        icon={<Phone size={18}/>}
                        onChange={(v) => update("phone", v)}
                    />
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Tuổi *"
                            type="number"
                            placeholder="Ví dụ: 25"
                            value={form.age}
                            error={errors.age}
                            onChange={(v) => update("age", v)}
                        />
                        
                        <div>
                             <label className="text-sm font-bold text-slate-700 mb-2 block">Giới tính *</label>
                             <div className="flex bg-slate-100/50 p-1.5 rounded-xl border border-slate-200">
                                 <button
                                     onClick={() => update("gender", "male")}
                                     className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${form.gender === "male" ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                                 >
                                     Nam
                                 </button>
                                 <button
                                     onClick={() => update("gender", "female")}
                                     className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${form.gender === "female" ? 'bg-white shadow text-pink-600' : 'text-slate-500 hover:text-slate-700'}`}
                                 >
                                     Nữ
                                 </button>
                             </div>
                             {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                        </div>
                    </div>

                    <TextArea
                        label="Triệu chứng / Ghi chú cho Bác sĩ"
                        value={form.symptoms}
                        error={errors.symptoms}
                        placeholder="Mô tả ngắn gọn tình trạng sức khỏe của bạn (nếu có)..."
                        onChange={(v) => update("symptoms", v)}
                    />
                </div>

                <div className="col-span-full pt-4 border-t border-slate-100">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                            <input 
                                type="checkbox" 
                                className="peer sr-only"
                                checked={form.consent || false}
                                onChange={(e) => update("consent", e.target.checked)}
                            />
                            <div className="w-6 h-6 rounded-md border-2 border-slate-300 peer-checked:bg-teal-500 peer-checked:border-teal-500 transition-all flex items-center justify-center shadow-sm group-hover:border-teal-400">
                                <CheckCircle2 size={16} className={`text-white transition-transform ${form.consent ? 'scale-100' : 'scale-0'}`} strokeWidth={3}/>
                            </div>
                        </div>
                        <span className="text-sm text-slate-600 leading-relaxed font-medium">
                            Tôi đồng ý với <a href="#" className="text-teal-600 hover:underline">Chính sách bảo mật</a> và xác nhận các thông tin trên là chính xác.
                        </span>
                    </label>
                    {errors.consent && <p className="text-sm text-red-500 mt-2 ml-9 flex items-center gap-1"><AlertCircle size={14}/> Bắt buộc đồng ý điều khoản</p>}
                </div>
           </div>

           <div className="mt-10 flex justify-end">
               <button
                  onClick={async () => {
                     const isValid = await validateBookingAvailability();
                     if (isValid) setShowModal(true);
                  }}
                  disabled={!canSubmit || isSubmitting}
                  className="w-full sm:w-auto flex justify-center items-center gap-2 px-10 py-4 rounded-full bg-teal-600 text-white font-bold text-lg hover:bg-teal-700 disabled:bg-slate-300 disabled:text-slate-500 transition-all shadow-lg hover:shadow-teal-500/30 active:scale-95"
               >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Xác nhận Đặt lịch"}
               </button>
           </div>
        </div>
      </div>

       {/* Confirmation Modal */}
       {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
             
             <div className="bg-teal-600 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <h3 className="text-2xl font-bold relative z-10">Phiếu xác nhận thông tin</h3>
                <p className="text-teal-100 mt-1 relative z-10">Vui lòng kiểm tra lại trước khi thanh toán</p>
             </div>

            <div className="p-6 space-y-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="bg-teal-100 text-teal-600 p-2 rounded-xl"><User size={20}/></div>
                        <div>
                            <p className="font-bold text-slate-800 text-lg">{form.name}</p>
                            <p className="text-sm text-slate-500">{form.phone} • {form.age} tuổi</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                        <Building2 size={18} className="text-slate-400 mt-0.5 shrink-0"/>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Bệnh viện / Cơ sở</p>
                            <p className="font-bold text-slate-800">{clinics.find((c) => c.id === form.clinic)?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <HeartPulse size={18} className="text-slate-400 mt-0.5 shrink-0"/>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Chuyên khoa</p>
                            <p className="font-bold text-slate-800">{services.find((s) => s.id === form.service)?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock size={18} className="text-teal-500 mt-0.5 shrink-0"/>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Thời gian khám</p>
                            <p className="font-bold text-teal-700 text-lg">
                                {form.appointmentTime} <span className="text-sm font-medium text-slate-500">ngày {form.appointmentDate?.split("-").reverse().join("/")}</span>
                            </p>
                        </div>
                    </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-teal-200 bg-teal-50 rounded-2xl">
                <div className="flex items-center gap-2 text-teal-800 font-bold">
                    <FileText size={20} /> Phí giữ lịch
                </div>
                <span className="text-2xl font-black text-teal-600">
                  2.000đ
                </span>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 rounded-full border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition"
              >
                Quay lại
              </button>
              <button
                onClick={async () => {
                   const bookingId = await submit();
                   if (bookingId) {
                       setShowModal(false);
                       setPaymentBookingId(bookingId);
                       setPaymentStatus("pending");
                   }
                }}
                disabled={isSubmitting}
                className="flex-[2] py-4 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 disabled:bg-slate-400 transition"
              >
                {isSubmitting ? "Đang xử lý..." : "Tiến hành Thanh toán"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal (Keeping mostly unchanged for integrity, just modernized colors) */}
      {paymentBookingId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-white rounded-[2rem] p-8 shadow-2xl max-w-sm w-full relative animate-in zoom-in-95 duration-200">
               {paymentStatus === "pending" && (
                   /* Pending State */
                   <>
                        <button 
                            onClick={async () => {
                                if (paymentBookingId) {
                                    await fetch(`/api/bookings/${paymentBookingId}`, { method: 'PATCH', body: JSON.stringify({ status: 'expired' }) });
                                }
                                setPaymentBookingId(null);
                                setPaymentStatus("pending");
                                setPaymentCreatedAt(null);
                                reset();
                                setCurrentStep(1); // Reset back to step 1
                            }}
                            className="absolute right-4 top-4 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition"
                        >
                            <X size={24} />
                        </button>
                        
                        <div className="text-center space-y-4 pt-2">
                             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 text-teal-600 mb-2 ring-8 ring-teal-50/50">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Thanh toán giữ lịch</h3>

                            <div className="bg-white p-2 rounded-2xl border-2 border-slate-100 inline-block shadow-sm">
                                <Image 
                                    src={generateSepayQR({
                                        bankCode: "TPB",
                                        accountNo: "23238628888",
                                        amount: 2000,
                                        description: `DATLICH_${paymentBookingId}`,
                                    })} 
                                    alt="QR Code" 
                                    width={224}
                                    height={224}
                                    className="w-56 h-56 object-contain mix-blend-multiply"
                                />
                            </div>

                            <div className="space-y-2 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 font-medium">Số tiền:</span>
                                    <span className="font-bold text-teal-600 text-xl">2.000 đ</span>
                                </div>
                                <div className="flex justify-between items-center text-left">
                                    <span className="text-slate-500 font-medium shrink-0 mr-2">Nội dung:</span>
                                    <span className="font-mono font-bold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200">DATLICH_{paymentBookingId}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-center gap-2 text-sm font-bold text-teal-600 bg-teal-50 py-3 rounded-xl border border-teal-100">
                                <Loader2 size={16} className="animate-spin" />
                                Đang chờ thanh toán...
                            </div>
                        </div>
                   </>
               )}

               {paymentStatus === "paid" && (
                   /* Success State */
                   <div className="text-center space-y-6 pt-4">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 text-emerald-500 mb-2 animate-in zoom-in duration-300 ring-8 ring-emerald-50">
                             <CheckCircle2 size={56} strokeWidth={3} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-900">Thanh toán thành công!</h3>
                            <p className="text-slate-500">Lịch khám của bạn đã được xác nhận</p>
                        </div>
                        <button
                            onClick={() => {
                                setPaymentBookingId(null);
                                setPaymentStatus("pending");
                                setPaymentCreatedAt(null);
                                reset();
                                setCurrentStep(1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full py-4 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 transition shadow-lg"
                        >
                            Hoàn tất
                        </button>
                   </div>
               )}

               {paymentStatus === "expired" && (
                   /* Expired State */
                   <div className="text-center space-y-6 pt-4">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 text-red-500 mb-2 animate-in zoom-in duration-300 ring-8 ring-red-50">
                             <AlertCircle size={56} strokeWidth={3} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-slate-900">Hết thời gian</h3>
                            <p className="text-slate-500">Vui lòng thực hiện lại quy trình đặt lịch</p>
                        </div>
                        <button
                            onClick={() => {
                                setPaymentBookingId(null);
                                setPaymentStatus("pending");
                                setPaymentCreatedAt(null);
                                reset();
                                setCurrentStep(1);
                            }}
                            className="w-full py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition shadow-lg"
                        >
                            Đóng & Tạo lại
                        </button>
                   </div>
               )}
           </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function Input({ label, value, type = "text", placeholder, icon, error, min, onChange }: InputProps) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700 mb-2 block">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-4 top-3.5 text-slate-400">{icon}</span>}
        <input
          type={type}
          value={value ?? ""}
          min={min}
          placeholder={placeholder}
          onChange={(e) => {
            const val = e.target.value;
            if (label.toLowerCase().includes("điện thoại") || label.toLowerCase().includes("phone")) {
                if (/^\d*$/.test(val)) onChange(val);
            } else {
                onChange(val);
            }
          }}
          className={`w-full py-3.5 rounded-xl border-2 font-medium ${
            icon ? "pl-11" : "pl-4"
          } ${error ? "border-red-400 bg-red-50/50" : "border-slate-200 focus:border-teal-400 focus:bg-white bg-slate-50"} transition-all outline-none`}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1 font-medium"><AlertCircle size={14}/> {error}</p>}
    </div>
  );
}

function TextArea({ label, value, error, onChange, placeholder }: { label: string; value?: string; error?: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="col-span-full">
      <label className="text-sm font-bold text-slate-700 mb-2 block">{label}</label>
      <textarea
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={`w-full py-3 px-4 rounded-xl border-2 font-medium bg-slate-50 ${
          error ? "border-red-400 bg-red-50/50" : "border-slate-200 focus:border-teal-400 focus:bg-white"
        } transition-all outline-none resize-none`}
      />
      {error && <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1 font-medium"><AlertCircle size={14}/> {error}</p>}
    </div>
  );
}

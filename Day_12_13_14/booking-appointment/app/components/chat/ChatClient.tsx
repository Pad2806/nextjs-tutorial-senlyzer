"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { Clinic } from "@/app/lib/supabase/types/clinic";
import { Service } from "@/app/lib/supabase/types/service";
import { useRouter } from "next/navigation";

type SlotStat = {
  time: string;
  capacity: number;
  booked: number;
  available: number;
};

type ChatStep =
  | "name"
  | "phone"
  | "symptoms"
  | "gender"
  | "age"
  | "clinic"
  | "service"
  | "date"
  | "time"
  | "confirm";

interface BookingFormState {
  clinic?: string;
  service?: string;
  name: string;
  phone: string;
  time: string;
  symptoms: string;
  gender: boolean;
  age?: number;
}

interface Message {
  from: "bot" | "user";
  text: string;
  type?: "text" | "confirmation";
  bookingData?: BookingFormState & {
    clinicName: string;
    serviceName: string;
    amount: number;
  };
}

export default function ChatClient() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Xin chào! Bạn vui lòng cho biết Họ và tên?" },
  ]);

  const [step, setStep] = useState<ChatStep>("name");
  const [input, setInput] = useState("");

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [slots, setSlots] = useState<SlotStat[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDay, setTempDay] = useState("");

  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    time: "",
    symptoms: "",
    gender: true,
  });


  const pushBot = (text: string) =>
    setMessages((prev) => [...prev, { from: "bot", text }]);

  useEffect(() => {
    const init = async () => {
      const { data: c } = await supabase
        .from("clinics")
        .select("id, name, address, email");

      setClinics(c || []);

      const { data: s } = await supabase.from("services").select("id, name");

      setServices(s || []);
    };

    init();
  }, []);

  const askNext = (current: ChatStep) => {
    switch (current) {
      case "name":
        setStep("phone");
        pushBot("Số điện thoại của bạn? (10 số)");
        break;

      case "phone":
        setStep("symptoms");
        pushBot("Bạn có triệu chứng gì cần khám?");
        break;

      case "symptoms":
        setStep("gender");
        pushBot("Giới tính của bạn?");
        pushBot("1. Nam\n2. Nữ");
        break;

      case "gender":
        setStep("age");
        pushBot("Tuổi của bạn?");
        break;

      case "age":
        setStep("clinic");
        pushBot("Bạn muốn đặt lịch tại phòng khám nào?");
        pushBot(clinics.map((c, i) => `${i + 1}. ${c.name}`).join("\n"));
        break;

      case "clinic":
        setStep("service");
        pushBot("Bạn muốn sử dụng dịch vụ nào?");
        pushBot(services.map((s, i) => `${i + 1}. ${s.name}`).join("\n"));
        break;

      case "service":
        setStep("date");
        setShowDatePicker(true);
        pushBot("Vui lòng chọn ngày khám:");
        break;

      default:
        break;
    }
  };

  const createBookingViaApi = async (bookingTime: string) => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        gender: form.gender ? "male" : "female",
        age: form.age,
        symptoms: form.symptoms,
        clinic: form.clinic,
        service: form.service,
        booking_time: bookingTime,
        amount: 2000,
      }),
    });

    if (!res.ok) return null;

    const data: { bookingId: string } = await res.json();
    return data.bookingId;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);

    switch (step) {
      case "name":
        setForm({ ...form, name: input });
        askNext("name");
        break;

      case "phone": {
        if (!/^\d{10}$/.test(input)) {
          pushBot("Số điện thoại không hợp lệ.");
          break;
        }
        setForm({ ...form, phone: input });
        askNext("phone");
        break;
      }

      case "symptoms":
        setForm({ ...form, symptoms: input });
        askNext("symptoms");
        break;

      case "gender":
        if (input !== "1" && input !== "2") {
          pushBot("Vui lòng chọn 1 hoặc 2.");
          break;
        }
        setForm({ ...form, gender: input === "1" });
        askNext("gender");
        break;

      case "age": {
        const age = Number(input);
        if (!Number.isInteger(age) || age <= 0) {
          pushBot("Tuổi không hợp lệ.");
          break;
        }
        setForm({ ...form, age });
        askNext("age");
        break;
      }

      case "clinic": {
        const idx = Number(input) - 1;
        if (!clinics[idx]) {
          pushBot("Vui lòng chọn số hợp lệ.");
          break;
        }
        setForm({ ...form, clinic: clinics[idx].id });
        askNext("clinic");
        break;
      }

      case "service": {
        const idx = Number(input) - 1;
        if (!services[idx]) {
          pushBot("Vui lòng chọn số hợp lệ.");
          break;
        }
        setForm({ ...form, service: services[idx].id });
        askNext("service");
        break;
      }

      case "time": {
        const idx = Number(input) - 1;
        if (!slots[idx]) {
          pushBot("Vui lòng chọn giờ hợp lệ.");
          break;
        }

        try {
          const res = await fetch("/api/bookings/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: form.phone,
              appointmentDate: tempDay,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            pushBot(data.error || "Số điện thoại này đã có lịch hẹn trong ngày.");
            pushBot("Vui lòng chọn ngày khác:");
            setStep("date");
            setShowDatePicker(true);
            break;
          }
        } catch (error) {
          console.error("Validation error:", error);
          pushBot("Có lỗi xảy ra khi kiểm tra thông tin. Vui lòng thử lại.");
          break;
        }

        const bookingTime = `${tempDay} ${slots[idx].time}:00`;
        const clinicName = clinics.find((c) => c.id === form.clinic)?.name || "";
        const serviceName = services.find((s) => s.id === form.service)?.name || "";

        setForm((prev) => ({ ...prev, time: bookingTime }));
        setStep("confirm");

        setMessages((prev) => [
          ...prev,
          {
            from: "user",
            text: input,
          },
          {
            from: "bot",
            text: "Vui lòng xác nhận thông tin đặt lịch:",
            type: "confirmation",
            bookingData: {
              ...form,
              time: bookingTime,
              clinicName,
              serviceName,
              amount: 2000,
            },
          },
        ]);

        break;
      }
    }

    setInput("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);





  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="max-w-6xl w-full h-[85vh] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-5 flex items-center gap-4 shadow-md">
            <div className="bg-white/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
            </div>
          <div>
              <h2 className="text-xl font-bold">Trợ lý ảo đặt lịch</h2>
              <p className="text-xs text-blue-100 opacity-90">Luôn sẵn sàng hỗ trợ 24/7</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scroll-smooth">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex w-full ${
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className={`flex max-w-[85%] ${m.from === "user" ? "flex-row-reverse" : "flex-row"} gap-3`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${m.from === "user" ? "bg-blue-100" : "bg-emerald-100"}`}>
                        {m.from === "user" ? (
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                        )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`px-5 py-3.5 rounded-2xl text-base shadow-sm leading-relaxed
                    ${
                      m.from === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                    }`}
                  >
                        {m.type === "confirmation" && m.bookingData ? (
                        <div className="w-[320px] bg-white rounded-xl p-1">
                             <div className="bg-slate-50 rounded-lg p-4 space-y-4 border border-slate-100">
                                {/* Header */}
                                <div className="border-b border-slate-200 pb-3 mb-1">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 2 2 0 0 1 0-2.83Z"/><path d="m9 12 2 2 4-4"/></svg>
                                        Xác nhận thông tin
                                    </h3>
                                </div>

                                {/* Info Grid */}
                                <div className="space-y-3 text-sm">
                                    <div className="grid grid-cols-[100px_1fr] gap-2">
                                        <span className="text-slate-500">Bệnh nhân</span>
                                        <span className="font-semibold text-slate-900">{m.bookingData.name}</span>
                                    </div>
                                    <div className="grid grid-cols-[100px_1fr] gap-2">
                                        <span className="text-slate-500">Số điện thoại</span>
                                        <span className="font-semibold text-slate-900">{m.bookingData.phone}</span>
                                    </div>
                                    <div className="grid grid-cols-[100px_1fr] gap-2">
                                        <span className="text-slate-500">Phòng khám</span>
                                        <span className="font-semibold text-slate-900">{m.bookingData.clinicName}</span>
                                    </div>
                                    <div className="grid grid-cols-[100px_1fr] gap-2">
                                        <span className="text-slate-500">Dịch vụ</span>
                                        <span className="font-semibold text-slate-900">{m.bookingData.serviceName}</span>
                                    </div>
                                    <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                                        <span className="text-slate-500">Thời gian</span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                                            {new Date(m.bookingData.time).toLocaleString("vi-VN", {dateStyle: 'short', timeStyle: 'short'})}
                                        </span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center pt-3 border-t border-dashed border-slate-300">
                                    <span className="text-slate-600 font-medium">Tiền cọc</span>
                                    <span className="text-lg font-bold text-blue-600">{m.bookingData.amount.toLocaleString()} đ</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                            onClick={async () => {
                                pushBot("Đang xử lý...");
                                const bookingId = await createBookingViaApi(m.bookingData!.time);
                                if (bookingId) {
                                pushBot("Đặt lịch thành công!");
                                router.push(`/payment?bookingId=${bookingId}`);
                                } else {
                                pushBot("Đặt lịch thất bại. Vui lòng thử lại.");
                                }
                            }}
                            className="mt-3 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <span>Thanh toán ngay</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </button>
                        </div>
                        ) : (
                        <div className="whitespace-pre-line">{m.text}</div>
                        )}
                  </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Date Picker Area */}
        {showDatePicker && (
          <div className="border-t border-slate-100 px-6 py-4 bg-white animate-in slide-in-from-bottom duration-300">
             <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Chọn ngày khám</label>
            <input
              type="date"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition"
              min={new Date().toISOString().split("T")[0]}
              onChange={async (e) => {
                const date = e.target.value;
                setTempDay(date);
                setShowDatePicker(false);

                pushBot(`Ngày khám: ${date}`);
                pushBot("Đang kiểm tra giờ trống...");

                setSlots([]);

                const res = await fetch(
                  `/api/available-slots?clinic_id=${form.clinic}&service_id=${form.service}&date=${date}`
                );
                const data: SlotStat[] = await res.json();

                if (!data.length) {
                  pushBot("Ngày này đã kín lịch.");
                  setShowDatePicker(true);
                  return;
                }

                setSlots(data);
                setStep("time");
                pushBot("Chọn giờ khám:");
                pushBot(data.map((s, i) => `${i + 1}. ${s.time}`).join("\n"));
              }}
            />
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
             <div className="flex gap-3 items-center bg-slate-50 p-2 pr-2 rounded-[1.5rem] border border-slate-200 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all shadow-sm">
                <input
                    className="flex-1 bg-transparent border-none px-4 py-3 focus:ring-0 outline-none text-slate-700 placeholder:text-slate-400"
                    placeholder="Nhập tin nhắn..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    autoFocus
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all shadow-md hover:shadow-lg active:scale-90 flex-shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
             </div>
             <p className="text-center text-xs text-slate-400 mt-2">
                Bot có thể chưa hoàn thiện, vui lòng kiểm tra kỹ thông tin.
             </p>
        </div>
      </div>
    </div>
  );
}

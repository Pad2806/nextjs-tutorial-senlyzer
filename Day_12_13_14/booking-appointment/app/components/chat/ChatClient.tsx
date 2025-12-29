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
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full h-[700px] bg-white rounded-3xl shadow flex flex-col">
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-3xl">
          <h2 className="text-lg font-semibold">Chat đặt lịch khám</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl text-sm max-w-[80%] break-words
                ${
                  m.from === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-slate-800"
                }`}
              >
                {m.type === "confirmation" && m.bookingData ? (
                  <div className="space-y-3 min-w-[250px]">
                    <p className="font-semibold text-base border-b border-blue-200 pb-2 mb-2">
                      Thông tin đặt lịch
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Bệnh nhân:</span>{" "}
                        {m.bookingData.name}
                      </p>
                      <p>
                        <span className="font-medium">SĐT:</span>{" "}
                        {m.bookingData.phone}
                      </p>
                      <p>
                        <span className="font-medium">Phòng khám:</span>{" "}
                        {m.bookingData.clinicName}
                      </p>
                      <p>
                        <span className="font-medium">Dịch vụ:</span>{" "}
                        {m.bookingData.serviceName}
                      </p>
                      <p>
                        <span className="font-medium">Thời gian:</span>{" "}
                        {new Date(m.bookingData.time).toLocaleString("vi-VN")}
                      </p>
                      <p className="text-blue-700 font-bold pt-2 border-t border-slate-200 mt-2">
                        Tiền cọc: {m.bookingData.amount.toLocaleString()} đ
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        const loadingMsgId = Date.now();
                        pushBot("Đang xử lý...");
                        const bookingId = await createBookingViaApi(
                          m.bookingData!.time
                        );
                        if (bookingId) {
                          pushBot("Đặt lịch thành công!");
                          router.push(`/payment?bookingId=${bookingId}`);
                        } else {
                          pushBot("Đặt lịch thất bại. Vui lòng thử lại.");
                        }
                      }}
                      className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg border border-blue-200 hover:bg-blue-50 transition"
                    >
                      Thanh toán
                    </button>
                  </div>
                ) : (
                  <div className="whitespace-pre-line">{m.text}</div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showDatePicker && (
          <div className="border-t px-4 py-3 bg-gray-50">
            <input
              type="date"
              className="w-full border rounded-xl px-4 py-2"
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

        <div className="border-t p-4 flex gap-2">
          <input
            className="flex-1 border rounded-xl px-4 py-2"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}

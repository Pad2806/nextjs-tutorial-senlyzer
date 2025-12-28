"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface BookingFormState {
  name: string;
  phone: string;
  clinic?: string;
  service?: string;
  appointmentDate?: string;
  appointmentTime?: string;
}

export function useBookingForm() {
  const router = useRouter();

  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    clinic: "",
    service: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [errors, setErrors] = useState<Partial<BookingFormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof BookingFormState>(
    key: K,
    value: BookingFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateForm(): boolean {
    const e: Partial<BookingFormState> = {};

    if (!form.name.trim()) e.name = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) {
      e.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      e.phone = "Số điện thoại phải có 10 chữ số";
    }
    if (!form.clinic) e.clinic = "Chọn phòng khám";
    if (!form.service) e.service = "Chọn dịch vụ";
    if (!form.appointmentDate) e.appointmentDate = "Chọn ngày";
    if (!form.appointmentTime) e.appointmentTime = "Chọn giờ";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const booking_time = `${form.appointmentDate}T${form.appointmentTime}:00`;

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          clinic: form.clinic,
          service: form.service,
          booking_time,
          amount: 2000,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      const data: { bookingId: string } = await res.json();
      router.push(`/payment?bookingId=${data.bookingId}`);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    update,
    submit,
    errors,
    isSubmitting,
    status,
  };
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface BookingFormState {
  name: string;
  phone: string;
  clinic?: string;
  service?: string;
  gender?: string;
  age?: string;
  symptoms?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  email?: string;
  dob?: string;
  consent?: boolean;
}

export function useBookingForm() {
  const router = useRouter();

  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    gender: "",
    age: "",
    symptoms: "",
    clinic: "",
    service: "",
    appointmentDate: "",
    appointmentTime: "",
    email: "",
    dob: "",
    consent: false,
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

    if (!form.gender) e.gender = "Chọn giới tính";

    if (!form.age || Number(form.age) <= 0) {
      e.age = "Vui lòng nhập tuổi hợp lệ";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Email không hợp lệ";
    }

    if (!form.clinic) e.clinic = "Chọn phòng khám";
    if (!form.service) e.service = "Chọn dịch vụ";
    if (!form.appointmentDate) e.appointmentDate = "Chọn ngày";
    if (!form.appointmentTime) e.appointmentTime = "Chọn giờ";
    if (!form.consent) e.consent = true; // Error marker, message can be handled in UI or here. TypeScript boolean or string?
    // The errors state is Partial<BookingFormState>, so e.consent must be boolean if the interface says so.
    // Wait, usually errors object stores string messages. 
    // Let's modify BookingFormState for errors? No, errors is Partial<BookingFormState> implies same types.
    // If I want a string message for consent error, I should probably define consent error as string in a separate Error interface or just use boolean and show generic message.
    // However, existing errors use string. e.g. e.name = "..."
    // If I add consent?: boolean to BookingFormState, then e.consent must be boolean.
    // This is a limitation of the current design if I want "Vui lòng..." string.
    // Let's assume I can change the interface or I just use a string for the error type?
    // Actually, `setErrors` uses `Partial<BookingFormState>`.
    // If I change `consent` in `BookingFormState` to be `boolean`, then `errors.consent` is boolean.
    // If I want a message, I might need to cast or change how errors are typed.
    // BUT, easiest way: Add `consent` as boolean to State, but for validation...
    // Let's look at `errors` usage. `errors.name` is used as text.
    // If `errors.consent` is strictly boolean `true`, I can conditional render the text in UI.
    // "Vui lòng đồng ý..."

    // So:
    if (!form.consent) e.consent = true;

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function validateBookingAvailability(): Promise<boolean> {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone,
          appointmentDate: form.appointmentDate,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 400 && errorData.error) {
          setErrors((prev) => ({ ...prev, phone: errorData.error }));
          setTimeout(() => {
            setErrors((prev) => ({ ...prev, phone: undefined }));
          }, 5000);
          return false;
        }
        throw new Error(errorData.error || "Validation failed");
      }
      return true;
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Có lỗi xảy ra khi kiểm tra");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submit() {
    // We can skip validateForm() here if we assume it was called before, 
    // but keeping it is safer.
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
          gender: form.gender,
          age: Number(form.age),
          symptoms: form.symptoms,
          clinic: form.clinic,
          service: form.service,
          booking_time,
          amount: 2000,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        // Check if it's our specific duplicate booking error
        if (res.status === 400 && errorData.error?.includes("Số điện thoại")) {
          setErrors((prev) => ({ ...prev, phone: errorData.error }));
          // Start timer to clear error after 5 seconds
          setTimeout(() => {
            setErrors((prev) => ({ ...prev, phone: undefined }));
          }, 5000);
          return; // Stop execution, don't throw
        }
        throw new Error(errorData.error || "Booking failed");
      }

      const data: { bookingId: string } = await res.json();
      router.push(`/payment?bookingId=${data.bookingId}`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Có lỗi xảy ra");
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
    validateForm,
    validateBookingAvailability,
  };
}

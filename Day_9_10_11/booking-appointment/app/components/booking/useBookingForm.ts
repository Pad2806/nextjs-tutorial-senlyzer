"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export interface BookingFormState {
  name: string;
  phone: string;
  email: string;
  service?: string;
  clinic?: string;
}

export function useBookingForm() {
  const router = useRouter();
  const { status } = useSession();

  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    email: "",
    service: "",
    clinic: "",
  });

  const [errors, setErrors] = useState<Partial<BookingFormState>>({});
  const [authError, setAuthError] = useState<string | null>(null);

  function update<K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setAuthError(null);
  }

  async function submit() {
  if (status !== "authenticated") {
    router.push("/login?next=/#booking");
    return;
  }

  const newErrors: Partial<BookingFormState> = {};

  if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
  if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
  if (!form.email.trim()) newErrors.email = "Vui lòng nhập email";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service_id: form.service,
        clinic_id: form.clinic,
        amount: 150000,
      }),
    });

    if (!res.ok) {
      alert("Không thể tạo booking");
      return;
    }

    const data = await res.json();

    router.push(`/payment?bookingId=${data.bookingId}`);
  } catch (err) {
    console.error(err);
    alert("Có lỗi xảy ra");
  }
}


  return { update, submit, errors, authError };
}

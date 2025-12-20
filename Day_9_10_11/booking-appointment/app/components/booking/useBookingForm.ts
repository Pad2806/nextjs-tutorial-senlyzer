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

  function submit() {
    if (status !== "authenticated") {
      router.push("/login?next=/#booking");
      return;
    }

    const newErrors: Partial<BookingFormState> = {};

    if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";

    if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^\d{9,11}$/.test(form.phone)) newErrors.phone = "Số điện thoại không hợp lệ";

    if (!form.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Email không hợp lệ";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const params = new URLSearchParams({
      ...form,
      amount: "150000",
    });

    router.push(`/payment?${params.toString()}`);
  }

  return { update, submit, errors, authError };
}

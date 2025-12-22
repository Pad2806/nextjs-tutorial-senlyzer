// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useSession } from "next-auth/react";

// export interface BookingFormState {
//   name: string;
//   phone: string;
//   service?: string;
//   clinic?: string;
//   gender?: string;
//   age?: string;
//   appointmentDate?: string;
//   symptoms?: string;
// }

// export function useBookingForm() {
//   const router = useRouter();
//   const { status } = useSession();

//   const [form, setForm] = useState<BookingFormState>({
//     name: "",
//     phone: "",
//     service: "",
//     clinic: "",
//   });

//   const [errors, setErrors] = useState<Partial<BookingFormState>>({});
//   const [authError, setAuthError] = useState<string | null>(null);

//   function update<K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     setErrors((prev) => ({ ...prev, [key]: undefined }));
//     setAuthError(null);
//   }

//   async function submit() {
//     if (!form.service || !form.clinic) {
//     alert("Vui lòng chọn dịch vụ và phòng khám");
//     return;
//   }
//   if (status !== "authenticated") {
//     router.push("/login?next=/#booking");
//     return;
//   }

//   const newErrors: Partial<BookingFormState> = {};

//   if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
//   if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";

//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//     return;
//   }

//   try {
//     const res = await fetch("/api/bookings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: form.name,
//         phone: form.phone,
//         service_id: form.service,
//         clinic_id: form.clinic,
//         amount: 2000,
//       }),
//     });

//     console.log(res);
//     if (!res.ok) {
//       alert("Không thể tạo booking");
//       return;
//     }
//     const data = await res.json();

//     router.push(`/payment?bookingId=${data.bookingId}`);
//   } catch (err) {
//     console.error(err);
//     alert("Có lỗi xảy ra");
//   }
// }


//   return { update, submit, errors, authError };
// }


"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export interface BookingFormState {
  name: string;
  phone: string;
  service?: string;
  clinic?: string;
  gender?: string;
  age?: string;
  appointmentDate?: string;
  symptoms?: string;
}

export function useBookingForm() {
  const router = useRouter();
  const { status } = useSession();

  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    service: "",
    clinic: "",
    gender: "",
    age: "",
    appointmentDate: "",
    symptoms: "",
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
    const newErrors: Partial<BookingFormState> = {};

    if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!form.gender) newErrors.gender = "Vui lòng chọn giới tính";
    if (!form.age) newErrors.age = "Vui lòng nhập tuổi";
    if (!form.service) newErrors.service = "Vui lòng chọn dịch vụ";
    if (!form.clinic) newErrors.clinic = "Vui lòng chọn phòng khám";
    if (!form.appointmentDate)
      newErrors.appointmentDate = "Vui lòng chọn ngày giờ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function submit() {
    if (status !== "authenticated") {
      router.push("/login?next=/bookings");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: 150000,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      const data = await res.json();
      router.push(`/payment?bookingId=${data.bookingId}`);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
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

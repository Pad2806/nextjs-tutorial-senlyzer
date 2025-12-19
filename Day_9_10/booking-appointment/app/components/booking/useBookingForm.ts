'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface BookingFormState {
  name: string;
  phone: string;
  email: string;
  service?: string;
  clinic?: string;
}

export function useBookingForm() {
  const router = useRouter();

  const [form, setForm] = useState<BookingFormState>({
    name: '',
    phone: '',
    email: '',
    service: '',
    clinic: '',
  });

  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof BookingFormState>(
    key: K,
    value: BookingFormState[K]
  ) {
    setForm(prev => ({ ...prev, [key]: value }));
    setError(null);
  }

  function validate() {
    if (!form.name.trim()) return 'Vui lòng nhập họ tên';
    if (!form.phone.trim()) return 'Vui lòng nhập số điện thoại';
    if (!/^[0-9]{9,11}$/.test(form.phone))
      return 'Số điện thoại không hợp lệ';
    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    )
      return 'Email không hợp lệ';
    return null;
  }

  function submit() {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    const params = new URLSearchParams({
      ...form,
      amount: '150000',
    });

    router.push(`/payment?${params.toString()}`);
  }

  return { form, update, submit, error };
}

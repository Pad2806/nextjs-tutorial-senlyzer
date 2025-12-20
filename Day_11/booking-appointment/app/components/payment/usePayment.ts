'use client';

import { useSearchParams } from 'next/navigation';

export function usePayment() {
  const params = useSearchParams();

  const name = params.get('name')?.trim() || '—';
  const phone = params.get('phone')?.trim() || 'UNKNOWN';
  const email = params.get('email')?.trim() || 'UNKNOWN';
  const service = params.get('service') || '—';

  const amount = Number(params.get('amount'));
  const safeAmount = Number.isFinite(amount) ? amount : 150000;

  return { name, phone, email, service, amount: safeAmount };
}

'use client';
import { useSearchParams } from 'next/navigation';

export function usePayment() {
  const params = useSearchParams();

  const bookingId = params.get('bookingId');
  const name = params.get('name') || '—';
  const service = params.get('service') || '—';

  const amount = Number(params.get('amount')) || 150000;

  return { bookingId, name, service, amount };
}

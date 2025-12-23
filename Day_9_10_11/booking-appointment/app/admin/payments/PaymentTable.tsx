import { AdminPayment } from "@/app/lib/supabase/types/admin";

export function PaymentTable({ data }: { data: AdminPayment[] }) {
  return (
    <table width="100%" cellPadding={8} border={1}>
      <thead>
        <tr>
          <th>Patient</th>
          <th>Booking Time</th>
          <th>Amount</th>
          <th>Method</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={6}>No payments found</td>
          </tr>
        )}

        {data.map((p) => (
          <tr key={p.payment_id}>
            <td>{p.patient_name}</td>
            <td>{new Date(p.booking_time).toLocaleString()}</td>
            <td>{p.amount.toLocaleString()}</td>
            <td>{p.method}</td>
            <td>{p.payment_status}</td>
            <td>
              {p.payment_status === "pending" && <button>Confirm</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

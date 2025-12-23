import { AdminBooking } from "@/app/lib/supabase/types/admin";

export function BookingTable({ data }: { data: AdminBooking[] }) {
  return (
    <table width="100%" cellPadding={8} border={1}>
      <thead>
        <tr>
          <th>Patient</th>
          <th>Phone</th>
          <th>Time</th>
          <th>Service</th>
          <th>Doctor</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={8}>No bookings found</td>
          </tr>
        )}

        {data.map((b) => (
          <tr key={b.booking_id}>
            <td>{b.patient_name}</td>
            <td>{b.patient_phone}</td>
            <td>{new Date(b.booking_time).toLocaleString()}</td>
            <td>{b.service_name}</td>
            <td>{b.doctor_name ?? "-"}</td>
            <td>{b.booking_status}</td>
            <td>{b.payment_status ?? "unpaid"}</td>
            <td>
              <button>View</button> <button>History</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

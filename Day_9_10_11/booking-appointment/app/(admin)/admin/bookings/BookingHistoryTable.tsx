"use client";

export function BookingHistoryTable({
  history,
  currentId,
}: {
  history: any[];
  currentId: string;
}) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="font-semibold text-lg mb-4">Booking History</h2>

      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="py-2 text-left">Time</th>
            <th className="py-2 text-left">Clinic</th>
            <th className="py-2 text-left">Service</th>
            <th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Payment</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {history.map((h) => (
            <tr
              key={h.booking_id}
              className={h.booking_id === currentId ? "bg-blue-50" : ""}
            >
              <td className="py-3">
                {new Date(h.booking_time).toLocaleString()}
              </td>
              <td className="py-3">{h.clinic_name}</td>
              <td className="py-3">{h.service_name}</td>
              <td className="py-3">{h.booking_status}</td>
              <td className="py-3">{h.payment_status ?? "unpaid"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

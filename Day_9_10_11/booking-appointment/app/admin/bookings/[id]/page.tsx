"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdminBookingDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/bookings/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Not found</p>;

  const { booking, history } = data;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold">Booking Detail</h1>

      {/* CURRENT BOOKING */}
      <div className="bg-white border rounded-lg p-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Patient</p>
          <p className="font-medium">{booking.patient_name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{booking.patient_phone}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Clinic</p>
          <p className="font-medium">{booking.clinic_name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Service</p>
          <p className="font-medium">{booking.service_name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Doctor</p>
          <p className="font-medium">{booking.doctor_name ?? "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Time</p>
          <p className="font-medium">
            {new Date(booking.booking_time).toLocaleString()}
          </p>
        </div>
      </div>

      {/* HISTORY */}
      <div className="bg-white border rounded-lg p-5">
        <h2 className="font-semibold mb-3">Booking History (same phone)</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Clinic</th>
                <th className="px-4 py-2 text-left">Service</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Payment</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {history.map((b: any) => (
                <tr
                  key={b.booking_id}
                  className={
                    b.booking_id === booking.booking_id ? "bg-blue-50" : ""
                  }
                >
                  <td className="px-4 py-2">
                    {new Date(b.booking_time).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{b.clinic_name}</td>
                  <td className="px-4 py-2">{b.service_name}</td>
                  <td className="px-4 py-2">{b.booking_status}</td>
                  <td className="px-4 py-2">{b.payment_status ?? "unpaid"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

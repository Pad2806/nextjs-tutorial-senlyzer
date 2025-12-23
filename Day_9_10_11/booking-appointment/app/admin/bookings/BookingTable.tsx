// "use client";

// import { AdminBooking } from "@/app/lib/supabase/types/admin";
// import { useRouter } from "next/navigation";

// export function BookingTable({ data }: { data: AdminBooking[] }) {
//   const router = useRouter();

//   return (
//     <div className="overflow-x-auto rounded-lg border">
//       <table className="min-w-full text-sm">
//         <thead className="bg-gray-50 text-gray-600">
//           <tr>
//             <th className="px-4 py-3 text-left">Patient</th>
//             <th className="px-4 py-3 text-left">Phone</th>
//             <th className="px-4 py-3 text-left">Time</th>
//             <th className="px-4 py-3 text-left">Service</th>
//             <th className="px-4 py-3 text-left">Doctor</th>
//             <th className="px-4 py-3 text-left">Status</th>
//             <th className="px-4 py-3 text-left">Payment</th>
//             <th className="px-4 py-3 text-center">Action</th>
//           </tr>
//         </thead>

//         <tbody className="divide-y">
//           {data.length === 0 && (
//             <tr>
//               <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
//                 No bookings found
//               </td>
//             </tr>
//           )}

//           {data.map((b) => (
//             <tr key={b.booking_id} className="hover:bg-gray-50 transition">
//               <td className="px-4 py-2 font-medium">{b.patient_name}</td>
//               <td className="px-4 py-2">{b.patient_phone}</td>
//               <td className="px-4 py-2">
//                 {new Date(b.booking_time).toLocaleString()}
//               </td>
//               <td className="px-4 py-2">{b.service_name}</td>
//               <td className="px-4 py-2">{b.doctor_name ?? "-"}</td>

//               <td className="px-4 py-2">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-semibold
//                     ${
//                       b.booking_status === "paid"
//                         ? "bg-green-100 text-green-700"
//                         : b.booking_status === "pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                 >
//                   {b.booking_status}
//                 </span>
//               </td>

//               <td className="px-4 py-2">{b.payment_status ?? "unpaid"}</td>

//               <td className="px-4 py-2 text-center">
//                 <button
//                   onClick={() => router.push(`/admin/bookings/${b.booking_id}`)}
//                   className="text-blue-600 hover:underline text-sm"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { CreditCard, ChevronRight, Search } from "lucide-react";

type Booking = any;

export function BookingTable({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();

  const badge = (s: string) =>
    s === "paid"
      ? "bg-emerald-100 text-emerald-700"
      : s === "pending"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Patient</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">Time</th>
            <th className="px-6 py-3 text-left">Service</th>
            <th className="px-6 py-3 text-left">Doctor</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Payment</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {bookings.length === 0 && (
            <tr>
              <td colSpan={8} className="py-12 text-center text-slate-500">
                <Search className="mx-auto mb-2" />
                No bookings found
              </td>
            </tr>
          )}

          {bookings.map((b) => (
            <tr key={b.booking_id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium">
                {b.patient_name}
                <div className="text-xs text-slate-500">{b.clinic_name}</div>
              </td>
              <td className="px-6 py-4">{b.patient_phone}</td>
              <td className="px-6 py-4">
                {new Date(b.booking_time).toLocaleString()}
              </td>
              <td className="px-6 py-4">{b.service_name}</td>
              <td className="px-6 py-4">{b.doctor_name ?? "-"}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${badge(
                    b.booking_status
                  )}`}
                >
                  {b.booking_status}
                </span>
              </td>
              <td className="px-6 py-4">
                <CreditCard className="inline w-4 h-4 mr-1" />
                {b.payment_status ?? "unpaid"}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => router.push(`/admin/bookings/${b.booking_id}`)}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  View <ChevronRight className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

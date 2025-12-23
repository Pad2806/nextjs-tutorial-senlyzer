// "use client";

// import { CreditCard } from "lucide-react";

// export function PaymentTable({ payments }: { payments: any[] }) {
//   const badge = (s: string) =>
//     s === "paid"
//       ? "bg-emerald-100 text-emerald-700"
//       : s === "pending"
//       ? "bg-amber-100 text-amber-700"
//       : "bg-rose-100 text-rose-700";

//   return (
//     <div className="bg-white border rounded-2xl shadow-sm overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-slate-50 text-xs border-b">
//           <tr>
//             <th className="px-6 py-3 text-left">Patient</th>
//             <th className="px-6 py-3 text-left">Clinic</th>
//             <th className="px-6 py-3 text-left">Service</th>
//             <th className="px-6 py-3 text-left">Amount</th>
//             <th className="px-6 py-3 text-left">Method</th>
//             <th className="px-6 py-3 text-left">Status</th>
//             <th className="px-6 py-3 text-left">Paid at</th>
//           </tr>
//         </thead>

//         <tbody className="divide-y">
//           {payments.map((p) => (
//             <tr key={p.payment_id} className="hover:bg-slate-50">
//               <td className="px-6 py-4 font-medium">
//                 {p.patient_name}
//                 <div className="text-xs text-slate-500">
//                   {p.patient_email ?? "—"}
//                 </div>
//               </td>
//               <td className="px-6 py-4">{p.clinic_name}</td>
//               <td className="px-6 py-4">{p.service_name}</td>
//               <td className="px-6 py-4 font-semibold">
//                 {p.amount?.toLocaleString()} ₫
//               </td>
//               <td className="px-6 py-4">
//                 <CreditCard className="inline w-4 h-4 mr-1" />
//                 {p.payment_method}
//               </td>
//               <td className="px-6 py-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs ${badge(
//                     p.payment_status
//                   )}`}
//                 >
//                   {p.payment_status}
//                 </span>
//               </td>
//               <td className="px-6 py-4 text-sm text-slate-600">
//                 {p.payment_date
//                   ? new Date(p.payment_date).toLocaleString()
//                   : "—"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { CreditCard } from "lucide-react";

type Payment = any;

export function PaymentTable({ payments }: { payments: Payment[] }) {
  const badge = (s: string) =>
    s === "paid"
      ? "bg-emerald-100 text-emerald-700"
      : s === "pending"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";

  return (
    <div className="bg-white border border-blue-200 rounded-2xl shadow-sm overflow-x-auto">
      <table className="w-full">
        <thead className="bg-blue-50 border-b text-xs text-blue-700">
          <tr>
            <th className="px-6 py-3 text-left">Patient</th>
            <th className="px-6 py-3 text-left">Clinic</th>
            <th className="px-6 py-3 text-left">Service</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Method</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {payments.length === 0 && (
            <tr>
              <td colSpan={6} className="py-12 text-center text-blue-600">
                No payments found
              </td>
            </tr>
          )}

          {payments.map((p) => (
            <tr key={p.payment_id} className="hover:bg-blue-50">
              <td className="px-6 py-4 font-medium">
                {p.patient_name}
                <div className="text-xs text-slate-500">
                  {p.patient_email ?? "—"}
                </div>
              </td>
              <td className="px-6 py-4">{p.clinic_name}</td>
              <td className="px-6 py-4">{p.service_name}</td>
              <td className="px-6 py-4 font-semibold">
                {p.payment_amount?.toLocaleString()} đ
              </td>
              <td className="px-6 py-4">
                <CreditCard className="inline w-4 h-4 mr-1" />
                {p.payment_method ?? "-"}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${badge(
                    p.payment_status
                  )}`}
                >
                  {p.payment_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

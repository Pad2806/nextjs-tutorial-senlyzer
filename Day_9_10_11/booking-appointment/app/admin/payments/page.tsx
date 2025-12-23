// "use client";

// import { useEffect, useState } from "react";
// import { AdminPayment } from "@/app/lib/supabase/types/admin";

// export default function AdminPaymentsPage() {
//   const [data, setData] = useState<AdminPayment[]>([]);
//   const [clinicId, setClinicId] = useState("");

//   useEffect(() => {
//     if (!clinicId) return;

//     fetch(`/api/admin/payments?clinicId=${clinicId}`)
//       .then((res) => res.json())
//       .then(setData);
//   }, [clinicId]);

//   return (
//     <div>
//       <h1>Payment Management</h1>

//       <input
//         placeholder="Clinic ID"
//         value={clinicId}
//         onChange={(e) => setClinicId(e.target.value)}
//       />

//       <table>
//         <thead>
//           <tr>
//             <th>Patient</th>
//             <th>Booking Time</th>
//             <th>Amount</th>
//             <th>Method</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((p) => (
//             <tr key={p.payment_id}>
//               <td>{p.patient_name}</td>
//               <td>{new Date(p.booking_time).toLocaleString()}</td>
//               <td>{p.amount}</td>
//               <td>{p.method}</td>
//               <td>{p.payment_status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import { AdminPayment } from "@/app/lib/supabase/types/admin";
import { PaymentTable } from "./PaymentTable";

export default function AdminPaymentsPage() {
  const { user, isLoading } = useRequireAuth({
    roles: ["admin", "clinic_admin"],
  });

  const [data, setData] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || isLoading) return;
    if (!user.clinic_id) return;

    setLoading(true);

    fetch(`/api/admin/payments?clinicId=${user.clinic_id}`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [user, isLoading]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Payment Management</h1>

      {loading ? <p>Loading data...</p> : <PaymentTable data={data} />}
    </div>
  );
}

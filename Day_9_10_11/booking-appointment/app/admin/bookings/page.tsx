// "use client";

// import { useEffect, useState } from "react";
// import { AdminBooking } from "@/app/lib/supabase/types/admin";

// export default function AdminBookingsPage() {
//   const [data, setData] = useState<AdminBooking[]>([]);
//   const [clinicId, setClinicId] = useState("");
//   const [phone, setPhone] = useState("");

//   useEffect(() => {
//     if (!clinicId) return;

//     fetch(`/api/admin/bookings?clinicId=${clinicId}&phone=${phone}`)
//       .then((res) => res.json())
//       .then(setData);
//   }, [clinicId, phone]);

//   return (
//     <div>
//       <h1>Booking Management</h1>

//       <input
//         placeholder="Clinic ID"
//         value={clinicId}
//         onChange={(e) => setClinicId(e.target.value)}
//       />

//       <input
//         placeholder="Patient phone"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />

//       <table>
//         <thead>
//           <tr>
//             <th>Patient</th>
//             <th>Phone</th>
//             <th>Time</th>
//             <th>Service</th>
//             <th>Doctor</th>
//             <th>Status</th>
//             <th>Payment</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((b) => (
//             <tr key={b.booking_id}>
//               <td>{b.patient_name}</td>
//               <td>{b.patient_phone}</td>
//               <td>{new Date(b.booking_time).toLocaleString()}</td>
//               <td>{b.service_name}</td>
//               <td>{b.doctor_name}</td>
//               <td>{b.booking_status}</td>
//               <td>{b.payment_status ?? "unpaid"}</td>
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
import { AdminBooking } from "@/app/lib/supabase/types/admin";
import { BookingFilters } from "./BookingFilters";
import { BookingTable } from "./BookingTable";

export default function AdminBookingsPage() {
  const { user, isLoading } = useRequireAuth({
    roles: ["admin", "clinic_admin"],
  });

  const [data, setData] = useState<AdminBooking[]>([]);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || isLoading) return;

    const clinicId = user.clinic_id;
    if (!clinicId) return;

    setLoading(true);

    fetch(
      `/api/admin/bookings?clinicId=${clinicId}&phone=${phone}&status=${status}`
    )
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [user, phone, status, isLoading]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Booking Management</h1>

      <BookingFilters
        phone={phone}
        status={status}
        onPhoneChange={setPhone}
        onStatusChange={setStatus}
      />

      {loading ? <p>Loading data...</p> : <BookingTable data={data} />}
    </div>
  );
}

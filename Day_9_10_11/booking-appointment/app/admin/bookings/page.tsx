// "use client";

// import { useEffect, useState } from "react";
// import { useRequireAuth } from "@/app/hooks/useRequireAuth";
// import { AdminBooking } from "@/app/lib/supabase/types/admin";
// import { BookingFilters } from "./BookingFilters";
// import { BookingTable } from "./BookingTable";

// export default function AdminBookingsPage() {
//   const { user, isLoading } = useRequireAuth({
//     roles: ["admin"],
//   });

//   const [data, setData] = useState<AdminBooking[]>([]);
//   const [phone, setPhone] = useState("");
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!user || isLoading) return;

//     setLoading(true);

//     fetch(`/api/admin/bookings?phone=${phone}&status=${status}`, {
//       cache: "no-store",
//     })
//       .then((res) => res.json())
//       .then(setData)
//       .finally(() => setLoading(false));
//   }, [user, phone, status, isLoading]);

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Booking Management</h1>

//       <BookingFilters
//         phone={phone}
//         status={status}
//         onPhoneChange={setPhone}
//         onStatusChange={setStatus}
//       />

//       {loading ? <p>Loading data...</p> : <BookingTable data={data} />}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import { AdminBooking } from "@/app/lib/supabase/types/admin";
import { BookingFilters } from "./BookingFilters";
import { BookingTable } from "./BookingTable";

type Clinic = {
  id: string;
  name: string;
};

export default function AdminBookingsPage() {
  const { user, isLoading } = useRequireAuth({ roles: ["admin"] });

  const [data, setData] = useState<AdminBooking[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [clinicId, setClinicId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  // Load clinics
  useEffect(() => {
    fetch("/api/admin/clinics", { cache: "no-store" })
      .then((r) => r.json())
      .then(setClinics);
  }, []);

  // Load bookings
  useEffect(() => {
    if (!user || isLoading) return;

    setLoading(true);

    const params = new URLSearchParams({
      phone,
      status,
      clinicId,
    });

    fetch(`/api/admin/bookings?${params.toString()}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [user, phone, status, clinicId, isLoading]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Booking Management</h1>

      {/* FILTER BAR */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <select value={clinicId} onChange={(e) => setClinicId(e.target.value)}>
          <option value="">All clinics</option>
          {clinics.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <BookingFilters
          phone={phone}
          status={status}
          onPhoneChange={setPhone}
          onStatusChange={setStatus}
        />
      </div>

      {loading ? <p>Loading data...</p> : <BookingTable data={data} />}
    </div>
  );
}

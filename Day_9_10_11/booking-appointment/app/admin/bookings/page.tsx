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

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useRequireAuth } from "@/app/hooks/useRequireAuth";
// import {
//   Search,
//   Filter,
//   Calendar,
//   Phone,
//   CreditCard,
//   ChevronRight,
//   Building2,
// } from "lucide-react";

// /* ================= TYPES ================= */
// type Clinic = {
//   id: string;
//   name: string;
// };

// type Booking = {
//   booking_id: string;
//   patient_name: string;
//   patient_phone: string;
//   booking_time: string;
//   service_name: string;
//   doctor_name: string | null;
//   clinic_name: string;
//   booking_status: "pending" | "paid" | "expired";
//   payment_status: string | null;
// };

// /* ================= FILTER COMPONENT ================= */
// function BookingFilters({
//   phone,
//   status,
//   clinicId,
//   clinics,
//   onPhoneChange,
//   onStatusChange,
//   onClinicChange,
// }: {
//   phone: string;
//   status: string;
//   clinicId: string;
//   clinics: Clinic[];
//   onPhoneChange: (v: string) => void;
//   onStatusChange: (v: string) => void;
//   onClinicChange: (v: string) => void;
// }) {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
//       <div className="flex items-center gap-2 mb-4">
//         <Filter className="w-5 h-5 text-slate-600" />
//         <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Clinic */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Clinic</label>
//           <div className="relative">
//             <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <select
//               value={clinicId}
//               onChange={(e) => onClinicChange(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-lg text-sm"
//             >
//               <option value="">All Clinics</option>
//               {clinics.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Patient Phone
//           </label>
//           <div className="relative">
//             <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               value={phone}
//               onChange={(e) => onPhoneChange(e.target.value)}
//               placeholder="Search by phone..."
//               className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-lg text-sm"
//             />
//           </div>
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Status</label>
//           <select
//             value={status}
//             onChange={(e) => onStatusChange(e.target.value)}
//             className="w-full px-4 py-2.5 bg-slate-50 border rounded-lg text-sm"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="paid">Paid</option>
//             <option value="expired">Expired</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= TABLE COMPONENT ================= */
// function BookingTable({
//   bookings,
//   onView,
// }: {
//   bookings: Booking[];
//   onView: (id: string) => void;
// }) {
//   const badge = (s: string) =>
//     s === "paid"
//       ? "bg-emerald-100 text-emerald-700"
//       : s === "pending"
//       ? "bg-amber-100 text-amber-700"
//       : "bg-rose-100 text-rose-700";

//   return (
//     <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-slate-50 border-b">
//           <tr>
//             <th className="px-6 py-4 text-left text-xs font-semibold">
//               Patient
//             </th>
//             <th className="px-6 py-4 text-left text-xs font-semibold">
//               Contact
//             </th>
//             <th className="px-6 py-4 text-left text-xs font-semibold">Time</th>
//             <th className="px-6 py-4 text-left text-xs font-semibold">
//               Service
//             </th>
//             <th className="px-6 py-4 text-left text-xs font-semibold">
//               Doctor
//             </th>
//             <th className="px-6 py-4 text-left text-xs font-semibold">
//               Status
//             </th>
//             <th className="px-6 py-4 text-left text-xs font-semibold">
//               Payment
//             </th>
//             <th className="px-6 py-4 text-center text-xs font-semibold">
//               Action
//             </th>
//           </tr>
//         </thead>

//         <tbody className="divide-y">
//           {bookings.length === 0 && (
//             <tr>
//               <td colSpan={8} className="py-12 text-center text-slate-500">
//                 <Search className="mx-auto mb-2" /> No bookings found
//               </td>
//             </tr>
//           )}

//           {bookings.map((b) => (
//             <tr key={b.booking_id} className="hover:bg-slate-50">
//               <td className="px-6 py-4 font-medium">
//                 {b.patient_name}
//                 <div className="text-xs text-slate-500">{b.clinic_name}</div>
//               </td>
//               <td className="px-6 py-4">{b.patient_phone}</td>
//               <td className="px-6 py-4">
//                 {new Date(b.booking_time).toLocaleString()}
//               </td>
//               <td className="px-6 py-4">{b.service_name}</td>
//               <td className="px-6 py-4">{b.doctor_name ?? "-"}</td>
//               <td className="px-6 py-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(
//                     b.booking_status
//                   )}`}
//                 >
//                   {b.booking_status}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 <CreditCard className="inline w-4 h-4 mr-1" />
//                 {b.payment_status ?? "unpaid"}
//               </td>
//               <td className="px-6 py-4 text-center">
//                 <button
//                   onClick={() => onView(b.booking_id)}
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm inline-flex items-center gap-1"
//                 >
//                   View <ChevronRight className="w-4 h-4" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// /* ================= MAIN PAGE ================= */
// export default function AdminBookingsPage() {
//   const router = useRouter();
//   useRequireAuth({ roles: ["admin"] });

//   const [phone, setPhone] = useState("");
//   const [status, setStatus] = useState("all");
//   const [clinicId, setClinicId] = useState("");
//   const [clinics, setClinics] = useState<Clinic[]>([]);
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("/api/admin/clinics", { cache: "no-store" })
//       .then((r) => r.json())
//       .then(setClinics);
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     const params = new URLSearchParams({ phone, status, clinicId });

//     fetch(`/api/admin/bookings?${params}`, { cache: "no-store" })
//       .then((r) => r.json())
//       .then(setBookings)
//       .finally(() => setLoading(false));
//   }, [phone, status, clinicId]);

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <h1 className="text-3xl font-bold">Booking Management</h1>

//         <BookingFilters
//           phone={phone}
//           status={status}
//           clinicId={clinicId}
//           clinics={clinics}
//           onPhoneChange={setPhone}
//           onStatusChange={setStatus}
//           onClinicChange={setClinicId}
//         />

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <BookingTable
//             bookings={bookings}
//             onView={(id) => router.push(`/admin/bookings/${id}`)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import { BookingFilters } from "./BookingFilters";
import { BookingTable } from "./BookingTable";
import { Pagination } from "@/app/components/Pagination";

export default function AdminBookingsPage() {
  const { user, isLoading } = useRequireAuth({ roles: ["admin"] });

  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("all");
  const [clinicId, setClinicId] = useState("");

  const [clinics, setClinics] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 20;

  /* ======================
     LOAD CLINICS
  ====================== */
  useEffect(() => {
    fetch("/api/admin/clinics", { cache: "no-store" })
      .then((r) => r.json())
      .then(setClinics);
  }, []);

  /* ======================
     RESET PAGE WHEN FILTER CHANGES
  ====================== */
  useEffect(() => {
    setPage(1);
  }, [phone, status, clinicId]);

  /* ======================
     LOAD BOOKINGS (PAGINATION)
  ====================== */
  useEffect(() => {
    if (!user || isLoading) return;

    setLoading(true);

    const params = new URLSearchParams({
      phone,
      status,
      clinicId,
      page: String(page),
      limit: String(limit),
    });

    fetch(`/api/admin/bookings?${params.toString()}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((res) => {
        setBookings(res.data ?? []);
        setTotal(res.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [user, phone, status, clinicId, page, isLoading]);

  if (isLoading) {
    return <div className="p-6">Checking permission...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Booking Management
        </h1>
        <p className="text-slate-600 mt-1">
          Manage all patient bookings across clinics
        </p>
      </div>

      {/* FILTERS */}
      <BookingFilters
        phone={phone}
        status={status}
        clinicId={clinicId}
        clinics={clinics}
        onPhoneChange={setPhone}
        onStatusChange={setStatus}
        onClinicChange={setClinicId}
      />

      {/* TABLE */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center text-slate-500">
          Loading bookings...
        </div>
      ) : (
        <>
          <BookingTable bookings={bookings} />

          <Pagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

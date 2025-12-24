// "use client";

// import { useEffect, useState } from "react";
// import { useRequireAuth } from "@/app/hooks/useRequireAuth";
// import { PaymentFilters } from "./PaymentFilters";
// import { PaymentTable } from "./PaymentTable";
// import { Pagination } from "@/app/components/Pagination";

// export default function AdminPaymentsPage() {
//   useRequireAuth({ roles: ["admin"] });

//   const [clinics, setClinics] = useState<any[]>([]);
//   const [payments, setPayments] = useState<any[]>([]);

//   const [clinicId, setClinicId] = useState("");
//   const [phone, setPhone] = useState("");
//   const [status, setStatus] = useState("all");

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(20);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     fetch("/api/admin/clinics")
//       .then((r) => r.json())
//       .then(setClinics);
//   }, []);

//   useEffect(() => {
//     setPage(1);
//   }, [clinicId, phone, status, limit]);

//   useEffect(() => {
//     const params = new URLSearchParams({
//       clinicId,
//       phone,
//       status,
//       page: String(page),
//       limit: String(limit),
//     });

//     fetch(`/api/admin/payments?${params}`, { cache: "no-store" })
//       .then((r) => r.json())
//       .then((res) => {
//         setPayments(res.data ?? []);
//         setTotal(res.total ?? 0);
//       });
//   }, [clinicId, phone, status, page, limit]);

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 space-y-6">
//       <h1 className="text-3xl font-bold">Payment Management</h1>

//       <PaymentFilters
//         clinicId={clinicId}
//         clinics={clinics}
//         phone={phone}
//         status={status}
//         onClinicChange={setClinicId}
//         onPhoneChange={setPhone}
//         onStatusChange={setStatus}
//       />

//       <PaymentTable payments={payments} />

//       <div className="flex justify-between items-center bg-white border rounded-2xl p-4">
//         <select
//           value={limit}
//           onChange={(e) => setLimit(Number(e.target.value))}
//           className="border rounded-xl px-3 py-2"
//         >
//           {[10, 20, 50, 100].map((n) => (
//             <option key={n} value={n}>
//               {n} rows
//             </option>
//           ))}
//         </select>

//         <Pagination
//           page={page}
//           limit={limit}
//           total={total}
//           onPageChange={setPage}
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import { PaymentFilters } from "./PaymentFilters";
import { PaymentTable } from "./PaymentTable";
import { Pagination } from "@/app/components/Pagination";

type Clinic = { id: string; name: string };

export default function AdminPaymentsPage() {
  const { user, isLoading } = useRequireAuth({ roles: ["admin"] });

  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("all");
  const [clinicId, setClinicId] = useState("");

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );

  /* LOAD CLINICS */
  useEffect(() => {
    fetch("/api/admin/clinics", { cache: "no-store" })
      .then((r) => r.json())
      .then((res) => setClinics(Array.isArray(res) ? res : []));
  }, []);

  /* RESET PAGE */
  useEffect(() => {
    setPage(1);
  }, [phone, status, clinicId, limit]);

  /* LOAD PAYMENTS */
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

    fetch(`/api/admin/payments?${params.toString()}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((res) => {
        setPayments(res?.data ?? []);
        setTotal(res?.total ?? 0);
      })
      .finally(() => setLoading(false));
  }, [user, isLoading, phone, status, clinicId, page, limit]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">
                Payment Management
              </h1>
              <p className="text-blue-700 mt-1">
                Manage all payments across clinics
              </p>
            </div>
            <div className="text-sm text-blue-700">
              Page {page} / {totalPages}
            </div>
          </div>
        </div>

        <PaymentFilters
          phone={phone}
          status={status}
          clinicId={clinicId}
          clinics={clinics}
          onPhoneChange={setPhone}
          onStatusChange={setStatus}
          onClinicChange={setClinicId}
        />

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-blue-600">
            Loading payments...
          </div>
        ) : (
          <>
            <PaymentTable payments={payments} />

            <div className="bg-white border border-blue-200 rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-blue-700">Rows per page</span>
                  <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="border border-blue-300 rounded-xl px-3 py-2 text-sm"
                  >
                    {[10, 20, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <Pagination
                  page={page}
                  limit={limit}
                  total={total}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

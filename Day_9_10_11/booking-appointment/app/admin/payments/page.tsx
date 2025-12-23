"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import { PaymentFilters } from "./PaymentFilters";
import { PaymentTable } from "./PaymentTable";
import { Pagination } from "@/app/components/Pagination";

export default function AdminPaymentsPage() {
  useRequireAuth({ roles: ["admin"] });

  const [clinics, setClinics] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  const [clinicId, setClinicId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/admin/clinics")
      .then((r) => r.json())
      .then(setClinics);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [clinicId, phone, status, limit]);

  useEffect(() => {
    const params = new URLSearchParams({
      clinicId,
      phone,
      status,
      page: String(page),
      limit: String(limit),
    });

    fetch(`/api/admin/payments?${params}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((res) => {
        setPayments(res.data ?? []);
        setTotal(res.total ?? 0);
      });
  }, [clinicId, phone, status, page, limit]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold">Payment Management</h1>

      <PaymentFilters
        clinicId={clinicId}
        clinics={clinics}
        phone={phone}
        status={status}
        onClinicChange={setClinicId}
        onPhoneChange={setPhone}
        onStatusChange={setStatus}
      />

      <PaymentTable payments={payments} />

      <div className="flex justify-between items-center bg-white border rounded-2xl p-4">
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border rounded-xl px-3 py-2"
        >
          {[10, 20, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n} rows
            </option>
          ))}
        </select>

        <Pagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

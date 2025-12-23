"use client";

import { Building2, Phone } from "lucide-react";

export function PaymentFilters({
  clinicId,
  clinics,
  phone,
  status,
  onClinicChange,
  onPhoneChange,
  onStatusChange,
}: any) {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Clinic */}
      <div>
        <label className="text-sm font-medium">Clinic</label>
        <select
          value={clinicId}
          onChange={(e) => onClinicChange(e.target.value)}
          className="mt-1 w-full border rounded-xl px-3 py-2"
        >
          <option value="">All clinics</option>
          {clinics.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-medium">Patient phone</label>
        <div className="relative mt-1">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="Search phone..."
            className="pl-10 w-full border rounded-xl px-3 py-2"
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium">Payment status</label>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="mt-1 w-full border rounded-xl px-3 py-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>
  );
}

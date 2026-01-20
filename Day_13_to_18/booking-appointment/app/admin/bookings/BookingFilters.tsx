// "use client";

// type Props = {
//   phone: string;
//   status: string;
//   onPhoneChange: (v: string) => void;
//   onStatusChange: (v: string) => void;
// };

// export function BookingFilters({
//   phone,
//   status,
//   onPhoneChange,
//   onStatusChange,
// }: Props) {
//   return (
//     <div className="flex flex-wrap gap-3 items-center">
//       <input
//         className="border rounded-md px-3 py-2 w-56 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Patient phone"
//         value={phone}
//         onChange={(e) => onPhoneChange(e.target.value)}
//       />

//       <select
//         className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={status}
//         onChange={(e) => onStatusChange(e.target.value)}
//       >
//         <option value="all">All status</option>
//         <option value="pending">Pending</option>
//         <option value="paid">Paid</option>
//         <option value="expired">Expired</option>
//       </select>
//     </div>
//   );
// }
"use client";

import { Phone, Building2, Filter } from "lucide-react";

type Clinic = { id: string; name: string };

type Props = {
  phone: string;
  status: string;
  clinicId: string;
  clinics: Clinic[];
  onPhoneChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onClinicChange: (v: string) => void;
};

export function BookingFilters({
  phone,
  status,
  clinicId,
  clinics,
  onPhoneChange,
  onStatusChange,
  onClinicChange,
}: Props) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-2 text-slate-700">
        <Filter className="w-5 h-5" />
        <h2 className="font-semibold text-lg">Filters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Clinic */}
        <div>
          <label className="text-sm font-medium">Clinic</label>
          <div className="relative mt-1">
            <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <select
              value={clinicId}
              onChange={(e) => onClinicChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-slate-50"
            >
              <option value="">All clinics</option>
              {clinics.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Patient phone</label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="Search phone..."
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-slate-50"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg bg-slate-50"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>
    </div>
  );
}

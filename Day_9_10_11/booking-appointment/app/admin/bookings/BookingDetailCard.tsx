"use client";

import { Phone, Building2, Calendar, User, CreditCard } from "lucide-react";
import React from "react";

export function BookingDetailCard({ booking }: { booking: any }) {
  return (
    <div className="bg-white rounded-xl border p-6 grid md:grid-cols-3 gap-4">
      <Info icon={<Phone />} label="Phone" value={booking.patient_phone} />
      <Info icon={<Building2 />} label="Clinic" value={booking.clinic_name} />
      <Info icon={<Calendar />} label="Service" value={booking.service_name} />
      <Info icon={<User />} label="Doctor" value={booking.doctor_name ?? "-"} />
      <Info
        icon={<Calendar />}
        label="Time"
        value={new Date(booking.booking_time).toLocaleString()}
      />
      <Info
        icon={<CreditCard />}
        label="Payment"
        value={booking.payment_status ?? "unpaid"}
      />
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-slate-50 p-4 rounded-lg border">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
        {icon}
        {label}
      </div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

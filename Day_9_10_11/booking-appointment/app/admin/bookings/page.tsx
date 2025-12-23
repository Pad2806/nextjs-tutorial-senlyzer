"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/app/hooks/useRequireAuth";
import { AdminBooking } from "@/app/lib/supabase/types/admin";
import { BookingFilters } from "./BookingFilters";
import { BookingTable } from "./BookingTable";

export default function AdminBookingsPage() {
  const { user, isLoading } = useRequireAuth({
    roles: ["admin"],
  });

  const [data, setData] = useState<AdminBooking[]>([]);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || isLoading) return;

    setLoading(true);

    fetch(`/api/admin/bookings?phone=${phone}&status=${status}`, {
      cache: "no-store",
    })
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

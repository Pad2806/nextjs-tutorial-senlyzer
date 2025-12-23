// export const dynamic = "force-dynamic";

// import { NextRequest, NextResponse } from "next/server";
// import { supabaseAdmin } from "@/app/lib/supabase/admin";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const phone = searchParams.get("phone");
//   const status = searchParams.get("status");

//   let query = supabaseAdmin
//     .from("admin_booking_overview")
//     .select("*")
//     .order("booking_time", { ascending: false });

//   if (phone) query = query.ilike("patient_phone", `%${phone}%`);
//   if (status) query = query.eq("booking_status", status);

//   const { data, error } = await query;

//   if (error) {
//     console.error("ADMIN BOOKINGS ERROR:", error);
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   return NextResponse.json(data ?? []);
// }

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const phone = searchParams.get("phone");
  const status = searchParams.get("status");
  const clinicId = searchParams.get("clinicId");

  let query = supabaseAdmin
    .from("admin_booking_overview")
    .select("*")
    .order("booking_time", { ascending: false });

  if (clinicId) {
    query = query.eq("clinic_id", clinicId);
  }

  if (phone) {
    query = query.ilike("patient_phone", `%${phone}%`);
  }

  // ⚠️ chỉ filter khi status KHÁC "all"
  if (status && status !== "all") {
    query = query.eq("booking_status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("ADMIN BOOKINGS ERROR:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

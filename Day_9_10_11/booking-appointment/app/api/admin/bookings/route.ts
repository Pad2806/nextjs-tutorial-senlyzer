import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const clinicId = searchParams.get("clinicId");
  const status = searchParams.get("status");
  const phone = searchParams.get("phone");

  if (!clinicId) {
    return NextResponse.json(
      { error: "clinicId is required" },
      { status: 400 }
    );
  }

  let query = supabase
    .from("admin_booking_overview")
    .select("*")
    .eq("clinic_id", clinicId)
    .order("booking_time", { ascending: false });

  if (status) query = query.eq("booking_status", status);
  if (phone) query = query.ilike("patient_phone", `%${phone}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

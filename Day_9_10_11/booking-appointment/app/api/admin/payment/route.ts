import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const clinicId = searchParams.get("clinicId");
  const status = searchParams.get("status");

  if (!clinicId) {
    return NextResponse.json(
      { error: "clinicId is required" },
      { status: 400 }
    );
  }

  let query = supabase
    .from("admin_payment_overview")
    .select("*")
    .eq("clinic_id", clinicId)
    .order("payment_date", { ascending: false });

  if (status) query = query.eq("payment_status", status);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

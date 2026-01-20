import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone");

  if (!phone) {
    return NextResponse.json(
      { error: "phone is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("patient_booking_history")
    .select("*")
    .ilike("patient_phone", `%${phone}%`)
    .order("booking_time", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

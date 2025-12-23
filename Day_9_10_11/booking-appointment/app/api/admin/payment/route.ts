
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

export async function GET(req: NextRequest) {
  let query = supabaseAdmin
    .from("admin_payment_overview")
    .select("*")
    .order("payment_date", { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}


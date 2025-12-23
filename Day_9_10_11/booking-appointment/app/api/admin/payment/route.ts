import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
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


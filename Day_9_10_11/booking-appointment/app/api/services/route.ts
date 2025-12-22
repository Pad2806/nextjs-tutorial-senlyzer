// import { NextResponse } from "next/server";
// import { supabase } from "@/app/lib/supabase/client";

// export async function GET() {
//   try {
//     const { data, error } = await supabase
//       .from("services")
//       .select("id, name")
//       .order("name", { ascending: true });

//     if (error) {
//       console.error("Supabase services error:", error);
//       return NextResponse.json(
//         { error: "Failed to fetch services" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("API /services error:", err);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { supabaseAdmin } from "@/app/lib/supabase/admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("services")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data ?? []);
}

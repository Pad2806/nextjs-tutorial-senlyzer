// import { NextRequest, NextResponse } from "next/server";
// import postgres from "postgres";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// export async function GET(
//   _req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;

//   if (!id) {
//     return NextResponse.json(
//       { message: "MISSING_ID" },
//       { status: 400 }
//     );
//   }

//   const [booking] = await sql`
//     SELECT id, status, amount, created_at
//     FROM bookings
//     WHERE id = ${id}
//     LIMIT 1
//   `;

//   if (!booking) {
//     return NextResponse.json({ message: "NOT_FOUND" }, { status: 404 });
//   }

//   const createdAt = new Date(booking.created_at).getTime();
//   const now = Date.now();

//   if (booking.status === "pending" && now - createdAt > 5 * 60 * 1000) {
//     await sql`
//       UPDATE bookings
//       SET status = 'expired'
//       WHERE id = ${id}
//     `;

//     return NextResponse.json({
//       ...booking,
//       status: "expired",
//     });
//   }

//   return NextResponse.json(booking);
// }


// import { supabaseAdmin } from "@/app/lib/supabase/admin";

// function isExpired(createdAt: string, minutes = 5) {
//   return Date.now() - new Date(createdAt).getTime() > minutes * 60 * 1000;
// }

// export async function GET(
//   _req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id: bookingId } = await context.params;

//   if (!bookingId) {
//     return Response.json({ message: "MISSING_ID" }, { status: 400 });
//   }

//   const { data: booking, error } = await supabaseAdmin
//     .from("bookings")
//     .select(`
//       id,
//       status,
//       created_at,
//       payments (
//         amount,
//         status
//       )
//     `)
//     .eq("id", bookingId)
//     .single();

//   if (error || !booking) {
//     return Response.json({ message: "NOT_FOUND" }, { status: 404 });
//   }
//  const payment = booking.payments?.[0];
//  const amount = payment?.amount ?? 0;
//   return Response.json({
//     id: booking.id,
//     status: booking.status,
//     amount, // ✅ FLATTEN
//     created_at: booking.created_at,
//   });
// }


import { supabaseAdmin } from "@/app/lib/supabase/admin";

function isExpired(createdAt: string, minutes = 5) {
  const created = new Date(createdAt + "Z").getTime(); // ÉP UTC
  return Date.now() - created > minutes * 60 * 1000;
}


export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: bookingId } = await context.params;

  if (!bookingId) {
    return Response.json({ message: "MISSING_ID" }, { status: 400 });
  }

  const { data: booking, error } = await supabaseAdmin
    .from("bookings")
    .select(`
      id,
      status,
      created_at,
      payments (
        amount,
        status
      )
    `)
    .eq("id", bookingId)
    .single();

  if (error || !booking) {
    return Response.json({ message: "NOT_FOUND" }, { status: 404 });
  }
 const amount = 2000;
  if (
    booking.status === "pending" &&
    booking.created_at &&
    isExpired(booking.created_at, 5)
  ) {
    await supabaseAdmin
      .from("bookings")
      .update({ status: "expired" })
      .eq("id", bookingId);

    return Response.json({
      id: booking.id,
      status: "expired",
      amount,
      created_at: booking.created_at,
    });
  }

  return Response.json({
    id: booking.id,
    status: booking.status,
    amount,
    created_at: booking.created_at,
  });
}

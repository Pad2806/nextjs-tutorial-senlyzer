// import { NextRequest, NextResponse } from "next/server";
// import postgres from "postgres";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// export async function GET(
//   _req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;

//   const [booking] = await sql`
//     SELECT id, status, amount, created_at
//     FROM bookings
//     WHERE id = ${id}
//     LIMIT 1
//   `;

//   if (!booking) {
//     return NextResponse.json(
//       { message: "BOOKING_NOT_FOUND" },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json(booking);
// }


import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const [booking] = await sql`
    SELECT id, status, amount, created_at
    FROM bookings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (!booking) {
    return NextResponse.json({ message: "NOT_FOUND" }, { status: 404 });
  }

  // ⏱ kiểm tra timeout 5 phút
  const createdAt = new Date(booking.created_at).getTime();
  const now = Date.now();

  if (
    booking.status === "pending" &&
    now - createdAt > 5 * 60 * 1000
  ) {
    await sql`
      UPDATE bookings
      SET status = 'expired'
      WHERE id = ${id}
    `;

    return NextResponse.json({
      ...booking,
      status: "expired",
    });
  }

  return NextResponse.json(booking);
}

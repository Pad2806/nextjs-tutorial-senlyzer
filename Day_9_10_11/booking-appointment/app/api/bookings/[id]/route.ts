import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const bookingId = params.id;

  const [booking] = await sql`
    SELECT id, status, amount, created_at
    FROM bookings
    WHERE id = ${bookingId}
    LIMIT 1
  `;

  if (!booking) {
    return NextResponse.json({ message: "BOOKING_NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

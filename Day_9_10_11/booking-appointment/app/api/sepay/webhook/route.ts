import postgres from "postgres";
import { NextResponse } from "next/server";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const { amount, description, status } = payload;

    if (status !== "success") {
      return NextResponse.json({ ok: true });
    }

    const bookingId = description.replace("DATLICH_", "");

    await sql`
      UPDATE bookings
      SET status = 'paid'
      WHERE id = ${bookingId}
    `;
    await sql`
      INSERT INTO payments (booking_id, amount, method, status)
      VALUES (${bookingId}, ${amount}, 'sepay', 'paid')
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}

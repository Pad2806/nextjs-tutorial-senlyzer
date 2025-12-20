import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  try {
    const auth = req.headers.get("authorization") || "";
    const expected = `Apikey ${process.env.SEPAY_API_KEY}`;

    if (auth !== expected) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    const payload = await req.json();

    const status = payload.transaction_status;
    const amount = payload.transferAmount;
    const content = payload.content;

    if (status !== "success") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    if (!content || !content.startsWith("DATLICH_")) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const bookingId = content.replace("DATLICH_", "").trim();

    const [booking] = await sql`
      SELECT id, amount, status
      FROM bookings
      WHERE id = ${bookingId}
      LIMIT 1
    `;

    if (!booking) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    if (booking.status === "paid") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    if (Number(amount) !== Number(booking.amount)) {
      return NextResponse.json({ error: "INVALID_AMOUNT" }, { status: 400 });
    }

    await sql.begin(async (tx) => {
      await tx`
        UPDATE bookings
        SET status = 'paid'
        WHERE id = ${bookingId}
      `;

      await tx`
        INSERT INTO payments (booking_id, amount, method, status)
        VALUES (${bookingId}, ${amount}, 'sepay', 'paid')
        ON CONFLICT (booking_id) DO NOTHING
      `;
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SEPAY WEBHOOK ERROR:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}

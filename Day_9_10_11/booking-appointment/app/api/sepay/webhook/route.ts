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

    const { amount, content, status } = payload;

    if (status !== "success") {
      return NextResponse.json({ ok: true });
    }

    if (!content || !content.startsWith("DATLICH_")) {
      return NextResponse.json({ ok: true });
    }

    const bookingId = content.replace("DATLICH_", "").trim();

    const [booking] = await sql`
      SELECT id, amount, status
      FROM bookings
      WHERE id = ${bookingId}
      LIMIT 1
    `;

    if (!booking || booking.status === "paid") {
      return NextResponse.json({ ok: true });
    }

    if (Number(amount) !== Number(booking.amount)) {
      return NextResponse.json({ error: "INVALID_AMOUNT" }, { status: 400 });
    }

    await sql.begin(async (tx) => {
      await tx`
        UPDATE bookings
        SET status = 'paid'
        WHERE id = ${booking.id}
      `;

      await tx`
        INSERT INTO payments (booking_id, amount, method, status)
        VALUES (${booking.id}, ${amount}, 'sepay', 'paid')
        ON CONFLICT (booking_id) DO NOTHING
      `;
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SEPAY WEBHOOK ERROR:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}

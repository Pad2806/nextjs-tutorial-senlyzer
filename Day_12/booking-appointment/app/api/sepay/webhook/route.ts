import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log("🔔 SEPAY WEBHOOK PAYLOAD:", payload);

    if (payload?.transferType !== "in") {
      return NextResponse.json({ ok: true });
    }

    const rawContent =
      payload?.content ??
      payload?.description ??
      "";

    if (!rawContent.includes("DATLICH")) {
      console.error("❌ NO DATLICH TAG:", rawContent);
      return NextResponse.json({ ok: true });
    }

    let bookingId = rawContent;

    bookingId = bookingId.replace("BankAPINotify", "").trim();

    if (bookingId.startsWith("DATLICH_")) {
      bookingId = bookingId.replace("DATLICH_", "");
    } else if (bookingId.startsWith("DATLICH")) {
      bookingId = bookingId.replace("DATLICH", "");
    }

    bookingId = bookingId.trim();

    if (!bookingId) {
      console.error("❌ EMPTY BOOKING ID");
      return NextResponse.json({ ok: true });
    }

    const paidAmount = Number(payload?.transferAmount ?? 0);

    const rows = await sql`
      SELECT id, amount, status
      FROM bookings
      WHERE id = ${bookingId}
      LIMIT 1
    `;

    if (rows.length === 0) {
      console.error("❌ BOOKING NOT FOUND:", bookingId);
      return NextResponse.json({ ok: true });
    }

    const booking = rows[0];

    if (booking.status === "paid") {
      return NextResponse.json({ ok: true, alreadyPaid: true });
    }

    if (paidAmount < Number(booking.amount)) {
      console.error(
        "❌ AMOUNT NOT ENOUGH:",
        paidAmount,
        "EXPECTED:",
        booking.amount
      );
      return NextResponse.json({ ok: true });
    }

    await sql.begin(async (tx) => {
      await tx`
        UPDATE bookings
        SET status = 'paid'
        WHERE id = ${booking.id}
      `;

      await tx`
        INSERT INTO payments (booking_id, amount, method, status)
        VALUES (${booking.id}, ${paidAmount}, 'sepay', 'paid')
        ON CONFLICT (booking_id) DO NOTHING
      `;
    });

    console.log("✅ BOOKING PAID:", bookingId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("🔥 SEPAY WEBHOOK ERROR:", err);
    return NextResponse.json({ error: "WEBHOOK_ERROR" }, { status: 500 });
  }
}

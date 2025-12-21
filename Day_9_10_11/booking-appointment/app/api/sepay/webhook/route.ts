import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: NextRequest) {
  try {
    // 📦 1. READ PAYLOAD
    const payload = await req.json();
    console.log("🔔 SEPAY WEBHOOK PAYLOAD:", payload);

    // 🧾 2. PARSE STATUS
    const rawStatus =
      payload?.status ??
      payload?.state ??
      payload?.result ??
      "";

    const status = String(rawStatus).toLowerCase();
    const isPaid = ["success", "paid", "completed", "ok"].includes(status);

    if (!isPaid) {
      return NextResponse.json({ ok: true });
    }

    // 🧾 3. PARSE CONTENT
    const content: string =
      payload?.content ??
      payload?.description ??
      payload?.transactionContent ??
      "";

    if (!content.startsWith("DATLICH_")) {
      console.error("❌ INVALID CONTENT:", content);
      return NextResponse.json({ ok: true });
    }

    const bookingId = content.replace("DATLICH_", "").trim();
    if (!bookingId) {
      return NextResponse.json({ ok: true });
    }

    // 💰 4. PARSE AMOUNT
    const paidAmount =
      Number(
        payload?.amount ??
        payload?.transferAmount ??
        payload?.money ??
        0
      ) || 0;

    // 📥 5. LOAD BOOKING
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

    // ♻️ 6. IDEMPOTENT
    if (booking.status === "paid") {
      return NextResponse.json({ ok: true, alreadyPaid: true });
    }

    // 💰 7. VALIDATE AMOUNT (>=)
    if (paidAmount < Number(booking.amount)) {
      console.error(
        "❌ AMOUNT NOT ENOUGH:",
        paidAmount,
        "EXPECTED:",
        booking.amount
      );
      return NextResponse.json({ ok: true });
    }

    // 🔄 8. UPDATE DB
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

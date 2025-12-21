import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  try {
    // 1️⃣ Verify API key
    const auth = req.headers.get("authorization") || "";
    const expected = `Apikey ${process.env.SEPAY_API_KEY}`;

    if (auth !== expected) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    // 2️⃣ Payload thật từ Sepay
    const payload = await req.json();

    /**
     * Sepay payload thực tế:
     * {
     *   amount: number,
     *   content: string,
     *   status: "success"
     * }
     */
    const { amount, content, status } = payload;

    if (status !== "success") {
      return NextResponse.json({ ok: true });
    }

    if (!content || !content.startsWith("DATLICH-")) {
      return NextResponse.json({ ok: true });
    }

    // 3️⃣ Extract bookingId
    const bookingId = content.replace("DATLICH-", "").trim();

    // 4️⃣ Load booking
    const [booking] = await sql`
      SELECT id, amount, status
      FROM bookings
      WHERE id = ${bookingId}
      LIMIT 1
    `;

    if (!booking || booking.status === "paid") {
      return NextResponse.json({ ok: true });
    }

    // 5️⃣ Validate amount
    if (Number(amount) !== Number(booking.amount)) {
      return NextResponse.json({ error: "INVALID_AMOUNT" }, { status: 400 });
    }

    // 6️⃣ Update DB
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

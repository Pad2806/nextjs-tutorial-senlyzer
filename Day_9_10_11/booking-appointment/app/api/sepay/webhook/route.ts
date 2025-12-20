import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  try {
    // 1) Verify API key từ Sepay (header)
    const auth = req.headers.get("authorization") || "";
    const expected = `Apikey ${process.env.SEPAY_API_KEY}`;

    if (!process.env.SEPAY_API_KEY) {
      return NextResponse.json({ error: "Missing SEPAY_API_KEY" }, { status: 500 });
    }

    if (auth !== expected) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    // 2) Parse payload
    const payload = await req.json();
    const { amount, description, status } = payload;

    // 3) Nếu Sepay báo không thành công thì ignore
    if (status !== "success") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    // 4) Validate description theo format DATLICH_<bookingId>
    if (!description || typeof description !== "string" || !description.startsWith("DATLICH_")) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const bookingId = description.replace("DATLICH_", "").trim();

    // 5) Lấy booking hiện tại
    const [booking] = await sql`
      SELECT id, amount, status
      FROM bookings
      WHERE id = ${bookingId}
      LIMIT 1
    `;

    if (!booking) {
      return NextResponse.json({ ok: true, ignored: true, reason: "BOOKING_NOT_FOUND" });
    }

    // 6) Nếu booking đã paid rồi thì không làm gì nữa (chống webhook gọi lại)
    if (booking.status === "paid") {
      return NextResponse.json({ ok: true, ignored: true, reason: "ALREADY_PAID" });
    }

    // 7) Check amount khớp
    if (Number(amount) !== Number(booking.amount)) {
      return NextResponse.json({ error: "INVALID_AMOUNT" }, { status: 400 });
    }

    // 8) Update booking + insert payment (dùng transaction để chắc chắn)
    await sql.begin(async (tx) => {
      await tx`
        UPDATE bookings
        SET status = 'paid'
        WHERE id = ${bookingId}
      `;

      // tránh insert trùng: dùng unique index (mục 4.4)
      await tx`
        INSERT INTO payments (booking_id, amount, method, status)
        VALUES (${bookingId}, ${amount}, 'sepay', 'paid')
        ON CONFLICT (booking_id) DO NOTHING
      `;
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}

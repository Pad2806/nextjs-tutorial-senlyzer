// import { NextResponse } from "next/server";
// import postgres from "postgres";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// export async function POST(req: Request) {
//   try {
//     const auth = req.headers.get("authorization") || "";
//     const expected = `Apikey ${process.env.SEPAY_API_KEY}`;

//     if (auth !== expected) {
//       return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
//     }

//     const payload = await req.json();

//     const { amount, content, status } = payload;

//     if (status !== "success") {
//       return NextResponse.json({ ok: true });
//     }

//     if (!content || !content.startsWith("DATLICH_")) {
//       return NextResponse.json({ ok: true });
//     }

//     const bookingId = content.replace("DATLICH_", "").trim();

//     const [booking] = await sql`
//       SELECT id, amount, status
//       FROM bookings
//       WHERE id = ${bookingId}
//       LIMIT 1
//     `;

//     if (!booking || booking.status === "paid") {
//       return NextResponse.json({ ok: true });
//     }

//     if (Number(amount) !== Number(booking.amount)) {
//       return NextResponse.json({ error: "INVALID_AMOUNT" }, { status: 400 });
//     }

//     await sql.begin(async (tx) => {
//       await tx`
//         UPDATE bookings
//         SET status = 'paid'
//         WHERE id = ${booking.id}
//       `;

//       await tx`
//         INSERT INTO payments (booking_id, amount, method, status)
//         VALUES (${booking.id}, ${amount}, 'sepay', 'paid')
//         ON CONFLICT (booking_id) DO NOTHING
//       `;
//     });

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("SEPAY WEBHOOK ERROR:", err);
//     return NextResponse.json({ error: "Webhook error" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import postgres from "postgres";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// export async function POST(req: Request) {
//   try {
//     // 1️⃣ Verify API key
//     const auth = req.headers.get("authorization") || "";
//     const expected = `Apikey ${process.env.SEPAY_API_KEY}`;

//     if (auth !== expected) {
//       return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
//     }

//     // 2️⃣ Payload từ Sepay
//     const payload = await req.json();
//     /**
//      * Ví dụ payload thật:
//      * {
//      *   amount: 2000,
//      *   content: "DATLICHab21cdd62e754ac1972efbef6fdb9a57",
//      *   status: "success"
//      * }
//      */
//     const { amount, content, status } = payload;

//     if (status !== "success" || !content) {
//       return NextResponse.json({ ok: true });
//     }

//     // 3️⃣ Chuẩn hóa bookingId
//     let bookingId = "";

//     if (content.startsWith("DATLICH_")) {
//       bookingId = content.replace("DATLICH_", "");
//     } else if (content.startsWith("DATLICH")) {
//       bookingId = content.replace("DATLICH", "");
//     } else {
//       return NextResponse.json({ ok: true });
//     }

//     bookingId = bookingId.trim();

//     // 4️⃣ Load booking
//     const [booking] = await sql`
//       SELECT id, amount, status
//       FROM bookings
//       WHERE id = ${bookingId}
//       LIMIT 1
//     `;

//     if (!booking || booking.status === "paid") {
//       return NextResponse.json({ ok: true });
//     }

//     // 5️⃣ Check amount
//     if (Number(amount) !== Number(booking.amount)) {
//       return NextResponse.json({ error: "INVALID_AMOUNT" }, { status: 400 });
//     }

//     // 6️⃣ Update DB
//     await sql.begin(async (tx) => {
//       await tx`
//         UPDATE bookings
//         SET status = 'paid'
//         WHERE id = ${booking.id}
//       `;

//       await tx`
//         INSERT INTO payments (booking_id, amount, method, status)
//         VALUES (${booking.id}, ${amount}, 'sepay', 'paid')
//         ON CONFLICT (booking_id) DO NOTHING
//       `;
//     });

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("SEPAY WEBHOOK ERROR:", err);
//     return NextResponse.json({ error: "Webhook error" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: NextRequest) {
  try {
    // 🔐 1. VERIFY API KEY (BẮT BUỘC)
    const authHeader = req.headers.get("authorization") || "";
    const expected = `Apikey ${process.env.SEPAY_API_KEY}`;

    if (authHeader !== expected) {
      console.error("❌ INVALID API KEY:", authHeader);
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    // 📦 2. READ PAYLOAD
    const payload = await req.json();
    console.log("🔔 SEPAY WEBHOOK PAYLOAD:", payload);

    // 🧾 3. PARSE STATUS
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

    // 🧾 4. PARSE CONTENT
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

    // 💰 5. PARSE AMOUNT
    const paidAmount =
      Number(
        payload?.amount ??
        payload?.transferAmount ??
        payload?.money ??
        0
      ) || 0;

    // 📥 6. LOAD BOOKING
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

    // ♻️ 7. IDEMPOTENT
    if (booking.status === "paid") {
      return NextResponse.json({ ok: true, alreadyPaid: true });
    }

    // 💰 8. VALIDATE AMOUNT (>=)
    if (paidAmount < Number(booking.amount)) {
      console.error(
        "❌ AMOUNT NOT ENOUGH:",
        paidAmount,
        "EXPECTED:",
        booking.amount
      );
      return NextResponse.json({ ok: true });
    }

    // 🔄 9. UPDATE DB
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

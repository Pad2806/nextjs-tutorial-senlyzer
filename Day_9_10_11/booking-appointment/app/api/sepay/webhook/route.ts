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



import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    /**
     * Payload thực tế Sepay:
     * {
     *   amount: number,
     *   content: string, // DATLICH<uuid>
     *   status: "success"
     * }
     */
    const { amount, content, status } = payload;

    // ✅ chỉ xử lý giao dịch thành công
    if (status !== "success" || !content) {
      return NextResponse.json({ ok: true });
    }

    // ✅ TÁCH bookingId (rất quan trọng)
    // DATLICHxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    if (!content.startsWith("DATLICH")) {
      return NextResponse.json({ ok: true });
    }

    const bookingId = content.replace("DATLICH", "").trim();

    if (!bookingId) {
      return NextResponse.json({ ok: true });
    }

    // ✅ Lấy booking
    const [booking] = await sql`
      SELECT id, amount, status
      FROM bookings
      WHERE id = ${bookingId}
      LIMIT 1
    `;

    if (!booking || booking.status === "paid") {
      return NextResponse.json({ ok: true });
    }

    // ✅ So khớp tiền
    if (Number(amount) !== Number(booking.amount)) {
      console.error("AMOUNT_MISMATCH", amount, booking.amount);
      return NextResponse.json({ ok: true });
    }

    // ✅ Update DB
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

    console.log("✅ BOOKING PAID:", bookingId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SEPAY WEBHOOK ERROR:", err);
    return NextResponse.json({ ok: true });
  }
}


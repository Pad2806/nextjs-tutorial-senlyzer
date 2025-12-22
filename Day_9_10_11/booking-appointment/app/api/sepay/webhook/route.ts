// import { NextRequest, NextResponse } from "next/server";
// import postgres from "postgres";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// export async function POST(req: NextRequest) {
//   try {
//     const payload = await req.json();
//     console.log("🔔 SEPAY WEBHOOK PAYLOAD:", payload);

//     if (payload?.transferType !== "in") {
//       return NextResponse.json({ ok: true });
//     }

//     const rawContent =
//       payload?.content ??
//       payload?.description ??
//       "";

//     if (!rawContent.includes("DATLICH")) {
//       console.error("❌ NO DATLICH TAG:", rawContent);
//       return NextResponse.json({ ok: true });
//     }

//     let bookingId = rawContent;

//     bookingId = bookingId.replace("BankAPINotify", "").trim();

//     if (bookingId.startsWith("DATLICH_")) {
//       bookingId = bookingId.replace("DATLICH_", "");
//     } else if (bookingId.startsWith("DATLICH")) {
//       bookingId = bookingId.replace("DATLICH", "");
//     }

//     bookingId = bookingId.trim();

//     if (!bookingId) {
//       console.error("❌ EMPTY BOOKING ID");
//       return NextResponse.json({ ok: true });
//     }

//     const paidAmount = Number(payload?.transferAmount ?? 0);

//     const rows = await sql`
//       SELECT id, amount, status
//       FROM bookings
//       WHERE id = ${bookingId}
//       LIMIT 1
//     `;

//     if (rows.length === 0) {
//       console.error("❌ BOOKING NOT FOUND:", bookingId);
//       return NextResponse.json({ ok: true });
//     }

//     const booking = rows[0];

//     if (booking.status === "paid") {
//       return NextResponse.json({ ok: true, alreadyPaid: true });
//     }

//     if (paidAmount < Number(booking.amount)) {
//       console.error(
//         "❌ AMOUNT NOT ENOUGH:",
//         paidAmount,
//         "EXPECTED:",
//         booking.amount
//       );
//       return NextResponse.json({ ok: true });
//     }

//     await sql.begin(async (tx) => {
//       await tx`
//         UPDATE bookings
//         SET status = 'paid'
//         WHERE id = ${booking.id}
//       `;

//       await tx`
//         INSERT INTO payments (booking_id, amount, method, status)
//         VALUES (${booking.id}, ${paidAmount}, 'sepay', 'paid')
//         ON CONFLICT (booking_id) DO NOTHING
//       `;
//     });

//     console.log("✅ BOOKING PAID:", bookingId);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("🔥 SEPAY WEBHOOK ERROR:", err);
//     return NextResponse.json({ error: "WEBHOOK_ERROR" }, { status: 500 });
//   }
// }


// import { supabaseAdmin } from "@/app/lib/supabase/admin";

// export async function POST(req: Request) {
//   const payload = await req.json();

//   const desc: string = payload?.description ?? "";
//   const match = desc.match(/^DATLICH_(.+)$/);

//   if (!match) return Response.json({ ok: true });

//   const bookingId = match[1];

//   await supabaseAdmin
//     .from("bookings")
//     .update({ status: "paid" })
//     .eq("id", bookingId)
//     .eq("status", "pending");

//   return Response.json({ ok: true });
// }


// import { supabaseAdmin } from "@/app/lib/supabase/admin";

// export async function POST(req: Request) {
//   try {
//     const payload = await req.json();
//     console.log("🔔 SEPAY WEBHOOK:", payload);

//     /* =========================
//        1. CHỈ XỬ LÝ TIỀN VÀO
//     ========================= */
//     if (payload?.transferType !== "in") {
//       return Response.json({ ok: true });
//     }

//     /* =========================
//        2. LẤY NỘI DUNG CHUYỂN KHOẢN
//     ========================= */
//     const rawContent =
//       payload?.content ??
//       payload?.description ??
//       "";

//     if (!rawContent.includes("DATLICH")) {
//       console.warn("❌ NO DATLICH TAG:", rawContent);
//       return Response.json({ ok: true });
//     }

//     /* =========================
//        3. PARSE BOOKING ID
//        DATLICH_xxx | DATLICHxxx
//     ========================= */
//     let bookingId = rawContent
//       .replace("BankAPINotify", "")
//       .trim();

//     if (bookingId.startsWith("DATLICH_")) {
//       bookingId = bookingId.replace("DATLICH_", "");
//     } else if (bookingId.startsWith("DATLICH")) {
//       bookingId = bookingId.replace("DATLICH", "");
//     }

//     bookingId = bookingId.trim();

//     if (!bookingId) {
//       console.error("❌ EMPTY BOOKING ID");
//       return Response.json({ ok: true });
//     }

//     /* =========================
//        4. LOAD BOOKING + PAYMENT
//     ========================= */
//     const { data: booking, error } = await supabaseAdmin
//       .from("bookings")
//       .select(`
//         id,
//         status,
//         payments (
//           id,
//           amount,
//           status
//         )
//       `)
//       .eq("id", bookingId)
//       .single();

//     if (error || !booking) {
//       console.error("❌ BOOKING NOT FOUND:", bookingId);
//       return Response.json({ ok: true });
//     }

//     /* =========================
//        5. TRÁNH DOUBLE PAYMENT
//     ========================= */
//     if (booking.status === "paid") {
//       console.log("⚠️ BOOKING ALREADY PAID:", bookingId);
//       return Response.json({ ok: true });
//     }

//     const payment = booking.payments?.[0];
//     if (!payment) {
//       console.error("❌ PAYMENT NOT FOUND FOR BOOKING:", bookingId);
//       return Response.json({ ok: true });
//     }

//     const paidAmount = Number(payload?.transferAmount ?? payload?.amount ?? 0);

//     /* =========================
//        6. VALIDATE AMOUNT
//        (>= để tránh làm tròn)
//     ========================= */
//     if (paidAmount < Number(payment.amount)) {
//       console.error(
//         "❌ AMOUNT NOT ENOUGH:",
//         paidAmount,
//         "EXPECTED:",
//         payment.amount
//       );
//       return Response.json({ ok: true });
//     }

//     /* =========================
//        7. UPDATE PAYMENT
//     ========================= */
//     await supabaseAdmin
//       .from("payments")
//       .update({
//         status: "paid",
//         transaction_code: payload?.referenceCode ?? payload?.transaction_code ?? null,
//         payment_date: new Date().toISOString(),
//       })
//       .eq("id", payment.id);

//     /* =========================
//        8. UPDATE BOOKING
//     ========================= */
//     await supabaseAdmin
//       .from("bookings")
//       .update({ status: "paid" })
//       .eq("id", booking.id);

//     console.log("✅ BOOKING PAID:", bookingId);

//     return Response.json({ success: true });
//   } catch (err) {
//     console.error("🔥 SEPAY WEBHOOK ERROR:", err);
//     return Response.json({ error: "WEBHOOK_ERROR" }, { status: 500 });
//   }
// }

import { supabaseAdmin } from "@/app/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("🔔 SEPAY WEBHOOK PAYLOAD:", payload);

    /* =========================
       1. CHỈ XỬ LÝ TIỀN VÀO
    ========================= */
    if (payload?.transferType !== "in") {
      return Response.json({ ok: true });
    }

    /* =========================
       2. LẤY NỘI DUNG CHUYỂN KHOẢN
    ========================= */
    const rawContent =
      payload?.content ??
      payload?.description ??
      "";

    if (!rawContent.includes("DATLICH")) {
      console.error("❌ NO DATLICH TAG:", rawContent);
      return Response.json({ ok: true });
    }

    /* =========================
       3. PARSE BOOKING ID
       (GIỮ Y NGUYÊN LOGIC CŨ)
    ========================= */
    let bookingId = rawContent.replace("BankAPINotify", "").trim();

    if (bookingId.startsWith("DATLICH_")) {
      bookingId = bookingId.replace("DATLICH_", "");
    } else if (bookingId.startsWith("DATLICH")) {
      bookingId = bookingId.replace("DATLICH", "");
    }

    bookingId = bookingId.trim();

    if (!bookingId) {
      console.error("❌ EMPTY BOOKING ID");
      return Response.json({ ok: true });
    }

    const paidAmount = Number(payload?.transferAmount ?? 0);

    /* =========================
       4. LOAD BOOKING
       (THAY SQL → SUPABASE)
    ========================= */
    const { data: booking, error: bookingErr } = await supabaseAdmin
      .from("bookings")
      .select("id, status")
      .eq("id", bookingId)
      .single();

    if (bookingErr || !booking) {
      console.error("❌ BOOKING NOT FOUND:", bookingId);
      return Response.json({ ok: true });
    }

    if (booking.status === "paid") {
      return Response.json({ ok: true, alreadyPaid: true });
    }

    /* =========================
       5. LOAD PAYMENT (pending)
       = amount cũ của booking
    ========================= */
    const { data: payment, error: payErr } = await supabaseAdmin
      .from("payments")
      .select("id, amount, status")
      .eq("booking_id", booking.id)
      .eq("status", "pending")
      .single();

    if (payErr || !payment) {
      console.error("❌ PAYMENT NOT FOUND:", bookingId);
      return Response.json({ ok: true });
    }

    /* =========================
       6. VALIDATE AMOUNT
       (GIỮ Y LOGIC CŨ)
    ========================= */
    if (paidAmount < Number(payment.amount)) {
      console.error(
        "❌ AMOUNT NOT ENOUGH:",
        paidAmount,
        "EXPECTED:",
        payment.amount
      );
      return Response.json({ ok: true });
    }

    /* =========================
       7. UPDATE PAYMENT
    ========================= */
    await supabaseAdmin
      .from("payments")
      .update({
        status: "paid",
        method: "sepay",
        transaction_code: payload?.referenceCode ?? null,
        payment_date: new Date().toISOString(),
      })
      .eq("id", payment.id);

    /* =========================
       8. UPDATE BOOKING
    ========================= */
    await supabaseAdmin
      .from("bookings")
      .update({ status: "paid" })
      .eq("id", booking.id);

    console.log("✅ BOOKING PAID:", bookingId);

    return Response.json({ success: true });
  } catch (err) {
    console.error("🔥 SEPAY WEBHOOK ERROR:", err);
    return Response.json({ error: "WEBHOOK_ERROR" }, { status: 500 });
  }
}

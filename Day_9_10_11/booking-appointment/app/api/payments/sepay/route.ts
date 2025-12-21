import { NextResponse } from "next/server";
import postgres from "postgres";
import { createSepayPayment } from "@/app/lib/payment/sepay";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        { error: "MISSING_BOOKING_ID" },
        { status: 400 }
      );
    }

    const [booking] = await sql`
      SELECT id, amount, status, sepay_payment_code, sepay_qr_url
      FROM bookings
      WHERE id = ${bookingId}
      LIMIT 1
    `;

    if (!booking) {
      return NextResponse.json(
        { error: "BOOKING_NOT_FOUND" },
        { status: 404 }
      );
    }

    if (booking.sepay_payment_code && booking.sepay_qr_url) {
      return NextResponse.json({
        payment_code: booking.sepay_payment_code,
        qr_url: booking.sepay_qr_url,
      });
    }

    if (booking.status !== "pending") {
      return NextResponse.json(
        { error: "INVALID_STATUS" },
        { status: 400 }
      );
    }

    const payment = await createSepayPayment({
      bookingId,
      amount: booking.amount,
    });

    await sql`
      UPDATE bookings
      SET
        sepay_payment_code = ${payment.payment_code},
        sepay_qr_url = ${payment.qr_url}
      WHERE id = ${bookingId}
    `;

    return NextResponse.json(payment);
  } catch (err) {
    console.error("SEPAY CREATE PAYMENT ERROR:", err);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}

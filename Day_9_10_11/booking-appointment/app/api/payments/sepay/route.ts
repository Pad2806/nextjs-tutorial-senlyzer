import { NextResponse } from "next/server";
import postgres from "postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { createSepayPayment } from "@/app/lib/payment/sepay";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { bookingId } = await req.json();

  const [booking] = await sql`
    SELECT id, amount, status, sepay_payment_code, sepay_qr_url
    FROM bookings
    WHERE id = ${bookingId}
    LIMIT 1
  `;

  if (!booking) {
    return NextResponse.json({ error: "BOOKING_NOT_FOUND" }, { status: 404 });
  }

  // ✅ ĐÃ TẠO PAYMENT TRƯỚC ĐÓ → TRẢ LẠI
  if (booking.sepay_payment_code && booking.sepay_qr_url) {
    return NextResponse.json({
      payment_code: booking.sepay_payment_code,
      qr_url: booking.sepay_qr_url,
    });
  }

  if (booking.status !== "pending") {
    return NextResponse.json({ error: "INVALID_STATUS" }, { status: 400 });
  }

  // ✅ TẠO PAYMENT MỚI QUA API SEPAY
  const payment = await createSepayPayment({
    bookingId,
    amount: booking.amount,
  });

  // ✅ LƯU PAYMENT VÀO DB (CHỐNG TRÙNG)
  await sql`
    UPDATE bookings
    SET
      sepay_payment_code = ${payment.payment_code},
      sepay_qr_url = ${payment.qr_url}
    WHERE id = ${bookingId}
  `;

  return NextResponse.json(payment);
}

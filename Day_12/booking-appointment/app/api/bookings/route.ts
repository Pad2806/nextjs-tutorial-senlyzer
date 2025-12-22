import { NextResponse } from "next/server";
import postgres from "postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
    }

    const body = await req.json();
    const { clinic_id, service_id, name, phone, email, amount } = body;

    if (!clinic_id || !service_id) {
      return NextResponse.json(
        { message: "MISSING_CLINIC_OR_SERVICE" },
        { status: 400 }
      );
    }

    if (!name || !phone || !email) {
      return NextResponse.json(
        { message: "MISSING_REQUIRED_FIELDS" },
        { status: 400 }
      );
    }

    const users = await sql`
      SELECT id FROM users WHERE email = ${session.user.email}
    `;

    if (users.length === 0) {
      return NextResponse.json({ message: "USER_NOT_FOUND" }, { status: 404 });
    }

    const userId = users[0].id;

    const [booking] = await sql`
      INSERT INTO bookings (
        user_id,
        clinic_id,
        service_id,
        name,
        phone,
        email,
        amount,
        status
      )
      VALUES (
        ${userId},
        ${clinic_id},
        ${service_id},
        ${name},
        ${phone},
        ${email},
        ${amount},
        'pending'
      )
      RETURNING id
    `;

    return NextResponse.json({ bookingId: booking.id });
  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err);
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}

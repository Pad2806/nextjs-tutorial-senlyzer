import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import postgres from "postgres";
import { authOptions } from "../auth/[...nextauth]/authOptions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = await req.json();
  const { clinic_id, service_id, name, phone, email, amount } = body;

  const users = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;
  if (users.length === 0) {
    return NextResponse.json({ message: "USER_NOT_FOUND" }, { status: 404 });
  }

  const userId = users[0].id;

  const [booking] = await sql`
    INSERT INTO bookings (user_id, clinic_id, service_id, name, phone, email, amount, status)
    VALUES (${userId}, ${clinic_id}, ${service_id}, ${name}, ${phone}, ${email}, ${amount}, 'pending')
    RETURNING id
  `;

  return NextResponse.json({ bookingId: booking.id });
}

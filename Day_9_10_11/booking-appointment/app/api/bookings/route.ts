// import { NextResponse } from "next/server";
// import postgres from "postgres";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.email) {
//       return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { clinic_id, service_id, name, phone, email, amount } = body;

//     if (!clinic_id || !service_id) {
//       return NextResponse.json(
//         { message: "MISSING_CLINIC_OR_SERVICE" },
//         { status: 400 }
//       );
//     }

//     if (!name || !phone || !email) {
//       return NextResponse.json(
//         { message: "MISSING_REQUIRED_FIELDS" },
//         { status: 400 }
//       );
//     }

//     const users = await sql`
//       SELECT id FROM users WHERE email = ${session.user.email}
//     `;

//     if (users.length === 0) {
//       return NextResponse.json({ message: "USER_NOT_FOUND" }, { status: 404 });
//     }

//     const userId = users[0].id;

//     const [booking] = await sql`
//       INSERT INTO bookings (
//         user_id,
//         clinic_id,
//         service_id,
//         name,
//         phone,
//         email,
//         amount,
//         status
//       )
//       VALUES (
//         ${userId},
//         ${clinic_id},
//         ${service_id},
//         ${name},
//         ${phone},
//         ${email},
//         ${amount},
//         'pending'
//       )
//       RETURNING id
//     `;

//     return NextResponse.json({ bookingId: booking.id });
//   } catch (err) {
//     console.error("CREATE BOOKING ERROR:", err);
//     return NextResponse.json(
//       { message: "INTERNAL_SERVER_ERROR" },
//       { status: 500 }
//     );
//   }
// }

// import { supabaseAdmin } from "@/app/lib/supabase/admin";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.email) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     // mapping theo form của bạn
//     const payload = {
//       name: body.name ?? "",
//       phone: body.phone ?? "",
//       gender: body.gender ?? null,
//       age: body.age ? Number(body.age) : null,
//       clinic_id: body.clinic ?? body.clinic_id ?? null,
//       service_id: body.service ?? body.service_id ?? null,
//       appointment_date: body.appointmentDate ?? body.appointment_date ?? null,
//       symptoms: body.symptoms ?? null,
//       email: session.user.email,
//       amount: body.amount ?? 150000,
//       status: "pending",
//     };

//     // validate tối thiểu
//     if (!payload.name || !payload.phone || !payload.clinic_id || !payload.service_id || !payload.appointment_date) {
//       return Response.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const { data, error } = await supabaseAdmin
//       .from("bookings")
//       .insert(payload)
//       .select("id")
//       .single();

//     if (error) {
//       return Response.json({ error: error.message }, { status: 500 });
//     }

//     return Response.json({ bookingId: data.id });
//   } catch (e: any) {
//     return Response.json({ error: e?.message ?? "Server error" }, { status: 500 });
//   }
// }

import { supabaseAdmin } from "@/app/lib/supabase/admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  /* =======================
     1. TẠO BOOKING (pending)
  ======================= */
  const { data: booking, error: bookingError } = await supabaseAdmin
    .from("bookings")
    .insert({
      user_id: session.user.id ?? null,
      clinic_id: body.clinic,
      service_id: body.service,
      patient_name: body.name,
      patient_phone: body.phone,
      gender: body.gender ?? null,
      age: body.age ?? null,
      symptoms: body.symptoms ?? null,
      booking_time: body.booking_time, // YYYY-MM-DDTHH:mm:00
      status: "pending",
    })
    .select("id")
    .single();

  if (bookingError || !booking) {
    return Response.json(
      { error: bookingError?.message ?? "Create booking failed" },
      { status: 500 }
    );
  }

  /* =======================
     2. TẠO PAYMENT (pending)
  ======================= */
  const { error: paymentError } = await supabaseAdmin
    .from("payments")
    .insert({
      booking_id: booking.id,
      amount: body.amount,
      method: "banking",
      status: "pending",
    });

  if (paymentError) {
    return Response.json(
      { error: paymentError.message },
      { status: 500 }
    );
  }

  return Response.json({
    bookingId: booking.id,
  });
}

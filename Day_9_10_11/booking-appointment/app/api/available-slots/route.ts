// // import { supabaseAdmin } from "@/app/lib/supabase/admin";

// // type SlotStat = {
// //   time: string;       // "HH:mm"
// //   capacity: number;
// //   booked: number;
// //   available: number;
// // };

// // function timeToMinutes(t: string) {
// //   const [h, m] = t.split(":");
// //   return Number(h) * 60 + Number(m);
// // }

// // function minutesToHHMM(mins: number) {
// //   const h = Math.floor(mins / 60).toString().padStart(2, "0");
// //   const m = (mins % 60).toString().padStart(2, "0");
// //   return `${h}:${m}`;
// // }

// // export async function GET(req: Request) {
// //   const { searchParams } = new URL(req.url);

// //   const clinic_id = searchParams.get("clinic_id");
// //   const service_id = searchParams.get("service_id");
// //   const date = searchParams.get("date"); // YYYY-MM-DD

// //   if (!clinic_id || !service_id || !date) {
// //     return Response.json([], { status: 200 });
// //   }

// //   /* =========================
// //      1. SERVICE duration
// //   ========================= */
// //   const { data: service } = await supabaseAdmin
// //     .from("services")
// //     .select("duration_minutes")
// //     .eq("id", service_id)
// //     .single();

// //   const duration = service?.duration_minutes ?? 30;

// //   /* =========================
// //      2. DOCTORS đúng clinic + đúng service
// //   ========================= */
// //   const { data: doctors } = await supabaseAdmin
// //     .from("doctors")
// //     .select("id, doctor_services!inner(service_id)")
// //     .eq("clinic_id", clinic_id)
// //     .eq("is_available", true)
// //     .eq("doctor_services.service_id", service_id);

// //   if (!doctors || doctors.length === 0) {
// //     return Response.json([]);
// //   }

// //   const doctorIds = doctors.map(d => d.id);

// //   /* =========================
// //      3. SCHEDULE trong ngày
// //   ========================= */
// //   const { data: schedules } = await supabaseAdmin
// //     .from("doctor_schedules")
// //     .select("doctor_id, start_time, end_time, max_patients")
// //     .eq("date", date)
// //     .eq("is_available", true)
// //     .in("doctor_id", doctorIds);

// //   if (!schedules || schedules.length === 0) {
// //     return Response.json([]);
// //   }

// //   /* =========================
// //      4. BOOKINGS (pending + paid)
// //   ========================= */
// //   const { data: bookings } = await supabaseAdmin
// //     .from("bookings")
// //     .select("booking_time")
// //     .eq("clinic_id", clinic_id)
// //     .eq("service_id", service_id)
// //     .in("status", ["pending", "paid"])
// //     .gte("booking_time", `${date} 00:00:00`)
// //     .lte("booking_time", `${date} 23:59:59`);

// //   const bookedByTime = new Map<string, number>();
// //   for (const b of bookings ?? []) {
// //     const t = String(b.booking_time).slice(11, 16);
// //     bookedByTime.set(t, (bookedByTime.get(t) ?? 0) + 1);
// //   }

// //   /* =========================
// //      5. TÍNH SLOT THEO CAPACITY
// //   ========================= */
// //   const capacityByTime = new Map<string, number>();

// //   for (const s of schedules) {
// //     const start = timeToMinutes(String(s.start_time));
// //     const end = timeToMinutes(String(s.end_time));
// //     const cap = s.max_patients ?? 0;

// //     for (let t = start; t + duration <= end; t += duration) {
// //       const hhmm = minutesToHHMM(t);
// //       capacityByTime.set(hhmm, (capacityByTime.get(hhmm) ?? 0) + cap);
// //     }
// //   }

// //   const result: SlotStat[] = Array.from(capacityByTime.entries())
// //     .map(([time, capacity]) => {
// //       const booked = bookedByTime.get(time) ?? 0;
// //       return {
// //         time,
// //         capacity,
// //         booked,
// //         available: Math.max(capacity - booked, 0),
// //       };
// //     })
// //     .filter(s => s.available > 0)
// //     .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

// //   return Response.json(result);
// // }


// import { supabaseAdmin } from "@/app/lib/supabase/admin";

// type SlotStat = {
//   time: string;       // "HH:mm"
//   capacity: number;   // tổng max_patients của ca
//   booked: number;     // số booking trong ca
//   available: number; // capacity - booked
// };

// /* ======================
//    TIME HELPERS
// ====================== */

// function timeToMinutes(t: string) {
//   const [h, m] = t.split(":");
//   return Number(h) * 60 + Number(m);
// }

// function minutesToHHMM(mins: number) {
//   const h = Math.floor(mins / 60).toString().padStart(2, "0");
//   const m = (mins % 60).toString().padStart(2, "0");
//   return `${h}:${m}`;
// }

// function isTimeInSchedule(
//   time: string,
//   start: string,
//   end: string
// ) {
//   const t = timeToMinutes(time);
//   return (
//     t >= timeToMinutes(start) &&
//     t < timeToMinutes(end)
//   );
// }

// /* ======================
//    API
// ====================== */

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const clinic_id = searchParams.get("clinic_id");
//     const service_id = searchParams.get("service_id");
//     const date = searchParams.get("date"); // YYYY-MM-DD

//     if (!clinic_id || !service_id || !date) {
//       return Response.json([], { status: 200 });
//     }

//     /* ======================
//        1. SERVICE duration
//     ====================== */
//     const { data: service, error: serviceErr } =
//       await supabaseAdmin
//         .from("services")
//         .select("duration_minutes")
//         .eq("id", service_id)
//         .single();

//     if (serviceErr || !service) {
//       return Response.json([], { status: 200 });
//     }

//     const duration = service.duration_minutes ?? 30;

//     /* ======================
//        2. DOCTORS đúng clinic + đúng service
//     ====================== */
//     const { data: doctors } = await supabaseAdmin
//       .from("doctors")
//       .select("id, doctor_services!inner(service_id)")
//       .eq("clinic_id", clinic_id)
//       .eq("is_available", true)
//       .eq("doctor_services.service_id", service_id);

//     if (!doctors || doctors.length === 0) {
//       return Response.json([]);
//     }

//     const doctorIds = doctors.map((d) => d.id);

//     /* ======================
//        3. SCHEDULE trong ngày
//     ====================== */
//     const { data: schedules } = await supabaseAdmin
//       .from("doctor_schedules")
//       .select("doctor_id, start_time, end_time, max_patients")
//       .eq("date", date)
//       .eq("is_available", true)
//       .in("doctor_id", doctorIds);

//     if (!schedules || schedules.length === 0) {
//       return Response.json([]);
//     }

//     /* ======================
//        4. BOOKINGS (pending + paid)
//        → TRỪ THEO CA
//     ====================== */
//     const { data: bookings } = await supabaseAdmin
//       .from("bookings")
//       .select("booking_time")
//       .eq("clinic_id", clinic_id)
//       .eq("service_id", service_id)
//       .in("status", ["pending", "paid"])
//       .gte("booking_time", `${date} 00:00:00`)
//       .lte("booking_time", `${date} 23:59:59`);

//     // đếm booking theo từng schedule
//     const bookedBySchedule = new Map<number, number>();
//     schedules.forEach((_, i) => bookedBySchedule.set(i, 0));

//     for (const b of bookings ?? []) {
//       const time = String(b.booking_time).slice(11, 16);

//       schedules.forEach((sch, idx) => {
//         if (
//           isTimeInSchedule(
//             time,
//             String(sch.start_time),
//             String(sch.end_time)
//           )
//         ) {
//           bookedBySchedule.set(
//             idx,
//             (bookedBySchedule.get(idx) ?? 0) + 1
//           );
//         }
//       });
//     }

//     /* ======================
//        5. SINH SLOT THEO CA
//     ====================== */
//     const result: SlotStat[] = [];

//     schedules.forEach((sch, idx) => {
//       const start = timeToMinutes(String(sch.start_time));
//       const end = timeToMinutes(String(sch.end_time));
//       const capacity = sch.max_patients ?? 0;
//       const booked = bookedBySchedule.get(idx) ?? 0;
//       const available = Math.max(capacity - booked, 0);

//       if (available <= 0) return;

//       for (let t = start; t + duration <= end; t += duration) {
//         result.push({
//           time: minutesToHHMM(t),
//           capacity,
//           booked,
//           available,
//         });
//       }
//     });

//     return Response.json(
//       result.sort(
//         (a, b) => timeToMinutes(a.time) - timeToMinutes(b.time)
//       )
//     );
//   } catch (err) {
//     console.error("AVAILABLE SLOTS ERROR:", err);
//     return Response.json([], { status: 500 });
//   }
// }

import { supabaseAdmin } from "@/app/lib/supabase/admin";

type SlotStat = {
  time: string; // "HH:mm"
  capacity: number;
  booked: number;
  available: number;
};

function timeToMinutes(t: string) {
  // "08:00:00" | "08:00"
  const [hh, mm] = t.split(":");
  return Number(hh) * 60 + Number(mm);
}

function minutesToHHMM(mins: number) {
  const hh = String(Math.floor(mins / 60)).padStart(2, "0");
  const mm = String(mins % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clinic_id = searchParams.get("clinic_id");
    const service_id = searchParams.get("service_id");
    const date = searchParams.get("date"); // YYYY-MM-DD

    if (!clinic_id || !service_id || !date) {
      return Response.json({ error: "Missing query params" }, { status: 400 });
    }

    // 1) duration
    const { data: service, error: serviceErr } = await supabaseAdmin
      .from("services")
      .select("duration_minutes")
      .eq("id", service_id)
      .single();

    if (serviceErr || !service) {
      return Response.json({ error: "Service not found" }, { status: 404 });
    }
    const duration = service.duration_minutes ?? 30;

    // 2) doctors đúng clinic + đúng service
    const { data: doctors, error: docErr } = await supabaseAdmin
      .from("doctors")
      .select("id, doctor_services!inner(service_id)")
      .eq("clinic_id", clinic_id)
      .eq("is_available", true)
      .eq("doctor_services.service_id", service_id);

    if (docErr) {
      return Response.json({ error: docErr.message }, { status: 500 });
    }
    if (!doctors?.length) return Response.json([]);

    const doctorIds = doctors.map((d) => d.id);

    // 3) schedules trong ngày
    const { data: schedules, error: schErr } = await supabaseAdmin
      .from("doctor_schedules")
      .select("doctor_id, start_time, end_time, max_patients")
      .eq("date", date)
      .eq("is_available", true)
      .in("doctor_id", doctorIds);

    if (schErr) {
      return Response.json({ error: schErr.message }, { status: 500 });
    }
    if (!schedules?.length) return Response.json([]);

    // 4) bookings trong ngày (pending+paid) theo clinic+service
    const { data: bookings, error: bookErr } = await supabaseAdmin
      .from("bookings")
      .select("booking_time")
      .eq("clinic_id", clinic_id)
      .eq("service_id", service_id)
      .in("status", ["pending", "paid"])
      .gte("booking_time", `${date} 00:00:00`)
      .lte("booking_time", `${date} 23:59:59`);

    if (bookErr) {
      return Response.json({ error: bookErr.message }, { status: 500 });
    }

    // booked per slot
    const bookedByTime = new Map<string, number>();
    for (const b of bookings ?? []) {
      const hhmm = String(b.booking_time).slice(11, 16); // timestamp no tz => safe
      bookedByTime.set(hhmm, (bookedByTime.get(hhmm) ?? 0) + 1);
    }

    // 5) capacity per slot
    const capacityByTime = new Map<string, number>();

    for (const s of schedules) {
      const start = timeToMinutes(String(s.start_time));
      const end = timeToMinutes(String(s.end_time));
      const capPerSlot = s.max_patients ?? 0;

      for (let t = start; t + duration <= end; t += duration) {
        const hhmm = minutesToHHMM(t);
        capacityByTime.set(hhmm, (capacityByTime.get(hhmm) ?? 0) + capPerSlot);
      }
    }

    const result: SlotStat[] = Array.from(capacityByTime.entries())
      .map(([time, capacity]) => {
        const booked = bookedByTime.get(time) ?? 0;
        const available = Math.max(capacity - booked, 0);
        return { time, capacity, booked, available };
      })
      .filter((s) => s.available > 0)
      .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

    return Response.json(result);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

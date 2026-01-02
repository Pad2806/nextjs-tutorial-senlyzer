import { supabaseAdmin } from "@/app/lib/supabase/admin";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const clinic_id = searchParams.get("clinic_id");
    const service_id = searchParams.get("service_id");

    if (!clinic_id || !service_id) {
        return Response.json([], { status: 400 });
    }

    // Get doctors available for this clinic and service
    const { data: doctors, error } = await supabaseAdmin
        .from("doctors")
        .select("id, name, doctor_services!inner(service_id)")
        .eq("clinic_id", clinic_id)
        .eq("is_available", true)
        .eq("doctor_services.service_id", service_id);

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(doctors ?? []);
}

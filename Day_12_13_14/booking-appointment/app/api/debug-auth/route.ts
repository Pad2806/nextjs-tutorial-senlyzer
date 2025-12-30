import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/admin";

export async function GET() {
    try {
        const dummyUser = {
            email: "debug_test_" + Date.now() + "@example.com",
            name: "Debug User",
            provider: "google",
            provider_id: "debug_123",
            avatar_url: "https://example.com/avatar.jpg",
            is_active: true,
        };

        const { data, error } = await supabaseAdmin
            .from("users")
            .upsert(dummyUser, { onConflict: "email" })
            .select();

        if (error) {
            return NextResponse.json({
                status: "Error",
                message: error.message,
                details: error,
            }, { status: 500 });
        }

        return NextResponse.json({
            status: "Success",
            message: "Users table has correct columns. Upsert worked.",
            data,
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "Exception",
            message: err.message,
        }, { status: 500 });
    }
}

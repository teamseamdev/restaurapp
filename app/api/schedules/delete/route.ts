import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(
  req: Request
) {
  try {
    const { scheduleId } =
      await req.json();

    const { error } =
      await supabaseAdmin
        .from("schedules")
        .delete()
        .eq("id", scheduleId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
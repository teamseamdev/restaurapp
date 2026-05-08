import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const {
      scheduleId,
      start_time,
      end_time,
      position,
    } = body;

    const { error } =
      await supabaseAdmin
        .from("schedules")
        .update({
          start_time,
          end_time,
          position,
        })
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
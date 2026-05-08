import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } =
    await supabaseAdmin
      .from("schedules")
      .select(`
        *,
        profiles (
          full_name
        )
      `)
      .order("shift_date", {
        ascending: true,
      });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const {
      employee_id,
      shift_date,
      start_time,
      end_time,
      position,
      notes,
    } = body;

    const { error } =
      await supabaseAdmin
        .from("schedules")
        .insert({
          employee_id,
          shift_date,
          start_time,
          end_time,
          position,
          notes,
        });

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
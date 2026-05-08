import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function generatePassword() {
  return Math.random().toString(36).slice(-10);
}

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const tempPassword =
      generatePassword();

    const { error } =
      await supabaseAdmin.auth.admin.updateUserById(
        userId,
        {
          password: tempPassword,
        }
      );

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    await supabaseAdmin
      .from("profiles")
      .update({
        must_change_password: true,
      })
      .eq("id", userId);

    return NextResponse.json({
      success: true,
      tempPassword,
    });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { resend } from "@/lib/resend";

function generatePassword() {
  return Math.random().toString(36).slice(-10);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, full_name, role } = body;

    const tempPassword = generatePassword();

    const { data, error } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    await supabaseAdmin
      .from("profiles")
      .update({
        full_name,
        role,
      })
      .eq("id", data.user.id);

     const emailResult =
  await resend.emails.send({
    from:
      "RestaurApp <onboarding@resend.dev>",

    to: email,

    subject:
      "Your RestaurApp Staff Account",

    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h1>Welcome to RestaurApp</h1>

        <p>Your employee account has been created.</p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Temporary Password:</strong> ${tempPassword}
        </p>

        <p>
          Please login and change your password immediately.
        </p>
      </div>
    `,
  });

console.log(
  "EMAIL RESULT:",
  emailResult
);

    return NextResponse.json({
      success: true,
      tempPassword,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
"use client";

import { useState } from "react";

export default function CreateEmployeeForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] =
    useState("");

  const [role, setRole] =
    useState("staff");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(
      "/api/admin/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          full_name: fullName,
          role,
        }),
      }
    );

    const data = await res.json();

    setLoading(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    alert(
      "Employee account created and onboarding email sent."
    );

    setEmail("");
    setFullName("");
    setRole("staff");
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-semibold">
        Add Employee
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Create employee accounts and send
        onboarding emails automatically.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-orange-500"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-orange-500"
          required
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-orange-500"
        >
          <option value="staff">
            Staff
          </option>

          <option value="manager">
            Manager
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-orange-600 py-3 font-medium transition hover:bg-orange-500 disabled:opacity-50"
        >
          {loading
            ? "Creating Employee..."
            : "Create Employee"}
        </button>
      </form>
    </div>
  );
}
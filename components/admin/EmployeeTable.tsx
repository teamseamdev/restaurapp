"use client";

import { useEffect, useState } from "react";

type Employee = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

export default function EmployeeTable() {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  async function fetchEmployees() {
    const res = await fetch(
      "/api/admin/employees"
    );

    const data = await res.json();

    setEmployees(data);
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function handleDelete(
    userId: string
  ) {
    const confirmed = confirm(
      "Delete this employee?"
    );

    if (!confirmed) return;

    const res = await fetch(
      "/api/admin/delete-user",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    fetchEmployees();
  }

  async function handleResetPassword(
    userId: string
  ) {
    const res = await fetch(
      "/api/admin/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    alert(
      `Temporary Password: ${data.tempPassword}`
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Employees
        </h2>

        <span className="text-sm text-zinc-400">
          {employees.length} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-zinc-800 text-zinc-400">
            <tr>
              <th className="pb-4">
                Name
              </th>

              <th className="pb-4">
                Email
              </th>

              <th className="pb-4">
                Role
              </th>

              <th className="pb-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-zinc-800"
              >
                <td className="py-4">
                  {employee.full_name ||
                    "Unnamed"}
                </td>

                <td className="py-4 text-zinc-400">
                  {employee.email}
                </td>

                <td className="py-4">
  <select
    value={employee.role}
    onChange={async (e) => {
      const role = e.target.value;

      const res = await fetch(
        "/api/admin/update-role",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: employee.id,
            role,
          }),
        }
      );

      const data =
        await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      fetchEmployees();
    }}
    className="rounded-lg border border-zinc-700 bg-black px-3 py-2"
  >
    <option value="staff">
      Staff
    </option>

    <option value="admin">
      Admin
    </option>

    <option value="manager">
      Manager
    </option>
  </select>
</td>

                <td className="py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleResetPassword(
                          employee.id
                        )
                      }
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm"
                    >
                      Reset Password
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          employee.id
                        )
                      }
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
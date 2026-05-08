"use client";

import { useState } from "react";

import AuthGuard from "@/components/staff/AuthGuard";

import CreateEmployeeForm from "@/components/admin/CreateEmployeeForm";

import EmployeeTable from "@/components/admin/EmployeeTable";

import ScheduleManager from "@/components/admin/ScheduleManager";

export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] =
    useState("employees");

  return (
    <AuthGuard>
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-5xl font-bold">
                Admin Dashboard
              </h1>

              <p className="mt-4 text-zinc-400">
                Restaurant management tools and employee administration.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm text-zinc-400">
              Management Portal
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <button
              onClick={() =>
                setActiveSection(
                  "employees"
                )
              }
              className={`rounded-3xl border p-6 text-left transition ${
                activeSection ===
                "employees"
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <h2 className="text-2xl font-semibold">
                Employees
              </h2>

              <p className="mt-3 text-zinc-400">
                Manage staff accounts and permissions.
              </p>
            </button>

            <button
              onClick={() =>
                setActiveSection(
                  "schedule"
                )
              }
              className={`rounded-3xl border p-6 text-left transition ${
                activeSection ===
                "schedule"
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <h2 className="text-2xl font-semibold">
                Schedule
              </h2>

              <p className="mt-3 text-zinc-400">
                Create and edit employee shifts.
              </p>
            </button>

            <button
              onClick={() =>
                setActiveSection("menu")
              }
              className={`rounded-3xl border p-6 text-left transition ${
                activeSection ===
                "menu"
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <h2 className="text-2xl font-semibold">
                Menu Manager
              </h2>

              <p className="mt-3 text-zinc-400">
                Edit menu items and pricing.
              </p>
            </button>

            <button
              onClick={() =>
                setActiveSection(
                  "analytics"
                )
              }
              className={`rounded-3xl border p-6 text-left transition ${
                activeSection ===
                "analytics"
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <h2 className="text-2xl font-semibold">
                Analytics
              </h2>

              <p className="mt-3 text-zinc-400">
                Track restaurant insights.
              </p>
            </button>
          </div>

          <div className="mt-8">
            {activeSection ===
              "employees" && (
              <div className="grid gap-6 xl:grid-cols-4">
                <div className="xl:col-span-3">
                  <EmployeeTable />
                </div>

                <div>
                  <CreateEmployeeForm />
                </div>
              </div>
            )}

            {activeSection ===
              "schedule" && (
              <ScheduleManager />
            )}

            {activeSection === "menu" && (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
                <h2 className="text-3xl font-bold">
                  Menu Manager
                </h2>

                <p className="mt-4 text-zinc-400">
                  Menu management tools coming soon.
                </p>
              </div>
            )}

            {activeSection ===
              "analytics" && (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
                <h2 className="text-3xl font-bold">
                  Analytics
                </h2>

                <p className="mt-4 text-zinc-400">
                  Restaurant analytics dashboard coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
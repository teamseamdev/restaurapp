import AuthGuard from "@/components/staff/AuthGuard";

export default function StaffDashboardPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-black p-8 text-white">
        <h1 className="text-5xl font-bold">
          Staff Dashboard
        </h1>

        <p className="mt-4 text-zinc-400">
          Welcome back.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">
              Schedule
            </h2>

            <p className="mt-3 text-zinc-400">
              View upcoming shifts.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">
              Announcements
            </h2>

            <p className="mt-3 text-zinc-400">
              Restaurant updates and notices.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">
              Staff Chat
            </h2>

            <p className="mt-3 text-zinc-400">
              Communicate with coworkers.
            </p>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
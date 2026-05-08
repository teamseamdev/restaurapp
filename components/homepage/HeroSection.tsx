import theme from "@/config/theme";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />

      <div className="relative z-10 max-w-4xl text-center">
        <h1 className="text-6xl font-bold tracking-tight md:text-8xl">
          {theme.restaurantName}
        </h1>

        <p className="mt-6 text-xl text-zinc-300 md:text-2xl">
          {theme.tagline}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
              href="/menu"
              className="rounded-full bg-orange-600 px-8 py-4 font-medium transition hover:bg-orange-500"
            >
              View Menu
            </Link>

          <button className="rounded-full border border-zinc-600 px-8 py-4 font-medium transition hover:bg-zinc-900">
            Order Online
          </button>
        </div>
      </div>
    </section>
  );
}
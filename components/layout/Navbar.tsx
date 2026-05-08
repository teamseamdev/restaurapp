import theme from "@/config/theme";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">
          {theme.restaurantName}
        </h1>

        <div className="flex gap-6 text-sm text-zinc-300">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <Link href="/staff/login">Staff</Link>
        </div>
      </div>
    </nav>
  );
}
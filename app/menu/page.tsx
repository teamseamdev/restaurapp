import Navbar from "@/components/layout/Navbar";
import MenuSection from "@/components/menu/MenuSection";
import { menu } from "@/data/menu";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h1 className="text-7xl font-bold">
            Our Menu
          </h1>

          <p className="mt-6 text-xl text-zinc-400">
            Crafted fresh with quality ingredients.
          </p>
        </div>

        {menu.map((section) => (
          <MenuSection
            key={section.category}
            category={section.category}
            items={section.items}
          />
        ))}
      </div>
    </main>
  );
}
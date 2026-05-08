export default function AboutSection() {
  return (
    <section className="bg-black px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-5xl font-bold">
            Crafted With Passion
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Every restaurant has a story. RestaurApp helps bring
            that story online with modern design, dynamic menus,
            and staff management tools.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant Interior"
            className="rounded-3xl object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
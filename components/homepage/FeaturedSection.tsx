const featuredItems = [
  {
    name: "Signature Burger",
    description: "Double smashed patties, cheddar, house sauce.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop",
  },
  {
    name: "Wood Fired Pizza",
    description: "Fresh mozzarella, basil, tomato sauce.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Craft Cocktails",
    description: "House-made syrups and fresh ingredients.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function FeaturedSection() {
  return (
    <section className="bg-zinc-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-bold">Featured Favorites</h2>

          <p className="mt-4 text-zinc-400">
            Popular dishes your customers will love.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featuredItems.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold">
                  {item.name}
                </h3>

                <p className="mt-3 text-zinc-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
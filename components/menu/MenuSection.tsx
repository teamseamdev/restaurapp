import MenuCard from "./MenuCard";

type Item = {
  name: string;
  description: string;
  price: string;
  image: string;
};

type MenuSectionProps = {
  category: string;
  items: Item[];
};

export default function MenuSection({
  category,
  items,
}: MenuSectionProps) {
  return (
    <section className="py-20">
      <div className="mb-10">
        <h2 className="text-5xl font-bold">
          {category}
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <MenuCard
            key={item.name}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
}
type MenuCardProps = {
  name: string;
  description: string;
  price: string;
  image: string;
};

export default function MenuCard({
  name,
  description,
  price,
  image,
}: MenuCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
      <img
        src={image}
        alt={name}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-semibold">
            {name}
          </h3>

          <span className="text-lg font-medium text-orange-500">
            {price}
          </span>
        </div>

        <p className="mt-3 text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}
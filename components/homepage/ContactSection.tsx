import theme from "@/config/theme";

export default function ContactSection() {
  return (
    <section className="bg-zinc-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-5xl font-bold">
          Visit Us
        </h2>

        <div className="mt-10 space-y-4 text-lg text-zinc-300">
          <p>{theme.contact.address}</p>
          <p>{theme.contact.phone}</p>
          <p>{theme.contact.email}</p>
        </div>
      </div>
    </section>
  );
}
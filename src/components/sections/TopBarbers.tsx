export default function TopBarbers() {
  const barbers = [
    { name: "Thịnh Barber", rating: 5.0, image: "/barber4.png" },
    { name: "Hoang Master", rating: 5.0, image: "/barber1.png" },
    { name: "Huy Bro", rating: 4.8, image: "/barber2.png" },
    { name: "Quoc Style", rating: 4.9, image: "/barber3.png" },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Top Thợ Cắt Tóc</h2>
        <p className="text-center text-text-secondary mb-12">
          Đội ngũ thợ lành nghề nhất
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {barbers.map((b) => (
            <div key={b.name} className="text-center group">
              <div className="w-48 h-48 mx-auto overflow-hidden rounded-full mb-4">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              </div>
              <h3 className="font-semibold text-lg">{b.name}</h3>
              <p className="text-accent">⭐ {b.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

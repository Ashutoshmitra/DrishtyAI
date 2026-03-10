const logos = [
  "TCS", "Infosys", "Wipro", "HCL Tech", "Accenture",
  "Cognizant", "Tech Mahindra", "L&T Infotech", "Mphasis", "Mindtree",
];

export default function LogoCarousel() {
  return (
    <section className="py-8 overflow-hidden">
      <div
        className="flex items-center gap-16"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="logo-carousel flex items-center gap-16 shrink-0">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="text-lg font-semibold text-gray-300 whitespace-nowrap select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

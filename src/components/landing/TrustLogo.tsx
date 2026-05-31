const COMPANIES = ["Google", "Goldman Sachs", "Pfizer", "SpaceX", " Amazon"];

export default function TrustLogo() {
  return (
    <div className="py-8 px-4 text-center">
      {/* label */}

      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-6 ">
        Trusted by candidates applying to
      </p>

      {/* Logo row */}

      <div className="flex items-center justify-center flex-wrap gap-8">
        {COMPANIES.map((company) => (
          <span
            key={company}
            className="text-sm font-semibold text-gray-300 tracking-tight hover:text-gray-400 transition-colors"
          >
            {company}
          </span>
        ))}
      </div>
    </div>
  );
}

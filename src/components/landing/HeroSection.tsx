export default function HeroSection() {
  return (
    <div className="w-full text-center px-6 ">
      {/* Headline */}

      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6  ">
        Optimize Your Resume
        <br />
        <span className="text-blue-600">for AI Filters</span>
      </h1>

      {/* subtitle */}

      <p
        className="text-base sm:text-[16px] text-gray-500 leading-relaxed"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        Beat the Applicant Tracking Systems with intelligence. Upload your
        resume, paste a job description — get your ATS score, missing keywords,
        and a full rewrite in seconds.
      </p>
    </div>
  );
}

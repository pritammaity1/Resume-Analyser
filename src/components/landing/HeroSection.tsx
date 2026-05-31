import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="text-center py-14 px-4">
      {/* Badge */}

      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-blue-50 border border-blue-200 rounded-full">
        <Sparkles size={13} className="text-blue-500" />
        <span className="text-xs font-medium text-blue-600">
          Powered By Google Gemini AI
        </span>
      </div>

      {/* Headline */}

      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
        Optimize Your Resume
        <br />
        <span className="text-blue-600">for AI filters</span>
      </h1>

      {/* subtitle */}

      <p className="text-base sm:text-lg text0gray-500 max-w-xl mx-auto leading-relaxed mb-8">
        Beat the Applicant Tracking Systems with intelligence. Upload your
        resume, paste a job description — get your ATS score, missing keywords,
        and a full rewrite in seconds.
      </p>
      {/* Stats row */}
      <div
        className="flex items-center justify-center
                      gap-8 flex-wrap"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">Free</p>
          <p className="text-xs text-gray-400 mt-0.5">no account needed</p>
        </div>
        <div className="w-px h-8 bg-gray-200 hidden sm:block" />
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">15s</p>
          <p className="text-xs text-gray-400 mt-0.5">avg analysis time</p>
        </div>
        <div className="w-px h-8 bg-gray-200 hidden sm:block" />
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">AI</p>
          <p className="text-xs text-gray-400 mt-0.5">powered rewrite</p>
        </div>
      </div>
    </div>
  );
}

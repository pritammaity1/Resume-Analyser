import { Upload, Cpu, Sparkles } from "lucide-react";

const STEPS = [
  {
    number: "1",
    icon: Upload,
    title: "Upload",
    desc: "Drop your resume and paste an optional job description into our secure analyzer. ",
    color: "bg-blue-50 text-blue-500",
    border: "border-blue-200",
  },
  {
    number: "2",
    icon: Cpu,
    title: "Analyze",
    desc: "Our AI scans your content against industry-standard ATS filters and keyword benchmarks.",
    color: "bg-violet-50 text-violet-600",
    border: "border-violet-200",
  },
  {
    number: "3",
    icon: Sparkles,
    title: "Optimize",
    desc: "Get a detailed score, missing keywords, and a tailored rewrite to boost your match rate.",
    color: "bg-green-50 text-green-600",
    border: "border-green-200",
  },
];

export default function HowItWorks() {
  return (
    <div className="py-12 px-4">
      {/* section heading */}

      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 tracking-tight">
        Three Steps to Optimization
      </h2>

      {/* Steps Grid */}

      <div className="grid grid-cols-1 sm:grid-cols03 gap-6 max-w-3xl mx-auto">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={`relative bg-white border rounded-xl p-6 shadow-sm ${step.border} `}
            >
              {/* step number badge */}

              <div className="absolute -top-3 -left-3 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                {step.number}
              </div>

              {/* Icon */}

              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${step.color}`}
              >
                <Icon size={20} />
              </div>

              {/* Title */}

              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}

              <p className="text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

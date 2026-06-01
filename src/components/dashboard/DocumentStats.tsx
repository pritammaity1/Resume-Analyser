import { FileText, BookOpen, Briefcase } from "lucide-react";
import type { DocumentStatsProps } from "@/types";

export default function DocumentStats({ stats }: DocumentStatsProps) {
  const items = [
    {
      icon: <FileText size={16} className="text-blue-600" />,
      bg: "bg-blue-50",
      label: "Word Count",
      value: stats.word_count.toLocaleString(),
      sub: "words",
    },
    {
      icon: <BookOpen size={16} className="text-amber-500" />,
      bg: "bg-amber-50",
      label: "Reading Level",
      value: stats.reading_level,
      sub: null,
    },
    {
      icon: <Briefcase size={16} className="text-green-600" />,
      bg: "bg-green-50",
      label: "Experience",
      value: String(stats.experience_years),
      sub: stats.experience_years === 1 ? "year" : "years",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
          <FileText size={16} className="text-gray-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Document Stats
          </h3>
          <p className="text-xs text-gray-400">Extracted from your resume</p>
        </div>
      </div>

      {/* Stats — always 3 columns */}
      <div className="grid grid-cols-3 gap-3 flex-1">
        {items.map(({ icon, bg, label, value, sub }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-4 text-center"
          >
            <div
              className={
                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 " +
                bg
              }
            >
              {icon}
            </div>
            <div>
              <div className="text-base font-extrabold text-gray-900 leading-tight">
                {value}
                {sub && (
                  <span className="text-xs font-medium text-gray-400 ml-1">
                    {sub}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

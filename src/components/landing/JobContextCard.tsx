import { Briefcase, X } from "lucide-react";
import type { JobContextCardProps } from "@/types";

export default function JobContextCard({
  value,
  onChange,
  onAnalyze,
  isLoading,
  isDisabled,
}: JobContextCardProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
      <div className="bg-white items-center justify-between mb-3 ">
        <div className="flex items-center gap-2">
          <Briefcase size={15} className="text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">Job Context</h3>
        </div>

        <span className="text-xs text-gray-400">Optional</span>
      </div>

      <div className="relative flex-1 mb-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description here for a targeted match score and tailored rewrite... "
          className="w-full h-full min-h-45 resize-none text-sm text-gray-700 placeholder:text-gray-300 border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
        />

        {/* clear button */}
        {value && (
          <button
            className="absolue top-2 right-2 p-1 rounded text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => onChange("")}
            type="button"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Footer - word count + analyze button */}

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-gray-400">
          {wordCount > 0 ? `${wordCount} Words` : "No text yet"}
        </span>

        {/* Analyze Button */}
        <button
          type="button"
          onClick={onAnalyze}
          disabled={isDisabled || isLoading}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${isDisabled || isLoading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"}`}
        >
          {isLoading ? "Analyzing..." : "Analyze Now ->"}
        </button>
      </div>
    </div>
  );
}

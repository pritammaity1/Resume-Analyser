import { Briefcase } from "lucide-react";
import type { JobDescPanelProps } from "@/types";

export default function JobDescPanel({
  jobDescription,
  matchedKeywords,
}: JobDescPanelProps) {
  // highlight matched keywords inside job description
  const buildHighlighted = () => {
    if (!jobDescription) return [];

    if (!matchedKeywords || matchedKeywords.length === 0) {
      return [{ text: jobDescription, type: "plain" as const }];
    }

    const pattern = matchedKeywords
      .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");

    const regex = new RegExp("(" + pattern + ")", "gi");
    const tokens = jobDescription.split(regex);

    return tokens.map((token) => {
      const isMatch = matchedKeywords.some(
        (k) => k.toLowerCase() === token.toLowerCase(),
      );
      return {
        text: token,
        type: isMatch ? ("matched" as const) : ("plain" as const),
      };
    });
  };

  const parts = buildHighlighted();

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Briefcase size={15} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Job Description
            </h3>
            <p className="text-xs text-gray-400">
              Matched keywords highlighted
            </p>
          </div>
        </div>

        {/* matched count */}
        {matchedKeywords.length > 0 && (
          <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
            {matchedKeywords.length} matched
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 max-h-96">
        {jobDescription ? (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {parts.map((part, i) =>
              part.type === "matched" ? (
                <mark
                  key={i}
                  className="bg-blue-100 text-blue-800 rounded px-0.5 font-medium"
                  style={{ textDecoration: "none" }}
                >
                  {part.text}
                </mark>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic">
            No job description provided.
          </p>
        )}
      </div>
    </div>
  );
}

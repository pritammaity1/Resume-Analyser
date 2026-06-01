import { FileText } from "lucide-react";
import type { ResumePreviewProps } from "@/types";

export default function ResumePreview({
  resumeText,
  matchedKeyWords,
  missingKeyWord,
}: ResumePreviewProps) {
  // highlight matched and missing keywords in the resume text

  const buildHighlighted = () => {
    if (!resumeText) return [];

    const allKeyWords = [
      ...matchedKeyWords.map((k) => ({ word: k, type: "matched" as const })),
      ...missingKeyWord.map((k) => ({ word: k, type: "missing" as const })),
    ];

    //split text into parts, tagging keyword match

    const parts: { text: string; type: "plain" | "matched" | "missing" }[] = [];

    // simple word-boundary highlight

    const pattern = allKeyWords
      .map((k) => k.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    if (!pattern) {
      return [{ text: resumeText, type: "plain" as const }];
    }
    const regex = new RegExp(`(${pattern})`, "gi");
    const tokens = resumeText.split(regex);

    tokens.forEach((token) => {
      const matched = matchedKeyWords.find(
        (k) => k.toLowerCase() === token.toLowerCase(),
      );
      const missing = missingKeyWord.find(
        (k) => k.toLowerCase() === token.toLowerCase(),
      );
      if (matched) {
        parts.push({ text: token, type: "matched" });
      } else if (missing) {
        parts.push({ text: token, type: "missing" });
      } else {
        parts.push({ text: token, type: "plain" });
      }
    });
    return parts;
  };

  const parts = buildHighlighted();

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <FileText size={15} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Resume Preview
            </h3>
            <p className="text-xs text-gray-400">Keywords highlighted</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-green-200 inline-block" />
            Matched
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-200 inline-block" />
            Missing
          </span>
        </div>
      </div>

      {/* Text body */}
      <div className="flex-1 overflow-y-auto p-5 max-h-96">
        {resumeText ? (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {parts.map((part, i) => {
              if (part.type === "matched") {
                return (
                  <mark
                    key={i}
                    className="bg-green-100 text-green-800 rounded px-0.5 font-medium"
                    style={{ textDecoration: "none" }}
                  >
                    {part.text}
                  </mark>
                );
              }
              if (part.type === "missing") {
                return (
                  <mark
                    key={i}
                    className="bg-red-100 text-red-700 rounded px-0.5 font-medium"
                    style={{ textDecoration: "none" }}
                  >
                    {part.text}
                  </mark>
                );
              }
              return <span key={i}>{part.text}</span>;
            })}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic">
            No resume text available.
          </p>
        )}
      </div>
    </div>
  );
}

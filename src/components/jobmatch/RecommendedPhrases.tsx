import { useState } from "react";
import { Sparkles, Copy, CheckCheck } from "lucide-react";
import toast from "react-hot-toast";
import type { RecommendedPhrasePros } from "@/types";

export default function RecommendedPhrases({ phrase }: RecommendedPhrasePros) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!phrase || phrase.length === 0) return null;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      toast.success("Phrase copied!");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Could not copy.");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-violet-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Recommended Phrases
          </h3>
          <p className="text-xs text-gray-400">
            Click to copy and add to your resume
          </p>
        </div>
      </div>

      {/* Phrase list */}
      <ul className="flex flex-col gap-2.5">
        {phrase.map((item, i) => (
          <li
            key={i}
            className="flex items-start justify-between gap-3 px-3 py-3 bg-gray-50 border border-gray-100 rounded-lg group hover:border-violet-200 hover:bg-violet-50 transition-colors"
          >
            <div className="flex flex-col gap-0.5 flex-1">
              {/* label */}
              <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">
                {item.label}
              </span>
              {/* phrase */}
              <span className="text-sm text-gray-700 leading-relaxed">
                {item.phrase}
              </span>
            </div>

            {/* copy button */}
            <button
              onClick={() => handleCopy(item.phrase)}
              className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-100 transition-colors mt-0.5"
              title="Copy phrase"
            >
              {copied === item.phrase ? (
                <CheckCheck size={14} className="text-green-500" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

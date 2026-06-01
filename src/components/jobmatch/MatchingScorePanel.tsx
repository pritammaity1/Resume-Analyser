import { Target } from "lucide-react";
import type { MatchScorePanelProps } from "@/types";

function getColor(score: number): string {
  if (score >= 80) return "#28a745";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#fd7e14";
  return "#dc3545";
}

function getLabel(score: number): string {
  if (score >= 80) return "Strong Match";
  if (score >= 60) return "Good Match";
  if (score >= 40) return "Partial Match";
  return "Weak Match";
}

export default function MatchingScorePanel({
  score,
  keywordMatch,
  SoftSkills,
}: MatchScorePanelProps) {
  const color = getColor(score);
  const label = getLabel(score);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <Target size={16} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Match Score</h3>
          <p className="text-xs text-gray-400">vs this job description</p>
        </div>
      </div>

      {/* Big score */}
      <div className="flex items-end gap-3 mb-2">
        <span
          className="text-5xl font-extrabold leading-none tabular-nums"
          style={{ color }}
        >
          {score}
        </span>
        <span className="text-lg text-gray-400 font-medium mb-1">/100</span>
      </div>

      {/* label + bar */}
      <p className="text-xs font-semibold mb-2" style={{ color }}>
        {label}
      </p>
      <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden mb-6">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: score + "%", background: color }}
        />
      </div>

      {/* Matched keywords */}
      {keywordMatch.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Matched Keywords
          </p>
          <div className="flex flex-wrap gap-1.5">
            {keywordMatch.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-0.5 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Soft skills */}
      {SoftSkills.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Soft Skills
          </p>
          <div className="flex flex-col gap-3">
            {SoftSkills.map(({ name, score: skillScore }) => {
              const skillColor = getColor(skillScore);
              return (
                <div key={name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700 font-medium capitalize">
                      {name}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: skillColor }}
                    >
                      {skillScore}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: skillScore + "%",
                        background: skillColor,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

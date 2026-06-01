import { LayoutTemplate } from "lucide-react";
import type { FormattingCardProp } from "@/types";

function getColor(score: number): string {
  if (score >= 80) return "#28a745";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#fd7e14";
  return "#dc3545";
}

function getLabel(score: number): string {
  if (score >= 80) return "Well formatted";
  if (score >= 60) return "Mostly good";
  if (score >= 40) return "Needs work";
  return "Poor formatting";
}

const CHECKS = [
  { label: "Clear section headings", threshold: 60 },
  { label: "Consistent font usage", threshold: 50 },
  { label: "Bullet points used", threshold: 40 },
  { label: "Appropriate resume length", threshold: 55 },
  { label: "No large blocks of text", threshold: 65 },
  { label: "Contact info present", threshold: 30 },
];

export default function FormattingCard({ score }: FormattingCardProp) {
  const color = getColor(score);
  const label = getLabel(score);

  // derive pass/fail for each check based on score
  const checks = CHECKS.map((c) => ({
    label: c.label,
    passed: score >= c.threshold,
  }));

  const passed = checks.filter((c) => c.passed).length;
  const total = checks.length;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <LayoutTemplate size={16} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Formatting</h3>
          <p className="text-xs text-gray-400">Structure & presentation</p>
        </div>
        {/* score */}
        <span className="ml-auto text-lg font-extrabold" style={{ color }}>
          {score}
          <span className="text-xs font-medium text-gray-400">/100</span>
        </span>
      </div>

      {/* Score bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-500">{label}</span>
          <span className="text-xs font-medium text-gray-500">
            {passed}/{total} checks passed
          </span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: score + "%",
              background: color,
            }}
          />
        </div>
      </div>

      {/* Checklist */}
      <ul className="flex flex-col gap-2">
        {checks.map((check) => (
          <li key={check.label} className="flex items-center gap-2.5 text-sm">
            {/* icon */}
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
              style={{ background: check.passed ? "#28a745" : "#dc3545" }}
            >
              {check.passed ? "✓" : "✕"}
            </span>
            <span
              className={
                check.passed ? "text-gray-700" : "text-gray-400 line-through"
              }
            >
              {check.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

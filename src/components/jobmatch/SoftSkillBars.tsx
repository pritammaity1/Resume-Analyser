import { Brain } from "lucide-react";
import type { SoftSkillBarsProps } from "@/types";

function getColor(score: number): string {
  if (score >= 80) return "#28a745";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#fd7e14";
  return "#dc3545";
}

function getLabel(score: number): string {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Weak";
}

export default function SoftSkillBars({ skills }: SoftSkillBarsProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
          <Brain size={16} className="text-amber-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Soft Skills</h3>
          <p className="text-xs text-gray-400">
            Alignment with job requirements
          </p>
        </div>
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-4">
        {skills.map(({ name, score }) => {
          const color = getColor(score);
          const label = getLabel(score);

          return (
            <div key={name}>
              <div className="flex items-center justify-between mb-1.5">
                {/* name */}
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {name}
                </span>

                {/* score + label */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                    style={{
                      background: color + "18",
                      color,
                      borderColor: color + "40",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-sm font-bold tabular-nums"
                    style={{ color }}
                  >
                    {score}
                  </span>
                </div>
              </div>

              {/* bar */}
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
          );
        })}
      </div>
    </div>
  );
}

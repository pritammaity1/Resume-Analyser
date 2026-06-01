import { useEffect, useState } from "react";

import type { ScoreDonutProps } from "@/types";

function getColor(score: number): string {
  if (score >= 80) return "#28a745";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#fd7e14";
  return "#dc3545";
}

function getGrade(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Poor";
}

export default function ScoreDonut({ score, breakdown }: ScoreDonutProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      let current = 0;
      const step = score / 60;
      const interval = setInterval(() => {
        current += step;
        if (current >= score) {
          setAnimated(score);
          clearInterval(interval);
        } else {
          setAnimated(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [score]);

  const SIZE = 160;
  const radius = (SIZE - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getColor(score);
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const dashArray =
    String((animated / 100) * circumference) + " " + String(circumference);

  const breakdownItems = [
    { label: "Keyword Match", value: breakdown.keyword_match },
    { label: "Skills Match", value: breakdown.skills_match },
    { label: "Experience", value: breakdown.experience_relevence },
    { label: "Format", value: breakdown.format_score },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8">
      {/* Donut ring */}
      <div className="flex flex-col items-center gap-3 shrink-0">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg
            width={SIZE}
            height={SIZE}
            style={{ transform: "rotate(-90deg)" }}
          >
            {/* track */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="#e2e3e5"
              strokeWidth={12}
            />
            {/* progress */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={12}
              strokeLinecap="round"
              strokeDasharray={dashArray}
              style={{ transition: "stroke-dasharray 0.05s linear" }}
            />
          </svg>

          {/* center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <span
              className="text-4xl font-extrabold leading-none tabular-nums"
              style={{ color }}
            >
              {animated}
            </span>
            <span className="text-xs text-gray-400 font-medium">/ 100</span>
          </div>
        </div>

        {/* grade badge */}
        <span
          className="px-3 py-0.5 rounded-full text-xs font-semibold"
          style={{
            background: `${color}18`,
            color,
          }}
        >
          {getGrade(score)} · ATS Score
        </span>
      </div>

      {/* Breakdown bars */}
      <div className="flex-1 w-full flex flex-col gap-4">
        {breakdownItems.map(({ label, value }) => {
          const barColor = getColor(value);
          return (
            <div key={label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
                <span className="text-sm font-bold" style={{ color: barColor }}>
                  {value}
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${value}%`,
                    background: barColor,
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

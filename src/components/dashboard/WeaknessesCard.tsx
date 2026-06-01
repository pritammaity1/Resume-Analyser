import { AlertCircle } from "lucide-react";
import type { WeaknessCardProps } from "@/types";

export default function WeaknessCard({ gaps }: WeaknessCardProps) {
  if (!gaps || gaps.length === 0) {
    return null;
  }
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
          <AlertCircle size={16} className="text-red-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Weaknesses</h3>
          <p className="text-xs text-gray-400">Areas to address</p>
        </div>
        {/* count badge */}
        <span className="ml-auto text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
          {gaps.length}
        </span>
      </div>

      {/* List */}
      <ul className="flex flex-col gap-2.5">
        {gaps.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5"
          >
            {/* number */}
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm text-red-800 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

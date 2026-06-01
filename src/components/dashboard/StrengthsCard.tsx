import { CheckCircle2 } from "lucide-react";
import type { StrengthCardProps } from "@/types";

export default function StrengthCard({ strengths }: StrengthCardProps) {
  if (!strengths || strengths.length === 0) {
    return null;
  }
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* header */}

      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 ">
          <CheckCircle2 size={16} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Strengths</h3>
          <p className="text-xs text-gray-400">What's working well</p>
        </div>

        {/* count badge */}
        <span className="ml-auto text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
          {strengths.length}
        </span>
      </div>
      {/* List */}
      <ul className="flex flex-col gap-2.5">
        {strengths.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg px-3 py-2.5"
          >
            {/* number */}
            <span className="w-5 h-5 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm text-green-800 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

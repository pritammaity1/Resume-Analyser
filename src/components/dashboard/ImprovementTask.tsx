import { useState } from "react";
import { ChevronDown, ChevronUp, Wrench } from "lucide-react";
import type { ImprovementTaskProps } from "@/types";

const PRIORITY_STYLES = {
  high: {
    badge: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
  },
  medium: {
    badge: "bg-amber-50 text-amber-600 border-amber-200",
    dot: "bg-amber-500",
  },
  low: {
    badge: "bg-blue-50 text-blue-600 border-blue-200",
    dot: "bg-blue-500",
  },
};

const TYPE_LABELS = {
  keyword: "Keyword",
  impact: "Impact",
  gap: "Gap",
  format: "Format",
};

export default function ImprovementTask({ task, onFix }: ImprovementTaskProps) {
  const [expanded, setExpanded] = useState(false);

  const priority = PRIORITY_STYLES[task.priority];

  return (
    <li className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Row */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* priority dot */}
        <span className={"w-2 h-2 rounded-full shrink-0 " + priority.dot} />

        {/* title */}
        <span className="flex-1 text-sm font-medium text-gray-800 leading-snug">
          {task.title}
        </span>

        {/* type chip */}
        <span className="hidden sm:inline text-xs text-gray-400 font-medium shrink-0">
          {TYPE_LABELS[task.type]}
        </span>

        {/* priority badge */}
        <span
          className={
            "text-xs font-semibold px-2 py-0.5 rounded-full border shrink-0 capitalize " +
            priority.badge
          }
        >
          {task.priority}
        </span>

        {/* chevron */}
        <span className="text-gray-400 shrink-0">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </div>

      {/* Expanded description */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100">
          <p className="text-sm text-gray-500 leading-relaxed mb-3">
            {task.description}
          </p>

          {/* Fix button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFix();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Wrench size={12} />
            Mark as Fixed
          </button>
        </div>
      )}
    </li>
  );
}

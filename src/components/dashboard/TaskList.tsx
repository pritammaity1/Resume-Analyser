import { useState } from "react";
import { ListChecks } from "lucide-react";
import ImprovementTask from "./ImprovementTask";
import type { TaskListProps } from "@/types";

export default function TaskList({ tasks: initialTasks }: TaskListProps) {
  const tasks = initialTasks;
  const [fixed, setFixed] = useState<Set<string>>(new Set());

  const handleFix = (id: string) => {
    setFixed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const fixedCount = fixed.size;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((fixedCount / total) * 100) : 0;

  // sort: unfixed first, then by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sorted = [...tasks].sort((a, b) => {
    const aFixed = fixed.has(a.id) ? 1 : 0;
    const bFixed = fixed.has(b.id) ? 1 : 0;
    if (aFixed !== bFixed) return aFixed - bFixed;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
          <ListChecks size={16} className="text-violet-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Action Items</h3>
          <p className="text-xs text-gray-400">
            {fixedCount} of {total} fixed
          </p>
        </div>

        {/* pct badge */}
        <span className="ml-auto text-lg font-extrabold text-gray-800">
          {pct}
          <span className="text-xs font-medium text-gray-400">%</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-5">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: pct + "%",
            background: pct === 100 ? "#28a745" : "#7c3aed",
          }}
        />
      </div>

      {/* Task list */}
      <ul className="flex flex-col gap-2">
        {sorted.map((task) => (
          <div
            key={task.id}
            className={
              "transition-opacity duration-300 " +
              (fixed.has(task.id) ? "opacity-40" : "opacity-100")
            }
          >
            <ImprovementTask task={task} onFix={() => handleFix(task.id)} />
          </div>
        ))}
      </ul>

      {/* All done message */}
      {pct === 100 && total > 0 && (
        <div className="mt-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-sm font-semibold text-green-700">
            🎉 All items fixed — great work!
          </p>
        </div>
      )}
    </div>
  );
}

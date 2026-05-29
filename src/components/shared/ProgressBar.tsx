import type { ProgressBarProps } from "@/types";

export default function ProgressBar({
  value,
  max = 100,
  color = "bg-blue-600",
  showLabel = false,
  height = "h-2",
}: ProgressBarProps) {
  // calculating percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-ful">
      {/* Label row shows only if showlabel is true */}

      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      {/* Gray background bar */}

      <div
        className={`w-ful ${height} bg-gray-100 rounded-full overflow-hidden`}
      >
        <div
          className={`${height} ${color} rounded-full transition-all durration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

import { FileSearch } from "lucide-react";
import type { EmptyStateProps } from "@/types";

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* search icon */}
      <div className="w-16 h-16 bg-blu-50 rounded-full flex items-center justify-center mb-5">
        <FileSearch className="text-blue-500" size={28} />
      </div>

      {/* Title */}

      <h3 className="text-lg font-semibold text-gray-900 mb-2 ">{title}</h3>

      {/* Description */}

      <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-6">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

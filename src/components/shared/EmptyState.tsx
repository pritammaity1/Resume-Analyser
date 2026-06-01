// src/components/shared/EmptyState.tsx

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
      {/* icon */}
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-5">
        <FileSearch className="text-blue-500" size={28} />
      </div>

      {/* title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {/* description */}
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-10">
        {description}
      </p>

      {/* button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            marginTop: "8px",
            padding: "12px 32px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
            background: "#2563eb",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

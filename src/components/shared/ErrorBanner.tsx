import { AlertCircle, X } from "lucide-react";
import type { ErrorBannerProps } from "@/types";

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red 200 rounded-xl mb-6">
      <AlertCircle className="text-red-500 mt-0.5 shrink-0" size={18} />
      <p className="text-sm text-red-700 flex-1 leading-relaxed">{message}</p>
      {onDismiss && (
        <button
          className="text-red-400 hover:text-red-600 transition-colors shrink-0"
          onClick={onDismiss}
        >
          {" "}
          <X size={16} />{" "}
        </button>
      )}
    </div>
  );
}

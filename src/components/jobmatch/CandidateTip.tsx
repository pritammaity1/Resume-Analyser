import { Lightbulb } from "lucide-react";
import type { CandidateTipProps } from "@/types";

export default function CandidateTip({ tip }: CandidateTipProps) {
  if (!tip) return null;

  return (
    <div
      className="rounded-xl p-5 text-white"
      style={{
        background: "linear-gradient(135deg, #0056b3 0%, #1a2b3c 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
          <Lightbulb size={16} className="text-yellow-300" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Candidate Tip</h3>
          <p className="text-xs text-white/60">Personalized advice for you</p>
        </div>
      </div>

      {/* Tip text */}
      <p className="text-sm text-white/90 leading-relaxed">{tip}</p>
    </div>
  );
}

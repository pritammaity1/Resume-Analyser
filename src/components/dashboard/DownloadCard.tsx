import { useState } from "react";
import { Download, Copy, CheckCheck, FileDown } from "lucide-react";
import toast from "react-hot-toast";
import type { AnalysisResult } from "@/types";

interface DownloadCardProps {
  onDownloadPDF: () => Promise<void>;
  result: AnalysisResult;
}

export default function DownloadCard({
  onDownloadPDF,
  result,
}: DownloadCardProps) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await onDownloadPDF();
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    const text = [
      "ResumeIQ Analysis Report",
      "",
      "ATS Score: " + result.ats_score + "/100",
      "Job Title: " + result.job_title,
      "Company: " + result.company,
      "",
      "Strengths:",
      ...result.strengths.map((s) => "  • " + s),
      "",
      "Skill Gaps:",
      ...result.skill_gaps.map((g) => "  • " + g),
      "",
      "Quick Wins:",
      ...result.quick_wins.map((q) => "  • " + q),
      "",
      "Tip: " + result.candidate_tip,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Analysis copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  return (
    <div
      className="rounded-xl p-5 text-white"
      style={{
        background: "linear-gradient(135deg, #0056b3 0%, #1a2b3c 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <FileDown size={18} className="text-white/80" />
        <h3 className="text-sm font-semibold text-white">Export Report</h3>
      </div>
      <p className="text-xs text-white/60 leading-relaxed mb-4">
        Save your full analysis as a PDF or copy the summary to use elsewhere.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-2.5">
        {/* PDF download */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-blue-700 font-semibold text-sm rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Download size={14} />
          {downloading ? "Generating..." : "Download PDF"}
        </button>

        {/* Copy summary */}
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm rounded-lg transition-colors"
        >
          {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Summary"}
        </button>
      </div>
    </div>
  );
}

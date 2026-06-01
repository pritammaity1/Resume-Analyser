import type { JobContextCardProps } from "@/types";

export default function JobContextCard({
  value,
  onChange,
  onAnalyze,
  isLoading,
  isDisabled,
}: JobContextCardProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste job description text here..."
        style={{
          flex: 1,
          width: "100%",
          resize: "none",
          fontSize: "14px",
          color: "#374151",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "14px",
          outline: "none",
          marginBottom: "14px",
          minHeight: "260px",
          fontFamily: "inherit",
          lineHeight: "1.6",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
      />
      <button
        type="button"
        onClick={onAnalyze}
        disabled={isDisabled || isLoading}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          fontSize: "15px",
          fontWeight: "600",
          cursor: isDisabled || isLoading ? "not-allowed" : "pointer",
          background: isDisabled || isLoading ? "#f3f4f6" : "#1d4ed8",
          color: isDisabled || isLoading ? "#9ca3af" : "#ffffff",
          transition: "all 0.2s",
          fontFamily: "inherit",
        }}
      >
        {isLoading ? "Analyzing..." : "Analyze Now"}
      </button>
    </div>
  );
}

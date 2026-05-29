import type { KeyWordChipProps } from "@/types";

export default function KeywordChip({
  label,
  varient,
  onClick,
}: KeyWordChipProps) {
  // styles for each varient

  const styles = {
    matched: {
      container: "bg-green-50 border-green-200 text-green-700",
      dot: "bg-green-50",
    },
    missing: {
      container: "bg-red-50 border-red-200 text-rred-700",
      dot: "bg-red-500",
    },
  };

  const style = styles[varient];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font medium transition-all duration-150 ${style.container} ${onClick ? "cursor-pointer hover:opacity-80 hover:shadow-sm" : "cursor-default"}`}
    >
      <span className={`w=1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />{" "}
      {label}
    </button>
  );
}

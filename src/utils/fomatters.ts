import { format, formatDistanceToNow } from "date-fns";

// date formatting

// jan 15, 2026

export function formatDate(isoSting: string): string {
  try {
    return format(new Date(isoSting), "MM dd, yyyy");
  } catch {
    return "Unknown Date";
  }
}

// 2hr ago or 3 days ago

export function formatRelativeDate(isoSting: string): string {
  try {
    return formatDistanceToNow(new Date(isoSting), {
      addSuffix: true,
    });
  } catch {
    return "Unknown Date";
  }
}

// score formatting

export function formatScore(score: number): string {
  return `${Math.round(score)}%`;
}

// 78 -> good 85

export function getScoreGrade(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Poor";
  return "Poor";
}

// Returns tailwind color based on score

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-500";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
}

// returns bg color according to score

export function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-50 border-green-200";
  if (score >= 60) return "bg-amber-50 border-amber-200";
  if (score >= 40) return "bg-orange-50 border-orange-200";
  return "bg-red-50 border-red-200";
}

// returns hex color for rechart
export function getScoreHexColor(score: number): string {
  if (score >= 80) return "#28a745";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#fd7e14";
  return "#dc3545";
}

// text formatting

// truncates long text with ellipsis

export function truncatesText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

// frontend developer -> Frontend Developer

export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((word) => word.charAt(0).toUpperCase + word.slice(1))
    .join("");
}

// file size formatting

//1549889 -> 1.0 MB

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${bytes} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// returns tailwind color for task priority

export function getPriorityColor(priority: "high" | "medium" | "low"): string {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-amber-100 text-amber-700";
    case "low":
      return "bg-blue-100 text-blue-700";
  }
}

// returs tailwind border color for task type
export function getTaskTypeColor(
  type: "keyword" | "impact" | "gap" | "format",
): string {
  switch (type) {
    case "format":
      return "border-blue-500";
    case "impact":
      return "border-green-500";
    case "gap":
      return "border-red-500";
    case "keyword":
      return "border-amber-500";
  }
}

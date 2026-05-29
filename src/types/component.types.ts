import type React from "react";
import type {
  AnalysisResult,
  ImprovementTask,
  RecommendedPhrase,
  SoftSkill,
} from "./analysis.types";
import type { SavedAnalysis } from "./firebase.type";

export type KeywordVarient = "matched" | "missing";

export type KeyWordChipProps = {
  label: string;
  varient: KeywordVarient;
  onClick?: () => void;
};

//progress bar

export type ProgressBarProps = {
  value: number; // 0-100
  max?: number; // default 100
  color?: string; // tailwind color class
  showLabel?: boolean; //shopw % text
  height?: string; // tailwind height class
};

//empty state

export type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

// error banner
export type ErrorBannerProps = {
  message: string;
  onDismiss?: () => void;
};

// loading screen step
export type LoadingStep = {
  id: string;
  label: string;
  status: "pending" | "active" | "done";
};

export type LoadingScreenProps = {
  steps: LoadingStep[];
};

// Layout
export type PageWrappersProps = {
  children: React.ReactNode;
  className?: string;
};

// auth
export type GoogleButtonProps = {
  label?: string;
  className?: string;
};

// Landing
// Upload File stats

export type UploadFile = {
  file: File;
  name: string;
  size: number;
  type: "pdf" | "docx" | "txt";
};

export type UploadCardProps = {
  onFile: (file: UploadFile) => void;
  uploaded?: UploadFile | "null";
};

export type JobContextCardProps = {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  isaDisabled: boolean;
};

// Dashboard

export type ScoreDonutProps = {
  score: number;
  breakdown: AnalysisResult["score_breakdown"];
};

export type StrengthCardProps = {
  strengths: string[];
};

export type WeaknessCardProps = {
  gaps: string[];
};

export type FormattingCardProp = {
  score: number;
};

export type TaskListProps = {
  tasks: ImprovementTask[];
};

export type ImprovementTaskProps = {
  task: ImprovementTask;
  onFix: () => void;
};

export type DocumentStatsProps = {
  stats: AnalysisResult["document_status"];
};

// Job Match

export type ResumePreviewProps = {
  resumeText: string;
  matchedKeyWords: string[];
  missingKeyWord: string[];
};

export type MatchScorePanelProps = {
  score: number;
  keywordMatch: string[];
  SoftSkills: SoftSkill[];
};

export type CriticalGapsProps = {
  gaps: string[];
};

export type RecommendedPhrasePros = {
  phrase: RecommendedPhrase[];
};

export type SoftSkillBarsProps = {
  skills: SoftSkill[];
};

export type JobDescPanelProps = {
  jobDescription: string;
  matchedKeywords: string[];
};

export type CandidateTipProps = {
  tip: string;
};

// history

export type HistoryRowProps = {
  analysis: SavedAnalysis;
  onLoad: (analysis: SavedAnalysis) => void;
  onDelete: (id: string) => void;
};

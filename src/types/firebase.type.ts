import type { AnalysisResult } from "./analysis.types";

export type SavedAnalysis = {
  id: string;
  userId: string;
  jobTitle: string;
  company: string;
  atsScore: number;
  matchedKeyWords: string[];
  missingKeyWords: string[];
  skillGaps: string[];
  strengths: string[];
  rewrittenResume: string;
  createdAt: string;
  // full data
  scoreBreakdown: {
    keyword_match: number;
    skills_match: number;
    experience_relevence: number;
    format_score: number;
  };
  quickWins: string[];
  improvementTasks: AnalysisResult["improvement_tasks"];
  recommendedPhrases: AnalysisResult["recommended_phrases"];
  softSkills: AnalysisResult["soft_skills"];
  documentStatus: AnalysisResult["document_status"];
  candidateTip: string;
};

export type NewAnalysisPayload = Omit<SavedAnalysis, "id">;

export function toFirebasePayload(
  result: AnalysisResult,
  userId: string,
): NewAnalysisPayload {
  return {
    userId,
    jobTitle: result.job_title,
    company: result.company,
    atsScore: result.ats_score,
    matchedKeyWords: result.matched_keywords,
    missingKeyWords: result.missing_keywords,
    skillGaps: result.skill_gaps,
    strengths: result.strengths,
    rewrittenResume: result.rewritten_resume,
    createdAt: new Date().toISOString(),
    // full data
    scoreBreakdown: result.score_breakdown,
    quickWins: result.quick_wins,
    improvementTasks: result.improvement_tasks,
    recommendedPhrases: result.recommended_phrases,
    softSkills: result.soft_skills,
    documentStatus: result.document_status,
    candidateTip: result.candidate_tip,
  };
}

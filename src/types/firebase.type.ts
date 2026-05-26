import type { AnalysisResult } from "./analysis.types";

export type SavedAnalysis = {
  id: string; // Fire-Store auto generated document ID
  userId: string; //Firebase auth UID-linked with server
  jobTitle: string; // e.g 'Frontend developer'
  company: string; // e.g "Google"
  atsScore: number; // e.g 90
  matchedKeyWords: string[]; // [e.g "React, js"]
  missingKeyWords: string[]; //[e.g "Docker, CI/CD"]
  skillGaps: string[]; //[e.g "No CI/CD experience"]
  strengths: string[]; //[e.g "strong react skills"]
  rewrittenResume: string; // full rewritten resume text
  createdAt: string; // ISO date string e.g. "2026-01-15T10:30:00.000Z"
};

// waht we send to firebase when saving
// same as saved analysis but without id
// firebase generates the id automatically

export type NewAnalysisPayload = Omit<SavedAnalysis, "id">;

// helper function to convert analysis result
// into a new analysis payload for saving

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
  };
}

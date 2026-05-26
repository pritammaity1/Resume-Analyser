// score breakdown

export type ScoreBreakDown = {
  keyword_match: number;
  skills_match: number;
  experience_relevence: number;
  format_score: number;
};

// document stats extracted from resume

export type DocumentStats = {
  word_count: number; // totals words in resume
  reading_level: string; // e.g "grade 12"
  experience_years: number; // total years of experience
};

// single improvement task

export type ImprovementTask = {
  id: string;
  type: "keyword" | "impact" | "gap" | "format";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
};

// recommended phrase to add to resume
export type RecommendedPhrase = {
  label: string; //e.g "Improve Impact"
  phrase: string; // the actual phrase to be add
};

// soft skills with alignment score
export type SoftSkill = {
  name: string; // e.g 'leadership'
  score: number; //0-100
};

// full analysis result - exactly what gemini returns

export type AnalysisResult = {
  ats_score: number;
  score_breakdown: ScoreBreakDown;
  matched_keywords: string[];
  missing_keywords: string[];
  skill_gaps: string[];
  strengths: string[];
  quick_wins: string[];
  improvement_tasks: ImprovementTask[];
  recommended_phrases: RecommendedPhrase[];
  soft_skills: SoftSkill[];
  document_status: DocumentStats;
  rewritten_resume: string;
  job_title: string;
  company: string;
  candidate_tip: string;
};

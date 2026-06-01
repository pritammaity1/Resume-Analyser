import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getUserAnalysis, deleteAnalysis } from "@/lib/firebaseDB";
import { useAnalysis } from "@/context/AnalysisContext";
import { useNavigate } from "react-router-dom";
import type { SavedAnalysis, AnalysisResult } from "@/types";

export function useHistory() {
  const { user } = useAuth();
  const { setResult } = useAnalysis();
  const navigate = useNavigate();

  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // load analyses on mount

  const loadAnalyses = useCallback(async (): Promise<void> => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getUserAnalysis(user.uid);
      setAnalyses(
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to load analyses");
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  // load on mount

  useEffect(() => {
    loadAnalyses();
  }, [loadAnalyses]);

  // delete one analysis
  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to delete analysis");
      }
    }
  };

  // reload a past analysis

  const handleLoad = (analysis: SavedAnalysis): void => {
    const result: AnalysisResult = {
      ats_score: analysis.atsScore,
      score_breakdown: {
        keyword_match: 0,
        skills_match: 0,
        experience_relevence: 0,
        format_score: 0,
      },
      matched_keywords: analysis.matchedKeyWords,
      missing_keywords: analysis.missingKeyWords,
      skill_gaps: analysis.skillGaps,
      strengths: analysis.strengths,
      quick_wins: [],
      improvement_tasks: [],
      recommended_phrases: [],
      soft_skills: [],
      document_status: {
        word_count: 0,
        reading_level: "",
        experience_years: 0,
      },
      rewritten_resume: analysis.rewrittenResume,
      job_title: analysis.jobTitle,
      company: analysis.company,
      candidate_tip: "",
    };
    setResult(result);
    navigate("/dashboard");
  };
  return {
    analyses,
    loading,
    error,
    handleDelete,
    handleLoad,
  };
}

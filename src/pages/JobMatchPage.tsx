// src/pages/JobMatchPage.tsx

import { useNavigate } from "react-router-dom";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

import { useAnalysis } from "@/context/AnalysisContext";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import EmptyState from "@/components/shared/EmptyState";
import ResumePreview from "@/components/jobmatch/ResumePreview";
import MatchingScorePanel from "@/components/jobmatch/MatchingScorePanel";
import CriticalGaps from "@/components/jobmatch/CriticalGaps";
import RecommendedPhrases from "@/components/jobmatch/RecommendedPhrases";
import SoftSkillBars from "@/components/jobmatch/SoftSkillBars";
import JobDescPanel from "@/components/jobmatch/JobDescPanel";
import CandidateTip from "@/components/jobmatch/CandidateTip";

export default function JobMatchPage() {
  const { result, resumeText, jobDescription } = useAnalysis();
  const navigate = useNavigate();

  // Empty state
  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <EmptyState
            title="No analysis yet"
            description="Upload your resume on the home page to get your job match report."
            actionLabel="Go to Home"
            onAction={() => navigate("/")}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      <main className="flex-1">
        {/*  Top bar  */}
        <div className="bg-white border-b border-gray-200">
          <PageWrapper className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              {/* Left */}
              <div>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors mb-1"
                >
                  <ArrowLeft size={13} />
                  Back to Dashboard
                </button>
                <h1 className="text-xl font-bold text-gray-900">Job Match</h1>
                {result.job_title && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {result.job_title}
                    {result.company ? " · " + result.company : ""}
                  </p>
                )}
              </div>

              {/* Right */}
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
              >
                <LayoutDashboard size={14} />
                View Dashboard
              </button>
            </div>
          </PageWrapper>
        </div>

        {/*  Candidate tip — full width  */}
        {result.candidate_tip && (
          <div className="bg-white border-b border-gray-200">
            <PageWrapper className="py-5">
              <CandidateTip tip={result.candidate_tip} />
            </PageWrapper>
          </div>
        )}

        {/*  Score + Gaps row  */}
        <div className="bg-gray-50 border-b border-gray-200">
          <PageWrapper className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <MatchingScorePanel
                score={result.ats_score}
                keywordMatch={result.matched_keywords}
                SoftSkills={result.soft_skills}
              />
              <CriticalGaps gaps={result.skill_gaps} />
            </div>
          </PageWrapper>
        </div>

        {/*  Resume + Job desc previews  */}
        <div className="bg-white border-b border-gray-200">
          <PageWrapper className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ResumePreview
                resumeText={resumeText}
                matchedKeyWords={result.matched_keywords}
                missingKeyWord={result.missing_keywords}
              />
              <JobDescPanel
                jobDescription={jobDescription}
                matchedKeywords={result.matched_keywords}
              />
            </div>
          </PageWrapper>
        </div>

        {/* ── Soft skills + Phrases ──────────────────────────────────── */}
        <div className="bg-gray-50 border-b border-gray-200">
          <PageWrapper className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <SoftSkillBars skills={result.soft_skills} />
              <RecommendedPhrases phrase={result.recommended_phrases} />
            </div>
          </PageWrapper>
        </div>
      </main>

      <Footer />
    </div>
  );
}

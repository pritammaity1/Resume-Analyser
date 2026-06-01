import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAnalysis } from "@/context/AnalysisContext";
import { extractTextFromFile } from "@/utils/extractText";
import { analyzeResume } from "@/utils/ai";
import { saveAnalysis } from "@/lib/firebaseDB";
import type { UploadFile } from "@/types";

export type AnalysisStep = "extracting" | "analyzing" | "saving" | "done";

export function useRunAnalysis() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    setResult,
    setResumeText,
    setJobDescription,
    setIsAnalyzing,
    setError,
  } = useAnalysis();

  const [currentStep, setCurrentStep] = useState<AnalysisStep | null>(null);

  const run = async (
    uploadFile: UploadFile,
    jobDescription: string,
  ): Promise<void> => {
    try {
      setIsAnalyzing(true);
      setError(null);

      // step 1 — extract text from file
      setCurrentStep("extracting");
      const resumeText = await extractTextFromFile(uploadFile.file);
      setResumeText(resumeText);
      setJobDescription(jobDescription);

      // step 2 — analyze with gemini
      setCurrentStep("analyzing");
      const result = await analyzeResume(resumeText, jobDescription);

      // attach empty rewrite for now
      const finalResult = {
        ...result,
        rewritten_resume: "",
      };

      // step 3 — save to firebase if logged in
      if (user) {
        setCurrentStep("saving");
        await saveAnalysis(finalResult, user.uid);
      }

      // step 4 — done
      setCurrentStep("done");
      setResult(finalResult);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
      setCurrentStep(null);
    }
  };

  return { run, currentStep };
}

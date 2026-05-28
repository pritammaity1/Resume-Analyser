import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAnalysis } from "@/context/AnalysisContext";
import { extractTextFromFile } from "@/utils/extractText";
import { analyzeResume, rewriteRsume } from "@/utils/ai";
import { saveAnalysis } from "@/lib/firebaseDB";
import type { UploadFile } from "@/types";

export type AnalysisStep =
  | "extracting"
  | "analyzing"
  | "rewrite"
  | "saving"
  | "done";

// hooks

export function useRunAnalysis() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { setResult, setResumeText, setIsAnalyzing, setError } = useAnalysis();

  const [currentStep, setCurrentStep] = useState<AnalysisStep | null>(null);

  const run = async (
    uploadFile: UploadFile,
    jobDescription: string,
  ): Promise<void> => {
    try {
      setIsAnalyzing(true);
      setError(null);

      // extraction text from file
      setCurrentStep("extracting");
      const resumeText = await extractTextFromFile(uploadFile.file);
      setResumeText(resumeText);

      //analyzing through gemini

      setCurrentStep("analyzing");
      const result = await analyzeResume(resumeText, jobDescription);

      // rewriting resume
      setCurrentStep("rewrite");
      const rewrite = await rewriteRsume(
        resumeText,
        jobDescription,
        result.missing_keywords,
      );

      // attach rewrite to result

      const finalResult = {
        ...result,
        rewritten_resume: rewrite,
      };

      // save to firebase if logged in
      if (user) {
        setCurrentStep("saving");
        await saveAnalysis(finalResult, user.uid);
      }

      // store in context + navigate

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

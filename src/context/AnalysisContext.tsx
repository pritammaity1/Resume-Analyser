import React, { createContext, useContext, useState } from "react";
import type { AnalysisResult } from "@/types";

// context type

type AnalysisContextType = {
  result: AnalysisResult | null; // curent analysis
  resumeText: string; // extracted from resume
  jobDescription: string; // pasted job description
  isAnalyzing: boolean; // true while gemini runs
  error: string | null; // error if failed

  setResult: (result: AnalysisResult) => void;
  setResumeText: (text: string) => void;
  setJobDescription: (text: string) => void;
  setIsAnalyzing: (value: boolean) => void;
  setError: (error: string | null) => void;
  clearResult: () => void; // reset everything
};

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export function AnalysisProvide({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // reset back to initial state

  const clearResult = () => {
    setResult(null);
    setResumeText("");
    setJobDescription("");
    setIsAnalyzing(false);
    setError(null);
  };

  return (
    <AnalysisContext.Provider
      value={{
        result,
        resumeText,
        jobDescription,
        isAnalyzing,
        error,
        setResult,
        setResumeText,
        setJobDescription,
        setIsAnalyzing,
        setError,
        clearResult,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

// hook

export function useAnalysis(): AnalysisContextType {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used inside AnalysisProvider");
  return ctx;
}

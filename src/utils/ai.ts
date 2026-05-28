import { buildRewritePrompt, buildScoringPrompt } from "@/utils/prompts";
import type { AnalysisResult, AnalyzeResponseBody } from "@/types";

// calls our geminikey which is hidden inside /api/analyze
// this functions just sends a prompt and retuns text back

async function callGeini(prompt: string): Promise<string> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Analysis service failed. Please try again");
  }

  const data: AnalyzeResponseBody = await response.json();

  if (!data.success || !data.data) {
    throw new Error(data.error || "Analysis Failed");
  }
  return data.data;
}

// parsing JSON file safely

function parseJSON<T>(text: string) {
  // removing markedDown code

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    // extracting JSON obj if extra text exists

    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]) as T;
    throw new Error("Could not read AI response. Please try again later");
  }
}

// analysing resume (scoring)

export async function analyzeResume(
  resumeText: string,
  jobDescrription: string,
): Promise<AnalysisResult> {
  const prompt = buildScoringPrompt(resumeText, jobDescrription);
  const response = await callGeini(prompt);
  return parseJSON<AnalysisResult>(response);
}

// rewrite rresume

export async function rewriteRsume(
  resumeText: string,
  jobDescription: string,
  missingKeyWords: string[],
): Promise<string> {
  const prompt = buildRewritePrompt(
    resumeText,
    jobDescription,
    missingKeyWords,
  );
  return await callGeini(prompt);
}

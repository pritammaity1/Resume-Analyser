// single message set to gemini

export type GeminiMessage = {
  role: "user" | "modle";
  parts: { text: string }[];
};

// generation config that controls gemini output

export type GeminiConfig = {
  temperature: number; // 0 = consistent, 1 = creative // we use 0.2 for consistent JSON

  maxOutputTokens: number; // max length of response
};

//full request bodyy sent to gemini api

export type GeminiRequest = {
  contents: GeminiMessage[];
  generationConfig: GeminiConfig;
};

// single content part in gemini response
export type GeminiPart = {
  text: string;
};

// single content block in gemini process
export type GeminiContent = {
  parts: GeminiPart[];
  role: "model";
};

// single candidate in gemini response

export type GeminiCandidate = {
  content: GeminiContent;
  finishReason: string;
};

// full resoponse gemini api
export type GeminiResponse = {
  candidate: GeminiCandidate[];
  usageMetadata: {
    promptTokenCount: number;
    candidateTokenCount: number;
    totalTokenCount: number;
  };
};

// error response from gemini api

export type GeminiError = {
  error: {
    code: number;
    message: string;
    status: string;
  };
};

// whats our app sends to api to analyze

export type AnalyzeRequestBody = {
  resumeText: string;
  jobDescription: string;
};

// what app sends back to our app

export type AnalyzeResponseBody = {
  success: boolean;
  data?: string; // raw JSON string from Gemini
  error?: string; // error message if failed
};

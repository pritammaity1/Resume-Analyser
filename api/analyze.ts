// api/analyze.ts

const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 24 * 60 * 60 * 1000;
  const limit = 5;
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < window);
  if (recent.length >= limit) return true;
  rateLimitMap.set(ip, [...recent, now]);
  return false;
}

async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) throw new Error("Gemini API key not configured");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0, maxOutputTokens: 8192 },
    }),
  });

  if (!response.ok) {
    const err = (await response.json()) as { error?: { message?: string } };
    throw new Error(err.error?.message ?? "Gemini API failed");
  }

  const data = (await response.json()) as {
    candidates: { content: { parts: { text: string }[] } }[];
  };

  return data.candidates[0].content.parts[0].text;
}

export default async function handler(
  req: {
    method: string;
    body: { prompt: string };
    headers: Record<string, string>;
    socket: { remoteAddress: string };
  },
  res: { status: (code: number) => { json: (data: unknown) => void } },
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: "Daily limit reached. Try again tomorrow.",
    });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      success: false,
      error: "Prompt is required",
    });
  }

  try {
    const result = await callGemini(prompt);
    return res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

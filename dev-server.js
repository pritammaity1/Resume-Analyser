// dev-server.js
import "dotenv/config";
import http from "http";

const server = http.createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/api/analyze") {
    res.writeHead(404);
    res.end();
    return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { prompt } = JSON.parse(body);
      const apiKey = process.env.GEMINI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const geminiRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0, maxOutputTokens: 8192 },
        }),
      });

      const data = await geminiRes.json();
      console.log("Gemini response:", JSON.stringify(data, null, 2));

      if (data.error) {
        res.writeHead(503, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            error:
              data.error.code === 503
                ? "Gemini is busy right now. Please try again in a moment."
                : data.error.message,
          }),
        );
        return;
      }

      const text = data.candidates[0].content.parts[0].text;

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, data: text }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      console.error("Gemini error:", err.message);
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  });
});

server.listen(3001, () => console.log("Dev API running on port 3001"));

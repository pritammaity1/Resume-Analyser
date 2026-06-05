# ResumeIQ

An AI-powered resume analyzer that scores your resume against a job description, finds missing keywords, and gives you a clear action plan to improve your chances.

Built this because I was frustrated with generic resume advice. Most tools just tell you what's wrong — this one actually tells you what to fix and how.

---

## What it does

You upload your resume, paste a job description, and within 20 seconds you get:

- An ATS score (0–100) with a breakdown by keywords, skills, experience, and formatting
- A list of strengths and weaknesses specific to that role
- Missing keywords the recruiter's system is looking for
- Actionable improvement tasks sorted by priority
- Soft skill alignment scores
- Recommended phrases you can directly add to your resume
- A personalized tip from the AI based on the job requirements

Your analysis gets saved to your account so you can track how your resume improves over time across different roles.

---

## Tech stack

- **Frontend** — React + TypeScript + Vite
- **Styling** — Tailwind CSS
- **AI** — Google Gemini 2.5 Flash
- **Auth** — Firebase (Google login)
- **Database** — Firebase Firestore
- **Backend** — Vercel serverless function (keeps the API key hidden)
- **File parsing** — pdfjs-dist for PDF, mammoth for DOCX

---

## Getting started locally

**1. Clone the repo**

```bash
git clone https://github.com/your-username/resume-analyser.git
cd resume-analyser
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
GEMINI_API_KEY=your_gemini_api_key
```

**4. Run the dev API server** (in a separate terminal)

```bash
node dev-server.js
```

This runs a local proxy on port 3001 that handles `/api/analyze` during development.

**5. Run the frontend**

```bash
npm run dev
```

Open `http://localhost:5173`

---

## How the analysis works

1. Resume text is extracted from the uploaded PDF or DOCX
2. A structured prompt is built with the resume text and job description
3. The prompt is sent to `/api/analyze` (a Vercel serverless function)
4. The function calls Gemini 2.5 Flash and returns a JSON response
5. The result is stored in React context and the app navigates to the dashboard
6. If the user is signed in, the result is saved to Firestore automatically

The Gemini API key never touches the browser — it lives only in the serverless function.

---

## Security

- Gemini API key is a server-side environment variable on Vercel
- Firebase keys are safe to expose (protected by Firestore security rules)
- Rate limiting: 5 analyses per IP per 24 hours
- Google login is optional — the app works without an account

---

## Pages

| Route        | Description                                     |
| ------------ | ----------------------------------------------- |
| `/`          | Upload resume and job description               |
| `/dashboard` | Full analysis report with score and action plan |
| `/match`     | Keyword match details and resume preview        |
| `/history`   | All saved analyses (requires login)             |
| `/settings`  | Account and preferences (requires login)        |

---

## Notes

- The rewrite feature is currently disabled to save API quota. Re-enable in `useRunAnalysis.ts`
- History page requires a Firebase composite index — click the link in the error banner to create it
- Profile images from Google require `referrerPolicy="no-referrer"` on img tags

---

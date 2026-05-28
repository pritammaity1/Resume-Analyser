// tells gemini to analyse resume vs job description and return only valid json files

export function buildScoringPrompt(resumeText: string, jobDescription: string) {
  return `
    You are an expert ATS (Applicant Tracking System) and 
senior recruiter with 10 years of hiring experience.

Analyze the resume against the job description below.

STRICT RULES:
- Return ONLY a valid JSON object
- No markdown, no backticks, no extra text
- No explanation before or after the JSON
- All arrays must have at least 1 item
- ats_score must be a number between 0 and 100

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return this EXACT JSON structure:
{
  "ats_score": <number 0-100>,
  "score_breakdown": {
    "keyword_match": <number 0-40>,
    "skills_match": <number 0-30>,
    "experience_relevance": <number 0-20>,
    "format_score": <number 0-10>
  },
  "matched_keywords": ["keyword1", "keyword2"],
  "missing_keywords": ["keyword1", "keyword2"],
  "skill_gaps": ["gap description 1", "gap description 2"],
  "strengths": ["strength 1", "strength 2"],
  "quick_wins": ["quick win 1", "quick win 2"],
  "improvement_tasks": [
    {
      "id": "task_1",
      "type": "keyword",
      "title": "Add missing keyword",
      "description": "Specific description of what to add",
      "priority": "high"
    }
  ],
  "recommended_phrases": [
    {
      "label": "IMPROVE IMPACT",
      "phrase": "Suggested phrase to add to resume"
    }
  ],
  "soft_skills": [
    {
      "name": "Leadership",
      "score": 75
    }
  ],
  "document_stats": {
    "word_count": <number>,
    "reading_level": "Grade 12",
    "experience_years": <number>
  },
  "job_title": "exact job title from job description",
  "company": "company name from job description",
  "candidate_tip": "One specific tip about this employer"
}
`;
}

// rewrite prompt

// tells gemini to rewrite the resume according to match the jd

export function buildRewritePrompt(
  resumeText: string,
  jobDescription: string,
  missingKeywords: string[],
) {
  return `
  You are a world-class resume writer and career coach.

Rewrite the resume below to better match the job description.

STRICT RULES:
- NEVER fabricate experience, skills or achievements
- NEVER add companies or roles that are not in the original
- Only rephrase and restructure what already exists
- Naturally incorporate missing keywords where truthful
- Use strong action verbs (Led, Built, Delivered, Optimized)
- Mirror the exact language used in the job description
- Keep all dates, companies and titles accurate
- Return ONLY the rewritten resume text
- No commentary, no explanation, no extra text

ORIGINAL RESUME:
${resumeText}

TARGET JOB DESCRIPTION:
${jobDescription}

MISSING KEYWORDS TO ADD (only if truthfully applicable):
${missingKeywords.join(", ")}

Return the complete rewritten resume text only.
  `;
}

// tells gemini to analyse resume vs job description and return only valid json files

export function buildScoringPrompt(resumeText: string, jobDescription: string) {
  return `
You are an ATS expert and senior recruiter.
Analyze the resume against the job description.

STRICT RULES:
- Return ONLY a valid JSON object
- No markdown, no backticks, no extra text
- No explanation before or after the JSON
- All arrays must have at least 1 item
- All scores must be numbers between 0 and 100

SCORING RULES (follow exactly):
- ats_score: weighted average = (keyword_match * 0.40) + (skills_match * 0.30) + (experience_relevence * 0.20) + (format_score * 0.10)
- keyword_match: count exact + partial keyword matches from JD found in resume, score 0-100
- skills_match: compare required skills in JD vs skills listed in resume, score 0-100  
- experience_relevence: how relevant the experience/projects are to the role, score 0-100
- format_score: resume structure, readability, length appropriateness, score 0-100

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return this EXACT JSON structure:
{
  "ats_score": <number 0-100>,
  "score_breakdown": {
    "keyword_match": <number 0-100>,
    "skills_match": <number 0-100>,
    "experience_relevence": <number 0-100>,
    "format_score": <number 0-100>
  },
  "matched_keywords": ["keyword1", "keyword2"],
  "missing_keywords": ["keyword1", "keyword2"],
  "skill_gaps": ["gap1", "gap2"],
  "strengths": ["strength1", "strength2"],
  "quick_wins": ["win1", "win2"],
  "improvement_tasks": [
    {
      "id": "task_1",
      "type": "keyword",
      "title": "Short title",
      "description": "What to fix",
      "priority": "high"
    }
  ],
  "recommended_phrases": [
    {
      "label": "IMPROVE IMPACT",
      "phrase": "Phrase to add"
    }
  ],
  "soft_skills": [
    {
      "name": "Leadership",
      "score": 75
    }
  ],
  "document_status": {
    "word_count": <number>,
    "reading_level": "Grade 12",
    "experience_years": <number>
  },
  "job_title": "job title from description",
  "company": "company name or empty string",
  "candidate_tip": "One specific actionable tip"
}
`;
}

// tells gemini to rewrite the resume to match the job description

export function buildRewritePrompt(
  resumeText: string,
  jobDescription: string,
  missingKeywords: string[],
) {
  return `
You are a professional resume writer.
Rewrite the resume to better match the job description.

RULES:
- NEVER fabricate experience, skills or achievements
- Only rephrase and restructure what already exists
- Naturally incorporate missing keywords where truthful
- Use strong action verbs
- Return ONLY the rewritten resume text
- No commentary or explanation

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

MISSING KEYWORDS:
${missingKeywords.join(", ")}

Return the rewritten resume text only.
  `;
}

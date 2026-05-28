import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// pdf.js works and tells where to find the worker file

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.7.284/pdf.worker.min.mjs";

// extract text from pdf

async function extractFromPDF(file: File): Promise<string> {
  const arrayBufffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBufffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => {
        if ("str" in item) return item.str;
        return "";
      })
      .join("");
    fullText += pageText + "/n";
  }

  return fullText.trim();
}

// extract text from docx

async function extractFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

//master function call this function from useRunAnalysis -handles all file types

export async function extractTextFromFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();
  const fileType = file.type;

  // validating size of the file max 5MB

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("File Size is too large. Max size is 5MB");
  }
  // pdf
  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    return await extractFromPDF(file);
  }
  // docx
  if (
    fileName.endsWith(".docx") ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return await extractFromDOCX(file);
  }

  // pain text

  if (fileType === "text/plain" || fileName.endsWith(".txt")) {
    return await file.text();
  }

  // unsuported format

  throw new Error("Unsupported file type. Please upload PDF, DOCX or TXT.");
}

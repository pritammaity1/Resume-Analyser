import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// pdf.js works and tells where to find the worker file

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.7.284/pdf.worker.min.mjs";

// extract text from pdf

async function extractText(file: File): Promise<string> {
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

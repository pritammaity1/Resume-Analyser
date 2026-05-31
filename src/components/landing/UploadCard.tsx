import React, { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { formatFileSize } from "@/utils/fomatters";
import type { UploadCardProps, UploadFile } from "@/types";

export default function UploadCard({ onFile, uploaded }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  // Process the selected file

  const processFile = (file: File) => {
    const fileName = file.name.toLowerCase();

    // validate type

    if (
      !fileName.endsWith(".pdf") &&
      !fileName.endsWith(".docx") &&
      !fileName.endsWith(".txt")
    ) {
      alert("Please upload a PDF, DOCX, or TXT file.");
      return;
    }

    // validate size

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB");
      return;
    }

    // determine type

    const type: UploadFile["type"] = fileName.endsWith(".pdf")
      ? "pdf"
      : fileName.endsWith(".docx")
        ? "docx"
        : "txt";

    onFile({ file, name: file.name, size: file.size, type });
  };

  // Input change

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  // remove upload file

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {/* card holder */}

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Resume Upload</h3>
        <span className="text-xs text-gray-400">PDF,DOCX,(MAX 5MB)</span>
      </div>

      {/* Drop Zone */}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${dragging ? "border-blue-400 bg-blue-50" : uploaded ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"}`}
      >
        {/* Hidden InputFile */}

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.text"
          onChange={handleInputChange}
          className="hidden"
        />

        {/* uploaded state */}
        {uploaded ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              {" "}
              <FileText className="text-green-600" size={22} />
            </div>
            <p className="text-sm font-medium text-green-700">
              {uploaded.name}
            </p>
            <p className="text-xs text-green-500">
              {formatFileSize(uploaded.size)} · Click to replace{" "}
            </p>
            <button
              type="button"
              onClick={handleRemove}
              className="mt-1 flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
            >
              <X size={12} />
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Upload className="text-blue-400" size={22} />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {" "}
              Drag &amp; drop your resume here
            </p>
            <p className="text-xs text-gray-400">
              or Click to browse local files
            </p>

            {/* format pills */}
            <div className="flex gap-2 mt-2 ">
              {["PDF", "DOCX", "TXT"].map((fmt) => (
                <span
                  key={fmt}
                  className="px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-ful font-medium"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

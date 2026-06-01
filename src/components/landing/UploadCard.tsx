import React, { useRef, useState } from "react";
import { FileText, X } from "lucide-react";
import { formatFileSize } from "@/utils/fomatters";
import type { UploadCardProps, UploadFile } from "@/types";

export default function UploadCard({ onFile, uploaded }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);

  const processFile = (file: File) => {
    const fileName = file.name.toLowerCase();
    if (
      !fileName.endsWith(".pdf") &&
      !fileName.endsWith(".docx") &&
      !fileName.endsWith(".txt")
    ) {
      alert("Please upload a PDF, DOCX, or TXT file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB");
      return;
    }
    const type: UploadFile["type"] = fileName.endsWith(".pdf")
      ? "pdf"
      : fileName.endsWith(".docx")
        ? "docx"
        : "txt";
    onFile({ file, name: file.name, size: file.size, type });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

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

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        flex: 1,
        border: `2px dashed ${dragging ? "#3b82f6" : hovering ? "#60a5fa" : uploaded ? "#86efac" : "#d1d5db"}`,
        borderRadius: "12px",
        background: dragging ? "#eff6ff" : uploaded ? "#f0fdf4" : "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        cursor: "pointer",
        padding: "40px 24px",
        transition: "all 0.2s",
        minHeight: "280px",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleInputChange}
        className="hidden"
      />

      {uploaded ? (
        <>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#dcfce7",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText color="#16a34a" size={28} />
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{ fontSize: "14px", fontWeight: "600", color: "#15803d" }}
            >
              {uploaded.name}
            </p>
            <p style={{ fontSize: "12px", color: "#22c55e", marginTop: "4px" }}>
              {formatFileSize(uploaded.size)} · Click to replace
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            style={{
              fontSize: "12px",
              color: "#ef4444",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <>
          <div
            style={{
              width: "68px",
              height: "68px",
              background: "#dbeafe",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{ fontSize: "15px", fontWeight: "600", color: "#1f2937" }}
            >
              Drag &amp; drop your resume here
            </p>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "6px" }}>
              or click to browse local files
            </p>
          </div>
        </>
      )}
    </div>
  );
}

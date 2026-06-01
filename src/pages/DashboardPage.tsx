import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  
  Briefcase,
  Download,
  Copy,
  CheckCircle2,
  AlertCircle,
  LayoutTemplate,
  FileText,
  BookOpen,
  ListChecks,
  ChevronDown,
  ChevronUp,
  Wrench,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

import { useAnalysis } from "@/context/AnalysisContext";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import EmptyState from "@/components/shared/EmptyState";
import type { ImprovementTask } from "@/types";

//  helpers 

function getColor(score: number) {
  if (score >= 80)
    return {
      text: "#16a34a",
      bg: "#f0fdf4",
      border: "#bbf7d0",
      chip: "#dcfce7",
      chipText: "#15803d",
    };
  if (score >= 60)
    return {
      text: "#d97706",
      bg: "#fffbeb",
      border: "#fde68a",
      chip: "#fef3c7",
      chipText: "#92400e",
    };
  return {
    text: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    chip: "#fee2e2",
    chipText: "#b91c1c",
  };
}

function getLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Work";
}

const CHECKS = [
  { label: "Clear section headings", min: 60 },
  { label: "Consistent font usage", min: 50 },
  { label: "Bullet points used", min: 40 },
  { label: "Appropriate resume length", min: 55 },
  { label: "No large blocks of text", min: 65 },
  { label: "Contact info present", min: 30 },
];

// ── card shell 

function Card({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={"card-lift " + className}
      style={{
        background: "#ffffff",
        border: "0.5px solid #e2e8f0",
        borderRadius: 14,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── card header 

function CardHeader({
  icon,
  title,
  sub,
  right,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 16px",
        borderBottom: "0.5px solid #f1f5f9",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0f172a" }}
        >
          {title}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{sub}</p>
      </div>
      {right}
    </div>
  );
}

// ── chip 

function Chip({
  label,
  bg,
  color,
}: {
  label: string;
  bg: string;
  color: string;
}) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 999,
        background: bg,
        color,
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}

// ── section label 

function SectionLabel({ label }: { label: string }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        margin: "0 0 12px",
      }}
    >
      {label}
    </p>
  );
}

// ── task row 

function TaskRow({
  task,
  onFix,
}: {
  task: ImprovementTask;
  onFix: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pc =
    task.priority === "high"
      ? { dot: "#ef4444", bg: "#fee2e2", text: "#b91c1c" }
      : task.priority === "medium"
        ? { dot: "#f59e0b", bg: "#fef3c7", text: "#92400e" }
        : { dot: "#3b82f6", bg: "#dbeafe", text: "#1e40af" };

  return (
    <div
      style={{ borderBottom: "0.5px solid #f1f5f9" }}
      className="last:border-0"
    >
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: pc.dot,
            flexShrink: 0,
          }}
        />
        <span
          style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#0f172a" }}
        >
          {task.title}
        </span>
        <span
          style={{ fontSize: 11, color: "#94a3b8", marginRight: 4 }}
          className="hidden sm:inline"
        >
          {task.type}
        </span>
        <Chip label={task.priority} bg={pc.bg} color={pc.text} />
        {open ? (
          <ChevronUp size={13} color="#94a3b8" />
        ) : (
          <ChevronDown size={13} color="#94a3b8" />
        )}
      </div>
      {open && (
        <div
          style={{
            padding: "0 16px 12px",
            background: "#f8fafc",
            borderTop: "0.5px solid #f1f5f9",
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "#64748b",
              lineHeight: 1.6,
              margin: "10px 0 10px",
            }}
          >
            {task.description}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFix();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: "#2563eb",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              padding: "6px 12px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <Wrench size={12} /> Mark as Fixed
          </button>
        </div>
      )}
    </div>
  );
}

// page 

export default function DashboardPage() {
  const { result } = useAnalysis();
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState<Set<string>>(new Set());

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <EmptyState
            title="No analysis yet"
            description="Upload your resume on the home page to get your detailed report."
            actionLabel="Go to Home"
            onAction={() => navigate("/")}
          />
        </main>
        <Footer />
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#f8fafc",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgH = (canvas.height / canvas.width) * pageW;
    let y = 0;
    while (y < imgH) {
      if (y > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, -y, pageW, imgH);
      y += pageH;
    }
    pdf.save("ResumeIQ_Analysis.pdf");
    toast.success("PDF downloaded!");
  };

  const handleCopy = async () => {
    const text = [
      "ResumeIQ Analysis",
      `ATS Score: ${result.ats_score}/100`,
      `Job: ${result.job_title}`,
      "",
      "Strengths:",
      ...result.strengths.map((s) => "• " + s),
      "",
      "Skill Gaps:",
      ...result.skill_gaps.map((g) => "• " + g),
    ].join("\n");
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const sc = getColor(result.ats_score);
  const breakdown = [
    { label: "Keywords", value: result.score_breakdown.keyword_match },
    { label: "Skills", value: result.score_breakdown.skills_match },
    { label: "Experience", value: result.score_breakdown.experience_relevence },
    { label: "Format", value: result.score_breakdown.format_score },
  ];
  const checks = CHECKS.map((c) => ({
    label: c.label,
    passed: result.score_breakdown.format_score >= c.min,
  }));
  const passedCount = checks.filter((c) => c.passed).length;
  const fixedCount = fixed.size;
  const totalTasks = result.improvement_tasks.length;
  const taskPct =
    totalTasks > 0 ? Math.round((fixedCount / totalTasks) * 100) : 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f8fafc" }}
    >
      <NavBar />

      <main className="flex-1">
        {/* top bar */}
        <div
          style={{ background: "#ffffff", borderBottom: "0.5px solid #e2e8f0" }}
        >
          <PageWrapper className="py-5">
            <div className="flex items-center justify-between flex-wrap gap-3 fade-up">
              <div>
                <button
                  onClick={() => navigate("/")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 12,
                    color: "#94a3b8",
                    marginBottom: 6,
                  }}
                >
                  <ArrowLeft size={13} /> Back to upload
                </button>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Resume Analysis
                </h1>
                {result.job_title && (
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: 13,
                      color: "#64748b",
                    }}
                  >
                    {result.job_title}
                    {result.company ? " · " + result.company : ""}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {/* <button
                  onClick={() => navigate("/match")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "9px 20px",
                    borderRadius: 999,
                    border: "0.5px solid #e2e8f0",
                    background: "#ffffff",
                    color: "#475569",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <Briefcase size={14} /> Job Match
                </button> */}
                {/* <button
                  onClick={() => navigate("/")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "9px 20px",
                    borderRadius: 999,
                    border: "none",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={14} /> New Analysis
                </button> */}
              </div>
            </div>
          </PageWrapper>
        </div>

        <div ref={reportRef}>
          <PageWrapper className="py-8">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/*  score hero  */}
              <div className="fade-up">
                <SectionLabel label="Score Overview" />
                <Card style={{ borderRadius: 16 }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "200px 1fr auto",
                    }}
                  >
                    {/* circle */}
                    <div
                      style={{
                        background: sc.bg,
                        borderRight: `0.5px solid ${sc.border}`,
                        padding: "28px 20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 110,
                          height: 110,
                          borderRadius: "50%",
                          background: "#fff",
                          border: `2px solid ${sc.border}`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 44,
                            fontWeight: 700,
                            color: sc.text,
                            lineHeight: 1,
                          }}
                        >
                          {result.ats_score}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: sc.text,
                            fontWeight: 500,
                          }}
                        >
                          /100
                        </span>
                      </div>
                      <Chip
                        label={getLabel(result.ats_score)}
                        bg={sc.chip}
                        color={sc.chipText}
                      />
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>
                        ATS Score
                      </span>
                    </div>

                    {/* breakdown */}
                    <div style={{ padding: "24px 28px" }}>
                      <SectionLabel label="Breakdown" />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 14,
                        }}
                      >
                        {breakdown.map(({ label, value }) => {
                          const c = getColor(value);
                          return (
                            <div key={label}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: 5,
                                }}
                              >
                                <span
                                  style={{ fontSize: 13, color: "#475569" }}
                                >
                                  {label}
                                </span>
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: c.text,
                                  }}
                                >
                                  {value}
                                </span>
                              </div>
                              <div
                                style={{
                                  height: 5,
                                  background: "#f1f5f9",
                                  borderRadius: 999,
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    height: "100%",
                                    width: value + "%",
                                    background: c.text,
                                    borderRadius: 999,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* tip */}
                    {result.candidate_tip && (
                      <div
                        style={{
                          background: "#eff6ff",
                          borderLeft: "0.5px solid #bfdbfe",
                          padding: "24px 20px",
                          maxWidth: 240,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            marginBottom: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              background: "#2563eb",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 10,
                              color: "#fff",
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            ✦
                          </div>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#2563eb",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                            }}
                          >
                            Tip for you
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#1e40af",
                            lineHeight: 1.65,
                            margin: 0,
                          }}
                        >
                          {result.candidate_tip}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/*analysis */}
              <div className="fade-up delay-1">
                <SectionLabel label="Analysis" />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  {/* strengths */}
                  <Card>
                    <CardHeader
                      icon={
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 9,
                            background: "#f0fdf4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircle2 size={15} color="#16a34a" />
                        </div>
                      }
                      title="Strengths"
                      sub="What's working well"
                      right={
                        <Chip
                          label={String(result.strengths.length)}
                          bg="#dcfce7"
                          color="#15803d"
                        />
                      }
                    />
                    <div
                      style={{
                        padding: 12,
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                      }}
                    >
                      {result.strengths.map((item, i) => (
                        <div
                          key={i}
                          className={`fade-up delay-${Math.min(i + 1, 6)}`}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 9,
                            padding: "9px 11px",
                            background: "#f0fdf4",
                            borderRadius: 9,
                            border: "0.5px solid #bbf7d0",
                          }}
                        >
                          <span
                            style={{
                              width: 17,
                              height: 17,
                              borderRadius: "50%",
                              background: "#16a34a",
                              color: "#fff",
                              fontSize: 9,
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 1,
                            }}
                          >
                            {i + 1}
                          </span>
                          <span
                            style={{
                              fontSize: 12.5,
                              color: "#166534",
                              lineHeight: 1.55,
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* weaknesses */}
                  <Card>
                    <CardHeader
                      icon={
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 9,
                            background: "#fef2f2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AlertCircle size={15} color="#dc2626" />
                        </div>
                      }
                      title="Weaknesses"
                      sub="Areas to address"
                      right={
                        <Chip
                          label={String(result.skill_gaps.length)}
                          bg="#fee2e2"
                          color="#b91c1c"
                        />
                      }
                    />
                    <div
                      style={{
                        padding: 12,
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                      }}
                    >
                      {result.skill_gaps.map((item, i) => (
                        <div
                          key={i}
                          className={`fade-up delay-${Math.min(i + 1, 6)}`}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 9,
                            padding: "9px 11px",
                            background: "#fef2f2",
                            borderRadius: 9,
                            border: "0.5px solid #fecaca",
                          }}
                        >
                          <span
                            style={{
                              width: 17,
                              height: 17,
                              borderRadius: "50%",
                              background: "#dc2626",
                              color: "#fff",
                              fontSize: 9,
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 1,
                            }}
                          >
                            {i + 1}
                          </span>
                          <span
                            style={{
                              fontSize: 12.5,
                              color: "#991b1b",
                              lineHeight: 1.55,
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              {/* document  */}
              <div className="fade-up delay-2">
                <SectionLabel label="Document" />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  {/* formatting */}
                  <Card>
                    <CardHeader
                      icon={
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 9,
                            background: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <LayoutTemplate size={15} color="#2563eb" />
                        </div>
                      }
                      title="Formatting"
                      sub="Structure & presentation"
                      right={
                        <span
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            color: getColor(result.score_breakdown.format_score)
                              .text,
                          }}
                        >
                          {result.score_breakdown.format_score}
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 400,
                              color: "#94a3b8",
                            }}
                          >
                            /100
                          </span>
                        </span>
                      }
                    />
                    <div style={{ padding: "12px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 11,
                          color: "#94a3b8",
                          marginBottom: 5,
                        }}
                      >
                        <span>Checks passed</span>
                        <span style={{ fontWeight: 600, color: "#475569" }}>
                          {passedCount}/{checks.length}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 4,
                          background: "#f1f5f9",
                          borderRadius: 999,
                          overflow: "hidden",
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: (passedCount / checks.length) * 100 + "%",
                            background: "#2563eb",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 7,
                        }}
                      >
                        {checks.map((c) => (
                          <div
                            key={c.label}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              fontSize: 13,
                            }}
                          >
                            <div
                              style={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                flexShrink: 0,
                                background: c.passed ? "#16a34a" : "#e2e8f0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 9,
                                color: "#fff",
                                fontWeight: 700,
                              }}
                            >
                              {c.passed ? "✓" : ""}
                            </div>
                            <span
                              style={{
                                color: c.passed ? "#334155" : "#94a3b8",
                                textDecoration: c.passed
                                  ? "none"
                                  : "line-through",
                              }}
                            >
                              {c.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* stats */}
                  <Card>
                    <CardHeader
                      icon={
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 9,
                            background: "#f1f5f9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FileText size={15} color="#64748b" />
                        </div>
                      }
                      title="Document Stats"
                      sub="Extracted from your resume"
                    />
                    <div
                      style={{
                        padding: 14,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 8,
                      }}
                    >
                      {[
                        {
                          icon: <FileText size={17} color="#2563eb" />,
                          bg: "#eff6ff",
                          value:
                            result.document_status.word_count.toLocaleString(),
                          label: "Words",
                        },
                        {
                          icon: <BookOpen size={17} color="#d97706" />,
                          bg: "#fffbeb",
                          value: result.document_status.reading_level,
                          label: "Reading",
                        },
                        {
                          icon: <Briefcase size={17} color="#16a34a" />,
                          bg: "#f0fdf4",
                          value: String(
                            result.document_status.experience_years,
                          ),
                          label: "Yrs Exp",
                        },
                      ].map(({ icon, bg, value, label }) => (
                        <div
                          key={label}
                          style={{
                            background: "#f8fafc",
                            border: "0.5px solid #e2e8f0",
                            borderRadius: 10,
                            padding: "14px 8px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 6,
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 9,
                              background: bg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {icon}
                          </div>
                          <span
                            style={{
                              fontSize: 17,
                              fontWeight: 700,
                              color: "#0f172a",
                              lineHeight: 1,
                            }}
                          >
                            {value}
                          </span>
                          <span style={{ fontSize: 11, color: "#94a3b8" }}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              {/*action plan  */}
              {result.improvement_tasks.length > 0 && (
                <div className="fade-up delay-3">
                  <SectionLabel label="Action Plan" />
                  <Card>
                    <CardHeader
                      icon={
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 9,
                            background: "#f5f3ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ListChecks size={15} color="#7c3aed" />
                        </div>
                      }
                      title="Action Items"
                      sub={`${fixedCount} of ${totalTasks} fixed`}
                      right={
                        <span
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#0f172a",
                          }}
                        >
                          {taskPct}
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 400,
                              color: "#94a3b8",
                            }}
                          >
                            %
                          </span>
                        </span>
                      }
                    />
                    <div
                      style={{
                        height: 3,
                        background: "#f1f5f9",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: taskPct + "%",
                          background: taskPct === 100 ? "#16a34a" : "#7c3aed",
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                    {result.improvement_tasks.map((task) => (
                      <TaskRow
                        key={task.id}
                        task={task}
                        onFix={() =>
                          setFixed((prev) => {
                            const next = new Set(prev);
                            next.has(task.id)
                              ? next.delete(task.id)
                              : next.add(task.id);
                            return next;
                          })
                        }
                      />
                    ))}
                  </Card>
                </div>
              )}

              {/*  export  */}
              <div className="fade-up delay-4">
                <div
                  style={{
                    background: "#ffffff",
                    border: "0.5px solid #e2e8f0",
                    borderRadius: 14,
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      Export your report
                    </p>
                    <p
                      style={{
                        margin: "3px 0 0",
                        fontSize: 12,
                        color: "#94a3b8",
                      }}
                    >
                      Save as PDF or copy the summary
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={handleCopy}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "9px 20px",
                        borderRadius: 999,
                        border: "0.5px solid #e2e8f0",
                        background: "#ffffff",
                        color: "#475569",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <Copy size={13} /> Copy Summary
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "9px 20px",
                        borderRadius: 999,
                        border: "none",
                        background: "#2563eb",
                        color: "#ffffff",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <Download size={13} /> Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </PageWrapper>
        </div>
      </main>
      <Footer />
    </div>
  );
}

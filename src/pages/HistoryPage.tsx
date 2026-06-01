import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  RotateCcw,
  Clock,
  ChevronRight,
  Plus,
  TrendingUp,
  BarChart2,
  Target,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { useHistory } from "@/hooks/useHistorry";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import EmptyState from "@/components/shared/EmptyState";
import type { SavedAnalysis } from "@/types";

//  helpers

function getScoreColor(score: number) {
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

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Work";
}

//  skeleton

function SkeletonCard() {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "0.5px solid #e2e8f0",
        borderRadius: 14,
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#f1f5f9",
          flexShrink: 0,
        }}
      />
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div
          style={{
            width: "35%",
            height: 13,
            borderRadius: 6,
            background: "#f1f5f9",
          }}
        />
        <div
          style={{
            width: "55%",
            height: 10,
            borderRadius: 6,
            background: "#f8fafc",
          }}
        />
        <div
          style={{
            width: "70%",
            height: 9,
            borderRadius: 6,
            background: "#f8fafc",
          }}
        />
      </div>
      <div
        style={{
          width: 90,
          height: 34,
          borderRadius: 999,
          background: "#f1f5f9",
        }}
      />
    </div>
  );
}

// history card

function HistoryCard({
  analysis,
  onLoad,
  onDelete,
}: {
  analysis: SavedAnalysis;
  onLoad: (a: SavedAnalysis) => void;
  onDelete: (id: string) => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [hovered, setHovered] = useState(false);
  const sc = getScoreColor(analysis.atsScore);

  const timeAgo = formatDistanceToNow(new Date(analysis.createdAt), {
    addSuffix: true,
  });

  const handleDelete = () => {
    if (confirming) {
      onDelete(analysis.id);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: "0.5px solid #e2e8f0",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      {/* main row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "18px 20px",
        }}
      >
        {/* score circle */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            flexShrink: 0,
            background: sc.bg,
            border: `2px solid ${sc.border}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: sc.text,
              lineHeight: 1,
            }}
          >
            {analysis.atsScore}
          </span>
          <span
            style={{
              fontSize: 8,
              color: sc.text,
              fontWeight: 500,
              marginTop: 1,
            }}
          >
            /100
          </span>
        </div>

        {/* info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>
              {analysis.jobTitle || "Untitled Role"}
            </span>
            {analysis.company && (
              <>
                <span style={{ color: "#cbd5e1", fontSize: 12 }}>·</span>
                <span style={{ fontSize: 13, color: "#64748b" }}>
                  {analysis.company}
                </span>
              </>
            )}
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 999,
                background: sc.chip,
                color: sc.chipText,
              }}
            >
              {getScoreLabel(analysis.atsScore)}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              <Clock size={11} />
              {timeAgo}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "#16a34a",
                background: "#f0fdf4",
                padding: "1px 8px",
                borderRadius: 999,
              }}
            >
              {analysis.matchedKeyWords.length} matched
            </span>
            <span
              style={{
                fontSize: 11,
                color: "#dc2626",
                background: "#fef2f2",
                padding: "1px 8px",
                borderRadius: 999,
              }}
            >
              {analysis.skillGaps.length} gaps
            </span>
          </div>
        </div>

        {/* actions */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            onClick={handleDelete}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "8px 14px",
              borderRadius: 999,
              border: confirming ? "none" : "0.5px solid #fecaca",
              background: confirming ? "#dc2626" : "#fff5f5",
              color: confirming ? "#fff" : "#dc2626",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Trash2 size={12} />
            {confirming ? "Confirm?" : "Delete"}
          </button>

          <button
            onClick={() => onLoad(analysis)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "8px 16px",
              borderRadius: 999,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <RotateCcw size={12} />
            Load
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* strengths preview */}
      {analysis.strengths.length > 0 && (
        <div
          style={{
            padding: "10px 20px 14px",
            borderTop: "0.5px solid #f8fafc",
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {analysis.strengths.slice(0, 3).map((s, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                color: "#64748b",
                background: "#f8fafc",
                border: "0.5px solid #e2e8f0",
                padding: "3px 10px",
                borderRadius: 999,
              }}
            >
              {s.length > 48 ? s.slice(0, 48) + "…" : s}
            </span>
          ))}
          {analysis.strengths.length > 3 && (
            <span style={{ fontSize: 11, color: "#94a3b8" }}>
              +{analysis.strengths.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

//  page

export default function HistoryPage() {
  const { user } = useAuth();
  const { analyses, loading, error, handleDelete, handleLoad } = useHistory();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#f8fafc" }}
      >
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <EmptyState
            title="Sign in to view history"
            description="Your saved analyses are linked to your Google account."
            actionLabel="Go to Home"
            onAction={() => navigate("/")}
          />
        </main>
        <Footer />
      </div>
    );
  }

  const bestScore =
    analyses.length > 0 ? Math.max(...analyses.map((a) => a.atsScore)) : 0;
  const avgScore =
    analyses.length > 0
      ? Math.round(
          analyses.reduce((s, a) => s + a.atsScore, 0) / analyses.length,
        )
      : 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f8fafc" }}
    >
      <NavBar />

      <main className="flex-1">
        {/*  top bar */}
        <div
          style={{ background: "#ffffff", borderBottom: "0.5px solid #e2e8f0" }}
        >
          <PageWrapper className="py-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  My Resumes
                </h1>
                <p
                  style={{ margin: "3px 0 0", fontSize: 13, color: "#64748b" }}
                >
                  {loading
                    ? "Loading your analyses..."
                    : analyses.length > 0
                      ? `${analyses.length} saved ${analyses.length === 1 ? "analysis" : "analyses"}`
                      : "No saved analyses yet"}
                </p>
              </div>
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
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Plus size={14} /> New Analysis
              </button> */}
            </div>
          </PageWrapper>
        </div>

        <PageWrapper className="py-8">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/*  error  */}
            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "#fef2f2",
                  border: "0.5px solid #fecaca",
                  borderRadius: 12,
                  fontSize: 13,
                  color: "#b91c1c",
                }}
              >
                {error}
              </div>
            )}

            {/*  loading  */}
            {loading && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/*  empty  */}
            {!loading && analyses.length === 0 && (
              <div
                style={{
                  background: "#ffffff",
                  border: "0.5px solid #e2e8f0",
                  borderRadius: 16,
                  padding: "60px 24px",
                }}
              >
                <EmptyState
                  title="No analyses saved yet"
                  description="Run your first analysis and sign in to save it here."
                  actionLabel="Analyze a Resume"
                  onAction={() => navigate("/")}
                />
              </div>
            )}

            {/*  stats row + list  */}
            {!loading && analyses.length > 0 && (
              <>
                {/* stats */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  {[
                    {
                      icon: <BarChart2 size={18} color="#2563eb" />,
                      bg: "#eff6ff",
                      value: analyses.length,
                      label: "Total Analyses",
                      color: "#2563eb",
                    },
                    {
                      icon: <TrendingUp size={18} color="#16a34a" />,
                      bg: "#f0fdf4",
                      value: bestScore,
                      label: "Best Score",
                      color: "#16a34a",
                    },
                    {
                      icon: <Target size={18} color="#d97706" />,
                      bg: "#fffbeb",
                      value: avgScore,
                      label: "Avg Score",
                      color: "#d97706",
                    },
                  ].map(({ icon, bg, value, label, color }) => (
                    <div
                      key={label}
                      style={{
                        background: "#ffffff",
                        border: "0.5px solid #e2e8f0",
                        borderRadius: 14,
                        padding: "18px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: bg,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {icon}
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 24,
                            fontWeight: 700,
                            color,
                            lineHeight: 1,
                          }}
                        >
                          {value}
                        </p>
                        <p
                          style={{
                            margin: "4px 0 0",
                            fontSize: 12,
                            color: "#94a3b8",
                          }}
                        >
                          {label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* section label */}
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    margin: "4px 0 0",
                  }}
                >
                  Recent Analyses
                </p>

                {/* cards */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {analyses.map((analysis) => (
                    <HistoryCard
                      key={analysis.id}
                      analysis={analysis}
                      onLoad={handleLoad}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </PageWrapper>
      </main>

      <Footer />
    </div>
  );
}

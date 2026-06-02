import type { AnalysisStep } from "@/hooks/useRunAnalysis";

type Step = {
  id: AnalysisStep;
  label: string;
  sublabel: string;
};

const STEPS: Step[] = [
  {
    id: "extracting",
    label: "Reading Resume",
    sublabel: "Extracting text from your file",
  },
  {
    id: "analyzing",
    label: "AI Analysis",
    sublabel: "Scoring against job description",
  },
  {
    id: "saving",
    label: "Saving Results",
    sublabel: "Storing to your account",
  },
];

function getStatus(
  step: Step,
  currentStep: AnalysisStep | null,
): "done" | "active" | "pending" {
  const order = STEPS.map((s) => s.id);
  const stepIdx = order.indexOf(step.id);
  const activeIdx = currentStep ? order.indexOf(currentStep) : -1;
  if (stepIdx < activeIdx) return "done";
  if (stepIdx === activeIdx) return "active";
  return "pending";
}

export default function LoadingScreen({
  currentStep,
}: {
  currentStep: AnalysisStep | null;
}) {
  const activeStep = STEPS.find((s) => s.id === currentStep);

  const progressWidth =
    currentStep === "extracting"
      ? "30%"
      : currentStep === "analyzing"
        ? "65%"
        : currentStep === "saving"
          ? "90%"
          : "5%";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#f0f4f8" }}
    >
      <div
        className="bg-white rounded-2xl flex flex-col items-center"
        style={{
          width: 480,
          padding: "48px 40px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        }}
      >
        {/* Spinner */}
        <div className="relative mb-6" style={{ width: 88, height: 88 }}>
          {/* Outer track */}
          <svg
            width="88"
            height="88"
            style={{ position: "absolute", inset: 0 }}
          >
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="5"
            />
          </svg>
          {/* Spinning arc */}
          <svg
            width="88"
            height="88"
            style={{
              position: "absolute",
              inset: 0,
              animation: "spin 1s linear infinite",
            }}
          >
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="60 180"
            />
          </svg>
          {/* Center dot */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#1d4ed8",
                animation: "pulse 1.4s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 8px",
            textAlign: "center",
          }}
        >
          Analyzing your resume
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#6b7280",
            margin: "0 0 32px",
            textAlign: "center",
          }}
        >
          {activeStep
            ? activeStep.sublabel
            : "This usually takes 15–20 seconds"}
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: 4,
            background: "#e5e7eb",
            borderRadius: 99,
            marginBottom: 28,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: progressWidth,
              background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
              borderRadius: 99,
              transition: "width 0.6s ease",
            }}
          />
        </div>

        {/* Steps */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {STEPS.map((step) => {
            const status = getStatus(step, currentStep);
            return (
              <div
                key={step.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  borderRadius: 12,
                  background:
                    status === "active"
                      ? "#eff6ff"
                      : status === "done"
                        ? "#f9fafb"
                        : "transparent",
                  border:
                    status === "active"
                      ? "1px solid #bfdbfe"
                      : status === "done"
                        ? "1px solid #f3f4f6"
                        : "1px solid transparent",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      status === "done"
                        ? "#dcfce7"
                        : status === "active"
                          ? "#dbeafe"
                          : "#f3f4f6",
                  }}
                >
                  {status === "done" && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8L6.5 11.5L13 4.5"
                        stroke="#16a34a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {status === "active" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ animation: "spin 1s linear infinite" }}
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="10 10"
                      />
                    </svg>
                  )}
                  {status === "pending" && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#d1d5db",
                      }}
                    />
                  )}
                </div>

                {/* Labels */}
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      margin: "0 0 2px",
                      color:
                        status === "active"
                          ? "#1d4ed8"
                          : status === "done"
                            ? "#9ca3af"
                            : "#9ca3af",
                      textDecoration:
                        status === "done" ? "line-through" : "none",
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      margin: 0,
                      color: status === "active" ? "#3b82f6" : "#d1d5db",
                    }}
                  >
                    {step.sublabel}
                  </p>
                </div>

                {/* Badge */}
                {status === "done" && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 99,
                      background: "#dcfce7",
                      color: "#16a34a",
                      flexShrink: 0,
                    }}
                  >
                    Done
                  </span>
                )}
                {status === "active" && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 99,
                      background: "#dbeafe",
                      color: "#1d4ed8",
                      flexShrink: 0,
                    }}
                  >
                    Running
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}

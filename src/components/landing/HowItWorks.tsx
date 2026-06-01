import { Upload, Cpu, Sparkles } from "lucide-react";

const STEPS = [
  {
    number: "1",
    icon: Upload,
    title: "Upload",
    desc: "Drop your resume and paste an optional job description into our secure analyzer. ",
    iconBg: "#dbeafe",
    inColor: "#1d4ed8",
    borderTop: "#7c3aed",
  },
  {
    number: "2",
    icon: Cpu,
    title: "Analyze",
    desc: "Our AI scans your content against industry-standard ATS filters and keyword benchmarks.",
    iconBg: "#ede9fe",
    inColor: "#7c3aed",
    borderTop: "#7c3aed",
  },
  {
    number: "3",
    icon: Sparkles,
    title: "Optimize",
    desc: "Get a detailed score, missing keywords, and a tailored rewrite to boost your match rate.",
    iconBg: "#dcfce7",
    inColor: "#16a34a",
    borderTop: "#16a34a",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-gray-50">
      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#6b7280",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          How It Works
        </p>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: " #111827",
            letterSpacing: "-0.5px",
            margin: 0,
          }}
        >
          Three Steps to Optimize
        </h2>
      </div>
      {/* step grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "24px",

          marginTop: "10px",
        }}
      >
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              style={{
                background: "#ffffff",
                border: "1px solid #f3f4f6",
                borderRadius: "16px",
                padding: "32px 28px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                borderTop: `3px solid ${step.borderTop}`,
                position: "relative",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 24px rgba(0,0,0,0.10)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 1px 4px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
              }}
            >
              {/* stepNumber */}
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#d1d5db",
                  letterSpacing: "1px",
                  marginBottom: "16px",
                  margin: "0 0 16px 0",
                }}
              >
                {step.number}
              </p>

              {/* Icon */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: step.iconBg,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Icon size={22} color={step.inColor} />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "10px",
                  margin: "0 0 10px 0",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

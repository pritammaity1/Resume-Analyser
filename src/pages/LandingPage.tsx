import { useState, useEffect } from "react";
import { useAnalysis } from "@/context/AnalysisContext";
import { useRunAnalysis } from "@/hooks/useRunAnalysis";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import HeroSection from "@/components/landing/HeroSection";
import UploadCard from "@/components/landing/UploadCard";
import JobContextCard from "@/components/landing/JobContextCard";
import HowItWorks from "@/components/landing/HowItWorks";

import LoadingScreen from "@/components/shared/LoadingScreen";

import type { UploadFile } from "@/types";
import toast from "react-hot-toast";

export default function LandingPage() {
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null);
  const [jobDesc, setJobDesc] = useState("");

  const { isAnalyzing, error, setError } = useAnalysis();
  const { run, currentStep } = useRunAnalysis();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 5000,
        style: {
          fontSize: "13px",
          fontWeight: "500",
          maxWidth: "420px",
        },
      });
      setError(null);
    }
  }, [error]);

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    await run(uploadedFile!, jobDesc);
  };

  if (isAnalyzing) {
    return <LoadingScreen currentStep={currentStep} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gray-50 ">
          <PageWrapper className="pt-24 pb-12">
            <HeroSection />
          </PageWrapper>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-50 py-12">
          <div
            style={{
              maxWidth: "1305px",
              margin: "0 auto",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              marginTop: "11.5px",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Card */}
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    Resume Upload
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#9ca3af",
                    }}
                  >
                    PDF, DOCX (MAX 5MB)
                  </span>
                </div>
                <UploadCard onFile={setUploadedFile} uploaded={uploadedFile} />
              </div>

              {/* Job Context Card */}
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "28px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  minHeight: "220px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: "16px" }}>
                  <p
                    style={{
                      fontSize: "17px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    Job Context (Optional)
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#9ca3af",
                    }}
                  >
                    Paste the job description for a targeted match score.
                  </p>
                </div>
                <JobContextCard
                  value={jobDesc}
                  onChange={setJobDesc}
                  onAnalyze={handleAnalyze}
                  isLoading={isAnalyzing}
                  isDisabled={!uploadedFile}
                />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className=" border-gray-200">
          <PageWrapper className="py-16">
            <HowItWorks />
          </PageWrapper>
        </div>
      </main>

      <Footer />
    </div>
  );
}

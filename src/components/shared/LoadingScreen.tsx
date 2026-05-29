import { CheckCircle, Circle, Loader } from "lucide-react";
import type { AnalysisStep } from "../../hooks/useRunAnalysis";

type Step = {
  id: AnalysisStep;
  label: string;
};

const STEPS: Step[] = [
  { id: "extracting", label: "Reading your Resume..." },
  { id: "analyzing", label: "Analyzing with AI ..." },
  { id: "rewrite", label: "Rewriting your Resume ..." },
  { id: "saving", label: "Saving your result ..." },
];

//  helper what status in each step

function getStepStatus(
  step: Step,
  currentStep: AnalysisStep | null,
): "done" | "active" | "pending" {
  const order = STEPS.map((s) => s.id);
  const stepIndex = order.indexOf(step.id);
  const activeIdx = currentStep ? order.indexOf(currentStep) : -1;

  if (stepIndex < activeIdx) return "done";
  if (stepIndex === activeIdx) return "active";
  return "pending";
}

type LoadingScreenProps = {
  currentStep: AnalysisStep | null;
};

export default function LoadingScreen({ currentStep }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-6">
      {/* Spinning ring */}
      <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mb-8">
        {/* Titile */}

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Analyzing your resume
        </h2>
        <p className="text-sm text-gray-400 mb-10">
          This usually take 15-20 seconds
        </p>

        {/* step list */}

        <div className="flex flex-col gap-4 w-full max-w-xs">
          {STEPS.map((step) => {
            const status = getStepStatus(step, currentStep);

            return (
              <div key={step.id} className="flex items-center gap-3">
                {/* status icon */}
                {status === "done" && (
                  <CheckCircle className="text-green-500 shrink-0" size={20} />
                )}
                {status === "active" && (
                  <Loader className="text-blue-300 shrink-0" size={20} />
                )}
                {status === "pending" && (
                  <Circle className="text-gray-300 shrink-0" size={20} />
                )}

                {/* step label */}

                <span
                  className={`text-sm font-medium ${status === "done" ? "text-gray-400 line-through" : status === "active" ? "text-gray-900" : "text-gray-400"}`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

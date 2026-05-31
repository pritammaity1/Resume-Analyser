import { useState } from "react";
import { Bookmark, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import GoogleButton from "@/components/auth/GoogleButton";

export default function SavePromptBanner() {
  const { user } = useAuth();

  const [dismissed, setDismissed] = useState(false);

  // if the user already logged in or dismissed

  if (user || dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-4 mb-6 bg-blue-50 border-blue-200 rounded-xl">
      {/* left icon  */}

      <div className="flex items-center gap-3 ">
        <div className="text-blue-100 rounded-lg flex items-center justify-center shrink-0">
          <Bookmark size={16} className="text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-900">
            Save this analysis?
          </p>
          <p className="text-xs text-blue-600 mt-0.5">
            Sign in with Google to access your results.
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-2 shrink-0">
        <GoogleButton label="Save with Google" className="text-xs px-3 py-2" />

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1.5 text-blue-400 hover:text-blue-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

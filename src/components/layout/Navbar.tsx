import { Link, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import GoogleButton from "@/components/auth/GoogleButton";
import UserMenu from "@/components/auth/UserMenu";

export default function NavBar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="'max-w-6xl mx-auto px-4 sm:px-6 lg:pz-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={14} />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Resume <span className="text-blue-600 ">IQ</span>
            </span>
          </Link>

          {/* Nav Links onl when logged in */}

          {user && (
            <div className="hidden sm:flex items-center gap-6">
              <Link
                to="/history"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
              >
                My Resumes
              </Link>
              <Link
                to="/settings"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
              >
                Settings
              </Link>
            </div>
          )}

          {/* Right Side */}

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Analyze Resume
            </button>

            {/* Auth Sate */}

            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : user ? (
              <UserMenu />
            ) : (
              <GoogleButton label="Sign in" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

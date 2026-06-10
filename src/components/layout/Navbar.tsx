import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import GoogleButton from "@/components/auth/GoogleButton";
import UserMenu from "@/components/auth/UserMenu";

export default function NavBar() {
  const { user, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sl">
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          paddingLeft: "3rem",
          paddingRight: "3rem",
        }}
      >
        <div className="flex items-center justify-between h-16 ">
          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 hover:opacity-80 transition-opacit -ml-8"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={20} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-">
              Resume <span className="text-blue-600  ">IQ</span>
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

          <div className="flex items-center gap-4">
            {/* <button
              onClick={() => navigate("/")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                background: "#1d4ed8",
                border: "1.5px solid #1d4ed8",
                borderRadius: "24px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#ffffff",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                transition: "all 0.2s",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#1e40af";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#1d4ed8";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 1px 3px rgba(0,0,0,0.12)";
              }}
            >
              Analyze Resume
            </button> */}

            {/* Auth Sate */}

            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse cursor-pointer" />
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

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, History, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close menu when clicking outside

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 hover:opacity-80 transition-cover"
      >
        <img
          src={user.photoURL ?? ""}
          alt={user.displayName ?? "User"}
          className="w-8 h-8 rounded-full boredr-2 border-gray-200 object-cover"
        />

        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />

        {/* dropdwon menu */}

        {open && (
          <div className="absolute right-0 top-11 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
            {/* user Info */}

            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.displayName}
              </p>
              <p className="text-sm text-gray-400 truncate mt-0.5">
                {user.email}
              </p>
            </div>

            {/* menu item */}

            <div className="py-1">
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <History size={15} className="text-gray-400" />
                My Analysis
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate("/settings");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings size={15} className="text-grray-400" />
                Settings
              </button>
            </div>

            {/* LogOut */}

            <div className="borderr-t border-gray-100 py-1">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}

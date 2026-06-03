import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Shield, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClick(e: Event) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div style={{ position: "relative" }} ref={menuRef}>
      {/* trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px 4px 4px",
          background: open ? "#f8fafc" : "transparent",
          border: "0.5px solid",
          borderColor: open ? "#e2e8f0" : "transparent",
          borderRadius: 999,
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName ?? "User"}
            referrerPolicy="no-referrer"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "1.5px solid #e2e8f0",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={14} color="#2563eb" />
          </div>
        )}
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#0f172a",
            maxWidth: 90,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {user.displayName && user.displayName.length > 2
            ? user.displayName.split(" ")[0]
            : (user.email?.split("@")[0] ?? "User")}
        </span>
        <ChevronDown
          size={13}
          color="#94a3b8"
          style={{
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* dropdown */}

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            width: 240,
            background: "#ffffff",
            border: "0.5px solid #e2e8f0",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            zIndex: 50,
            overflow: "hidden",
          }}
        >
          {/* profile header */}
          <div
            style={{
              padding: "16px",
              background: "#f8fafc",
              borderBottom: "0.5px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? "User"}
                referrerPolicy="no-referrer"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "2px solid #ffffff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "#eff6ff",
                  flexShrink: 0,
                  border: "2px solid #ffffff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={18} color="#2563eb" />
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 3,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0f172a",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.displayName ?? "User"}
                </p>
                {user.emailVerified && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 999,
                      background: "#f0fdf4",
                      color: "#16a34a",
                      border: "0.5px solid #bbf7d0",
                      flexShrink: 0,
                    }}
                  >
                    <Shield size={8} /> Verified
                  </span>
                )}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: "#94a3b8",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.email}
              </p>
            </div>
          </div>

          {/* signOut */}

          <div style={{ padding: "6px 0" }}>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fff5f5")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: "#fff5f5",
                  border: "0.5px solid #fecaca",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <LogOut size={14} color="#dc2626" />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#dc2626",
                  }}
                >
                  Sign Out
                </p>
                <p
                  style={{ margin: "1px 0 0", fontSize: 11, color: "#94a3b8" }}
                >
                  You can sign back in anytime
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

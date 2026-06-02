import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  Trash2,
  Shield,
  Bell,
  ChevronRight,
  Mail,
  Calendar,
  Sparkles,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmptyState from "@/components/shared/EmptyState";

//  toggle

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      style={{
        width: 42,
        height: 24,
        borderRadius: 999,
        background: enabled ? "#2563eb" : "#e2e8f0",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: enabled ? 21 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#ffffff",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        }}
      />
    </button>
  );
}

//  row

function Row({
  icon,
  iconBg,
  label,
  description,
  right,
  onClick,
  danger = false,
  last = false,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  description?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  last?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 20px",
        borderBottom: last ? "none" : "0.5px solid #f1f5f9",
        cursor: onClick ? "pointer" : "default",
        background: hovered && onClick ? "#fafafa" : "transparent",
        transition: "background 0.15s",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: iconBg,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            color: danger ? "#dc2626" : "#0f172a",
          }}
        >
          {label}
        </p>
        {description && (
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94a3b8" }}>
            {description}
          </p>
        )}
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
      {onClick && !right && <ChevronRight size={15} color="#94a3b8" />}
    </div>
  );
}

//  page

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  if (!user) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#f0f4f8" }}
      >
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <EmptyState
            title="Sign in to view settings"
            description="Your settings are linked to your Google account."
            actionLabel="Go to Home"
            onAction={() => navigate("/")}
          />
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogout = async () => {
    if (logoutConfirm) {
      await logout();
      navigate("/");
    } else {
      setLogoutConfirm(true);
      setTimeout(() => setLogoutConfirm(false), 3000);
    }
  };

  const joinedAgo = user.metadata.creationTime
    ? formatDistanceToNow(new Date(user.metadata.creationTime), {
        addSuffix: true,
      })
    : null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f0f4f8" }}
    >
      <NavBar />

      <main className="flex-1 flex items-center justify-center py-12">
        <div style={{ width: "100%", maxWidth: 520, padding: "0 16px" }}>
          {/*  floating card  */}
          <div
            style={{
              background: "#ffffff",
              border: "0.5px solid #e2e8f0",
              borderRadius: 20,
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}
          >
            {/*  blue top bar  */}
            <div
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                padding: "20px 24px 15px",
                position: "relative",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Settings
              </h1>
              <p
                style={{
                  margin: "3px 0 0",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Manage your account and preferences
              </p>
            </div>

            {/*  profile floated over the bar  */}
            <div
              style={{
                margin: "20px 24px 0",
                background: "#ffffff",
                border: "0.5px solid #e2e8f0",
                borderRadius: 16,
                padding: "16px 18px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                marginBottom: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* avatar */}
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName ?? "User"}
                    referrerPolicy="no-referrer"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: "3px solid #ffffff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "#eff6ff",
                      flexShrink: 0,
                      border: "3px solid #ffffff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User size={24} color="#2563eb" />
                  </div>
                )}

                {/* info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {user.displayName ?? "User"}
                    </p>
                    {user.emailVerified && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 10,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 999,
                          background: "#f0fdf4",
                          color: "#16a34a",
                          border: "0.5px solid #bbf7d0",
                        }}
                      >
                        <Shield size={9} /> Verified
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      marginTop: 4,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <Mail size={11} color="#94a3b8" />
                      <span style={{ fontSize: 12, color: "#64748b" }}>
                        {user.email}
                      </span>
                    </div>
                    {joinedAgo && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Calendar size={11} color="#94a3b8" />
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>
                          Joined {joinedAgo}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* stats row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr ",
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "0.5px solid #f1f5f9",
                }}
              >
                {[
                  { label: "Signed in with", value: "Google" },
                  { label: "Account type", value: "Free" },
                ].map(({ label, value }, i) => (
                  <div
                    key={label}
                    style={{
                      textAlign: "center",
                      borderRight: i < 1 ? "0.5px solid #f1f5f9" : "none",
                      padding: "0 8px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {value}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 10,
                        color: "#94a3b8",
                      }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/*preferences section  */}
            <div style={{ padding: "20px 24px 0" }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0 0 8px",
                }}
              >
                Preferences
              </p>
            </div>

            <div
              style={{
                margin: "0 24px",
                background: "#ffffff",
                border: "0.5px solid #e2e8f0",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              <Row
                icon={<Bell size={15} color="#2563eb" />}
                iconBg="#eff6ff"
                label="Analysis Notifications"
                description="Get notified when your analysis is ready"
                right={
                  <Toggle enabled={notifications} onChange={setNotifications} />
                }
                last
              />
            </div>

            {/*  account section  */}
            <div style={{ padding: "20px 24px 0" }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0 0 8px",
                }}
              >
                Account
              </p>
            </div>

            <div
              style={{
                margin: "0 24px",
                background: "#ffffff",
                border: "0.5px solid #e2e8f0",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              <Row
                icon={
                  <LogOut
                    size={15}
                    color={logoutConfirm ? "#dc2626" : "#64748b"}
                  />
                }
                iconBg={logoutConfirm ? "#fef2f2" : "#f8fafc"}
                label={logoutConfirm ? "Click again to confirm" : "Sign Out"}
                description="You can sign back in anytime with Google"
                onClick={handleLogout}
                danger={logoutConfirm}
              />
              <Row
                icon={<Trash2 size={15} color="#dc2626" />}
                iconBg="#fef2f2"
                label="Delete All Analyses"
                description="Permanently remove all saved analyses"
                onClick={() => navigate("/history")}
                danger
                last
              />
            </div>

            {/*  footer  */}
            <div
              style={{
                padding: "20px 24px 24px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 12, color: "#cbd5e1" }}>
                ResumeIQ · Version 0.0.0
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

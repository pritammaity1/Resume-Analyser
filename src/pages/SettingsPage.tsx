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
import PageWrapper from "@/components/layout/PageWrapper";
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

//  section wrapper

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          margin: "0 0 10px",
        }}
      >
        {title}
      </p>
      <div
        style={{
          background: "#ffffff",
          border: "0.5px solid #e2e8f0",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

//settings row

function Row({
  icon,
  iconBg,
  label,
  description,
  right,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  description?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
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
        padding: "14px 18px",
        borderBottom: "0.5px solid #f8fafc",
        cursor: onClick ? "pointer" : "default",
        background: hovered && onClick ? "#f8fafc" : "transparent",
        transition: "background 0.15s",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
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
      {onClick && !right && (
        <ChevronRight size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
      )}
    </div>
  );
}

// page

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  if (!user) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#f8fafc" }}
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
      style={{ background: "#f8fafc" }}
    >
      <NavBar />

      <main className="flex-1">
        {/* top bar  */}
        <div
          style={{ background: "#ffffff", borderBottom: "0.5px solid #e2e8f0" }}
        >
          <PageWrapper className="py-5">
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Settings
            </h1>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "#64748b" }}>
              Manage your account and preferences
            </p>
          </PageWrapper>
        </div>

        <PageWrapper className="py-8">
          <div
            style={{
              maxWidth: 580,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/*  profile card  */}
            <div
              style={{
                background: "#ffffff",
                border: "0.5px solid #e2e8f0",
                borderRadius: 14,
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {/* avatar */}
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName ?? "User"}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      border: "2px solid #e2e8f0",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "#eff6ff",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User size={26} color="#2563eb" />
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
                      marginBottom: 4,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 17,
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
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 9px",
                          borderRadius: 999,
                          background: "#f0fdf4",
                          color: "#16a34a",
                          border: "0.5px solid #bbf7d0",
                        }}
                      >
                        <Shield size={10} /> Verified
                      </span>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <Mail size={12} color="#94a3b8" />
                      <span style={{ fontSize: 13, color: "#64748b" }}>
                        {user.email}
                      </span>
                    </div>
                    {joinedAgo && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Calendar size={12} color="#94a3b8" />
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>
                          Joined {joinedAgo}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* divider + stats */}
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: "0.5px solid #f1f5f9",
                  display: "flex",
                  gap: 0,
                }}
              >
                {[
                  { label: "Signed in with", value: "Google" },
                  { label: "Account type", value: "Free" },
                  { label: "AI Model", value: "Gemini 2.5" },
                ].map(({ label, value }, i) => (
                  <div
                    key={label}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "0 12px",
                      borderRight: i < 2 ? "0.5px solid #f1f5f9" : "none",
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
                        fontSize: 11,
                        color: "#94a3b8",
                      }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* preferences  */}
            <Section title="Preferences">
              <Row
                icon={<Bell size={15} color="#2563eb" />}
                iconBg="#eff6ff"
                label="Analysis Notifications"
                description="Get notified when your analysis is ready"
                right={
                  <Toggle enabled={notifications} onChange={setNotifications} />
                }
              />
              <Row
                icon={<Sparkles size={15} color="#7c3aed" />}
                iconBg="#f5f3ff"
                label="AI Model"
                description="Currently using Google Gemini 2.5 Flash"
                right={
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: "#f5f3ff",
                      color: "#7c3aed",
                      border: "0.5px solid #ddd6fe",
                    }}
                  >
                    Gemini 2.5
                  </span>
                }
              />
            </Section>

            {/* account  */}
            <Section title="Account">
              <Row
                icon={
                  <LogOut
                    size={15}
                    color={logoutConfirm ? "#dc2626" : "#64748b"}
                  />
                }
                iconBg={logoutConfirm ? "#fef2f2" : "#f1f5f9"}
                label={
                  logoutConfirm ? "Click again to confirm logout" : "Sign Out"
                }
                description="You can sign back in anytime with Google"
                onClick={handleLogout}
                danger={logoutConfirm}
              />
              <Row
                icon={<Trash2 size={15} color="#dc2626" />}
                iconBg="#fef2f2"
                label="Delete All Analyses"
                description="Permanently remove all your saved analyses"
                onClick={() => navigate("/history")}
                danger
              />
            </Section>

            {/*  app info */}
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
                ResumeIQ · Version 0.0.0
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>
                Powered by Google Gemini 2.5 Flash
              </p>
            </div>
          </div>
        </PageWrapper>
      </main>

      <Footer />
    </div>
  );
}

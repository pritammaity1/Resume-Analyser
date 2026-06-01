import { useAuth } from "@/hooks/useAuth";

interface GoogleButtonProps {
  label?: string;
  className?: string;
}

export default function GoogleButton({
  label = "Sign in with Google",
  className = "",
}: GoogleButtonProps) {
  const { loginWithGoogle } = useAuth();

  return (
    <button
      type="button"
      onClick={loginWithGoogle}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        background: "#ffffff",
        border: "1.5px solid #dadce0",
        borderRadius: "24px",
        fontSize: "14px",
        fontWeight: "500",
        color: "#3c4043",
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        transition: "all 0.2s",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.15)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#c0c0c0";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#dadce0";
      }}
    >
      {/* Official Google G icon */}
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209
             1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567
             2.684-3.875 2.684-6.615z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54
             -1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332
             A8.997 8.997 0 0 0 9 18z"
        />
        <path
          fill="#FBBC05"
          d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282
             -1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957
             4.042l3.007-2.332z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891
             11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672
             5.163 6.656 3.58 9 3.58z"
        />
      </svg>
      {label}
    </button>
  );
}

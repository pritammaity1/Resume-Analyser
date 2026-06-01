export default function Footer() {
  return (
    <footer
      style={{
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
      className="bg-gray-100"
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Logo */}
        <p
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#111827",
            margin: 0,
          }}
        >
          Resume<span style={{ color: "#1d4ed8" }}>IQ</span>
        </p>

        {/* Links */}
        <div style={{ display: "flex", gap: "32px" }}>
          {["Help Center", "Privacy Policy", "Terms of Service"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: "14px",
                color: "#6b7280",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: "13px",
            color: "#9ca3af",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} ResumeIQ . All rights reserved.
        </p>
      </div>
    </footer>
  );
}

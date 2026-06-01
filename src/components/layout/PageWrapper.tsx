import type { PageWrappersProps } from "@/types";

export default function PageWrapper({
  children,
  className = "",
}: PageWrappersProps) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

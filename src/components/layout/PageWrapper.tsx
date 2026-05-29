import type { PageWrappersProps } from "@/types";

export default function PageWrapper({
  children,
  className = "",
}: PageWrappersProps) {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-4 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

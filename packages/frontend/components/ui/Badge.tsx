import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "outline";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const styles = {
    default: "bg-surface-container text-on-surface-variant",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    outline: "bg-transparent border border-outline-variant text-on-surface-variant",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm font-mono text-[10px] uppercase tracking-wider font-semibold ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

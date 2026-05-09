import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = "", ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-label-caps text-on-surface-variant ml-0.5">
          {label}
        </label>
      )}
      <input
        className={`input w-full ${error ? "border-error focus:ring-error/5" : ""} ${className}`}
        {...props}
      />
      {error && <span className="text-[11px] text-error mt-0.5 ml-0.5">{error}</span>}
    </div>
  );
};

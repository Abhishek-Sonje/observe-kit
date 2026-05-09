import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card = ({ children, className = "", hoverable = false }: CardProps) => {
  return (
    <div
      className={`card ${hoverable ? "hover:border-primary/20 hover:shadow-ambient" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 border-b border-outline-variant ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 border-t border-outline-variant bg-surface-container-lowest/50 ${className}`}>
    {children}
  </div>
);

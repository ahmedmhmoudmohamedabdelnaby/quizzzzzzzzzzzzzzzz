import React from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  dark = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(dark ? "glass-dark" : "glass", "rounded-2xl p-6", className)} {...props}>
      {children}
    </div>
  );
}

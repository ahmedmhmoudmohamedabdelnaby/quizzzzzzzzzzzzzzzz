"use client";

import React from "react";
import { PersonalizationProvider } from "@/contexts/PersonalizationContext";
import { AudioProvider } from "@/contexts/AudioContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PersonalizationProvider>
      <AudioProvider>
        {children}
      </AudioProvider>
    </PersonalizationProvider>
  );
}

"use client";

import React, { createContext, useContext, useState } from "react";

type PersonalizationContextType = {
  names: {
    partner: string;
    user: string;
  };
  setNames: (partner: string, user: string) => void;
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const [names, setNamesState] = useState({
    partner: "Noga",
    user: "Ahmed",
  });

  const setNames = (partner: string, user: string) => {
    setNamesState({ partner, user });
  };

  return (
    <PersonalizationContext.Provider value={{ names, setNames }}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error("usePersonalization must be used within a PersonalizationProvider");
  }
  return context;
}

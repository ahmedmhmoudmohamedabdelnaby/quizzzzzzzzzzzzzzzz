"use client";

import React, { createContext, useContext, useState } from "react";

type AudioState = "ambient" | "chime" | "wrong" | "piano" | "silent";

type AudioContextType = {
  play: (track: AudioState) => void;
  stop: () => void;
  isMuted: boolean;
  toggleMute: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  // Empty functions to prevent any audio from playing and stop autoplay errors
  const play = (track: AudioState) => {};
  const stop = () => {};
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <AudioContext.Provider value={{ play, stop, isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

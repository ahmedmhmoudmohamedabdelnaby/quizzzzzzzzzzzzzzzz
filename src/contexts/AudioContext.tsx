"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type AudioState = "ambient" | "chime" | "wrong" | "piano" | "silent";

type AudioContextType = {
  play: (track: AudioState) => void;
  stop: () => void;
  isMuted: boolean;
  toggleMute: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AUDIO_ASSETS = {
  ambient: "/audio/ambient.mp3",
  chime: "/audio/chime.mp3",
  wrong: "/audio/wrong.mp3",
  piano: "/audio/piano.mp3",
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const currentTrack = useRef<string | null>(null);

  // Preload audio assets
  useEffect(() => {
    Object.entries(AUDIO_ASSETS).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audioRefs.current[key] = audio;
    });
  }, []);

  const play = (track: AudioState) => {
    if (track === "silent" || isMuted) return;

    // Stop current track to avoid overlap
    if (currentTrack.current && audioRefs.current[currentTrack.current]) {
      const currentAudio = audioRefs.current[currentTrack.current];
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const nextAudio = audioRefs.current[track];
    if (nextAudio) {
      // Handle looping for ambient/piano tracks
      if (track === "ambient" || track === "piano") {
        nextAudio.loop = true;
      }
      
      const playPromise = nextAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay blocked, falling back to silent mode", error);
        });
      }
      currentTrack.current = track;
    }
  };

  const stop = () => {
    if (currentTrack.current && audioRefs.current[currentTrack.current]) {
      const currentAudio = audioRefs.current[currentTrack.current];
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentTrack.current = null;
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (newMuted) stop();
      return newMuted;
    });
  };

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

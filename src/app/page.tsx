"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { useAudio } from "@/contexts/AudioContext";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const { names } = usePersonalization();
  const { play } = useAudio();
  const router = useRouter();
  const [stage, setStage] = useState<"loading" | "intro" | "passcode" | "hero">("loading");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate loading assets for cinematic feel
    const timer = setTimeout(() => {
      setStage("intro");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    play("ambient");
    setStage("passcode");
  };

  const handlePasscode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPasscode(val);
    setError(false);
    
    // Hardcoded passcode for now, ideally verified securely or kept simple as requested
    if (val.length === 4) {
      if (val === "2026") { // Example passcode
        setTimeout(() => setStage("hero"), 400);
      } else {
        setError(true);
        setTimeout(() => setPasscode(""), 600);
      }
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AmbientBackground />
      
      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-4xl"
            >
              🤍
            </motion.div>
            <p className="font-serif text-[var(--color-romantic)] text-xl tracking-[0.2em] animate-pulse">
              PREPARING MEMORIES
            </p>
          </motion.div>
        )}

        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center text-center px-6"
          >
            <h1 className="font-serif text-6xl md:text-8xl text-[var(--color-romantic)] mb-6 text-glow leading-tight" dir="rtl">
              حكايتنا
            </h1>
            <p className="text-[var(--color-rosegold)] text-xl md:text-2xl font-light max-w-lg mx-auto mb-16 leading-relaxed" dir="rtl">
              رحلة صغيرة في أحلى ذكرياتنا سوا.
            </p>
            <MagneticButton onClick={handleStart}>
              يلا نبدأ
            </MagneticButton>
          </motion.div>
        )}

        {stage === "passcode" && (
          <motion.div
            key="passcode"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-serif text-3xl text-[var(--color-romantic)] mb-8 tracking-wide">
              Unlock the Magic
            </h2>
            <motion.div 
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <input 
                type="password"
                value={passcode}
                onChange={handlePasscode}
                className={`glass rounded-2xl px-6 py-4 text-center text-4xl tracking-[1em] focus:outline-none focus:ring-2 w-64 text-[var(--color-romantic)] transition-all ${error ? 'border-red-300 focus:ring-red-300' : 'focus:ring-[var(--color-rosegold)]'}`}
                placeholder="****"
                maxLength={4}
                autoFocus
              />
            </motion.div>
            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-400 mt-4 font-light"
              >
                Incorrect passcode
              </motion.p>
            )}
          </motion.div>
        )}
        
        {stage === "hero" && (
           <motion.div
            key="hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center px-4"
            dir="rtl"
           >
             <h1 className="font-serif text-5xl md:text-7xl text-[var(--color-romantic)] mb-6 text-glow leading-tight">
               نورتي دنيتي كلها،<br />يا {names.partner}
             </h1>
             <p className="text-[var(--color-rosegold)] text-2xl font-light mb-12">
               جاهزة تفتكري معايا؟
             </p>
             <MagneticButton onClick={() => { router.push("/quiz"); }}>
               أيوة، جاهزة
             </MagneticButton>
           </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

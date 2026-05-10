"use client";

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useAudio } from "@/contexts/AudioContext";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { GlassCard } from "@/components/ui/GlassCard";

function RewardContent() {
  const { play } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Play romantic piano track as soon as they reach the final screen
    play("piano");
  }, [play]);

  const handleOpen = () => {
    setIsOpen(true);

    // Slow-mo confetti pops when the envelope is opened
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fff5f8', '#b76e79']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fff5f8', '#b76e79']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const messages = [
    "شاطرة جداً إنك فاكرة كل تفصيلة بينا وحليتي كله صح ",
    "عارفة؟ أنا بجد محظوظ بيكي",
    "كل يوم معاكي بيأكدلي إنك أحلى حاجة حصلتلي في دنيتي كلها.",
    "إنتي مش بس حبيبتي، إنتي روحي ووبموت فيكي اوى اوى .",
    "بحبك أوي يا أجمل صدفة وأحلى قدر في حياتي 💖",
    "مش هتبوسيني بقى؟ 💋"
  ];

  return (
    <div className="z-10 text-center w-full max-w-4xl flex flex-col items-center justify-center min-h-[70vh]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="cursor-pointer flex flex-col items-center gap-6 p-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-9xl drop-shadow-2xl"
            >
              💌
            </motion.div>
            <h2 className="font-serif text-4xl text-[var(--color-romantic)] text-glow tracking-widest mt-4">
              Open Me
            </h2>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <GlassCard className="text-center space-y-8 mx-auto max-w-2xl py-16 px-8" dir="rtl">
              {messages.map((msg, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (idx * 2), duration: 1.5 }}
                  className={`text-[var(--color-romantic)] ${idx === messages.length - 1 ? "font-bold mt-16 text-4xl" : "font-light text-2xl leading-relaxed"}`}
                >
                  {msg}
                </motion.p>
              ))}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Reward() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <AmbientBackground />
      <Suspense fallback={<div className="text-[var(--color-romantic)] animate-pulse">...</div>}>
        <RewardContent />
      </Suspense>
    </main>
  );
}

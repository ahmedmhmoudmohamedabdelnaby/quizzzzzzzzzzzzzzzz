"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AmbientBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  if (!dimensions.width) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[var(--color-rosegold)]/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[var(--color-romantic)]/5 blur-[120px]" />
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[var(--color-rosegold)]/30 blur-[1px]"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [null, -200],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

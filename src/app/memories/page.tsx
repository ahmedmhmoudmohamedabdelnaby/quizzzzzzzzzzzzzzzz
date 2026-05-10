"use client";

import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

const MEMORIES = [
  { id: 1, title: "Our First Date", date: "June 2024", desc: "Coffee and endless talking." },
  { id: 2, title: "The Beach Trip", date: "August 2024", desc: "Watching the sunset together." },
  { id: 3, title: "Your Birthday", date: "December 2024", desc: "The surprise party!" },
  { id: 4, title: "Future Together", date: "Forever", desc: "So many more to come." },
];

export default function Memories() {
  return (
    <main className="relative min-h-screen flex flex-col items-center py-16 px-4">
      <AmbientBackground />
      
      <h1 className="font-serif text-5xl md:text-7xl text-[var(--color-romantic)] mb-16 text-glow text-center">
        Memory Gallery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 w-full max-w-6xl">
        {MEMORIES.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
          >
            <GlassCard className="h-full flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="w-full h-48 bg-white/40 rounded-xl mb-4 flex items-center justify-center border border-[var(--color-rosegold)]/30">
                <span className="text-5xl drop-shadow-md">📸</span>
              </div>
              <h3 className="font-serif text-2xl text-[var(--color-romantic)]">{mem.title}</h3>
              <p className="text-[var(--color-rosegold)] font-medium text-sm mb-2 uppercase tracking-widest mt-2">{mem.date}</p>
              <p className="text-[var(--color-romantic)]/80 font-light mt-2">{mem.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-20">
        <Link href="/">
          <MagneticButton>Back to Home</MagneticButton>
        </Link>
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAudio } from "@/contexts/AudioContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { useRouter } from "next/navigation";

const QUIZ_QUESTIONS = [
  {
    question: "أول مرة شوفنا بعض كانت فين؟",
    options: ["الدرس", "في الكلية", "في النادي", "على الفيس بوك"],
    correct: 0,
  },
  {
    question: "أول ديت نزلناه كان فين؟",
    options: ["ستارباكس", "ماكدونلز", "السينما", "مطعم سمك"],
    correct: 1,
  },
  {
    question: "أول مرة حضنتك فيها كانت فين؟",
    options: ["في العربية", "في الشارع", "النيابة الإدارية", "قدام البيت"],
    correct: 2,
  },
  {
    question: "تاريخ أول كلام بينا كان إمتى؟",
    options: ["14/2", "1/1", "15/3", "29/1"],
    correct: 3,
  },
  {
    question: "خطوبتنا كانت إمتى؟",
    options: ["1/1", "12/2", "29/1", "14/2"],
    correct: 1,
  }
];

export default function Quiz() {
  const { play } = useAudio();
  const { names } = usePersonalization();
  const router = useRouter();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    // Create a temporary profile for demo if no auth
    const initProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ partner_name: names.partner, user_name: names.user }])
        .select()
        .single();
      if (data) setProfileId(data.id);
    };
    initProfile();
  }, [names]);

  const handleAnswer = async (index: number) => {
    if (isSubmitting || selected !== null) return; // Prevent multiple submissions
    setSelected(index);
    setIsSubmitting(true);
    
    const isCorrect = index === QUIZ_QUESTIONS[currentIndex].correct;
    if (isCorrect) play("chime");
    else play("wrong");

    if (profileId) {
      // 1. Save answer idempotently
      await supabase.from("answer_memory").upsert({
        profile_id: profileId,
        question_index: currentIndex,
        answer_text: QUIZ_QUESTIONS[currentIndex].options[index],
        is_correct: isCorrect
      });

      // 2. Atomic score update
      if (isCorrect) {
        await supabase.rpc('increment_love_tokens', { p_id: profileId, amount: 10 });
      }
    }

    setTimeout(() => {
      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
        setIsSubmitting(false);
      } else {
        router.push("/reward?profile=" + profileId);
      }
    }, 1500);
  };

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      <AmbientBackground />
      
      <GlassCard className="w-full max-w-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-[var(--color-rosegold)] transition-all duration-500" style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center py-8"
            dir="rtl"
          >
            <p className="text-[var(--color-rosegold)] font-serif italic mb-2">السؤال {currentIndex + 1} من {QUIZ_QUESTIONS.length}</p>
            <h2 className="text-3xl text-[var(--color-romantic)] font-serif text-center mb-8">
              {currentQ.question}
            </h2>
            
            <div className="flex flex-col gap-4 w-full">
              {currentQ.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === currentQ.correct;
                
                let btnStyle = "bg-white/50 text-[var(--color-romantic)] hover:bg-white/80 border-white/40";
                if (selected !== null) {
                  if (i === currentQ.correct) btnStyle = "bg-green-100/80 text-green-800 border-green-300";
                  else if (isSelected) btnStyle = "bg-red-100/80 text-red-800 border-red-300";
                  else btnStyle = "bg-white/30 text-[var(--color-romantic)]/50 opacity-50";
                }

                return (
                  <button
                    key={i}
                    disabled={isSubmitting}
                    onClick={() => handleAnswer(i)}
                    className={`w-full py-4 px-6 rounded-xl border transition-all duration-300 font-medium text-xl ${btnStyle}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </GlassCard>
    </main>
  );
}

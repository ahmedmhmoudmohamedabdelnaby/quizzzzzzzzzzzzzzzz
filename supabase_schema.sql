-- 1. Create Users profile table (linked to auth.users if needed, or standalone for simplicity)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name TEXT NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Quiz Progress
CREATE TABLE IF NOT EXISTS public.quiz_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_question_index INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT one_progress_per_profile UNIQUE(profile_id)
);

-- 3. Answer Memory
CREATE TABLE IF NOT EXISTS public.answer_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_index INTEGER NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT one_answer_per_question UNIQUE(profile_id, question_index)
);

-- 4. Scores (Love Tokens)
CREATE TABLE IF NOT EXISTS public.scores (
  profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  love_tokens INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function for atomic score updates (Transaction Safety)
CREATE OR REPLACE FUNCTION increment_love_tokens(p_id UUID, amount INTEGER)
RETURNS void AS $$
BEGIN
  INSERT INTO public.scores (profile_id, love_tokens)
  VALUES (p_id, amount)
  ON CONFLICT (profile_id)
  DO UPDATE SET 
    love_tokens = public.scores.love_tokens + amount,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

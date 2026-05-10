# Building "Noga's World" - A Luxury Romantic Web Experience

This plan outlines the implementation of a deeply personalized, cinematic web experience for Noga. The app will be built using a modern stack (Next.js 14, Tailwind CSS, Framer Motion, Supabase) and heavily focus on a premium, highly-polished aesthetic.

## User Review Required

> [!IMPORTANT]
> Please review the updated **Supabase Schema** (now including `answer_memory`) and the **New Dynamic Features**. Once approved, I will begin building this experience.

## Open Questions

> [!NOTE]
> 1. **Supabase Setup**: Do you have a Supabase project ready? Once we start, I will provide the SQL script for you to run in your Supabase SQL Editor, and I'll need the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to connect the app.
> 2. **Authentication**: I suggest a simple, elegant passcode on the landing page to keep the UX seamless and cinematic. Does that sound good?
> 3. **AI Love Summary**: For the 3-5 personalized messages generated after the quiz, do you want to integrate OpenAI (requires an API key) to generate truly dynamic text, or should we build a logic engine that maps specific quiz answers to pre-written emotional phrases? 

---

## Proposed Tech Stack & Initialization

* **Framework**: Next.js 14 (App Router) with TypeScript
* **Styling**: Tailwind CSS (with custom design system for luxury aesthetic)
* **Animations**: Framer Motion & Canvas-confetti
* **Icons**: Lucide-react
* **Database & Auth**: Supabase
* **Audio**: HTML5 Audio API managed via a global context/controller.

**Initialization Command:**
```bash
cmd.exe /c npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git
```

## Design System & Global Styles

We will implement a custom Tailwind configuration to support the "Pinky White Luxury" aesthetic:

* **Colors**: Blush White (`#fff5f8`), Warm Rose Gold (`#b76e79`), Deep Romantic Brown (`#5a3a41`)
* **Typography**: Cormorant Garamond (Headings), Inter (Body)
* **Glassmorphism**: Custom Tailwind utilities for frosted glass effects, backdrop blur, and subtle borders.
* **Cinematic Effects**: Ambient bloom lighting, floating particles, and subtle film grain overlay.
* **Personalization**: All names ({Noga}, {Ahmed}) will be driven by environment variables or global context, never hardcoded.

---

## Supabase Schema

We will create the following tables using PostgreSQL in Supabase:

1. **`users`** (or rely on Supabase Auth users table and a `profiles` table)
2. **`quiz_progress`**: Tracks current question index and completed status.
3. **`answer_memory`** (NEW): Stores each answer to the 10 questions. Used for the AI Love Summary and Final Message Personalization.
4. **`scores`**: Tracks the total `love_tokens`.
5. **`gifts`**: Inventory of redeemable items (e.g., Cinema Date, Flowers).
6. **`redeemed_gifts`**: Tracks which gifts have been claimed.
7. **`daily_streaks`**: Tracks daily logins to unlock hidden memories.
8. **`hidden_unlocks`**: Tracks discovered easter eggs.

*(Full SQL script will be provided during the execution phase.)*

---

## Feature Roadmap

### Phase 1: Foundation & Design System
- Initialize Next.js app with Tailwind, Framer Motion, and Supabase client.
- Set up global CSS variables, custom fonts, name personalization variables, and glassmorphism utilities.
- Implement the **Audio State System** (global audio controller for ambient tracks, UI chimes, piano themes).
- Create reusable UI components (Magnetic Buttons, Glass Cards, Ambient Background).
- Implement the Loading/Intro Cinematic sequence.

### Phase 2: Landing & Navigation
- Build the emotional hero section with cinematic motion and floating hearts.
- Create smooth scroll layouts and navigation structure.

### Phase 3: Love Quiz & Answer Memory
- Implement the 10-question romantic quiz engine with Framer Motion transitions.
- Build the persistent state logic connected to Supabase (`quiz_progress`, `answer_memory`, `scores`).
- Add specific audio triggers (soft ambient for start, gentle chime for correct, soft feedback for wrong).
- Implement the **AI Love Summary Layer**: calculate score, fetch past answers, and map to 3-5 personalized summary messages.

### Phase 4: Dynamic Final Surprise & Rewards
- Build the Final Surprise Experience featuring a cinematic piano track, slow-mo confetti, and glowing kiss reward.
- Implement the **Dynamic Emotional Final Screen**:
  - High score -> Romantic/flirty tone ("You know me too well 😏💋")
  - Medium score -> Warm emotional tone ("You did amazing 💕")
  - Low score -> Soft affectionate tone ("You still deserve it 💖")
- Implement "The Love Store" dashboard with inventory and redemption logic.

### Phase 5: Memories & Exploration
- Build the "Romantic Memory Gallery" with stacked, animated polaroids.
- Create the "Future Together" section.
- Build the "Open When" digital letter system.
- Implement daily streaks, login tracking, and hidden interactive easter eggs.
- Optimize performance, responsive design for iPhone, and ensure buttery-smooth animations.

---

## Verification Plan

### Automated/Code Verification
- Ensure all Next.js builds pass successfully (`npm run build`).
- Verify TypeScript types match the Supabase schema.

### Manual Verification
- Test audio states across different routes and interactions.
- Verify that Supabase session persistence correctly remembers answers and calculates dynamic text correctly.
- Test animations and cinematic transitions locally.
- Ensure the layout is pixel-perfect and responsive on mobile viewports.

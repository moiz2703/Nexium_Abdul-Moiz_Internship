# Mindwave – Mental Wellness Web App 🧠💫

Mindwave is a mental wellness tracking app built with Next.js, Supabase, and AI. It allows users to log moods, write journal entries, and get AI-generated reflections and suggestions for emotional well-being.

#  Features

-  Mood logging with journal inputs
-  AI-powered reflection and suggestion generation (via n8n + OpenAI)
-  Visual mood history and trends
-  User authentication (Supabase Auth)
-  Clean UI with ShadCN and Tailwind CSS
-  Supabase as backend (PostgreSQL, Auth, Storage)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database & Auth**: Supabase
- **UI**: ShadCN UI + Tailwind CSS
- **API Calls**: n8n + OpenAI API
- **Charts**: Recharts (or similar)
- **Deployment**: Vercel


# Supabase Schema
users – Supabase Auth users
mood_logs – mood, journal, and timestamp
reflections – generated AI suggestions
Policies ensure each user sees only their own logs.

🛠️ n8n Workflow
Receives journal + mood
Sends to Gemini AI
Returns summary + suggestions to frontend


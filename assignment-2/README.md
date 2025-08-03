# AI Blog Summarizer 📰✨

An intelligent blog summarizer web app that allows users to input a blog URL and receive an AI-generated summary in seconds. Built using Next.js, ShadCN UI, Supabase, OpenAI, and an automated n8n backend.

## 🚀 Features

-  Accepts any blog/article URL
-  AI-generated summary using OpenAI via n8n
-  Clean UI built with ShadCN and Tailwind CSS
-  Supports dynamic scraping using Playwright
-  Saves summaries in Supabase
-  Client-side + server-side validation

##  Tech Stack

- Frontend: Next.js 15 (App Router), TypeScript
- UI: ShadCN UI, Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth)
- AI Workflow: n8n
- **Deployment: Vercel


## 🧠 How It Works

1. User enters a **blog URL**
2. Clean blog text is sent to an **n8n webhook**
3. **n8n** uses **HTTP Request node** to output the html document of the blog and **Gemini** to clean the document, and then **jscode** for summarizing.
4. Summary is returned to frontend and optionally saved in **Supabase**
5. Full Content of blog is saved in **MongoDB**.

## Supabase Schema
users – Supabase Auth
summaries – stores blog URL, summary text, user ID, and timestamp




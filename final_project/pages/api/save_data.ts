import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    stress,
    depression,
    anxiety,
    journal,
    summary,
    suggestions,
    mood,
  } = req.body

  const supabase = createServerSupabaseClient<NextApiRequest, NextApiResponse>(req, res)

  const {
    data: { session },
    error: authError,
  } = await supabase.auth.getSession()

  const user = session?.user

  if (authError || !user) {
    return res.status(401).json({ error: 'Unauthorized', details: authError?.message })
  }

  const { data: moodLog, error: moodError } = await supabase
    .from('mood_logs')
    .insert({
      user_id: user.id,
      mood,
      journal_entry: journal,
    })
    .select()
    .single()

  if (moodError) {
    return res.status(500).json({ error: 'Failed to insert mood log', details: moodError.message })
  }

  const { error: reflectionError } = await supabase.from('reflections').insert({
    mood_log_id: moodLog.id,
    agent_summary: summary,
    suggestions,
    stress_level: stress,
    depression_level: depression,
    anxiety_level: anxiety,
  })

  if (reflectionError) {
    return res.status(500).json({ error: 'Failed to insert reflection', details: reflectionError.message })
  }

  return res.status(200).json({ success: true, mood_log_id: moodLog.id })
}

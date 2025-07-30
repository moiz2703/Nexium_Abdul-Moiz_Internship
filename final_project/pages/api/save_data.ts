import { NextApiRequest, NextApiResponse } from 'next'
import { getSupabaseServerClient } from '@/lib/supabaseServer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const supabase = getSupabaseServerClient(req, res)

    const {
      mood,
      journal,
      summary,
      suggestions,
      stress,
      depression,
      anxiety
    } = req.body

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { data: moodLog, error: moodError } = await supabase
      .from('mood_logs')
      .insert([{ mood, user_id: user.id, journal_entry: journal }])
      .select()
      .single()

    if (moodError || !moodLog) {
      return res.status(500).json({ error: 'Failed to insert mood log', details: moodError })
    }

    const { error: reflectionError } = await supabase
      .from('reflections')
      .insert([
      {
        mood_log_id: moodLog.id,
        agent_summary: summary,   
        suggestions: suggestions,   
        stress_level: stress,       
        depression_level: depression,
        anxiety_level: anxiety
      }
    ])

    if (reflectionError) {
      return res.status(500).json({ error: 'Failed to insert reflection', details: reflectionError })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Unexpected error occurred' })
  }
}

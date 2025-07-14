import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url, summary } = req.body

  if (!url || !summary) {
    return res.status(400).json({ error: 'Missing url or summary in request body' })
  }

  // Check if URL already exists
  const { data: existingData, error: fetchError } = await supabase
    .from('Summaries')
    .select('*')
    .eq('url', url)
    .maybeSingle()

  if (fetchError) {
    console.error('Error checking existing summary:', fetchError)
    return res.status(500).json({ error: fetchError.message })
  }

  if (existingData) {
    // Update existing record
    const { data, error } = await supabase
      .from('Summaries')
      .update({ summary })
      .eq('url', url)

    if (error) {
      console.error('Supabase update error:', error)
      return res.status(500).json({ error: error.message })
    }

    console.log('Updated existing summary:', data)
    return res.status(200).json({ data, updated: true })

  } else {
    // Insert new record
    const { data, error } = await supabase
      .from('Summaries')
      .insert([{ url, summary }])

    if (error) {
      console.error('Supabase insert error:', error)
      return res.status(500).json({ error: error.message })
    }

    console.log('Inserted new summary:', data)
    return res.status(200).json({ data, inserted: true })
  }
}
